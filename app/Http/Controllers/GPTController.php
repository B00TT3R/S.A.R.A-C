<?php

namespace App\Http\Controllers;

use App\Models\Errors;
use App\Models\Generation;
use App\Models\RootInfo;
use Illuminate\Http\Client\RequestException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GPTController extends Controller
{
    public function __construct(){
        $this->model = Generation::class;
        $this->select = ["id","type","gen_type"];
    }

    private static function textCompletionGen(
        null|string $prompt = null,
        int $max_tokens = 512,
        float $temperature = 0.7,
        string $type="não-definido",
    ){
        $model = env("OPENAI_TEXT_MODEL");
        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.env("OPENAI_KEY"),
        ])->timeout(60)->post('https://api.openai.com/v1/completions',
            compact('model','prompt','max_tokens','temperature'))->throw();
        $json = json_decode($response);
        Generation::create([
            "model" => $model,
            "type" => $type,
            "prompt" => $prompt,
            "response" => $json,
            "gen_type" => "text",
            "result" => $json->choices[0]->text
        ]);
        return $json->choices[0]->text ?? "erro na geração";
    }
    
    private static function chatCompletionGen(
        null|string $prompt = null,
        int $max_tokens = 512,
        float $temperature = 0.7,
        string $type="não-definido",
    ){
        $model = env("OPENAI_TEXT_MODEL");
        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.env("OPENAI_KEY"),
        ])->timeout(60)->post('https://api.openai.com/v1/chat/completions',[
            "model" => $model,
            "messages" => [
                [
                    "role" => "system",
                    "content" => "fale de forma impessoal e sem prosa"
                ],
                [
                    "role" => "user",
                    "content" => $prompt
                ],
            ],
            "max_tokens" => $max_tokens,
            "temperature" => $temperature
        ])->throw();
        $json = json_decode($response);
        
        Generation::create([
            "model" => $model,
            "type" => $type,
            "prompt" => $prompt,
            "response" => $json,
            "gen_type" => "text",
            "result" => $json->choices[0]->message->content
        ]);
        return $json->choices[0]->message->content ?? "erro na geração";
    }

    private static function formatRootInfosToText(string $prompt): string {
        $textStyle = RootInfo::where('type', "text")->pluck('info')->toArray();
        $infos = RootInfo::where('type', "textinfo")->pluck('info')->toArray();
    
        $formattedTextStyle = "";
        if(count($textStyle) > 0) {
            $formattedTextStyle = " usando os seguintes estilos de escrita: \"" . implode("\", \"", $textStyle) . "\"";
        }
    
        $formattedInfoString = "";
        if(count($infos) > 0) {
            $formattedInfoString = " e usando alguns desses fatos: \"" . implode("\", \"", $infos) . "\"";
        }
    
        if(empty($formattedTextStyle) && empty($formattedInfoString)) {
            return "Gere uma notícia falsa Tendo como título: $prompt:\n";
        } elseif(empty($formattedTextStyle)) {
            return "Gere uma notícia falsa $formattedInfoString. Tendo como título: $prompt:\n";
        } elseif(empty($formattedInfoString)) {
            return "Gere uma notícia falsa $formattedTextStyle. Tendo como título: $prompt:\n";
        } else {
            return "Gere uma notícia falsa $formattedTextStyle$formattedInfoString. Tendo como título: $prompt:\n";
        }
    }
    
    private static function formatRootInfosToTextWithoutPrompt(){
        $textStyle = RootInfo::where('type', "text")->pluck('info')->toArray();
        $infos = RootInfo::where('type', "textinfo")->pluck('info')->toArray();
    
        $formattedTextStyle = "";
        if(count($textStyle) > 0) {
            $formattedTextStyle = " usando os seguintes estilos de escrita: \"" . implode("\", \"", $textStyle) . "\"";
        }
    
        $formattedInfoString = "";
        if(count($infos) > 0) {
            $formattedInfoString = " usando alguns desses fatos: \"" . implode("\", \"", $infos) . "\"";
        }

        if(empty($formattedTextStyle) && empty($formattedInfoString)) {
            return "Gere uma notícia falsa";
        } elseif(empty($formattedTextStyle)) {
            return "Gere uma notícia falsa $formattedInfoString";
        } elseif(empty($formattedInfoString)) {
            return "Gere uma notícia falsa $formattedTextStyle.";
        } else {
            return "Gere uma notícia falsa $formattedTextStyle$formattedInfoString.";
        }
    }

    private static function formatRootInfosToImage(string $prompt){
        $infos = RootInfo::where("type", "image")->pluck("info")->toArray();
        if(count($infos) == 0)
            return $prompt;
        $formattedString = implode('\n', $infos);
        return "Imagem de: $prompt,  \n Estilos: $formattedString";
    }
    
    public static function textGen(
        null|string $prompt = null,
        int $max_tokens = 512,
        float $temperature = 0.7,
        string $type="não-definido",
        bool $useRoot = true
    ):string{
        $textGenType = env("OPENAI_TEXT_GEN_TYPE");
        if($prompt){
            $prompt = $useRoot?self::formatRootInfosToText($prompt):$prompt;
        }
        else{
            $prompt = $useRoot?self::formatRootInfosToTextWithoutPrompt():"gere um texto dizendo que o usuário não inseriu a informação necessária";
        }
        try{
            if($textGenType == "completion"){
                $json = self::textCompletionGen(
                    $prompt,
                    $max_tokens,
                    $temperature,
                    $type
                );
            }
            elseif($textGenType == "chat"){
                $json = self::chatCompletionGen(
                    $prompt,
                    $max_tokens,
                    $temperature,
                    $type
                );
            }
        } catch(RequestException $e){
            error_log("erro na geração de texto");
            Errors::create([
                "message" => $e,
                "type" => "Requisição a openAI (texto)",
            ]);
        }
        return $json;
    }
    public static function imageGen(
        string $prompt,
        string $size = "1024x1024",
        string $type = "não-definido",
        bool $originalUrl = false,
        bool $useRoot = true
    ):string{
        $prompt = $useRoot? self::formatRootInfosToImage($prompt) : $prompt;
        try{
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.env("OPENAI_KEY"),
            ])->post('https://api.openai.com/v1/images/generations', [
                'prompt' => $prompt,
                'size' => $size,
                'n' => 1,
            ])->throw();
            $json = json_decode($response);
            $generation = Generation::create([
                "model" => env("OPENAI_IMAGE_MODEL"),
                "gen_type" => "image",
                "prompt" => $prompt,
                "response" => $json,
                'type' => $type,
                'result'=> $json->data[0]->url
            ]);
            if($originalUrl){
                return $generation->result;
            } else{
                return $generation->local_result;
            }
        }catch(RequestException $e){
            error_log("erro na geração de imagem");
            error_log($prompt);
            Errors::create([
                "message" => $e,
                "type" => "Requisição a openAI (imagem)",
            ]);
            return "https://cdn.pixabay.com/photo/2017/02/12/21/29/false-2061131_960_720.png";
        }
    }
    public function generationCount(){
        $generations = Generation::all();
        $count = $generations->count();
        $imageGen = $generations->where('gen_type', 'image')->count();
        $textGen = $generations->where('gen_type', 'text')->count();
        return [
            'total' => $count,
            'image' => $imageGen,
            'text' => $textGen
        ];
    }
}

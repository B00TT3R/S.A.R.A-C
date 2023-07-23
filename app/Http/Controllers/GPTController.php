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

    public static function messageGenerator(
        string $prompt,
        string $role = "system"
    )
    {
        return [
            "role" => $role,
            "content" => $prompt,
        ];
    }
    
    private static function chatCompletionGen(
        null|string $prompt = null,
        int $max_tokens = 512,
        float $temperature = 0.7,
        string $type="não-definido",
        array $messages=[]
    ){
        $model = env("OPENAI_TEXT_MODEL");
        $response = Http::withHeaders([
            'Authorization' => 'Bearer '.env("OPENAI_KEY"),
        ])->timeout(60)->post('https://api.openai.com/v1/chat/completions',[
            "model" => $model,
            "messages" => [
                ...$messages,
                self::messageGenerator($prompt, "user"),
            ],
            "max_tokens" => $max_tokens,
            "temperature" => $temperature
        ])->throw();
        $json = json_decode($response);
        Generation::create([
            "model" => $model,
            "type" => $type,
            "prompt" => $prompt,
            "messages" => $messages,
            "response" => $json,
            "gen_type" => "text",
            "result" => $json->choices[0]->message->content
        ]);
        return $json->choices[0]->message->content ?? "erro na geração";
    }    
    
    public static function formatRootInfosToMessages(): array{
        $textStyles = RootInfo::where('type', "text")->pluck('info')->toArray();
        $infos = RootInfo::where('type', "textinfo")->pluck('info')->toArray();
        $styleArray = [];
        $infoArray = [];
        foreach($textStyles as $style){
            $styleArray[] = self::messageGenerator("Use o seguinte estilo de escrita: ".$style);
        };
        foreach($infos as $info){
            $infoArray[] = self::messageGenerator("Considere a seguinte informação: ".$info);
        }
        return [
            ...$styleArray,
            ...$infoArray,
        ];
    }

    private static function formatRootInfosToImage(string $prompt){
        $infos = RootInfo::where("type", "image")->pluck("info")->toArray();
        if(count($infos) == 0)
            return $prompt;
        $formattedString = implode(', \n ', $infos);
        return "$prompt,  \n Estilos: $formattedString";
    }

    public static function formatImageRootInfosToMessages(){
        $styles = RootInfo::where("type", "image")->pluck("info")->toArray();
        $styleArray = [];
        foreach($styles as $style){
            $styleArray[] = self::messageGenerator("Considere a seguinte estilo desejado: ".$style);
        }
        return $styleArray;
    }
    
    public static function textGen(
        null|string $prompt = null,
        int $max_tokens = 512,
        float $temperature = 0.7,
        string $type="não-definido",
        bool $useRoot = true,
        array $messages = [],
    ):string{
        if($prompt){ // remover isso daqui
            $prompt = $useRoot?$prompt:$prompt;
        }
        else{
            error_log("sem prompt");
            $prompt = $useRoot? "Gere uma noticia" :"gere um texto dizendo que o usuário não inseriu a informação necessária";
        }
        try{            
            $json = self::chatCompletionGen(
                $prompt,
                $max_tokens,
                $temperature,
                $type,
                $messages
            );
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
        $prompt = $useRoot ? self::formatRootInfosToImage($prompt) : $prompt;
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

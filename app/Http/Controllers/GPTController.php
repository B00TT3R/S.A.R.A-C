<?php

namespace App\Http\Controllers;

use App\Models\Errors;
use App\Models\Generation;
use App\Models\RootInfo;
use App\Models\Topic;
use Illuminate\Database\Eloquent\Builder;
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
    
    public static function generateNewInfo(
        Topic|Builder $topic,
        string $prompt,
        int $max_tokens=2048,
        
    ):string{
        $info = self::chatCompletionGen(
            prompt : $prompt,
            messages : $topic->formatRootInfosToMessages(),
            max_tokens : $max_tokens,
            functions : [self::factContinuerFunctionBuilder()],
            function_call:["name"=>"gerar_fato"],
            type:"Geração de Fato",
            getFunction:true, 
            temperature:0.6
        );
        $text = json_decode($info[0]->arguments)->nova_informacao;
        $topic->root_infos()->create([
            "type"=>"textinfo",
            "info"=> $text
        ]);
        return $text;
    }

    public static function chatCompletionGen(
        null|string $prompt = null,
        int $max_tokens = 512,
        float $temperature = 0.7,
        string $type="não-definido",
        array $messages=[],
        Topic|null $topic = null,
        null|array $functions = null,
        null|array $function_call = null,
        bool $getFunction = false
    ):string|array{
        $model = env("OPENAI_TEXT_MODEL");
        $useFunctions = env("OPENAI_FUNCTIONS");
        try{
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.env("OPENAI_KEY"),
            ])->timeout(60)->post('https://api.openai.com/v1/chat/completions',[
                "model" => $model,
                "messages" => [
                    ...$messages,
                    self::messageGenerator($prompt, "user"),
                ],
                "max_tokens" => $max_tokens,
                "temperature" => $temperature,
                ...($functions && $useFunctions) ? [
                    "functions" => $functions,
                ]: [],
                ...($function_call && $useFunctions) ? [
                    "function_call" => $function_call,
                ]: []
            ])->throw();
            $json = json_decode($response);
            Generation::create([
                "model" => $model,
                "type" => $type,
                "prompt" => $prompt,
                "messages" => $messages,
                "response" => $json,
                "gen_type" => "text",
                "topic_id" => $topic ? $topic->id : null,
                "result" => $getFunction ? json_encode($json->choices[0]->message->function_call, JSON_PRETTY_PRINT) : $json->choices[0]->message->content
            ]);
        }
        catch(RequestException $e){
            error_log("erro na geração de texto");
            Errors::create([
                "message" => $e,
                "type" => "Requisição a openAI (texto)",
            ]);
        }

        if($getFunction){
            error_log("GetFunction chamado!");
            return array($json->choices[0]->message->function_call) ?? "erro na geração";
        }
        else{
            return $json->choices[0]->message->content ?? "erro na geração";
        }
    }    
    
    public static function textGen(
        int $max_tokens = 512,
        float $temperature = 0.7,
        string $type="não-definido",
        null|Topic|Builder $topic = null,
        array $messages = [],
        string $prompt = "Gere uma noticia",
        null|array $functions = null,
        null|array $function_call = null,
        bool $getFunction = false
    ):string|array{
        $return = self::chatCompletionGen(
            prompt:$prompt,
            max_tokens:$max_tokens,
            temperature:$temperature,
            type:$type,
            messages:$messages,
            topic:$topic,
            functions:$functions,
            function_call:$function_call,
            getFunction:$getFunction
        );
        return $return;
    }

    public static function imageGen(
        string $prompt,
        string $size = "1024x1024",
        string $type = "não-definido",
        bool $originalUrl = false,
        null|Builder|Topic $topic = null
    ):string{
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
                'result'=> $json->data[0]->url,
                "topic_id" => $topic?$topic->id:null,
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

    public static  function factContinuerFunctionBuilder(){
        return [
            "name"=>"gerar_fato",
            "description" => "considera os fatos e a noticia entrada pelo usuário, e então gera um novo fato",
            "parameters"=>[
                "type"=> "object",
                "properties" => [
                    "informacoes_previas"=>[
                        "type" => "array",
                        "description" => "As informações prévias, não pode existir dentro de \"nova_informacao\"",
                        "items" => [
                            "type" => "string"
                        ],
                    ],
                    "nova_informacao" => [
                        "type" => "string",
                        "description" => "A nova informação buscada na noticia, deve ser diferente das informações em \"informacoes_previas\""
                    ]
                ]
            ]
        ];
    }
}

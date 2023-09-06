<?php

namespace App\Http\Controllers;

use App\Http\Controllers\SocialMedias\FacebookController;
use App\Http\Controllers\SocialMedias\InstagramController;
use App\Models\RootInfo;
use App\Models\ShootTime;
use App\Models\Topic;
use App\Models\Timer;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{

    public static function getTitle($news, $topic){
        $title = GPTController::textGen(
            prompt: "Escreva um titulo adequado para: ".$news,
            max_tokens:2048,
            temperature:0.4,
            messages:[],
            type:"obtenção de título",
            topic:$topic
        );
        error_log($title);
        return $title;
    }

    private static function getImagePrompt($text, $topic){
        $fullText =  GPTController::chatCompletionGen(
            prompt:$text,
            type:"Geração de prompt de imagem",
            topic: $topic,
            max_tokens:55,
            temperature:1,
            messages:
            [
                GPTController::messageGenerator("Você é um gerador de descrição de imagem, o usuário lhe dará um texto e você descreverá uma imagem compatível"),
                GPTController::messageGenerator("considere que o usuário vai copiar a resposta e pesquisar no google imagens sem tratamento"),
                GPTController::messageGenerator("Não utilize emojis"),
                GPTController::messageGenerator("Utilize no máximo 10 palavras"),
            ]
        );

        $filteredText = GPTController::chatCompletionGen(
            prompt:$fullText,
            getFunction:true,
            type:"Formatação de prompt de imagem",
            topic: $topic,
            functions:[[
                "name"=>"formatar_prompt",
                "description" => "formata e resume uma descrição de imagem para copiar e colar no google imagens",
                "parameters"=>[
                    "type"=> "object",
                    "properties" => [
                        "prompt" => [
                            "type" => "string",
                            "description" => "O prompt formatado e resumido do texto para pesquisar no google imagens, ex: \"Cachorro bebendo água\""
                        ]
                    ],
                ],
                "required" => ["prompt"]
            ]],
            function_call:["name"=>"formatar_prompt"]
            
        );
        
        return json_decode($filteredText[0]->arguments)->prompt;
    }
    

    public static function fullGeneration($topic){
        error_log("Criando noticia do tópico: \n>" . $topic->name);
        $messages = [
            GPTController::messageGenerator("Crie uma noticia sobre o tópico: $topic->name"),            
            ...$topic->formatRootInfosToMessages()
        ];
        
        $content = GPTController::textGen(
            max_tokens: 2048,
            temperature: 0.85,
            type: "Geração Automática",
            messages: $messages,
            topic: $topic
        );
        $url = GPTController::imageGen( // colocar tópico aqui
            prompt: $topic->formatRootInfosToImage(
                self::getImagePrompt($content, $topic)
            ),
            size: "512x512",
            type: "geração-automatica",
            originalUrl: true,
            topic:$topic
        );
        error_log("chamando função");
        GPTController::generateNewInfo(
            topic:$topic,
            max_tokens:2048,
            prompt:$content,
        );
        FacebookController::post(
            $topic,
            [
                'message'=> $content,
                'url'=> $url,
            ]
        );
        InstagramController::post(
            topic: $topic,
            caption: $content,
            image_url:$url
        );
    }

    
    /* private static function getImagePrompt($title, $topic){
        $prompt = "Descreva de forma curta, literal e sem prosa, uma imagem de capa para uma noticia cujo titulo é";
        $messages = $topic->formatImageRootInfosToMessages();
        $infos = RootInfo::where("type", "image")->pluck("info")->toArray();
        if(count($infos) == 0)
            $infos = "";
        else
            $infos = ", Respeitando os seguintes estilos de imagem: ".implode(', ', $infos);
        
        $imagePrompt =  GPTController::textGen(
            max_tokens: 128,
            prompt: "$prompt: $title",
            temperature:0.5,
            type: "geração de prompt de imagem",
            topic:$topic,
            messages:[
                [
                    "role" => "system",
                    "content" => "você é um gerador de prompt de imagem"
                ],
                [
                    "role" => "system",
                    "content" => "descreva um prompt de imagem para ser passado para uma IA de geração de imagem"
                ],
                [
                    "role" => "system",
                    "content" => "seja o mais breve possível"
                ],
                ...$messages
            ],
        );
        error_log($imagePrompt);
        return $imagePrompt;
    } */
    
    // gerar todas as noticias num foreach
    public static function shoot(){
        error_log("Criando noticias automaticamente...");
        $topics = Topic::all();
        foreach ($topics as $topic) {
            self::fullGeneration($topic);
        }
    }
}

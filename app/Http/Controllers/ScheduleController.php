<?php

namespace App\Http\Controllers;

use App\Models\RootInfo;
use App\Models\ShootTime;
use App\Models\Topic;
use App\Models\Timer;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public static function fullGeneration($topic){
        error_log("Criando noticia do tópico: \n>" . $topic->name);
        $messages = $topic->formatRootInfosToMessages();
        
        $content = GPTController::textGen(
            max_tokens: 2048,
            temperature: 0.6,
            type: "Geração Automática",
            messages: $messages,
            topic: $topic
        );
        /* $url = GPTController::imageGen( // colocar tópico aqui
            prompt: $topic->formatRootInfosToImage(
                self::getImagePrompt(self::getTitle($content, $topic), $topic)
            ),
            size: "512x512",
            type: "geração-automatica",
            originalUrl: true,
            topic:$topic
        ); */
        error_log("chamando função");
        $newFact = GPTController::chatCompletionGen(
            functions: [GPTController::factContinuerFunctionBuilder()],
            function_call:["name"=>"gerar_fato"],
            messages:$messages,
            max_tokens:2048,
            type:"Geração de Fato",
            prompt:$content,
            getFunction:true
        );
        error_log("abaixo a chamada de função");
        error_log(json_encode($newFact, JSON_PRETTY_PRINT));
        FacebookController::post(
            $topic,
            [
                'message'=> $content,
                //'url'=> $url,
            ]
        );
    }

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

    private static function getImagePrompt($title, $topic){
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
    }
    
    // gerar todas as noticias num foreach
    public static function shoot(){
        error_log("Criando noticias automaticamente...");
        $topics = Topic::all();
        foreach ($topics as $topic) {
            self::fullGeneration($topic);
        }
    }
}

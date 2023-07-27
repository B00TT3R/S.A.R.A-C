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
        error_log("Criando noticia do tópico: \n> " . $topic->name);
        $message = GPTController::textGen(
            max_tokens: 3064,
            temperature: 0.6,
            type: "geração automática",
            messages: $topic->formatRootInfosToMessages(),
            topic: $topic
        );
        $url = GPTController::imageGen(
            prompt: $topic->formatRootInfosToImage(
                self::getImagePrompt(self::getTitle($message, $topic), $topic)
            ),
            size: "512x512",
            type: "geração-automatica",
            originalUrl: true
        );
        FacebookController::post(
            $topic,
            [
                'message'=> $message,
                'url'=> $url,
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
            messages:$messages,
            topic:$topic
        );
        error_log($imagePrompt);
        return $imagePrompt;
    }
    
    public static function shoot(){
        error_log("Criando noticias automaticamente...");
        $topics = Topic::with("root_infos")->get();

        foreach ($topics as $topic) {
            self::fullGeneration($topic);

        }

        Timer::resetTimer();
        Timer::addMinutes(ShootTime::getTime());
    }
}

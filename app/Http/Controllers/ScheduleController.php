<?php

namespace App\Http\Controllers;

use App\Models\RootInfo;
use App\Models\ShootTime;
use App\Models\Timer;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public static function getTitle($news){
        $title = GPTController::textGen(
            prompt: "Escreva um titulo adequado para: ".$news,
            max_tokens:2048,
            temperature:0.4,
            type:"obtenção de título",
            useRoot:false
        );
        error_log($title);
        return $title;
    }
    private static function getImagePrompt($title){
        $prompt = "Descreva de forma curta, literal e sem prosa, uma imagem de capa para uma noticia cujo titulo é";
        $messages = GPTController::formatImageRootInfosToMessages();
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
            useRoot:false,
            messages:$messages
        );
        error_log($imagePrompt);
        return $imagePrompt;
    }
    public static function shoot(){
        error_log("Criando noticia automaticamente...");
        $message = GPTController::textGen(
            max_tokens:3064,
            temperature:0.6,
            type: "geração automática",
            useRoot:true,
            messages: GPTController::formatRootInfosToMessages()
        );
        $url = GPTController::imageGen(
            prompt: self::getImagePrompt(self::getTitle($message)),
            size: "512x512",
            type: "geração-automatica",
            originalUrl: true
        );
        FacebookController::post([
            'message'=> $message,
            'url'=> $url,
        ]);
        Timer::resetTimer();
        Timer::addMinutes(ShootTime::getTime());
    }
}

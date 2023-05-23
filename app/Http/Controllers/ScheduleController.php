<?php

namespace App\Http\Controllers;

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
    public static function shoot(){
        error_log("Criando noticia automaticamente...");
        $message = GPTController::textGen(
            max_tokens:2048,
            temperature:0.6,
            type: "geração automática",
            useRoot:true
        );
        $url = GPTController::imageGen(
            prompt: "imagem de capa para a noticia: cujo titulo é: ".self::getTitle($message),
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

<?php

namespace App\Http\Controllers;

use App\Models\ShootTime;
use App\Models\Timer;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public static function shoot(){
        error_log("Criando noticia automaticamente...");
        $message = GPTController::textGen(
            max_tokens:2048,
            temperature:0.8,
            type: "geração automática",
            useRoot:true
        );
        $url = GPTController::imageGen("imagem de capa para $message", "512x512", "geração-automatica", true);
        FacebookController::post([
            'message'=> $message,
            'url'=> $url,
        ]);
        Timer::resetTimer();
        Timer::addMinutes(ShootTime::getTime());
    }
}

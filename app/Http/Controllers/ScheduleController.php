<?php

namespace App\Http\Controllers;

use App\Models\Timer;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public static function shoot(){
        error_log("função executada");
        Timer::resetTimer();
        Timer::addMinutes(3);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class TopicTimer extends Model
{
    use HasFactory;
    protected $table = "topic_timer";
    protected $fillable = [
        "next",
        "auto_gen",
        "time",
    ];
    protected $casts = [
        'next' => 'datetime',
        "auto_gen" => "boolean"
    ];

    public static function getInstance(){
        return self::first();
    }

    public static function addNext(){
        $item = self::getInstance();
        if($item->next instanceof \Carbon\Carbon){
            $item->next = $item->next->addMinutes($item->time);
            $item->save();
            Errors::create([
                "type" => "Log de próximo gerador de tópicos",
                "message" => "o tempo é $item->next"
            ]);
        }
        else{
            Errors::create([
                "type" => "adição de tempo ao gerador de tópicos",
                "message" => "next Não é uma instancia do carbon!"
            ]);
        }
    }
    
    public static function setNext($next){
        $item = self::getInstance();
        $item->next = $next;
        $item->save();
    }

    
}

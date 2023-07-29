<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
        $item->update([
            "next" => $item->next->addMinutes($item->time)
        ]);
    }
    
    public static function setNext($next){
        $item = self::getInstance();
        $item->update([
            "next" => $next
        ]);

    }

    
}

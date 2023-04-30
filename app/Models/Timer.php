<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Timer extends Model
{
    use HasFactory;

    protected $table = 'timer';
    protected $fillable = ['next'];
    protected $casts = [
        'next' => 'datetime',
    ];

    protected static $instance;

    
    private static function getInstance(): self
    {
        if (!self::$instance) {
            self::$instance = self::firstOrCreate([]);
        }
        return self::$instance;
    }

    public static function getNextTime(): string
    {
        $timer = self::getInstance();
        return $timer->next;
    }

    public static function addMinutes(int $minutes)
    {
        $timer = self::getInstance();
        $timer->next = $timer->next->addMinutes($minutes);
        $timer->save();
        return $timer->next;
    }

    public static function resetTimer(){
        $timer = self::getInstance();
        $timer->next = now()->toDateTimeString();
        $timer->save();
        return $timer->next;
    }
}

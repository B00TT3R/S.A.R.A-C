<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ShootTime extends Model
{
    use HasFactory;
    protected $table = "shoot_time";
    protected $fillable = ['time'];
    
    protected static $instance;
    private static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = self::firstOr(function () {
                return self::create([
                    "time" => 30
                ]);
            });
        }
        return self::$instance;
    }
    public static function getTime():int{
        $time = self::getInstance();
        return $time->time;
    }

    public static function setTime(int $time):void{
        $timer = self::getInstance();
        $timer->time = $time;
        $timer->save();
    }
    
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutoGen extends Model
{
    use HasFactory;
    protected $table="auto_gen";

    protected $fillable = ["generate"];
    protected static $instance;
    protected $casts = [
        "generate" => "boolean"
    ];
    private static function getInstance(): self
    {
        if (self::$instance === null) {
            self::$instance = self::firstOr(function () {
                return self::create([
                    "generate" => false,
                ]);
            });
        }
        return self::$instance;
    }
    public static function setGenerate(bool $generate){
        $instance = self::getInstance();
        $instance->generate = $generate;
        $instance->save();
    }
    public static function getGenerate(){
        $instance = self::getInstance();
        return $instance->generate;
    }
}

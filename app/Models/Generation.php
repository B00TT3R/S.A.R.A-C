<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Generation extends Model
{
    use HasFactory;
    protected $fillable = [
        "type",
        "response",
        "model",
        "type",
        "prompt",
        "gen_type"
    ];
    protected $casts = [
        "response" => "json"
    ];
    protected function asJson($value){
        return json_encode($value, JSON_UNESCAPED_UNICODE);
    }
}

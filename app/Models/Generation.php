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
        "prompt"
    ];
    protected $casts = [
        "response" => "json"
    ];
}

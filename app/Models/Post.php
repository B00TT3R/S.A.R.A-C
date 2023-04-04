<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    protected $table = 'posts';
    protected $fillable = [
        'type',
        'response',
        'description',
        'request'
    ];
    protected $casts = [
       'response' => 'json',
       'request' => 'json',
    ];
    public function asJson($value){
        return json_encode($value, JSON_UNESCAPED_UNICODE);
    }
}

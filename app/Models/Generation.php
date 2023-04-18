<?php

namespace App\Models;

use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\File;

class Generation extends Model
{
    use HasFactory;
    protected $fillable = [
        "type",
        "response",
        "model",
        "type",
        "prompt",
        "gen_type",
        "result",
        "local_result"
    ];
    protected $casts = [
        "response" => "json"
    ];
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if($model->type == "image"){
                $client = new Client();
                $response = $client->get($model->result);
                $contents = $response->getBody()->getContents();
                $filename = 'image_' . time() . '.png';
                $directory = public_path('images');
                $path = $directory . '/' . $filename;
                File::makeDirectory($directory, 0755, true, true);
                file_put_contents($path, $contents);
                $model->local_result = '/images/' . $filename;
            }
        });
    }

}

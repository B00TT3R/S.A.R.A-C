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
    ];
    protected $casts = [
        "response" => "json"
    ];

    private static function downloadImage(string $path):string{
        error_log("Baixando imagem para o armazenamento local");
        $client = new Client();
        $response = $client->get($path);
        $contents = $response->getBody()->getContents();
        $filename = 'image_' . time() . '.png';
        $directory = public_path('images');
        $path = $directory . '/' . $filename;
        File::makeDirectory($directory, 0755, true, true);
        file_put_contents($path, $contents);
        return $filename;
    }
    protected static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            if($model->gen_type == "image")
                $model->local_result = '/images/' . self::downloadImage($model->result);
        });
    }

}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Base\BaseInterface;
use App\Models\Generation;
use Error;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class GPTController extends Controller
{
    public static function handle(
        string $prompt,
        int $maxTokens = 512,
        float $temperature = 0.7,
        string $type="não-definido"
        ):string{
        $client = new Client();
        $token = env("OPENAI_KEY");
        $model = env("OPENAI_MODEL");
        $response = $client->request('POST', 'https://api.openai.com/v1/completions', [
            'headers' => [
                'Authorization' => 'Bearer '.$token,
            ],
            'json' => [
                'model' => $model,
                'prompt' => $prompt,
                'max_tokens' => $maxTokens,
                'temperature' => $temperature,
            ],
        ]);
        $json = json_decode($response->getBody()->getContents());
        Generation::create([
            "model" => $model,
            "type" => $type,
            "prompt" => $prompt,
            "response" => $json            
        ]);
        return $json->choices[0]->text;
    }
}

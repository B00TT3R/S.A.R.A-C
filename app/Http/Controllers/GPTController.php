<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Base\BaseInterface;
use App\Models\Generation;
use Error;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class GPTController extends Controller implements BaseInterface
{
    public static function handle(array $request):string{
        $client = new Client();
        $token = env("OPENAI_KEY");
        $model = env("OPENAI_MODEL");
        $response = $client->request('POST', 'https://api.openai.com/v1/completions', [
            'headers' => [
                'Authorization' => 'Bearer '.$token,
            ],
            'json' => [
                'model' => $model,
                'prompt' => $request["prompt"],
                'max_tokens' => $request["maxTokens"] ?? 512,
                'temperature' => $request["temperature"] ?? 0.7,
            ],
        ]);
        $json = json_decode($response->getBody()->getContents());
        Generation::create([
            "model" => $model,
            "type" => $request["type"] ?? "não-definido",
            "prompt" => $request["prompt"],
            "response" => $json            
        ]);
        return $json->choices[0]->text;
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Errors;
use Error;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class FacebookController extends Controller
{
    
    public static function handle(array $request){
        $client = new Client();
        $account = $request["account"];        
        $imgUrl = $request["imgUrl"];
        $message = $request["message"];
        try{
            $response = $client->request('POST', "https://graph.facebook.com/$account->page_id/photos", [
                'query' => [
                    'message' => $message,
                    'url' => $imgUrl,
                    'access_token' => $account->token
                ],
            ]);
            $body = $response->getBody();
            $body = $body->getContents();            
        } catch(Error $e){            
            $error = new Errors();
            $error->mensagem = $e->getMessage();
            $error->tipo = "Criação de post por facebook";
            $error->save();
        }

    }
}

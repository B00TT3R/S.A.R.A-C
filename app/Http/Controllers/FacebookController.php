<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Base\BaseInterface;
use App\Models\Errors;
use Error;
use GuzzleHttp\Client;
use Illuminate\Http\Request;

class FacebookController extends Controller implements BaseInterface
{
    
    public static function handle(array $request){
        $client = new Client();
        $id = $request["id"];
        $token = $request["token"];
        $imgUrl = $request["imgUrl"];
        $message = $request["message"];

        if($id  === null || $token === null){
            $error = new Errors();
            error_log("token ou id nao informado");
            $error->type = "Criação de post por facebook";
            $error->message = "Token ou Id não informado";
            $error->save();
            return;
        }
        try{
            $response = $client->request('POST', "https://graph.facebook.com/$id/photos", [
                'query' => [
                    'message' => $message,
                    'url' => $imgUrl,
                    'access_token' => $token
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

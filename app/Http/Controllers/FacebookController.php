<?php

namespace App\Http\Controllers;

use App\Models\Errors;
use App\Models\Post;
use App\Models\Tokens;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;

class FacebookController extends Controller
{
    
    public static function post(
        Tokens $account,
        string $message,
        string $imgUrl = null,
    ){
        $client = new Client();
        try {
            $json = [
                'message' => $message,
                'access_token' => $account->token
            ];
            if($imgUrl){
                $json['url'] = $imgUrl;
                $response = $client->post("https://graph.facebook.com/$account->page_id/photos", [
                    'json' => $json
                ]);
            }
            else{
                $response = $client->post("https://graph.facebook.com/$account->page_id/feed", [
                    'json' => $json
                ]);
            }
            $body = json_decode($response->getBody()->getContents());
            Post::create([
                "type" =>"facebook",
                "response" => $body,
                "description" => json_encode($json)
            ]);
        } catch(RequestException $e) {    
            error_log("Erro na criação de post facebook");
            Errors::create([
                'message' => $e->getResponse()->getBody(),
                'type'=>'Criação de post por facebook'
            ]);
        }
    }
    
    public static function getPageName(
        Tokens $account
    ){
        $client = new Client();
        try{
            $response = $client->get("https://graph.facebook.com/$account->page_id", [
            'query' => [
                'fields' => 'name',
                'access_token' => $account->token
            ]
        ]);
            $body = json_decode($response->getBody()->getContents());
            return $body->name;
        }  catch(RequestException $e) {
            error_log("erro na checagem de nome de pagina");
            Errors::create([
                'message' => $e->getMessage(),
                'type'=>'checagem de nome de pagina'
            ]);
        }
    }
}

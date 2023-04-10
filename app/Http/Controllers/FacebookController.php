<?php

namespace App\Http\Controllers;

use App\Models\Errors;
use App\Models\Post;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;

class FacebookController extends Controller
{
    public static function post(
        array ...$params
    ){
        $client = new Client();
        $page_id = env("FACEBOOK_PAGE_ID");        
        try {
            $json = [
                'access_token' => env("FACEBOOK_TOKEN"),
                ...$params[0]
            ];
            
            if(isset($json["url"])){
                $response = $client->post("https://graph.facebook.com/$page_id/photos", [
                    'json' => $json
                ]);
            }
            else{
                $response = $client->post("https://graph.facebook.com/$page_id/feed", [
                    'json' => $json
                ]);
            }
            $body = json_decode($response->getBody()->getContents());
            Post::create([
                "type" =>"facebook",
                "response" => $body,
                "request" => $params[0]                
            ]);
        } catch(RequestException $e) {    
            error_log("Erro na criação de post facebook");
            Errors::create([
                'message' => $e->getResponse()->getBody(),
                'type'=>'Criação de post para facebook'
            ]);
        }
    }
    
    public static function getPageName(
    ){
        $page_id = env("FACEBOOK_PAGE_ID");
        $client = new Client();
        try{
            $response = $client->get("https://graph.facebook.com/$page_id", [
            'query' => [
                'fields' => 'name',
                'access_token' => env("FACEBOOK_TOKEN")
            ]
        ]);
            $body = json_decode($response->getBody()->getContents());
            return $body->name;
        }  catch(RequestException $e) {
            error_log("erro na checagem de nome de pagina");
            Errors::create([
                'message' => $e->getMessage(),
                'type'=>'Checagem de nome de pagina'
            ]);
        }
    }
}

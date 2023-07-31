<?php

namespace App\Http\Controllers\SocialMedias;

use App\Models\Errors;
use App\Models\Post;
use App\Models\Topic;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Http;
use App\Http\Controllers\Controller;
class FacebookController extends Controller
{
    public static function post(
        Topic|Builder|null $topic,
        array ...$params
    ){
        $page_id = env("FACEBOOK_PAGE_ID");        
        $json = [
            'access_token' => env("FACEBOOK_TOKEN"),
            ...$params[0]
        ];
        $url = "https://graph.facebook.com/$page_id/";

        if (isset($json['url']) && !!$json['url']) $url .= "photos";
        else $url .= "feed";
        
        $response = Http::post($url, $json);
        $response->onError(function($e){
            error_log("Erro na criação de post facebook");
            Errors::create([
                'message' => $e,
                'type'=>'Criação de post para facebook'
            ]);
        });
        
        return Post::create([
            "type" =>"facebook",
            "response" => json_decode($response),
            "request" => $params[0],
            "topic_id" => $topic ? $topic->id : null
        ]);;
    }
    
    public static function getPageName(){
        $page_id = env("FACEBOOK_PAGE_ID");
        $response = Http::get("https://graph.facebook.com/$page_id", [
            'fields' => 'name',
            'access_token' => env("FACEBOOK_TOKEN")
        ]);
        $body = json_decode($response);
        $response->onError(function($e){
            error_log("erro na checagem de nome de pagina");
            Errors::create([
                'message' => $e->getResponse()->getBody(),
                'type'=>'Checagem de nome de pagina'
            ]);
        });
        return $body->name;
    }

    public static function getPostUrl(Post $post){
        $postId = $post->response["post_id"] ?? $post->response["id"];
        $response = Http::get("https://graph.facebook.com/$postId", [
            'fields'=> "permalink_url",
            "access_token"=>env("FACEBOOK_TOKEN")
        ]);
        $body = json_decode($response);
        return $body->permalink_url??"erro";
    }

    public static function deletePost(Post $post){
        try{
            $postId = $post->response["post_id"] ?? $post->response["id"];
            $response = Http::delete("https://graph.facebook.com/$postId", [
                "access_token"=>env("FACEBOOK_TOKEN")
            ])->throw();
            $body = json_decode($response);
            return $body??"erro";

        } catch (\Exception $e) {
            Errors::create([
                "type"=> "Remoção de post do facebook",
                "message"=>$e->getMessage(),
            ]);
        }
    }

    public static function getFeed(){
        $pageId = env("FACEBOOK_PAGE_ID");
        $response = Http::get("https://graph.facebook.com/$pageId/feed",[
                'fields'=>"permalink_url",
                "access_token" => env("FACEBOOK_TOKEN")
        ]);
        $body = json_decode($response);
        return json_encode($body, JSON_PRETTY_PRINT, JSON_UNESCAPED_SLASHES);
    }
}

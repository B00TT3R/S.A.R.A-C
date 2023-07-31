<?php

namespace App\Http\Controllers\SocialMedias;

use App\Http\Controllers\Controller;
use App\Models\Errors;
use App\Models\Post;
use App\Models\Topic;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Http;
class InstagramController extends Controller
{
    private static function createContainer($caption, $image_url){
        $page_id = env("INSTAGRAM_USER_ID");
        $url = "https://graph.facebook.com/$page_id/media";
        $urlWithParams = $url."?".http_build_query([
            "caption" => $caption,
            "image_url" => $image_url
        ]);

        $response = Http::post($urlWithParams, [
            'access_token' => env("INSTAGRAM_USER_TOKEN"),
        ]);

        $response->onError(function($e){
            error_log("Erro na criação de post instagram");
            Errors::create([
                'message' => $e,
                'type'=>'Criação de post para instagram'
            ]);
        });
        return $response;
    }
    private static function postContainer(int $id){
        $page_id = env("INSTAGRAM_USER_ID");
        $url = "https://graph.facebook.com/$page_id/media_publish";
        $urlWithParams = $url."?".http_build_query([
            "creation_id"=>$id
        ]);
        $response = Http::post($urlWithParams, [
            'access_token' => env("INSTAGRAM_USER_TOKEN"),
        ]);
        return $response;
        
    }
    public static function post(
        Topic|Builder|null $topic,
        string $caption,
        string $image_url,
    ){
        // Limita o caption para 2200 caracteres
        $caption = mb_substr($caption, 0, 2200);
    
        $containerRaw = self::createContainer($caption, $image_url);
        $container = json_decode($containerRaw);
        error_log("container ID: " . $container->id);
        $response = self::postContainer($container->id);
        $json = json_decode($response);
        error_log("Post ID: " . $json->id);
    
        return Post::create([
            "type" => "instagram",
            "response" => json_decode($response),
            "request" => [
                "image_url" => $image_url,
                "captions" => $caption
            ],
            "topic_id" => $topic ? $topic->id : null
        ]);
    }
    
    
    public static function getPageName(){
        $page_id = env("INSTAGRAM_USER_ID");
        $response = Http::get("https://graph.facebook.com/$page_id", [
            'fields' => 'name',
            'access_token' => env("INSTAGRAM_USER_TOKEN")
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
        $postId = $post->response["id"];
        $response = Http::get("https://graph.facebook.com/$postId", [
            'fields'=> "permalink",
            "access_token"=> env("INSTAGRAM_USER_TOKEN")
        ]);
        $body = json_decode($response);
        return $body->permalink ?? "erro";
    }    
}

<?php

namespace App\Http\Controllers;

use App\Http\Controllers\SocialMedias\FacebookController;
use App\Http\Controllers\SocialMedias\InstagramController;
use App\Models\Post;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    public function __construct(){
        $this->model = Post::class;
        $this->select = ["id", "type", "response"];
    }

    public function postCount(){
        $posts = Post::all();
        return [
            "total" => $posts->count(),
            "last" => $posts->last()->created_at ?? null
        ];
    }
    public function show($id){
        $post = parent::show($id);
        if($post->type == "facebook"){
            $post->url = FacebookController::getPostUrl($post);
        }
        elseif($post->type == "instagram"){
            $post->url = InstagramController::getPostUrl($post);
        }
        return $post;
    }
    public function create(Request $request)
    {
        $fbPost = FacebookController::post(
            null,
            [
                "message"=> $request->message,
                "url"=> $request->url ?? null,
            ]
        );
        $returnal["facebook"] = FacebookController::getPostUrl($fbPost);
        if($request->url){
            $igPost = InstagramController::post(
                topic:null,
                caption:$request->message,
                image_url:$request->url
            );
            $returnal["instagram"] = InstagramController::getPostUrl($igPost);
        }
        return $returnal;
    }

    public function destroy($id){
        if(Post::find($id)->type == "facebook"){
            FacebookController::deletePost(Post::find($id));
        }
        //api do instagram não permite exclusão.
        Post::destroy($id);
    }
    public function lastPost(){
        if(Post::all()->count() == 0){
            return [
                'url' => null,
                'type' => null
            ];
        }
        $lastPost = Post::latest()->first();
        if($lastPost->type == "facebook"){
            return [
                'url' => FacebookController::getPostUrl($lastPost),
                "type"=>"facebook"
            ];
        }
        if($lastPost->type == "instagram"){
            return [
                'url' => InstagramController::getPostUrl($lastPost),
                "type"=>"instagram"
            ];
        }
    }

}

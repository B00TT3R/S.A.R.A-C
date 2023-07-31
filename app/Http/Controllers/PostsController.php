<?php

namespace App\Http\Controllers;

use App\Http\Controllers\SocialMedias\FacebookController;
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
        $post->url = FacebookController::getPostUrl($post);;
        return $post;
    }
    public function create(Request $request)
    {
        $post = FacebookController::post(
            null,
            [
                "message"=> $request->message,
                "url"=> $request->url ?? null,
            ]
        );
        return [
            'url' => FacebookController::getPostUrl($post)
        ];
    }

    public function destroy($id){
        FacebookController::deletePost(Post::find($id));
        Post::destroy($id);
    }
    public function lastPost(){
        if(Post::all()->count() == 0){
            return [
                'url' => null,
            ];
        }

        $lastPost = Post::latest()->first();
        return [
            'url' => FacebookController::getPostUrl($lastPost)
        ];
    }

}

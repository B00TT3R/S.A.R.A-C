<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    public function postCount(){
        $posts = Post::all();
        return [
            "total" => $posts->count(),
            "last" => $posts->last()->created_at
        ];
    }
    public function getPosts(Request $request){
        $posts = Post::orderBy($request->orderBy, $request->order)->select("id","type", "response")->paginate(10);
        return $posts;
    }
    public function getPost($id){
        $post = Post::findOrFail($id);
        $postUrl = FacebookController::getPostUrl($post);
        $post->url = $postUrl;

        
        return $post;
    }
    public function createPost(Request $request)
    {
        $post = FacebookController::post([
            "message"=> $request->message,
            "url"=> $request->url ?? null,
        ]);
        return [
            'url' => FacebookController::getPostUrl($post)
        ];
    }

}

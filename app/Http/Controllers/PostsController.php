<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostsController extends Controller
{
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
}

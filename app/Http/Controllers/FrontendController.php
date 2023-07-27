<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendController extends Controller
{
    //
    public function index(Request $request) {
        return Inertia::render('index', [
            'allPermissions' => [
                "posts",
                "errors",
                "view_users",
                "modify_users",
                "generations",
                "root_infos",
                "topics",
            ]
        ]);
    }
    public function getTitleResult(Request $request){
        return 
        [
          "result" =>  GPTController::textGen(
                prompt: $request->value,
                max_tokens: 2048,
                temperature:0.9,
                type:"Geração de conteúdo manual"
            )
        ];
    }
    public function getImageResult(Request $request){
        return [
            "result" =>  GPTController::imageGen(
                prompt: $request->value,
                type: "Geração de conteúdo manual",
                originalUrl:true
            )
        ];
    }
}

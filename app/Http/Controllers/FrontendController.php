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
                "topics",
            ]
        ]);
    }

    public function getTitleResult(Request $request){
        return 
        [
          "result" =>  GPTController::textGen(
                messages:[
                    [
                        "role"=>"system",
                        "content" => "você é um gerador de noticias, gere uma noticia a partir do prompt do usuário"
                    ]
                ],
                prompt: $request->value,
                max_tokens: 750,
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

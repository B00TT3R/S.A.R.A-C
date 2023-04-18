<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendController extends Controller
{
    //
    public function index() {
        return Inertia::render('index', [
        
        ]);
    }
    public function getTitleResult(Request $request){
        return 
        [
          "result" =>  GPTController::textGen($request->value, 2048, 0.7, "Geração de conteúdo manual")
        ];
    }
}

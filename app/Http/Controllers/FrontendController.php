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
}

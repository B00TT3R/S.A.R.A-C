<?php

namespace App\Http\Controllers;


use App\Models\Topic;
use Illuminate\Http\Request;

class TopicsController extends Controller
{
    public function __construct(){
        $this->model = Topic::class;
        $this->select = ["id","type", "info"];

    }
    
    public function index(Request $request)
    {
        return Topic::filteredAll();
    }
}

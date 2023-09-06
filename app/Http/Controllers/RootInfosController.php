<?php

namespace App\Http\Controllers;

use App\Models\RootInfo;
use Illuminate\Http\Request;

class RootInfosController extends Controller
{
    public function __construct(){
        $this->model = RootInfo::class;
        $this->select = ["id","type", "info"];

    }
}

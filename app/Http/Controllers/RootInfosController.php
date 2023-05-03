<?php

namespace App\Http\Controllers;

use App\Models\AutoGen;
use App\Models\RootInfo;
use App\Models\ShootTime;
use Illuminate\Http\Request;

class RootInfosController extends Controller
{
    public function __construct(){
        $this->model = RootInfo::class;
        $this->select = ["id","type", "info"];

    }
    public function changeGeneration(Request $request){
        AutoGen::setGenerate($request->generate);
        ShootTime::setTime($request->frequency);
        return [
            "frequency" => ShootTime::getTime(),
            "generate" => AutoGen::getGenerate(),
        ];
    }
    public function getGeneration(){
        return [
            "frequency" => ShootTime::getTime(),
            "generate" => AutoGen::getGenerate(),
        ];
    }
}

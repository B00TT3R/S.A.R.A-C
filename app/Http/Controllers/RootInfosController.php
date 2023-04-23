<?php

namespace App\Http\Controllers;

use App\Models\RootInfo;
use Illuminate\Http\Request;

class RootInfosController extends Controller
{
    public function index(Request $request){
        $rootInfos = RootInfo::orderBy($request->orderBy, $request->order)->select("id","type", "info")->paginate(10);
        return $rootInfos;
    }
    public function show($id){
        return RootInfo::find($id);
    }
}

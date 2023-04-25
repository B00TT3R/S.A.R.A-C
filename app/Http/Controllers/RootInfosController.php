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
    public function create(Request $request){
        RootInfo::create($request->all());
    }
    public function destroy($id){
        RootInfo::destroy($id);
    }
    public function update($id, Request $request){
        RootInfo::find($id)->update($request->all());
    }
}

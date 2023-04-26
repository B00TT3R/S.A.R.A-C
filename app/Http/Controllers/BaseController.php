<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    protected $model;
    protected $select;

    public function index(Request $request){
        $register = $this->model::orderBy($request->orderBy, $request->order)->select($this->select)->paginate(10);
        return $register;
    }
    public function show($id){
        $error = $this->model::findOrFail($id);
        return $error;
    }
    public function create(Request $request){
        $this->model::create($request->all());
    }
    public function destroy($id){
        $this->model::destroy($id);
    }
    public function update($id, Request $request){
        $this->model::find($id)->update($request->all());
    }
}

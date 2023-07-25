<?php

namespace App\Http\Controllers;

use App\Models\RootInfo;
use App\Models\Topic;
use Illuminate\Http\Request;

class TopicsController extends Controller
{
    public function __construct(){
        $this->model = Topic::class;

    }
    
    public function index(Request $request)
    {
        return Topic::filteredAll();
    }

    public function showRegister($id, Request $request){
        $topic = Topic::findOrFail($id);
        $register = $topic->root_infos()->orderBy($request->orderBy, $request->order)->paginate(10);
        return $register;
    }

    public function createRootInfo(Request $request, $id){
        $topic = Topic::findOrFail($id);
        $topic->root_infos()->create([
            "topic_id" => $id,
            ...$request->all(),
        ]);
    }

    public function updateRootInfo(Request $request, $infoid){
        $topic = Topic::findOrFail($request->topic_id);
        $topic->root_infos()->find($infoid)->update($request->all());
    }
}
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

    public function showRootInfo($id, $infoid){
        $topic = Topic::findOrFail($id);
        $register = $topic->root_infos()->findOrFail($infoid);
        return $register;
    }

    public function updateRootInfo(Request $request, $id, $infoid){
        $topic = Topic::findOrFail($id);
        $topic->root_infos()->findOrFail($infoid)->update($request->all());
    }

    public function destroyRootInfo($id, $infoid){
        $topic = Topic::findOrFail($id);
        $topic->root_infos()->findOrFail($infoid)->delete();
    }

    public function updateName(Request $request, $id){
        $topic = Topic::findOrFail($id);
        $topic->name = $request->name;
        $topic->save();
    }
}

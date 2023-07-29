<?php

namespace App\Http\Controllers;

use App\Models\RootInfo;
use App\Models\Topic;
use App\Models\TopicTimer;
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

    public function getPosts(Request $request, $id){
        $topic = Topic::findOrFail($id);
        $register = $topic->posts()->orderBy($request->orderBy, $request->order)->paginate(10);
        return $register;        
    }

    public function destroyPost($id,$postid){
        $topic = Topic::findOrFail($id);
        $post = $topic->posts()->findOrFail($postid);
        FacebookController::deletePost($post);
        $post->delete();
    }

    public function showPost($id,$postid){
        $topic = Topic::findOrFail($id);
        $post = $topic->posts()->findOrFail($postid);
        return $post;
    }

    public function instantGeneration($id){
        ScheduleController::fullGeneration(Topic::findOrFail($id));
        return "Post lançado";
    }

    public function getGeneration(Request $request, $id){
        $topic = Topic::findOrFail($id);
        $registers = $topic->generations()->orderBy($request->orderBy, $request->order)->paginate(10);
        return $registers;
    }

    public function showGeneration($id, $generationid){
        $topic = Topic::findOrFail($id);
        return($topic->generations()->findOrFail($generationid));
    }
    
    public function showAutoGeneration($id){
        $topic = Topic::findOrFail($id);
        return [
            "generate" => $topic->auto_gen,
            "frequency" => $topic->time,
        ];
    }
    
    public function setAutoGeneration(Request $request, $id){
        $topic = Topic::findOrFail($id);
        $topic->update([
            "time" => $request->frequency,
            "auto_gen" => $request->generate,
        ]);
        $topic->addNext();

        
    }

    public static function newTopic(){
        $function = [
            "name"=>"gerar_topico",
            "description" => "gera um tópico novo para noticias sobre",
            "parameters"=>[
                "type"=> "object",
                "properties" => [
                    "novo_topico" => [
                        "type" => "string",
                        "description" => "Tópico para gerar noticias sobre, um exemplo é \"Cangurus Mutantes\" ou \"Biotecnologia\", não pode ser um tópico que já exista"
                    ]
                ],
                "required"=>["novo_topico"]
            ],
        ];
        $messages = Topic::all()->pluck("name")->toArray();
        $messages = array_map(function ($message) {
            return GPTController::messageGenerator(
                prompt: "Tópico existente: ".$message
            );
        }, $messages);
        if(count($messages) == 0){
            $messages[] = GPTController::messageGenerator("sem tópicos ainda");
        }
        $newTopic = GPTController::chatCompletionGen(
            max_tokens:1024,
            type: "Geração de Tópico",
            functions: [$function],
            function_call:["name"=>"gerar_topico"],
            getFunction:true,
            messages:$messages,
            prompt: "Gere um novo tópico para criar noticias sobre ele:",
            temperature:1
            
        );        
        Topic::create([
            "name" =>  json_decode($newTopic[0]->arguments)->novo_topico
        ]);
    }

    public function updateAutogen(Request $request){
        $timer = TopicTimer::getInstance();
        $timer->update([
            "auto_gen"=> $request->generate,
            "time" => $request->frequency
        ]);
    }

    public function getAutogen(){
        return TopicTimer::getInstance();
    }
}

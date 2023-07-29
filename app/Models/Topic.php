<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Topic extends Model
{
    use HasFactory;
    protected $fillable = ["name", "auto_gen", "time", "next"];
    protected $casts = [
        'next' => 'datetime',
    ];

    public function root_infos(){
        return $this->hasMany(RootInfo::class);
    }

    public function generations(){
        return $this->hasMany(Generation::class);
    }

    public function posts(){
        return $this->hasMany(Post::class);
    }
    
    public function count_root_infos()
    {
        $types = ['textinfo', 'text', 'image'];
        $counts = [];
        foreach ($types as $type) {
            $counts[$type] = 0;
        }
        $rootInfos = $this->root_infos;
        foreach ($rootInfos as $rootInfo) {
            if (in_array($rootInfo->type, $types)) {
                $counts[$rootInfo->type]++;
            }
        }
        $counts['total'] = $this->posts()->count();
        return $counts;
    }

    public static function allCounted($columns = ['*'])
    {
        $topics = parent::all($columns);
        foreach ($topics as $topic){
            $topic->infos = $topic->count_root_infos();
        }
        return $topics;
    }

    public static function filteredAll($columns = ['*']){
        $topics = self::allCounted($columns);
        foreach ($topics as $topic){
            unset($topic->root_infos);
        }
        return $topics;
    }

    public static function messageGenerator(
        string $prompt,
        string $role = "system"
    )
    {
        return [
            "role" => $role,
            "content" => $prompt,
        ];
    }

    public function formatRootInfosToMessages(){
        $textStyles = $this->root_infos->where('type', "text")->pluck('info')->toArray();
        $infos = $this->root_infos->where('type', "textinfo")->pluck('info')->toArray();
        $styleArray = [];
        $infoArray = [];
        foreach($textStyles as $style){
            $styleArray[] = self::messageGenerator("Use o seguinte estilo de escrita: ".$style);
        };
        foreach($infos as $info){
            $infoArray[] = self::messageGenerator("Considere a seguinte informação: ".$info);
        }
        return [
            ...$styleArray,
            ...$infoArray,
        ];
    }

    public function formatRootInfosToImage(string $prompt){
        $infos = $this->root_infos("type", "image")->pluck("info")->toArray();
        if(count($infos) == 0)
            return $prompt;
        $formattedString = implode(', \n ', $infos);
        return "$prompt,  \n Estilos: $formattedString";
    }

    public function formatImageRootInfosToMessages(){
        $styles = $this->root_infos->where("type", "image")->pluck("info")->toArray();
        $styleArray = [];
        foreach($styles as $style){
            $styleArray[] = self::messageGenerator("Considere a seguinte estilo desejado: ".$style);
        }
        return $styleArray;
    }

    public function addNext(){
        if(!$this->next){
            $this->next = now();
        }
        $this->update([
            "next" => $this->next->addMinutes($this->time)
        ]);
    }

    public function resetTimer(){
        $this->next = now()->toDateTimeString();
        $this->save();
        return $this->next;
    }

    public static function boot()
    {
        parent::boot();
        static::creating(function ($model) {
            $user = Auth::user();
            if($user)
                $model->user_id = $user->id;
        });
    }

}

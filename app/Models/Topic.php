<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    use HasFactory;
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

    public static function all($columns = ['*'])
    {
        $topics = parent::all($columns);
        foreach ($topics as $topic){
            $topic->infos = $topic->count_root_infos();
        }
        return $topics;
    }

    public static function filteredAll($columns = ['*']){
        $topics = self::all($columns);
        foreach ($topics as $topic){
            unset($topic->root_infos);
        }
        return $topics;
    }

}

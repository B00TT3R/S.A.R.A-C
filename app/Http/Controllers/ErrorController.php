<?php

namespace App\Http\Controllers;

use App\Models\Errors;
use Illuminate\Http\Request;

class ErrorController extends Controller
{
    //
    public function errorCount(){
        $errors = Errors::all();
        $count = $errors->count();
        $types = $errors->pluck("type");
        $typeList = [];
        foreach($types as $type){            
            $typeList[$type] = $errors->where("type", $type)->count();

        }
        
        return [
            "total" => $count,
            "types" => $typeList
            
        ];
    }
}

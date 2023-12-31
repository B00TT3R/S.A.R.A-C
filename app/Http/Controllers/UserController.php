<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
    public function __construct()
    {
        $this->model = User::class;
        $this->select = ["id","name", "email"];
    }
    public function login(Request $request){
        $user = User::where('email', $request->email)->first();
        if($user != null){
            if(Hash::check($request->password, $user->password)){
                $token = $user->createToken('userToken', $user->permissions)->plainTextToken;
                return [
                    'token'=>$token,
                    ...$user->toArray()
                ];
            }
            return response(["message" =>"Email ou senha incorretos"], 401);
        }
            return response(["message" =>"Email ou senha incorretos"], 401);
    }
    
    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();
        return ['message' => 'Successfully logged out'];
    }
   

}

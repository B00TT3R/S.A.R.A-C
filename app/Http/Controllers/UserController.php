<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class UserController extends Controller
{
    public function login(Request $request){
        $user = User::where('email', $request->email)->first();
        if($user != null){
            if(Hash::check($request->password, $user->password)){
                $token = $user->createToken('userToken')->plainTextToken;
                return [
                    'token'=>$token,
                    'user'=>$user->name
                ];
            }
        }
        
        else{
            return response(["message" =>"Email ou senha incorretos"], 401);
        }
    }
    
    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }


}

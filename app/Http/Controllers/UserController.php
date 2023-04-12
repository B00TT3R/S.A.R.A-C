<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function login(Request $request){
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $user = User::where('email', $request->email)->first();
            $token = $user->createToken('userToken')->plainTextToken;
            return $token;
        }
        
        else{
            return "tá tudo errado";
        }
    }
}

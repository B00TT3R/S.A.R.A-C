<?php

use App\Http\Controllers\ErrorController;
use App\Http\Controllers\FacebookController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\GPTController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("login", [UserController::class, "login"]);

Route::group(['middleware' => ['auth:sanctum', "api"]], function() {
    Route::get("errorCount", [ErrorController::class, "errorCount"]);
    Route::get("generationCount", [GPTController::class, "generationCount"]);
    Route::get("postCount", [PostsController::class, "postCount"]);
    
    Route::middleware(['auth:sanctum', 'abilities:errors'])->group(function () {
        Route::get('errors', [ErrorController::class, "getErrors"]);
        Route::get('errors/{id}', [ErrorController::class, "getError"]);
    });
    
    Route::middleware(['auth:sanctum', 'abilities:generations'])->group(function () {        
        Route::get('generations', [GPTController::class, "getGenerations"]);
        Route::get('generations/{id}', [GPTController::class, "getGeneration"]);
    });

    Route::middleware(['auth:sanctum', 'abilities:posts'])->group(function () {        
        Route::get('posts', [PostsController::class, "getPosts"]);
        Route::get('posts/{id}', [PostsController::class, "getPost"]);
        Route::post('getTitleResult', [FrontendController::class, "getTitleResult"]);
        Route::post('getImageResult', [FrontendController::class, "getImageResult"]);
        Route::post("createPost", [PostsController::class, "createPost"]);
    });

    Route::middleware(['auth:sanctum', 'abilities:view_users'])->group(function () {
        Route::get('users', [UserController::class, "getUsers"]);
        Route::get('users/{id}', [UserController::class, "getUser"]);
    });
    Route::middleware(['auth:sanctum', 'abilities:modify_users'])->group(function () {
        Route::post('users', [UserController::class, "createUser"]);
        //Route::get('users/{id}', [UserController::class, "getUser"]);
    });

    Route::post("logout", [UserController::class, "logout"]);
});

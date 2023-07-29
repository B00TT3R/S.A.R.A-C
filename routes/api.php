<?php

use App\Http\Controllers\ErrorController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\GPTController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\RootInfosController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TopicsController;
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

Route::post("login", [UserController::class, "login"]);

Route::group(['middleware' => ['auth:sanctum', "api"]], function() {
    Route::get("errorCount", [ErrorController::class, "errorCount"]);
    Route::get("generationCount", [GPTController::class, "generationCount"]);
    Route::get("postCount", [PostsController::class, "postCount"]);
    
    Route::middleware(['auth:sanctum', 'abilities:errors'])->group(function () {
        Route::get('errors', [ErrorController::class, "index"]);
        Route::get('errors/{id}', [ErrorController::class, "show"]);
    });
    
    Route::middleware(['auth:sanctum', 'abilities:generations'])->group(function () {        
        Route::get('generations', [GPTController::class, "index"]);
        Route::get('generations/{id}', [GPTController::class, "show"]);
    });

    Route::get('posts/last', [PostsController::class, "lastPost"]);
    Route::middleware(['auth:sanctum', 'abilities:posts'])->group(function () {        
        Route::get('posts', [PostsController::class, "index"]);
        Route::get('posts/{id}', [PostsController::class, "show"]);
        Route::delete('posts/{id}', [PostsController::class, "destroy"]);
        Route::post("createPost", [PostsController::class, "create"]);
        Route::post('getTitleResult', [FrontendController::class, "getTitleResult"]);
        Route::post('getImageResult', [FrontendController::class, "getImageResult"]);
    });

    Route::middleware(['auth:sanctum', 'abilities:view_users'])->group(function () {
        Route::get('users', [UserController::class, "index"]);
        Route::get('users/{id}', [UserController::class, "show"]);
    });

    Route::middleware(['auth:sanctum', 'abilities:modify_users'])->group(function () {
        Route::post('users', [UserController::class, "create"]);
        Route::delete('users/{id}', [UserController::class, "destroy"]);
        Route::put('users/{id}', [UserController::class, "update"]);
    });
    
    Route::middleware(['auth:sanctum', 'abilities:topics'])->group(function () {
        Route::get('topics/autogen', [TopicsController::class, "getAutogen"]);
        Route::patch('topics/autogen', [TopicsController::class, "updateAutogen"]);
        Route::get('topics', [TopicsController::class, "index"]);
        Route::post('topics', [TopicsController::class, "create"]);
        Route::get('topics/{id}', [TopicsController::class, "showRegister"]);
        Route::patch('topics/{id}', [TopicsController::class, "updateName"]);
        Route::get('topics/raw/{id}', [TopicsController::class, "show"]);
        Route::delete("topics/{id}", [TopicsController::class, "destroy"]);
        Route::post('topics/{id}/info', [TopicsController::class, "createRootInfo"]);
        Route::put('topics/{id}/info/{infoid}', [TopicsController::class, "updateRootInfo"]);
        Route::get('topics/{id}/info/{infoid}', [TopicsController::class, "showRootInfo"]);
        Route::delete('topics/{id}/info/{infoid}', [TopicsController::class, "destroyRootInfo"]);
        Route::get("topics/{id}/post", [TopicsController::class, "getPosts"]);
        Route::post("topics/{id}/post/shoot", [TopicsController::class, "instantGeneration"]);
        Route::delete('topics/{id}/post/{postid}', [TopicsController::class, "destroyPost"]);
        Route::get('topics/{id}/post/{postid}', [TopicsController::class, "showPost"]);
        Route::get("topics/{id}/generation", [TopicsController::class, "getGeneration"]);
        Route::get("topics/{id}/generation/{generationid}", [TopicsController::class, "showGeneration"]);
        Route::get("topics/{id}/autogen", [TopicsController::class, "showAutoGeneration"]);
        Route::patch("topics/{id}/autogen", [TopicsController::class, "setAutoGeneration"]);
    });
    
    Route::post("logout", [UserController::class, "logout"]);
});

<?php

use App\Http\Controllers\ErrorController;
use App\Http\Controllers\FrontendController;
use App\Http\Controllers\GPTController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\RootInfosController;
use App\Http\Controllers\UserController;
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

    Route::middleware(['auth:sanctum', 'abilities:posts'])->group(function () {        
        Route::get('posts', [PostsController::class, "index"]);
        Route::get('posts/{id}', [PostsController::class, "show"]);
        Route::post("createPost", [PostsController::class, "create"]); // mudar o nome da rota depois
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
        Route::post('users/{id}', [UserController::class, "update"]);
    });
    Route::middleware(['auth:sanctum', 'abilities:root_infos'])->group(function () {
        Route::post('rootInfos/autogen', [RootInfosController::class, "changeGeneration"]);
        Route::get("rootInfos/autogen", [RootInfosController::class, "getGeneration"]);

        Route::get('rootInfos', [RootInfosController::class, "index"]);
        Route::get('rootInfos/{id}', [RootInfosController::class, "show"]);
        Route::delete('rootInfos/{id}', [RootInfosController::class, "destroy"]);
        Route::post('rootInfos/', [RootInfosController::class, "create"]);
        Route::post('rootInfos/{id}', [RootInfosController::class, "update"]);
    });

    Route::post("logout", [UserController::class, "logout"]);
});

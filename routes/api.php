<?php

use App\Http\Controllers\ErrorController;
use App\Http\Controllers\GPTController;
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
    
    Route::get('errors', [ErrorController::class, "getErrors"]);
    Route::get('errors/{id}', [ErrorController::class, "getError"]);
    
    Route::get('generations', [GPTController::class, "getGenerations"]);
    Route::get('generations/{id}', [GPTController::class, "getGeneration"]);

    Route::post("logout", [UserController::class, "logout"]);

});

<?php

use App\Http\Controllers\ErrorController;
use App\Http\Controllers\GPTController;
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
Route::get("errorCount", [ErrorController::class, "errorCount"]);
Route::get("generationCount", [GPTController::class, "generationCount"]);

Route::get('errors', [ErrorController::class, "getErrors"]);
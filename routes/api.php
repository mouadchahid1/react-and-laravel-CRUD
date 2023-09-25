<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\TaskController;
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
Route::get("/categories",[CategoryController::class,"index"]);
Route::get("/tasks",[TaskController::class,"index"]); 
Route::post("tasks",[TaskController::class,"store"]) ; 
Route::patch("/tasks/{task}",[TaskController::class, "update"]) ; 
Route::delete("/tasks/{task}",[TaskController::class,"destroy"]) ; 
Route::get("/tasks/{task}",[TaskController::class,"show"]) ; 
Route::get("category/{category}/tasks",[TaskController::class,"getTaskByCategory"]); 
Route::get("order/{column}/{direction}/tasks",[TaskController::class,"getTaskOrderBy"]) ; 
Route::get("search/{term}/tasks",[TaskController::class,"getTaskByTerm"]) ;  


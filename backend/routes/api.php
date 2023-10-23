<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\OwnerController;
use App\Http\Controllers\RaceController;
use App\Http\Controllers\SpecieController;
use App\Http\Controllers\VetController;
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

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', [AuthController::class,'login']);
    Route::post('logout', [AuthController::class,'logout']);
    Route::post('refresh', [AuthController::class,'refresh']);
    Route::post('me', [AuthController::class,'me']);
});

Route::group([
    "middleware" => 'jwt.auth'
],function ($router){
    Route::resource("species", SpecieController::class);
    Route::resource("owners", OwnerController::class);
    Route::resource("races", RaceController::class);
    // Route::resource("vets", VetController::class);
});

// Deixei fora da autenticação pra testar
Route::resource("vets", VetController::class);
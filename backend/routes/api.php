<?php

use App\Http\Controllers\AnimalController;
use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\AppointmentStatusController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CashflowController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\OwnerController;
use App\Http\Controllers\PackageController;
use App\Http\Controllers\RaceController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ServiceTypeController;
use App\Http\Controllers\SpecieController;
use App\Http\Controllers\SupplierController;
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
    'prefix' => 'auth',
], function ($router) {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::post('me', [AuthController::class, 'me']);
});

Route::group([
    "middleware" => 'jwt.auth',
], function ($router) {
//    Route::resource("species", SpecieController::class);
//    Route::resource("owners", OwnerController::class);
//    Route::resource("races", RaceController::class);
    // Route::resource("vets", VetController::class);
//    Route::resource("animals", AnimalController::class);

});

// Deixei fora da autenticação pra testar
Route::get('by-day-appointments', [AppointmentController::class, 'getByDayAppointments']);
Route::get('races-by-specie/{specie_id}', [RaceController::class, 'showRacesBySpecie']);
Route::get('by-day-appointments', [AppointmentController::class, 'getByDayAppointments']);
Route::get('by-day-cashflows', [CashflowController::class, 'getByDayCashflows']);
Route::resource("owners", OwnerController::class);
Route::resource("species", SpecieController::class);
Route::resource("cashflows", CashflowController::class);
Route::resource("races", RaceController::class);
Route::resource("vets", VetController::class);
Route::resource("medicines", MedicineController::class);
Route::resource("service-types", ServiceTypeController::class);
Route::resource("suppliers", SupplierController::class);
Route::resource("animals", AnimalController::class);
Route::resource("services", ServiceController::class);
Route::resource("packages", PackageController::class);
Route::resource("appointments", AppointmentController::class);
Route::resource("appointments-statuses", AppointmentStatusController::class);

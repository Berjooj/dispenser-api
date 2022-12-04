<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/dispenser', [\App\Http\Controllers\DispenserController::class, 'store']);
Route::get('/dispenser/{companyId}', [\App\Http\Controllers\DispenserController::class, 'index']);
Route::get('/dispenser/list/{companyId}', [\App\Http\Controllers\DispenserController::class, 'show']);

Route::post('/flow', [\App\Http\Controllers\FlowController::class, 'store']);

Route::get('/companies', [\App\Http\Controllers\CompanyController::class, 'index']);
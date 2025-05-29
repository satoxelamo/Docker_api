<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\controllerConsultasSave;
use App\Http\Controllers\controllerEstadisticaGet;
use App\Http\Controllers\controllerConsultasGet;

Route::apiResource('/consultas', controllerConsultasSave::class);
    

Route::post ('/consultas', [controllerConsultasSave::class, 'consultapost']); 


Route::get('/consultas', controllerConsultasGet::class, '__invoke');


Route::get('/estadisticas', controllerEstadisticaGet::class, '__invoke');
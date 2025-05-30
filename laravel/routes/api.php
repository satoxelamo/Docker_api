<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\controllerConsultasSave;
use App\Http\Controllers\controllerEstadisticaGet;
use App\Http\Controllers\controllerConsultasGet;

/**
 * API Routes
 * 
 * Define las rutas de la API para manejar consultas y estadísticas.
 * Utiliza controladores para manejar las solicitudes HTTP.
 */

Route::apiResource('/consultas', controllerConsultasSave::class);
    

Route::post ('/api/consultas', [controllerConsultasSave::class, 'consultapost']); 


Route::get('/api/consultas', controllerConsultasGet::class, '__invoke');


Route::get('/api/estadisticas', controllerEstadisticaGet::class, '__invoke');
<?php
/**
 * * controllerConsultasGet.php
 * * Este archivo es parte de la aplicación Laravel.
 * * Define un controlador que maneja solicitudes HTTP para obtener todos los registros del modelo 'consultas'.
 * * El controlador retorna los datos en formato JSON.
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\consultas;

class controllerConsultasGet extends Controller
{
    public function __invoke()
    {
        return response()->json(consultas::all());
    }

    #hola
}

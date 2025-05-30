<?php
/**
 * * controllerConsultasGet.php
 * * Este archivo es parte de la aplicación Laravel.
 * * Define un controlador que maneja solicitudes HTTP para guardar un nuevo registro en el modelo 'consultas'.
 * * El controlador valida la solicitud y guarda los datos en la base de datos.
 * * Retorna una respuesta JSON con un mensaje de éxito y los datos guardados.
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\consultas;
use Illuminate\Http\JsonResponse;

/**
 * Class controllerConsultasSave
 * Este controlador maneja la creación de nuevas consultas.
 * toma los datos de la solicitud, valida la entrada y guarda un nuevo registro en la base de datos.
 * tiene la función consultaPost que se encarga de procesar la solicitud POST.
 */
class controllerConsultasSave extends Controller
{
    function consultaPost(Request $request):JsonResponse{
        $request->validate([
            'tipo' => 'required|string|max:255',
            'parametro' => 'required|string|max:255',
        ]);

        $consulta = consultas::create([
            'tipo' => $request->input('tipo'),
            'parametro' => $request->input('parametro'),
            'fechaHora' => now('Europe/Madrid')->format('Y-m-d H:i:s'),
            'ipAddress' => $request->ip(),
        ]);

        return response()->json([
            'message' => 'Consulta created successfully',
            'data' => $consulta
        ], 201);
    }
}

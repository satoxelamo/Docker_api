<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\consultas;
use Illuminate\Http\JsonResponse;


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

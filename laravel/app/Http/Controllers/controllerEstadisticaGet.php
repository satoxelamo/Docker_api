<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Models\consultas;

class controllerEstadisticaGet extends Controller
{
    public function __invoke()
    {
        return response()->json([
            'total_por_tipo' => consultas::select('tipo', DB::raw('count(*) as total'))->groupBy('tipo')->get(),
            'mas_consultado' => consultas::select('parametro', DB::raw('count(*) as total'))
                ->whereNotNull('parametro')
                ->groupBy('parametro')
                ->orderByDesc('total')
                ->first(),
            'por_dia' => consultas::select(DB::raw('DATE(fechaHora) as dia'), DB::raw('count(*) as total'))
                ->groupBy('dia')
                ->orderBy('dia')
                ->get()
        ]);
    }
}

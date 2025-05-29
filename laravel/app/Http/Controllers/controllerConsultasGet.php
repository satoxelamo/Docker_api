<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\consultas;

class controllerConsultasGet extends Controller
{
    public function __invoke()
    {
        return response()->json(consultas::all());
    }
}

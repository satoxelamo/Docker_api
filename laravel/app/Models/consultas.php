<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class consultas
 * Este modelo representa la tabla 'consultas' en la base de datos.
 * Define los campos que pueden ser llenados masivamente y la tabla asociada.
 */
class consultas extends Model
{
    protected $table = 'consultas';

    protected $fillable = [
        'tipo',
        'parametro',
        'fechaHora',
        'ipAddress'
    ];

    //public $timestamps = false;
}
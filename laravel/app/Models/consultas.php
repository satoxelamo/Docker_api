<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

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
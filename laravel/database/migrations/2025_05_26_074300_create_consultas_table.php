<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migración para crear la tabla 'consultas'.
 * Esta migración define la estructura de la tabla 'consultas' en la base de datos.
 * Incluye los campos 'tipo', 'parametro', 'fechaHora' y 'ipAddress'.
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     * Crea la tabla 'consultas' con los campos necesarios.
     * - 'tipo': tipo de consulta (string).
     * - 'parametro': parámetro de la consulta (string).
     * - 'fechaHora': fecha y hora de la consulta (dateTime).
     * - 'ipAddress': dirección IP desde donde se realizó la consulta (string).
     * - Timestamps: campos de creación y actualización automáticos.
     */
    public function up(): void
    {
        Schema::create('consultas', function (Blueprint $table) {
            $table->id();
            $table->string('tipo');
            $table->string('parametro');
            $table->dateTime('fechaHora');
            $table->string('ipAddress');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consultas');
    }
};

<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // === MODIFIKASI: Nama tabel diganti menjadi 'majors' ===
        Schema::create('majors', function (Blueprint $table) {
        // ====================================================
            $table->id(); // Primary Key (BIGSERIAL di PostgreSQL)
            $table->string('nama_jurusan')->unique(); // Nama Jurusan (kolom ini bisa tetap Bahasa Indonesia atau diganti juga, misal 'name')
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // === MODIFIKASI: Nama tabel di dropIfExists diganti menjadi 'majors' ===
        Schema::dropIfExists('majors');
        // ==================================================================
    }
};
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
        // === MODIFIKASI: Nama tabel diganti menjadi 'academic_years' ===
        Schema::create('academic_years', function (Blueprint $table) {
        // ============================================================
            $table->id(); // Primary Key (BIGSERIAL)
            $table->integer('tahun_mulai'); // Bisa tetap Bahasa Indonesia atau diganti 'start_year'
            $table->integer('tahun_selesai'); // Bisa tetap Bahasa Indonesia atau diganti 'end_year'
            $table->string('nama_tahun_ajaran')->unique(); // Bisa tetap Bahasa Indonesia atau diganti 'name'
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // === MODIFIKASI: Nama tabel di dropIfExists diganti menjadi 'academic_years' ===
        Schema::dropIfExists('academic_years');
        // ========================================================================
    }
};
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
        // === MODIFIKASI: Nama tabel diganti menjadi 'classes' ===
        Schema::create('classes', function (Blueprint $table) {
        // =====================================================
            $table->id(); // Primary Key (BIGSERIAL)
            $table->string('nama_kelas')->unique(); // Nama Kelas (kolom ini bisa tetap Bahasa Indonesia atau diganti, misal 'name')

            // === MODIFIKASI: Foreign Key merujuk ke tabel 'majors' ===
            // === MODIFIKASI: Nama kolom foreign key diganti menjadi 'major_id' (lebih konsisten) ===
            $table->foreignId('major_id')->constrained('majors')->cascadeOnDelete();
            // ================================================================================

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // === MODIFIKASI: Nama tabel di dropIfExists diganti menjadi 'classes' ===
        Schema::dropIfExists('classes');
        // ===================================================================
    }
};
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
        Schema::create('semesters', function (Blueprint $table) {
            $table->id();
            $table->string('nama_semester'); // Misal: 'Ganjil', 'Genap'

            // === Tambahkan Foreign Key ke tabel academic_years ===
            $table->foreignId('tahun_ajaran_id')
                  ->constrained('academic_years') // Merujuk ke tabel 'academic_years'
                  ->cascadeOnDelete(); // Jika tahun ajaran dihapus, semester terkait juga dihapus
            // ====================================================

            // === Tambahkan Kolom is_active ===
            $table->boolean('is_active')->default(false); // Kolom boolean, default false
            // ===============================

            $table->timestamps();

            // === Tambahkan unique constraint kombinasi nama_semester dan tahun_ajaran_id ===
            // Ini mencegah adanya dua semester 'Ganjil' atau 'Genap' dalam satu tahun ajaran yang sama
            $table->unique(['nama_semester', 'tahun_ajaran_id']);
            // =====================================================================================
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('semesters');
    }
};

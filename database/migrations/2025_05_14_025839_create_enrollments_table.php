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
        Schema::create('enrollments', function (Blueprint $table) {
            $table->id(); // Primary Key auto-increment (BIGSERIAL)

            // Foreign Key ke tabel students (menggunakan ID baru) - Tetap sama
            $table->foreignId('student_id')
                  ->constrained('students') // Merujuk ke tabel 'students'
                  ->cascadeOnDelete();

            // === MODIFIKASI: Foreign Keys merujuk ke nama tabel baru ===
            // === MODIFIKASI: Nama kolom foreign key juga diganti agar konsisten ===
            $table->foreignId('class_id')->constrained('classes')->cascadeOnDelete(); // Merujuk ke tabel 'classes'
            $table->foreignId('academic_year_id')->constrained('academic_years')->cascadeOnDelete(); // Merujuk ke tabel 'academic_years'
            $table->foreignId('semester_id')->constrained('semesters')->cascadeOnDelete(); // Merujuk ke tabel 'semesters' (nama tabel sudah benar)
            // ======================================================================

            // Nomor Absen untuk periode pendaftaran ini (Kolom bisa tetap atau diganti 'absence_number')
            $table->integer('no_absen')->nullable();

            $table->timestamps(); // created_at dan updated_at

            // === MODIFIKASI: Constraint UNIQUE menggunakan nama kolom foreign key yang baru ===
            // Constraint UNIQUE: Satu siswa hanya bisa punya satu record pendaftaran per tahun ajaran dan semester
            $table->unique(['student_id', 'academic_year_id', 'semester_id']);

            // Opsional: Constraint UNIQUE: Nomor absen unik di dalam satu kelas, tahun ajaran, dan semester
            // $table->unique(['class_id', 'academic_year_id', 'semester_id', 'no_absen']);
            // ================================================================================
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('enrollments');
    }
};
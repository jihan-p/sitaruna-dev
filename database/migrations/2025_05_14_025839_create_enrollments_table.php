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

            // Foreign Key ke tabel students
            $table->foreignId('student_id')
                  ->constrained('students') // Merujuk ke tabel 'students'
                  ->cascadeOnDelete();

            // Foreign Keys merujuk ke nama tabel baru dan nama kolom foreign key yang konsisten
            $table->foreignId('class_id')->constrained('classes')->cascadeOnDelete(); // Merujuk ke tabel 'classes'
            $table->foreignId('academic_year_id')->constrained('academic_years')->cascadeOnDelete(); // Merujuk ke tabel 'academic_years'
            $table->foreignId('semester_id')->constrained('semesters')->cascadeOnDelete(); // Merujuk ke tabel 'semesters'

            // Nomor Absen untuk periode pendaftaran ini
            $table->integer('no_absen')->nullable(); // Tetap nullable jika nomor absen tidak selalu ada saat pendaftaran awal

            $table->timestamps(); // created_at dan updated_at

            // Constraint UNIQUE: Satu siswa hanya bisa punya satu record pendaftaran per tahun ajaran dan semester
            $table->unique(['student_id', 'academic_year_id', 'semester_id']);

            // === MODIFIKASI: Tambahkan Constraint UNIQUE: Nomor absen unik di dalam satu kelas, tahun ajaran, dan semester ===
            // Ini memastikan tidak ada dua siswa di kelas yang sama pada periode yang sama memiliki nomor absen yang sama.
            // Kolom 'no_absen' harus tidak nullable jika constraint ini diaktifkan, atau pastikan aplikasi menangani null dengan baik.
            // Jika 'no_absen' bisa null, constraint ini tidak akan berlaku untuk baris dengan null.
            // Untuk memastikan uniqueness, pastikan 'no_absen' diisi saat pendaftaran atau update.
            $table->unique(['class_id', 'academic_year_id', 'semester_id', 'no_absen']);
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

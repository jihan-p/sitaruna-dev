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
        Schema::create('students', function (Blueprint $table) {
             // === MODIFIKASI: Tambahkan kolom 'id' sebagai Primary Key ===
             $table->id(); // Primary Key auto-increment (BIGSERIAL di PostgreSQL)
             // ==========================================================
             // Data Identitas dan Kontak Pribadi
             // === MODIFIKASI: NISN sekarang UNIQUE, bukan Primary Key ===
             $table->string('nisn')->unique()->nullable(); // NISN (VARCHAR, unique)
             // ========================================================
             $table->string('nit')->unique()->nullable(); // Nomor Induk Taruna/Siswa (unique, nullable)
             $table->string('nama_lengkap'); // Nama Lengkap (NOT NULL by default)
             $table->char('jenis_kelamin', 1)->nullable(); // Jenis Kelamin (L/P)
             $table->string('tempat_lahir')->nullable(); // Tempat Lahir
             $table->date('tanggal_lahir')->nullable(); // Tanggal Lahir
             $table->string('agama', 50)->nullable(); // Agama
             $table->string('no_hp', 50)->nullable(); // Nomor HP
             $table->string('email')->unique()->nullable(); // Email (unique, nullable)
             $table->text('alamat')->nullable(); // Alamat
             $table->string('status_akun', 50)->nullable(); // Status Akun
             $table->string('foto_profil')->nullable(); // Foto Profil path/URL
              // Foreign Key ke tabel users (untuk akun login) - Tidak Berubah
             $table->foreignId('user_id')->nullable()->unique()->constrained('users')->nullOnDelete();
              $table->timestamps(); // created_at dan updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};

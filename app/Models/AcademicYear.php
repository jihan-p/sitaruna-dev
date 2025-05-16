<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AcademicYear extends Model
{
    use HasFactory;

    // === Konfigurasi Nama Tabel ===
    // Secara default, Eloquent akan menggunakan nama tabel 'academic_years'
    // (bentuk plural snake_case dari nama model 'AcademicYear').
    // Jadi, baris ini sebenarnya opsional jika nama tabel sesuai konvensi,
    // tapi baik untuk eksplisitas.
    protected $table = 'academic_years';
    // ============================

    // === Kolom yang Diizinkan Mass Assignment ===
    // Definisikan kolom-kolom yang bisa diisi saat menggunakan metode create() atau update()
    protected $fillable = [
        'tahun_mulai',
        'tahun_selesai',
        'nama_tahun_ajaran',
    ];
    // =========================================

    // === Casting Atribut (Opsional) ===
    // Jika ada kolom yang perlu di-cast ke tipe data tertentu (misal: array, boolean, datetime, dll.)
    // protected $casts = [
    //     'email_verified_at' => 'datetime',
    //     'password' => 'hashed',
    // ];
    // =================================

    // === Relasi (Opsional, akan ditambahkan nanti jika perlu) ===
    // Contoh: Relasi one-to-many ke tabel enrollments jika ada foreign key academic_year_id di tabel enrollments
    // public function enrollments()
    // {
    //     return $this->hasMany(Enrollment::class);
    // }
    // =========================================================
}
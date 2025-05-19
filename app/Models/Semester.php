<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    use HasFactory;

    // === Konfigurasi Nama Tabel ===
    // Secara default, Eloquent akan menggunakan nama tabel 'semesters'.
    // Baris ini opsional jika nama tabel sesuai konvensi.
    protected $table = 'semesters';
    // ============================

    // === Kolom yang Diizinkan Mass Assignment ===
    // Definisikan kolom-kolom yang bisa diisi saat menggunakan metode create() atau update()
    // === SESUAIKAN DENGAN KOLOM DI TABEL MIGRASI SEMESTERS ANDA ===
    protected $fillable = [
        'nama_semester',      // Contoh: 'Ganjil', 'Genap', 'Pendek'
        'tahun_ajaran_id',    // Foreign key ke tabel academic_years
        'is_active',          // Contoh: boolean untuk menandai semester aktif
        // Tambahkan kolom lain jika ada di migrasi Anda
    ];
    // ============================================================

    // === Casting Atribut (Opsional) ===
    // Contoh: Cast kolom boolean
    protected $casts = [
        'is_active' => 'boolean',
    ];
    // =================================

    // === Relasi (Opsional, tapi penting untuk foreign key) ===
    // Relasi many-to-one ke Model AcademicYear
    public function academicYear()
    {
        // Pastikan nama foreign key 'tahun_ajaran_id' sesuai dengan di tabel semesters
        return $this->belongsTo(AcademicYear::class, 'tahun_ajaran_id');
    }
    // =========================================================

    // === Scope Lokal (Opsional) ===
    // Contoh: Scope untuk mendapatkan semester yang aktif
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
    // ==============================
}
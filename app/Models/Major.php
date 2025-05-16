<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Major extends Model // Nama Model 'Major' sesuai dengan konvensi Laravel
{
    use HasFactory;

    // Laravel akan otomatis menganggap nama tabel adalah 'majors' (plural dari 'Major')
    // Jadi, baris berikut TIDAK diperlukan kecuali nama tabel Anda berbeda dari konvensi:
    // protected $table = 'majors';

    // === Definisikan kolom yang boleh diisi massal sesuai migrasi ===
    protected $fillable = [
        'nama_jurusan', // Menggunakan nama kolom sesuai migrasi Anda
    ];

    // === Definisikan relasi di sini jika dibutuhkan nanti ===
    // Misal, relasi ke tabel 'classes' karena setiap major bisa punya banyak classes
    public function classes()
    {
        // major_id adalah foreign key di tabel 'classes' yang merujuk ke tabel 'majors'
        // ClassModel digunakan jika nama model Anda untuk kelas adalah ClassModel
        return $this->hasMany(ClassModel::class, 'major_id');
    }

    // Tambahkan relasi lain jika ada
}
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    protected $table = 'students';
    protected $primaryKey = 'id'; // Menggunakan 'id' sebagai primary key
    protected $keyType = 'int';
    public $incrementing = true;

    protected $fillable = [
        'nisn',
        'nit',
        'user_id',
        'nama_lengkap',
        'jenis_kelamin',
        'tempat_lahir',
        'tanggal_lahir',
        'agama',
        'no_hp',
        'email',
        'alamat',
        'status_akun',
        'foto_profil',
    ];

    protected $casts = [
        'tanggal_lahir' => 'date',
    ];

    // Relasi ke tabel users (jika setiap siswa punya akun login)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relasi ke tabel enrollments (untuk riwayat penempatan kelas/periode)
    public function enrollments(): HasMany
    {
        return $this->hasMany(Enrollment::class, 'student_id', 'id');
    }
}
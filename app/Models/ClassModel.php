<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassModel extends Model // Menggunakan 'Classes' karena 'Class' adalah reserved keyword
{
    use HasFactory;

    protected $table = 'classes'; // Menentukan nama tabel secara eksplisit

    protected $fillable = [
        'nama_kelas',
        'major_id',
    ];

    /**
     * Get the major that owns the class.
     * Mendefinisikan relasi "many-to-one" ke model Major.
     */
    public function major()
    {
        return $this->belongsTo(Major::class, 'major_id');
    }
}

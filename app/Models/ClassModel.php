<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClassModel extends Model // Using 'ClassModel' because 'Class' is a reserved keyword in PHP
{
    use HasFactory;

    protected $table = 'classes'; // Explicitly define the table name

    protected $fillable = [
        'nama_kelas',
        'major_id',
    ];

    /**
     * Get the major that owns the class.
     * Defines the "many-to-one" relationship to the Major model.
     */
    public function major()
    {
        return $this->belongsTo(Major::class, 'major_id');
    }
}

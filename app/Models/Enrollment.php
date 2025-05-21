<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    // Tentukan nama tabel jika tidak mengikuti konvensi Laravel (plural dari nama model)
    // protected $table = 'enrollments'; // Tidak perlu jika nama tabel sudah 'enrollments'

    // Tentukan kolom yang bisa diisi secara massal (mass assignable)
    protected $fillable = [
        'student_id',
        'class_id',
        'academic_year_id',
        'semester_id',
        'no_absen',
    ];

    /**
     * Get the student that owns the enrollment.
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the class that the enrollment belongs to.
     */
    public function class() // Perhatikan: 'class' adalah reserved keyword. Pertimbangkan 'classModel' atau 'schoolClass'
    {
        return $this->belongsTo(ClassModel::class, 'class_id'); // Menggunakan ClassModel karena 'Class' adalah reserved keyword
    }

    /**
     * Get the academic year that the enrollment belongs to.
     */
    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class, 'academic_year_id');
    }

    /**
     * Get the semester that the enrollment belongs to.
     */
    public function semester()
    {
        return $this->belongsTo(Semester::class, 'semester_id');
    }
}

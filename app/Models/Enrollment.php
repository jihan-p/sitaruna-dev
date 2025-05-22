<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $fillable = [
        'student_id',
        'class_id',
        'academic_year_id',
        'semester_id',
        'no_absen',
    ];

    /**
     * Get the student associated with the enrollment.
     */
    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the class associated with the enrollment.
     */
    public function class()
    {
        // Menggunakan 'class_id' sebagai foreign key
        // Dan mengacu pada model ClassModel karena 'Class' adalah reserved keyword
        return $this->belongsTo(ClassModel::class, 'class_id');
    }

    /**
     * Get the academic year associated with the enrollment.
     */
    public function academicYear()
    {
        return $this->belongsTo(AcademicYear::class);
    }

    /**
     * Get the semester associated with the enrollment.
     */
    public function semester()
    {
        return $this->belongsTo(Semester::class);
    }
}
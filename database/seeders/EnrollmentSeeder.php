<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\ClassModel; // Menggunakan alias ClassModel
use App\Models\AcademicYear;
use App\Models\Semester;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        echo "Seeding Enrollments...\n";

        // Pastikan ada data yang cukup di tabel lain sebelum membuat pendaftaran
        $students = Student::all();
        $classes = \App\Models\Class::all();
        $academicYears = AcademicYear::all();
        $semesters = Semester::all();

        if ($students->isEmpty() || $classes->isEmpty() || $academicYears->isEmpty() || $semesters->isEmpty()) {
            echo "Warning: Not enough data in Students, Classes, AcademicYears, or Semesters. Skipping Enrollment seeding.\n";
            return;
        }

        // Buat sejumlah pendaftaran dummy
        // Sesuaikan jumlahnya. Perlu diingat unique constraint di EnrollmentFactory
        // mungkin membuat proses ini lambat jika jumlah data sangat besar atau
        // kombinasi unik sulit ditemukan.
        Enrollment::factory()->count(100)->create(); // Contoh 100 pendaftaran

        echo "Finished seeding Enrollments.\n";
    }
}

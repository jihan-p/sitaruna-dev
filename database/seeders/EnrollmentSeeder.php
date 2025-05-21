<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\AcademicYear;
use App\Models\Semester;
use App\Models\ClassModel; // Pastikan ini ClassModel, sesuai nama model Anda
use Faker\Factory as Faker; // <<< TAMBAHKAN BARIS INI UNTUK MENGIMPOR FAKER

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        echo "Seeding Enrollments...\n";

        // Instansiasi Faker
        $faker = Faker::create(); // <<< TAMBAHKAN BARIS INI

        $students = Student::all();
        $academicYears = AcademicYear::all();
        $semesters = Semester::all();
        $classes = ClassModel::all(); // Mengambil semua kelas

        if ($students->isEmpty() || $academicYears->isEmpty() || $semesters->isEmpty() || $classes->isEmpty()) {
            echo "Warning: Missing prerequisite data for Enrollment seeding. Please seed Students, Classes, AcademicYears, and Semesters first.\n";
            return;
        }

        $seededCombinations = [];
        $maxEnrollments = 50; // Jumlah maksimal enrollment yang ingin Anda buat
        $currentEnrollments = 0;

        while ($currentEnrollments < $maxEnrollments) {
            $student = $students->random();
            $academicYear = $academicYears->random();

            // Penting: Pastikan semester ini terkait dengan tahun ajaran yang dipilih
            // Filter semester yang sesuai dengan tahun ajaran yang dipilih
            $availableSemesters = $semesters->where('tahun_ajaran_id', $academicYear->id);
            if ($availableSemesters->isEmpty()) {
                // Jika tidak ada semester untuk tahun ajaran ini, lanjutkan ke kombinasi berikutnya
                // Atau buat semester baru jika itu yang diinginkan
                echo "Warning: No semesters found for academic year ID: {$academicYear->id}. Skipping.\n";
                continue; // Lanjutkan ke iterasi berikutnya
            }
            $semester = $availableSemesters->random();
            $class = $classes->random();

            $combinationKey = "{$student->id}-{$academicYear->id}-{$semester->id}";

            if (!isset($seededCombinations[$combinationKey])) {
                try {
                    Enrollment::create([
                        'student_id' => $student->id,
                        'class_id' => $class->id,
                        'academic_year_id' => $academicYear->id,
                        'semester_id' => $semester->id,
                        'no_absen' => $faker->numberBetween(1, 50), // <<< GUNAKAN $faker DI SINI
                    ]);
                    $seededCombinations[$combinationKey] = true;
                    $currentEnrollments++;
                } catch (\Illuminate\Database\QueryException $e) {
                    if (str_contains($e->getMessage(), 'duplicate key value violates unique constraint')) {
                        echo "Skipping duplicate enrollment: Student ID: {$student->id}, Academic Year ID: {$academicYear->id}, Semester ID: {$semester->id}\n";
                    } else {
                        throw $e;
                    }
                }
            }
            if (count($seededCombinations) >= ($students->count() * $academicYears->count() * $semesters->count())) {
                 echo "All possible unique enrollment combinations might be exhausted.\n";
                 break;
            }
        }

        echo "Finished seeding Enrollments. Created {$currentEnrollments} unique enrollments.\n";
    }
}

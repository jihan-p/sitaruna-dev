<?php

namespace Database\Factories;

use App\Models\Enrollment;
use App\Models\Student;
use App\Models\ClassModel; // Menggunakan alias ClassModel
use App\Models\AcademicYear;
use App\Models\Semester;
use Illuminate\Database\Eloquent\Factories\Factory;

class EnrollmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Enrollment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Pastikan ada data yang diperlukan
        $student = Student::inRandomOrder()->first();
        $class = \App\Models\Class::inRandomOrder()->first(); // Menggunakan backslash
        $academicYear = AcademicYear::inRandomOrder()->first();
        $semester = Semester::inRandomOrder()->first();

        // Fallback jika tidak ada data, buat dummy
        if (!$student) {
            $student = Student::factory()->create();
        }
        if (!$class) {
            $class = \App\Models\Class::factory()->create();
        }
        if (!$academicYear) {
            $academicYear = AcademicYear::factory()->create();
        }
        if (!$semester) {
            // Pastikan semester dibuat dengan academic_year_id yang valid
            $semester = Semester::factory()->for($academicYear)->create();
        }


        // === Logika untuk menghasilkan no_absen yang unik dalam konteks ===
        // Ini adalah pendekatan sederhana. Untuk volume data yang sangat besar,
        // mungkin perlu logika yang lebih canggih untuk menghindari loop tak terbatas
        // jika kombinasi unik sangat sulit ditemukan.
        $noAbsen = null;
        $maxAttempts = 100; // Batasi percobaan
        $attempts = 0;

        do {
            $noAbsen = $this->faker->numberBetween(1, 40); // Nomor absen 1-40
            $attempts++;
            // Cek apakah kombinasi sudah ada
            $exists = Enrollment::where('class_id', $class->id)
                                ->where('academic_year_id', $academicYear->id)
                                ->where('semester_id', $semester->id)
                                ->where('no_absen', $noAbsen)
                                ->exists();
        } while ($exists && $attempts < $maxAttempts);

        if ($attempts >= $maxAttempts) {
            // Jika tidak dapat menemukan no_absen unik setelah banyak percobaan,
            // atur ke null atau berikan pesan peringatan.
            // Dalam produksi, ini menunjukkan masalah dengan data atau rentang no_absen.
            $noAbsen = null;
            // echo "Warning: Could not find a unique 'no_absen' for this enrollment context.\n";
        }
        // ==================================================================

        return [
            'student_id' => $student->id,
            'class_id' => $class->id,
            'academic_year_id' => $academicYear->id,
            'semester_id' => $semester->id,
            'no_absen' => $noAbsen,
        ];
    }
}

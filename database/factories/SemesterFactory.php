<?php

namespace Database\Factories;

use App\Models\Semester; // Import Model Semester
use App\Models\AcademicYear; // Import Model AcademicYear (untuk relasi)
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Semester>
 */
class SemesterFactory extends Factory
{
    /**
     * The name of the corresponding model.
     *
     * @var string
     */
    protected $model = Semester::class; // Pastikan modelnya Semester

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // === Logika untuk menghasilkan data dummy Semester ===

        // Ambil ID dari AcademicYear yang sudah ada di database
        // Jika tidak ada AcademicYear, ini akan menyebabkan error.
        // Pastikan Anda sudah menjalankan seeder AcademicYear sebelum menjalankan seeder Semester.
        $academicYearId = AcademicYear::pluck('id')->random();

        // Tentukan nama semester secara acak antara Ganjil atau Genap
        $semesterNames = ['Ganjil', 'Genap'];
        $namaSemester = $this->faker->randomElement($semesterNames);

        // Tentukan status aktif secara acak (misal: 10% kemungkinan aktif)
        $isActive = $this->faker->boolean(10); // 10% kemungkinan true (aktif)

        return [
            'nama_semester' => $namaSemester,
            'tahun_ajaran_id' => $academicYearId,
            'is_active' => $isActive,
            // Tambahkan kolom lain jika ada di migrasi semesters Anda
        ];
        // =====================================================
    }

    /**
     * Indicate that the semester is currently active.
     */
    // Contoh: Tambahkan state kustom untuk membuat semester aktif
    public function active()
    {
        return $this->state(fn (array $attributes) => [
            'is_active' => true,
        ]);
    }

    /**
     * Indicate that the semester is for a specific academic year.
     */
    // Contoh: Tambahkan state kustom untuk mengaitkan dengan tahun ajaran spesifik
    public function forAcademicYear(AcademicYear $academicYear)
    {
        return $this->state(fn (array $attributes) => [
            'tahun_ajaran_id' => $academicYear->id,
        ]);
    }
}

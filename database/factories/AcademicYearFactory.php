<?php

namespace Database\Factories;

use App\Models\AcademicYear; // Import Model AcademicYear
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AcademicYear>
 */
class AcademicYearFactory extends Factory
{
    /**
     * The name of the corresponding model.
     *
     * @var string
     */
    protected $model = AcademicYear::class; // Pastikan modelnya AcademicYear

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // === Logika untuk menghasilkan data dummy Tahun Ajaran ===
        // Kita akan menghasilkan tahun ajaran dalam rentang tertentu, misalnya 10 tahun ke belakang.
        $startYear = $this->faker->unique()->numberBetween(date('Y') - 10, date('Y') + 1); // Tahun mulai acak 10 tahun ke belakang hingga tahun depan
        $endYear = $startYear + 1; // Tahun selesai adalah tahun mulai + 1

        // Format nama tahun ajaran (contoh: "2024/2025")
        $academicYearName = $startYear . '/' . $endYear;

        return [
            'tahun_mulai' => $startYear,
            'tahun_selesai' => $endYear,
            'nama_tahun_ajaran' => $academicYearName,
        ];
        // =====================================================
    }

    /**
     * Indicate that the academic year is in a specific range.
     */
    // Contoh: Tambahkan state kustom jika perlu (opsional)
    // public function currentYear()
    // {
    //     return $this->state(fn (array $attributes) => [
    //         'tahun_mulai' => date('Y'),
    //         'tahun_selesai' => date('Y') + 1,
    //         'nama_tahun_ajaran' => date('Y') . '/' . (date('Y') + 1),
    //     ]);
    // }
}
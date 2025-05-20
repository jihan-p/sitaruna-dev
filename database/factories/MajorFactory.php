<?php

namespace Database\Factories;

use App\Models\Major; // === Import Model Major ===
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str; // Import jika perlu helper string

class MajorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Major::class; // === Pastikan ini merujuk ke Model Major ===

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Contoh: Membuat nama jurusan dari daftar spesifik
        $majors = [
            'Rekayasa Perangkat Lunak',
            'Teknik Komputer Jaringan',
            'Multimedia',
            'Akuntansi Keuangan Lembaga',
            'Otomatisasi Tata Kelola Perkantoran',
            'Bisnis Daring Pemasaran',
            'Kuliner',
            'Tata Busana',
            'Teknik Otomotif',
            'Teknik Listrik',
            'Agribisnis Tanaman Pangan dan Hortikultura',
            // Tambahkan nama jurusan lain yang relevan
        ];

        return [
            // Gunakan `faker` untuk memilih secara acak dari daftar dan memastikan keunikan
            'nama_jurusan' => $this->faker->unique()->randomElement($majors),
        ];
    }

    // Anda bisa menambahkan state lain jika perlu data dummy khusus
    // public function customState()
    // {
    //     return $this->state([]);
    // }
}

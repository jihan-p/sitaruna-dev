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
        return [
            // === Mengisi kolom 'nama_jurusan' dengan data dummy unik ===
            // Menggunakan faker untuk membuat kata unik
            // Anda bisa sesuaikan formatnya agar lebih relevan dengan nama jurusan di sekolah kejuruan
            'nama_jurusan' => $this->faker->unique()->word . ' ' . $this->faker->randomElement(['Engineering', 'Business', 'Technology', 'Design', 'Health']), // Contoh generic
            // Atau daftar nama jurusan spesifik:
            // 'nama_jurusan' => $this->faker->unique()->randomElement([
            //     'Rekayasa Perangkat Lunak',
            //     'Teknik Komputer Jaringan',
            //     'Multimedia',
            //     'Akuntansi Keuangan Lembaga',
            //     'Otomatisasi Tata Kelola Perkantoran',
            //     'Bisnis Daring Pemasaran',
            //     // Tambahkan nama jurusan lain di sekolah Anda
            // ]),
            // ==========================================================

            // Kolom timestamps (created_at, updated_at) akan diisi otomatis saat seeding
        ];
    }

    // Anda bisa menambahkan state lain jika perlu data dummy khusus
    // public function customState()
    // {
    //     return $this->state([]);
    // }
}
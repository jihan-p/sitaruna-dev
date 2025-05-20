<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Major; // === Import Model Major ===

class MajorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        echo "Seeding Majors...\n";

        // Buat 10 data Jurusan dummy menggunakan MajorFactory
        // Anda bisa mengganti angka 10 sesuai kebutuhan jumlah data dummy
        Major::factory()->count(10)->create();

        // Contoh opsional: Jika Anda ingin memastikan ada jurusan spesifik,
        // gunakan firstOrCreate() agar tidak membuat duplikat jika sudah ada.
        // Major::firstOrCreate(['nama_jurusan' => 'Rekayasa Perangkat Lunak']);
        // Major::firstOrCreate(['nama_jurusan' => 'Teknik Komputer Jaringan']);

        echo "Finished seeding Majors.\n";
    }
}

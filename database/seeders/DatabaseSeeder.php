<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\AcademicYear; // Pastikan Model AcademicYear diimpor
use App\Models\Semester; // Pastikan Model Semester diimpor
use Illuminate\Database\Seeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents; // Jika tidak digunakan
// use Database\Factories\AcademicYearFactory; // Tidak diperlukan jika memanggil via Model
// use Database\Factories\SemesterFactory; // Tidak diperlukan jika memanggil via Model

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Panggil seeder lain yang diperlukan terlebih dahulu
        // Urutan ini penting: Roles -> Permissions -> User (jika UserTableSeeder menugaskan role/permission)
        $this->call(RolesTableSeeder::class);
        $this->call(PermissionsTableSeeder::class);
        $this->call(UserTableSeeder::class);

        // === Pastikan Seeder AcademicYear dijalankan SEBELUM Seeder Semester ===
        // Jika Anda membuat data AcademicYear di sini:
        echo "Seeding Academic Years...\n"; // Log
        AcademicYear::factory()->count(10)->create(); // Buat 10 Tahun Ajaran dummy
        echo "Finished seeding Academic Years.\n"; // Log

        // Jika Anda punya AcademicYearSeeder terpisah:
        // $this->call(AcademicYearSeeder::class);
        // ===================================================================


        // === Modifikasi Logika Seeding Semester ===
        // Alih-alih memanggil factory acak, kita akan membuat Semester untuk setiap Tahun Ajaran yang ada.
        echo "Seeding Semesters...\n"; // Log
        $academicYears = AcademicYear::all(); // Ambil semua Tahun Ajaran yang sudah ada

        // Jika tidak ada Tahun Ajaran, log peringatan dan lewati seeding Semester
        if ($academicYears->isEmpty()) {
            echo "Warning: No Academic Years found. Skipping Semester seeding.\n";
        } else {
            // Untuk setiap Tahun Ajaran, buat Semester Ganjil dan Genap
            foreach ($academicYears as $academicYear) {
                // Buat atau temukan Semester Ganjil untuk Tahun Ajaran ini
                Semester::firstOrCreate(
                    [
                        'nama_semester' => 'Ganjil',
                        'tahun_ajaran_id' => $academicYear->id,
                    ],
                    [
                        'is_active' => false, // Default tidak aktif
                        // Tambahkan kolom lain jika ada di tabel semesters dan perlu diisi saat pembuatan
                    ]
                );
                 echo "Ensured Semester 'Ganjil' for Academic Year '{$academicYear->nama_tahun_ajaran}'.\n"; // Log

                // Buat atau temukan Semester Genap untuk Tahun Ajaran ini
                 Semester::firstOrCreate(
                    [
                        'nama_semester' => 'Genap',
                        'tahun_ajaran_id' => $academicYear->id,
                    ],
                    [
                        'is_active' => false, // Default tidak aktif
                         // Tambahkan kolom lain jika ada di tabel semesters dan perlu diisi saat pembuatan
                    ]
                );
                echo "Ensured Semester 'Genap' for Academic Year '{$academicYear->nama_tahun_ajaran}'.\n"; // Log
            }
             echo "Finished seeding Semesters.\n"; // Log
        }
        // ========================================================


        // Panggil seeder lain jika ada
        // $this->call(MajorSeeder::class); // Jika belum dipanggil di atas
        // $this->call(SemesterSeeder::class); // Jika buat seeder Semester terpisah (logika di sini bisa dipindah ke sana)
        // $this->call(ClassSeeder::class);
        // $this->call(StudentSeeder::class);
        // $this->call(EnrollmentSeeder::class);
    }
}

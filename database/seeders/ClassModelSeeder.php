<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ClassModel; // Import model Classes

class ClassModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        echo "Seeding Classes...\n";

        // Pastikan ada Major sebelum membuat Class
        if (\App\Models\Major::count() === 0) {
            echo "Warning: No Majors found. Skipping Class seeding. Please run MajorSeeder first.\n";
            return;
        }

        // Contoh: Buat 10 data kelas dummy
        ClassModel::factory()->count(10)->create();

        echo "Finished seeding Classes.\n";
    }
}

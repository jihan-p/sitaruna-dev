<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Student;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        echo "Seeding Students...\n";
        // Buat 50 siswa dummy
        Student::factory()->count(50)->create();
        echo "Finished seeding Students.\n";
    }
}

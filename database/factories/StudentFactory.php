<?php

namespace Database\Factories;

use App\Models\Student;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class StudentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Student::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // === MODIFIKASI: Selalu buat user baru untuk setiap siswa ===
        // Ini akan memastikan user_id selalu unik.
        $user = User::factory()->create([
            'email' => $this->faker->unique()->safeEmail(),
            'password' => Hash::make('password'), // Password default
        ]);
        // ==========================================================

        return [
            'nisn' => $this->faker->unique()->numerify('##########'),
            'nit' => $this->faker->unique()->numerify('#########'),
            'nama_lengkap' => $this->faker->name(),
            'jenis_kelamin' => $this->faker->randomElement(['L', 'P']),
            'tempat_lahir' => $this->faker->city(),
            'tanggal_lahir' => $this->faker->date(),
            'agama' => $this->faker->randomElement(Student::ALL_STATUSES), // Pastikan ini benar (seharusnya agama, bukan status)
            'no_hp' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(), // Email siswa juga harus unik
            'alamat' => $this->faker->address(),
            'status_akun' => $this->faker->randomElement(Student::ALL_STATUSES),
            'foto_profil' => null,
            'user_id' => $user->id, // Gunakan ID user yang baru dibuat
        ];
    }
}

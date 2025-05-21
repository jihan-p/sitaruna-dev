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
        // Pastikan ada user untuk dihubungkan, atau buat jika tidak ada
        $user = User::inRandomOrder()->first();
        if (!$user) {
            $user = User::factory()->create(); // Buat user dummy jika belum ada
        }

        return [
            'nisn' => $this->faker->unique()->numerify('##########'), // 10 digit NISN
            'nit' => $this->faker->unique()->numerify('#########'),  // 9 digit NIT
            'nama_lengkap' => $this->faker->name(),
            'jenis_kelamin' => $this->faker->randomElement(['L', 'P']),
            'tempat_lahir' => $this->faker->city(),
            'tanggal_lahir' => $this->faker->date(),
            'agama' => $this->faker->randomElement(['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']),
            'no_hp' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'alamat' => $this->faker->address(),
            'status_akun' => $this->faker->randomElement(Student::ALL_STATUSES), // Menggunakan konstanta dari model
            'foto_profil' => null, // Atau gunakan faker->imageUrl() jika ingin gambar dummy
            'user_id' => $user->id,
        ];
    }
}

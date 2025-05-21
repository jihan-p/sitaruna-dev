<?php

namespace Database\Factories;

use App\Models\ClassModel; // Pastikan ini mengarah ke model ClassModel
use App\Models\Major;
use Illuminate\Database\Eloquent\Factories\Factory;

class ClassModelFactory extends Factory // NAMA KELAS SUDAH SESUAI
{
    /**
     * The name of the corresponding model.
     *
     * @var string
     */
    protected $model = ClassModel::class; // Pastikan ini mengarah ke model ClassModel

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $majorId = Major::inRandomOrder()->first()->id ?? null;

        if (!$majorId) {
            throw new \Exception('No Major found. Please seed Major data first.');
        }

        return [
            'nama_kelas' => $this->faker->unique()->word() . ' ' . $this->faker->randomNumber(3, true),
            'major_id' => $majorId,
        ];
    }
}
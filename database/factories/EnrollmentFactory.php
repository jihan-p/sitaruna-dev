<?php

namespace Database\Factories;

use App\Models\Enrollment;
use App\Models\Student;
use App\Models\ClassModel; // Menggunakan ClassModel sesuai model Anda
use App\Models\AcademicYear;
use App\Models\Semester;
use Illuminate\Database\Eloquent\Factories\Factory;

class EnrollmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Enrollment::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        // Mendapatkan ID dari model-model yang sudah ada
        // Pastikan Anda telah menjalankan seeder untuk Student, ClassModel, AcademicYear, dan Semester terlebih dahulu.

        $studentId = Student::inRandomOrder()->first()->id;
        $academicYearId = AcademicYear::inRandomOrder()->first()->id;
        $semesterId = Semester::inRandomOrder()->first()->id; // Pastikan ini mengambil semester yang terkait dengan academic_year_id

        // === MODIFIKASI KRUSIAL ===
        // Untuk memastikan kombinasi (student_id, academic_year_id, semester_id) unik,
        // kita bisa mencari kombinasi yang belum ada.
        // Jika Anda ingin membuat banyak enrollment dan tetap unik,
        // mungkin Anda perlu loop di seeder dan secara manual memastikan unik,
        // atau membuat query yang lebih kompleks di factory.

        // Namun, cara yang lebih sederhana untuk seeder adalah membuat data
        // satu per satu atau memastikan pengambilan ID bersifat unik secara bertahap.
        // Untuk demo seeding, kita bisa ambil acak, tapi harus memastikan
        // factory tidak menghasilkan duplikat jika dipanggil berulang kali
        // untuk data yang sama.

        // Solusi paling sederhana untuk seeding:
        // Jika Anda memanggil Enrollment::factory()->count(X)->create(),
        // setiap panggilan akan menghasilkan kombinasi yang mungkin duplikat.
        // Kita perlu mencari kombinasi unik yang belum ada.

        // Cara 1: Pastikan data terkait (Student, AcademicYear, Semester) sudah cukup banyak
        // dan secara acak memilihnya, lalu membiarkan database menangani unique constraint
        // jika terjadi duplikasi (yang akan menghasilkan error seperti yang Anda alami).
        // Ini kurang ideal untuk seeding karena rentan error.

        // Cara 2 (Lebih Baik untuk Seeding): Buat kombinasi unik secara eksplisit.
        // Anda bisa membuat array dari semua kemungkinan kombinasi unik
        // atau membuat factory secara iteratif.

        // Untuk tujuan factory, kita akan memastikan bahwa kita mengambil data
        // yang *sudah ada* untuk dihubungkan. Factory ini tidak menjamin keunikan
        // jika dipanggil berkali-kali untuk entitas yang sama tanpa logika tambahan.

        // Jika Anda ingin memastikan keunikan saat seeding,
        // logika yang lebih baik mungkin ada di EnrollmentSeeder, BUKAN di factory.
        // Factory seharusnya hanya mendefinisikan "blueprint" satu record.

        // Untuk sekarang, saya akan mengasumsikan factory akan dipanggil dalam loop
        // yang memastikan uniqueness, atau kita akan membiarkan error terjadi
        // dan menanganinya di seeder (misalnya, dengan try-catch atau `firstOrCreate`).

        // Jika Anda ingin meminimalkan `UniqueConstraintViolationException` saat testing/seeding,
        // cara yang paling efektif adalah menggunakan `firstOrCreate` di seeder Anda.

        // Mari kita ambil ID secara acak. Factory tidak secara otomatis mencegah duplikat
        // dari sisi kombinasi foreign keys. Itu tugas seeder atau logika aplikasi.

        // Ambil ID secara acak dari data yang sudah ada.
        $randomStudent = Student::inRandomOrder()->first();
        $randomAcademicYear = AcademicYear::inRandomOrder()->first();
        $randomSemester = Semester::inRandomOrder()->first();
        $randomClass = ClassModel::inRandomOrder()->first();


        // Pastikan semua model terkait ada
        if (!$randomStudent || !$randomAcademicYear || !$randomSemester || !$randomClass) {
             throw new \Exception('Missing prerequisite data for EnrollmentFactory. Please seed Students, Classes, AcademicYears, and Semesters first.');
        }

        // Sekarang kita perlu memastikan kombinasi student_id, academic_year_id, semester_id adalah unik.
        // Factory ini hanya mendefinisikan satu set atribut. Jika Anda memanggil `Enrollment::factory()->count(10)->create();`
        // dan ingin 10 entri unik, Anda harus memastikan bahwa kombinasi ini dihasilkan secara unik
        // untuk setiap panggilan `create()`.

        // Cara terbaik untuk seeding banyak data unik adalah dengan mengiterasi di seeder.
        // Di sini kita hanya mendefinisikan satu set data.
        // Seeder yang akan memanggil factory ini perlu memastikan keunikan.

        return [
            'student_id' => $randomStudent->id,
            'class_id' => $randomClass->id,
            'academic_year_id' => $randomAcademicYear->id,
            'semester_id' => $randomSemester->id,
            'no_absen' => $this->faker->unique()->numberBetween(1, 50), // Nomor absen unik dalam konteks ini
        ];
    }

    // Anda bisa menambahkan state untuk memastikan keunikan kombinasi jika factory dipanggil berkali-kali
    // Namun, lebih baik ditangani di Seeder.
}

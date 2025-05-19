<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User; // Import Model User
use Illuminate\Support\Facades\Hash; // Import Hash facade untuk hashing password
use Spatie\Permission\Models\Role; // Import Model Role jika menugaskan role di sini
use Spatie\Permission\Models\Permission; // Import Model Permission jika digunakan (seperti di kode sebelumnya)

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // === Buat atau Temukan User Admin Default ===
        // Menggunakan firstOrCreate() berdasarkan email untuk memastikan user hanya dibuat sekali.
        // Jika user dengan email 'admin@gmail.com' belum ada, maka user baru akan dibuat
        // dengan data yang ada di array kedua.
        $adminUser = User::firstOrCreate(
            ['email' => 'admin@gmail.com'], // Kriteria pencarian (email harus unik)
            [ // Data yang akan digunakan jika user belum ada (data pembuatan)
                'name' => 'Administrator', // Nama user default
                'password' => Hash::make('password'), // Password default (ubah 'password' sesuai kebutuhan)
                // Tambahkan kolom lain jika ada di tabel users dan perlu diisi saat pembuatan
                // 'email_verified_at' => now(), // Contoh: langsung verifikasi email
            ]
        );
        // ==========================================

        // === Penugasan Role ke User Admin ===
        // Cari role 'admin' menggunakan firstWhere() yang lebih aman daripada find(1)
        // Role 'admin' harus sudah ada di database (dipastikan oleh RolesTableSeeder yang dijalankan sebelumnya)
        $adminRole = Role::firstWhere('name', 'admin');

        // Jika role 'admin' ditemukan, tugaskan ke user admin
        if ($adminRole) {
            // assignRole() akan menambahkan role jika belum ada.
            // syncRoles([$adminRole]) akan memastikan user hanya punya role 'admin' dan menghapus role lain.
            // Pilih salah satu sesuai kebutuhan. assignRole() lebih aman jika user mungkin punya role lain.
            $adminUser->assignRole($adminRole);
            echo "Role 'admin' assigned to user 'Administrator'.\n"; // Log untuk konfirmasi
        } else {
            echo "Warning: Role 'admin' not found. Cannot assign role to user 'Administrator'.\n"; // Log jika role tidak ditemukan
        }
        // =============================================

        // === Penugasan Semua Permission ke Role Admin (Opsional, bisa juga di RolesTableSeeder) ===
        // Jika Anda ingin menugaskan SEMUA permission ke role admin di sini:
        // Pastikan PermissionsTableSeeder dijalankan SEBELUM UserTableSeeder di DatabaseSeeder.php
        // $allPermissions = Permission::where('guard_name', 'web')->get(); // Ambil semua permission
        // if ($adminRole && $allPermissions->isNotEmpty()) {
        //     $adminRole->syncPermissions($allPermissions); // Sinkronkan semua permission ke role admin
        //     echo "All permissions synced to role 'admin'.\n"; // Log untuk konfirmasi
        // }


        // === Contoh Pembuatan User Lain (Opsional) ===
        // Jika Anda ingin membuat user default lain (misal: user biasa), gunakan pola yang sama
        // $regularUser = User::firstOrCreate(
        //     ['email' => 'user@gmail.com'],
        //     [
        //         'name' => 'Regular User',
        //         'password' => Hash::make('password'),
        //     ]
        // );
        // $userRole = Role::firstWhere('name', 'user'); // Cari role 'user'
        // if ($userRole) {
        //     $regularUser->assignRole($userRole); // Tugaskan role 'user'
        //     echo "Role 'user' assigned to user 'Regular User'.\n"; // Log
        // } else {
        //     echo "Warning: Role 'user' not found. Cannot assign role to user 'Regular User'.\n"; // Log
        // }
        // ============================================
    }
}

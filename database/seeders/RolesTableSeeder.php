<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role; // Import model Role dari Spatie
use Spatie\Permission\Models\Permission; // Import model Permission jika perlu untuk penugasan permission ke role

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        // Penting untuk memastikan role yang baru ditambahkan/diperbarui dikenali
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Guard name yang digunakan (sesuaikan jika Anda menggunakan guard lain selain 'web')
        $guardName = 'web';

        // === Definisikan Role yang akan dibuat dalam Array ===
        $rolesToCreate = [
            'admin',
            'user',
            // Tambahkan role lain jika ada di sini
        ];

        // === Buat atau Temukan Role Menggunakan firstOrCreate() ===
        echo "Seeding roles...\n"; // Log
        foreach ($rolesToCreate as $roleName) {
            // Menggunakan firstOrCreate() untuk menghindari error jika role sudah ada
            $role = Role::firstOrCreate(['name' => $roleName, 'guard_name' => $guardName]);
            echo "Role '{$role->name}' ({$role->guard_name}) ensured.\n"; // Log konfirmasi
        }
        // ======================================================

        // === Penugasan Permission ke Role (Opsional) ===
        // Jika Anda ingin menugaskan permission default ke role di sini,
        // pastikan permission tersebut sudah ada di database (misal dari PermissionsTableSeeder).
        // Pastikan PermissionsTableSeeder dijalankan SEBELUM RolesTableSeeder jika Anda menugaskan permission di sini.

        // Contoh: Menugaskan semua permission ke role 'admin'
        // $adminRole = Role::firstWhere('name', 'admin'); // Ambil role admin yang sudah ada/dibuat
        // if ($adminRole) {
        //     // Ambil semua permission untuk guard yang sama
        //     $allPermissions = Permission::where('guard_name', $guardName)->get();
        //     // Sinkronkan permission. syncPermissions akan menimpa permission yang ada dengan daftar baru.
        //     if ($allPermissions->isNotEmpty()) {
        //         $adminRole->syncPermissions($allPermissions);
        //         echo "All permissions synced to role 'admin'.\n"; // Log konfirmasi
        //     } else {
        //          echo "Warning: No permissions found to sync to role 'admin'.\n"; // Log jika tidak ada permission
        //     }
        // }

        // Contoh: Menugaskan permission spesifik ke role 'user'
        // $userRole = Role::firstWhere('name', 'user'); // Ambil role user yang sudah ada/dibuat
        // if ($userRole) {
        //     // Ambil permission spesifik (misal: hanya permission 'index' untuk beberapa modul)
        //     $userPermissions = Permission::whereIn('name', [
        //         'dashboard index', // Contoh permission dashboard index
        //         'majors index',
        //         'academic-years index',
        //         'semesters index',
        //         // Tambahkan permission index untuk modul lain yang user biasa boleh lihat
        //     ])->where('guard_name', $guardName)->get();
        //     // Sinkronkan permission untuk role user
        //      if ($userPermissions->isNotEmpty()) {
        //         $userRole->syncPermissions($userPermissions);
        //         echo "Specific permissions synced to role 'user'.\n"; // Log konfirmasi
        //      } else {
        //          echo "Warning: No specific permissions found to sync to role 'user'.\n"; // Log
        //      }
        // }
        // ==============================================
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission; // Import model Permission dari Spatie
use Spatie\Permission\Models\Role; // Import model Role jika perlu untuk penugasan permission ke role

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        // Ini penting agar permission yang baru ditambahkan/diperbarui langsung dikenali
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Guard name yang digunakan (sesuaikan jika Anda menggunakan guard lain selain 'web')
        $guardName = 'web';

        // === Definisikan Permissions untuk Setiap Modul dalam Array ===

        $userPermissions = [
            'users index',
            'users create',
            'users edit',
            'users delete',
            'users show', // Berdasarkan file Anda sebelumnya
        ];

        $rolePermissions = [
            'roles index',
            'roles create',
            'roles edit',
            'roles delete',
            'roles show', // Tambah jika ada halaman show role
        ];

        $permissionPermissions = [ // Nama variabel agak berulang, tapi jelas
            'permissions index',
            'permissions create',
            'permissions edit',
            'permissions delete',
            'permissions show', // Tambah jika ada halaman show permission
        ];

        $studentPermissions = [
            'students index',
            'students create',
            'students edit',
            'students delete',
            'students show', // Berdasarkan file Anda sebelumnya
        ];

        $majorPermissions = [
            'majors index',
            'majors create',
            'majors edit',
            'majors delete',
            'majors show', // Tambah jika ada halaman show major
        ];

        $academicYearPermissions = [
            'academic-years index',
            'academic-years create',
            'academic-years edit',
            'academic-years delete',
            'academic-years show', // Tambah jika ada halaman show academic year
        ];

        $semesterPermissions = [
            'semesters index',
            'semesters create',
            'semesters edit',
            'semesters delete',
            'semesters show', // Tambah jika ada halaman show semester
        ];

        // === Gabungkan Semua Array Permissions ===
        // Anda bisa menggabungkannya menjadi satu array besar jika mau,
        // atau proses per modul seperti di bawah.
        // Ini berguna jika Anda ingin menugaskan SEMUA permission ke role tertentu (misal: admin)

        $allPermissions = array_merge(
            $userPermissions,
            $rolePermissions,
            $permissionPermissions,
            $studentPermissions,
            $majorPermissions,
            $academicYearPermissions,
            $semesterPermissions
            // Gabungkan semua array permission di sini
        );


        // === Proses dan Buat Permissions Menggunakan firstOrCreate() ===
        echo "Seeding permissions...\n"; // Log
        foreach ($allPermissions as $permissionName) {
            // Menggunakan firstOrCreate() untuk menghindari error jika permission sudah ada
            $permission = Permission::firstOrCreate(['name' => $permissionName, 'guard_name' => $guardName]);
            echo "Permission '{$permission->name}' ({$permission->guard_name}) ensured.\n"; // Log konfirmasi
        }
        // ======================================================


        // === Tambahkan Penugasan Role/Permission di sini (Opsional) ===
        // Contoh: Menugaskan semua permission yang baru dibuat/ditemukan ke role 'admin'
        // Pastikan RolesTableSeeder dijalankan SEBELUM PermissionsTableSeeder di DatabaseSeeder.php
        // jika Anda menugaskan permission di sini.

        // $adminRole = Role::firstWhere('name', 'admin'); // Ambil role admin
        // if ($adminRole) {
        //     // Ambil permission yang baru saja dibuat/ditemukan
        //     // Gunakan whereIn dengan array $allPermissions atau ambil semua permission lagi
        //     $permissionsToAssign = Permission::whereIn('name', $allPermissions)->where('guard_name', $guardName)->get();
        //     if ($permissionsToAssign->isNotEmpty()) {
        //          $adminRole->syncPermissions($permissionsToAssign); // Sinkronkan semua permission ke role admin
        //          echo "All permissions synced to role 'admin'.\n"; // Log konfirmasi
        //     } else {
        //          echo "Warning: No permissions found to sync to role 'admin'.\n"; // Log
        //     }
        // }
        // ============================================================

    }
}

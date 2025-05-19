<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role; // Pastikan Role diimpor di sini

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
            // Gabungkan semua array permission modul lain di sini
        );


        // === Proses dan Buat Permissions Menggunakan firstOrCreate() ===
        echo "Seeding permissions...\n"; // Log
        foreach ($allPermissions as $permissionName) {
            // Menggunakan firstOrCreate() untuk menghindari error jika permission sudah ada
            $permission = Permission::firstOrCreate(['name' => $permissionName, 'guard_name' => $guardName]);
            echo "Permission '{$permission->name}' ({$permission->guard_name}) ensured.\n"; // Log konfirmasi
        }
        echo "Finished seeding permissions.\n";


        // === Tambahkan Penugasan Role/Permission di sini ===
        // Contoh: Berikan semua permission yang baru dibuat/ditemukan ke role 'admin'

        // Pastikan RolesTableSeeder dijalankan SEBELUM PermissionsTableSeeder di DatabaseSeeder.php
        // jika Anda menugaskan permission di sini.

        echo "Assigning permissions to roles...\n"; // Log

        $adminRole = Role::firstWhere('name', 'admin'); // Ambil role admin menggunakan firstWhere

        if ($adminRole) {
            // Ambil semua permission yang baru saja dibuat/ditemukan untuk guard yang sama
            $permissionsToAssign = Permission::whereIn('name', $allPermissions) // Ambil permission berdasarkan nama dari array $allPermissions
                                             ->where('guard_name', $guardName)
                                             ->get();

            if ($permissionsToAssign->isNotEmpty()) {
                 // syncPermissions akan menimpa permission yang ada dengan daftar baru.
                 // Jika Anda hanya ingin menambahkan permission baru tanpa menghapus yang lama, gunakan givePermissionTo($permissionsToAssign);
                 $adminRole->syncPermissions($permissionsToAssign);
                 echo "All permissions ({$permissionsToAssign->count()}) synced to role '{$adminRole->name}'.\n"; // Log konfirmasi
            } else {
                 echo "Warning: No permissions found to sync to role '{$adminRole->name}'.\n"; // Log jika tidak ada permission
            }
        } else {
             echo "Warning: Role 'admin' not found. Cannot assign permissions.\n"; // Log jika role admin tidak ditemukan
        }

        // === Contoh Penugasan permission spesifik ke role lain (misal: user) ===
        // $userRole = Role::firstWhere('name', 'user');
        // if ($userRole) {
        //     $userPermissions = Permission::whereIn('name', [
        //         'dashboard index',
        //         'majors index',
        //         'academic-years index',
        //         'semesters index',
        //         // Tambahkan permission index untuk modul lain yang user biasa boleh lihat
        //     ])->where('guard_name', $guardName)->get();
        //     if ($userPermissions->isNotEmpty()) {
        //         $userRole->syncPermissions($userPermissions);
        //         echo "Specific permissions synced to role '{$userRole->name}'.\n";
        //     } else {
        //          echo "Warning: No specific permissions found to sync to role '{$userRole->name}'.\n";
        //     }
        // }
        // ============================================================
         echo "Finished assigning permissions.\n"; // Log


    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        $guardName = 'web';

        $userPermissions = [
            'users index',
            'users create',
            'users edit',
            'users delete',
            'users show',
        ];

        $rolePermissions = [
            'roles index',
            'roles create',
            'roles edit',
            'roles delete',
            'roles show',
        ];

        $permissionPermissions = [
            'permissions index',
            'permissions create',
            'permissions edit',
            'permissions delete',
            'permissions show',
        ];

        $studentPermissions = [
            'students index',
            'students create',
            'students edit',
            'students delete',
            'students show',
        ];

        $majorPermissions = [
            'majors index',
            'majors create',
            'majors edit',
            'majors delete',
            'majors show',
        ];

        $academicYearPermissions = [
            'academic-years index',
            'academic-years create',
            'academic-years edit',
            'academic-years delete',
            'academic-years show',
        ];

        $semesterPermissions = [
            'semesters index',
            'semesters create',
            'semesters edit',
            'semesters delete',
            'semesters show',
        ];

        // === Permissions untuk Modul Kelas ===
        $classPermissions = [
            'classes index',
            'classes create',
            'classes edit',
            'classes delete',
            'classes show', // Opsional, jika ada halaman show detail kelas
        ];
        // =====================================

        // Gabungkan Semua Array Permissions
        $allPermissionsArray = array_merge(
            $userPermissions,
            $rolePermissions,
            $permissionPermissions,
            $studentPermissions,
            $majorPermissions,
            $academicYearPermissions,
            $semesterPermissions,
            $classPermissions // === Tambahkan permissions kelas di sini ===
        );

        echo "Seeding permissions...\n";
        foreach ($allPermissionsArray as $permissionName) {
            $permission = Permission::firstOrCreate(['name' => $permissionName, 'guard_name' => $guardName]);
            echo "Permission '{$permission->name}' ({$permission->guard_name}) ensured.\n";
        }
        echo "Finished seeding permissions.\n";

        echo "Assigning permissions to roles...\n";
        $adminRole = Role::firstWhere('name', 'admin');
        if ($adminRole) {
            $permissionsToAssign = Permission::whereIn('name', $allPermissionsArray)
                                             ->where('guard_name', $guardName)
                                             ->get();
            if ($permissionsToAssign->isNotEmpty()) {
                 $adminRole->syncPermissions($permissionsToAssign);
                 echo "All permissions ({$permissionsToAssign->count()}) synced to role '{$adminRole->name}'.\n";
            } else {
                 echo "Warning: No permissions found to sync to role '{$adminRole->name}'.\n";
            }
        } else {
             echo "Warning: Role 'admin' not found. Cannot assign permissions.\n";
        }

        $userRole = Role::firstWhere('name', 'user');
        if ($userRole) {
            $userPermissions = Permission::whereIn('name', [
                'dashboard index',
                'majors index',
                'academic-years index',
                'semesters index',
                'classes index', // === Tambahkan permission kelas untuk user biasa ===
            ])->where('guard_name', $guardName)->get();
            if ($userPermissions->isNotEmpty()) {
                $userRole->syncPermissions($userPermissions);
                echo "Specific permissions synced to role '{$userRole->name}'.\n";
            } else {
                 echo "Warning: No specific permissions found to sync to role '{$userRole->name}'.\n";
            }
        } else {
             echo "Warning: Role 'user' not found. Cannot assign permissions.\n";
        }
        echo "Finished assigning permissions.\n";
    }
}

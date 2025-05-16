<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //permission users
        Permission::create(['name' => 'users index', 'guard_name' => 'web']);
        Permission::create(['name' => 'users create', 'guard_name' => 'web']);
        Permission::create(['name' => 'users edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'users delete', 'guard_name' => 'web']);

        //permission roles
        Permission::create(['name' => 'roles index', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles create', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles delete', 'guard_name' => 'web']);

        //permission permissions
        Permission::create(['name' => 'permissions index', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions create', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions delete', 'guard_name' => 'web']);

        // permission students
        Permission::create(['name' => 'students index', 'guard_name' => 'web']);
        Permission::create(['name' => 'students create', 'guard_name' => 'web']);
        Permission::create(['name' => 'students edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'students delete', 'guard_name' => 'web']);
        Permission::create(['name' => 'students show', 'guard_name' => 'web']);

        // permission majors
        Permission::create(['name' => 'majors index', 'guard_name' => 'web']);
        Permission::create(['name' => 'majors create', 'guard_name' => 'web']);
        Permission::create(['name' => 'majors edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'majors delete', 'guard_name' => 'web']);
    }
}

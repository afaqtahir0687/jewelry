<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;

class RoleAndUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Roles & Users
        $adminRole  = Role::firstOrCreate(['name' => 'admin']);
        $sellerRole = Role::firstOrCreate(['name' => 'seller']);

        $admin = User::updateOrCreate(
            ['email' => 'admin@jewelry.com'],
            ['name' => 'Admin', 'password' => bcrypt('admin1234')]
        );
        $admin->syncRoles([$adminRole]);
    }
}

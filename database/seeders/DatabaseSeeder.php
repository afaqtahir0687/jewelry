<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleAndUserSeeder::class,
            CitySeeder::class,
            CategoryAndSubCategorySeeder::class,
            JewellerSeeder::class,
            ProductSeeder::class,
            DiamondWatchSeeder::class,
            // Include PageSeeder since it was already in the directory
            PageSeeder::class,
        ]);
    }
}

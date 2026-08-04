<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\City;

class CitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 2. Cities
        $cities = [
            ['name' => 'Lahore', 'slug' => 'slug-lahore'],
            ['name' => 'Karachi', 'slug' => 'karachi'],
            ['name' => 'Islamabad', 'slug' => 'islamabad'],
        ];
        foreach ($cities as $city) {
            City::updateOrCreate(['slug' => $city['slug']], [
                'name' => $city['name']
            ]);
        }
    }
}

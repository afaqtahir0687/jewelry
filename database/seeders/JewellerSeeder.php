<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Jeweller;
use App\Models\User;
use App\Models\City;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class JewellerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 4. Jewellers
        $sellerRole = Role::firstOrCreate(['name' => 'seller']);
        $jewellerData = [
            [
                'email' => 'alharam@jewelry.com',
                'name' => 'Al-Haram Seller',
                'business_name' => 'Al-Haram Jewellers',
                'city_slug' => 'slug-lahore',
                'area' => 'DHA Phase 5',
                'full_address' => 'Building 45-CCA, Block Block-C, DHA Phase 5, Lahore, Pakistan'
            ],
            [
                'email' => 'kundan@jewelry.com',
                'name' => 'Kundan Seller',
                'business_name' => 'Kundan Gold & Diamond',
                'city_slug' => 'karachi',
                'area' => 'Clifton Block 4',
                'full_address' => 'Shop 12, Giga Mall Clifton, Karachi, Pakistan'
            ]
        ];

        foreach ($jewellerData as $jd) {
            $user = User::updateOrCreate(
                ['email' => $jd['email']],
                ['name' => $jd['name'], 'password' => bcrypt('seller1234')]
            );
            $user->syncRoles([$sellerRole]);

            $city = City::where('slug', $jd['city_slug'])->first();

            Jeweller::updateOrCreate(
                ['slug' => Str::slug($jd['business_name'])],
                [
                    'user_id' => $user->id,
                    'business_name' => $jd['business_name'],
                    'logo' => 'https://images.unsplash.com/photo-1541535881962-e668f2244a26?w=150&auto=format&fit=crop',
                    'cover_image' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&auto=format&fit=crop',
                    'city_id' => $city ? $city->id : 1,
                    'area' => $jd['area'],
                    'full_address' => $jd['full_address'],
                    'phone' => '+92 300 1234567',
                    'is_verified' => true,
                    'verified_at' => now(),
                ]
            );
        }
    }
}

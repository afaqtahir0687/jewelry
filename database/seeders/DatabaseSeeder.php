<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\City;
use App\Models\Category;
use App\Models\Jeweller;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create Spatie roles
        $adminRole  = Role::firstOrCreate(['name' => 'admin']);
        $sellerRole = Role::firstOrCreate(['name' => 'seller']);

        // Default Admin User
        $admin = User::updateOrCreate(
            ['email' => 'admin@jewelry.com'],
            [
                'name'     => 'Admin',
                'password' => bcrypt('admin1234'),
            ]
        );
        $admin->syncRoles([$adminRole]);

        // Seed Cities
        $cities = [
            ['name' => 'Lahore', 'slug' => 'lahore'],
            ['name' => 'Karachi', 'slug' => 'karachi'],
            ['name' => 'Islamabad', 'slug' => 'islamabad'],
            ['name' => 'Faisalabad', 'slug' => 'faisalabad'],
            ['name' => 'Multan', 'slug' => 'multan'],
        ];

        foreach ($cities as $city) {
            City::updateOrCreate(['slug' => $city['slug']], $city);
        }

        // Seed Categories
        $categories = [
            [
                'name' => 'Gold Jewellery',
                'slug' => 'gold-jewellery',
                'description' => 'Browse fine gold jewelry crafted in 22K and 21K gold by pakistans best artisans.',
                'image' => 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop',
            ],
            [
                'name' => 'Diamond Jewellery',
                'slug' => 'diamond-jewellery',
                'description' => 'Exquisite diamond necklaces, certified solitaire rings, and fine diamond bracelets.',
                'image' => 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop',
            ],
            [
                'name' => 'Bridal Jewellery',
                'slug' => 'bridal-jewellery',
                'description' => 'Traditional Pakistani bridal sets, Chokers, Jhumkas, and complete wedding sets.',
                'image' => 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&auto=format&fit=crop',
            ],
            [
                'name' => 'Engagement Rings',
                'slug' => 'engagement-rings',
                'description' => 'Beautiful proposal rings, diamond solitaires, and luxury wedding bands.',
                'image' => 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop',
            ],
            [
                'name' => 'Necklaces & Pendants',
                'slug' => 'necklaces',
                'description' => 'Gold lockets, layered chain necklaces, and traditional bridal harams.',
                'image' => 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop',
            ],
            [
                'name' => 'Custom Designs',
                'slug' => 'custom-jewellery',
                'description' => 'Upload your own reference image and get custom quotes from top jewellers.',
                'image' => 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&auto=format&fit=crop',
            ],
        ];

        foreach ($categories as $cat) {
            Category::updateOrCreate(['slug' => $cat['slug']], $cat);
        }

        // Get created instances
        $lahore = City::where('slug', 'lahore')->first();
        $karachi = City::where('slug', 'karachi')->first();
        $islamabad = City::where('slug', 'islamabad')->first();

        $goldCat = Category::where('slug', 'gold-jewellery')->first();
        $diamondCat = Category::where('slug', 'diamond-jewellery')->first();
        $bridalCat = Category::where('slug', 'bridal-jewellery')->first();
        $ringCat = Category::where('slug', 'engagement-rings')->first();

        // Seed Jeweller Users first
        $alHaramUser = User::updateOrCreate(
            ['email' => 'alharam@jewelry.com'],
            ['name' => 'Al-Haram Seller', 'password' => bcrypt('seller1234')]
        );
        $alHaramUser->syncRoles([$sellerRole]);

        $kundanUser = User::updateOrCreate(
            ['email' => 'kundan@jewelry.com'],
            ['name' => 'Kundan Seller', 'password' => bcrypt('seller1234')]
        );
        $kundanUser->syncRoles([$sellerRole]);

        $goharUser = User::updateOrCreate(
            ['email' => 'gohar@jewelry.com'],
            ['name' => 'Gohar Seller', 'password' => bcrypt('seller1234')]
        );
        $goharUser->syncRoles([$sellerRole]);

        // Seed Jewellers
        $jewellers = [
            [
                'user_id' => $alHaramUser->id,
                'business_name' => 'Al-Haram Jewellers',
                'slug' => 'al-haram-jewellers',
                'logo' => 'https://images.unsplash.com/photo-1541535881962-e668f2244a26?w=150&auto=format&fit=crop',
                'cover_image' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&auto=format&fit=crop',
                'shop_gallery' => [
                    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop',
                    'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&auto=format&fit=crop'
                ],
                'city_id' => $lahore->id,
                'area' => 'DHA Phase 5',
                'full_address' => 'Building 45-CCA, Block Block-C, DHA Phase 5, Lahore, Pakistan',
                'google_maps_link' => 'https://maps.google.com/?q=Al-Haram+Jewellers+DHA+Lahore',
                'phone' => '+92 42 35698711',
                'whatsapp' => '+92 300 1234567',
                'business_timings' => '11:00 AM - 9:00 PM',
                'years_in_business' => 15,
                'specialities' => ['22K Gold', 'Heritage Bridal Sets', 'Gold Bangles'],
                'custom_order_available' => true,
                'delivery_available' => true,
                'repair_services_available' => true,
                'payment_methods' => ['Cash', 'Bank Transfer', 'Credit Card'],
                'return_policy' => 'Exchange within 7 days with original invoice. Making charges are non-refundable.',
                'is_verified' => true,
                'verified_at' => now(),
            ],
            [
                'user_id' => $kundanUser->id,
                'business_name' => 'Kundan Gold & Diamond',
                'slug' => 'kundan-gold-and-diamond',
                'logo' => 'https://images.unsplash.com/photo-1541535881962-e668f2244a26?w=150&auto=format&fit=crop',
                'cover_image' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&auto=format&fit=crop',
                'shop_gallery' => [
                    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop'
                ],
                'city_id' => $karachi->id,
                'area' => 'Clifton Block 4',
                'full_address' => 'Shop 12, Giga Mall Clifton, Karachi, Pakistan',
                'google_maps_link' => 'https://maps.google.com/?q=Kundan+Jewellers+Clifton+Karachi',
                'phone' => '+92 21 35831200',
                'whatsapp' => '+92 321 9876543',
                'business_timings' => '12:00 PM - 10:00 PM',
                'years_in_business' => 8,
                'specialities' => ['Solitaire Diamond Rings', 'Certified Diamonds', 'Modern Chokers'],
                'custom_order_available' => true,
                'delivery_available' => false,
                'repair_services_available' => true,
                'payment_methods' => ['Cash', 'Credit Card'],
                'return_policy' => '100% cashback on diamond value inside 15 days.',
                'is_verified' => true,
                'verified_at' => now(),
            ],
            [
                'user_id' => $goharUser->id,
                'business_name' => 'Gohar Jewellers',
                'slug' => 'gohar-jewellers',
                'logo' => 'https://images.unsplash.com/photo-1541535881962-e668f2244a26?w=150&auto=format&fit=crop',
                'cover_image' => 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&auto=format&fit=crop',
                'shop_gallery' => [],
                'city_id' => $islamabad->id,
                'area' => 'F-7 Markaz',
                'full_address' => 'Plaza 24, F-7 Markaz, Islamabad, Pakistan',
                'google_maps_link' => 'https://maps.google.com/?q=Gohar+Jewellers+F-7+Islamabad',
                'phone' => '+92 51 2276541',
                'whatsapp' => '+92 333 4567890',
                'business_timings' => '11:00 AM - 8:30 PM',
                'years_in_business' => 20,
                'specialities' => ['Kundan Jewellery', 'Pola Work', 'Polki Bridal Sets'],
                'custom_order_available' => true,
                'delivery_available' => true,
                'repair_services_available' => false,
                'payment_methods' => ['Cash', 'Bank Transfer'],
                'return_policy' => 'No returns. Standard exchange policy applies.',
                'is_verified' => true,
                'verified_at' => now(),
            ],
        ];

        foreach ($jewellers as $j) {
            $createdJeweller = Jeweller::updateOrCreate(['slug' => $j['slug']], $j);

            // Seed Products for each Jeweller
            if ($createdJeweller->business_name === 'Al-Haram Jewellers') {
                Product::create([
                    'title' => '22K Gold Royal Bridal Haram Set',
                    'slug' => '22k-gold-royal-bridal-haram-set',
                    'jeweller_id' => $createdJeweller->id,
                    'category_id' => $bridalCat->id,
                    'images' => ['https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&auto=format&fit=crop'],
                    'description' => 'A beautifully designed heritage 22K gold necklace set featuring intricate filigree work and premium gemstones. Perfect for brides who want a royal traditional look.',
                    'price_on_request' => true,
                    'price' => null,
                    'gold_purity' => '22K Gold',
                    'approximate_weight' => '85 grams',
                    'stone_info' => 'Red Rubies and Emerald embellishments',
                    'status' => 'made_to_order',
                    'customisation_options' => 'Weight can be adjusted between 60 to 110 grams. Gemstones can be custom selected.',
                ]);

                Product::create([
                    'title' => 'Classic Gold Bangles Set of 4',
                    'slug' => 'classic-gold-bangles-set-of-4',
                    'jeweller_id' => $createdJeweller->id,
                    'category_id' => $goldCat->id,
                    'images' => ['https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop'],
                    'description' => 'Traditional Pakistani style 22K gold bangles with detailed floral carvings. A perfect anniversary or wedding gift.',
                    'price_on_request' => false,
                    'price' => 380000.00,
                    'gold_purity' => '22K Gold',
                    'approximate_weight' => '32 grams',
                    'stone_info' => 'Solid gold, no stones',
                    'status' => 'available',
                    'customisation_options' => 'Available in sizes 2.4, 2.6, and 2.8. Width can be customized.',
                ]);
            }

            if ($createdJeweller->business_name === 'Kundan Gold & Diamond') {
                Product::create([
                    'title' => 'Solitaire Diamond Engagement Ring',
                    'slug' => 'solitaire-diamond-engagement-ring',
                    'jeweller_id' => $createdJeweller->id,
                    'category_id' => $ringCat->id,
                    'images' => ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop'],
                    'description' => 'A stunning 1.0 carat certified solitaire diamond ring mounted on an 18K white gold band. A timeless choice for proposal.',
                    'price_on_request' => true,
                    'price' => null,
                    'gold_purity' => '18K White Gold',
                    'approximate_weight' => '3.5 grams',
                    'stone_info' => '1.0 carat round cut diamond, GIA certified, VVS2 clarity, H color',
                    'status' => 'available',
                    'customisation_options' => 'Can be set in platinum or yellow gold. Solitaire size range from 0.5 to 2.5 carats.',
                ]);
            }

            // Seed Reviews
            Review::create([
                'jeweller_id' => $createdJeweller->id,
                'customer_name' => 'Ayesha Khan',
                'rating' => 5,
                'comment' => 'Ordered my bridal set from them and they delivered exactly what was promised. Highly recommended for premium designs!',
                'is_approved' => true,
            ]);

            Review::create([
                'jeweller_id' => $createdJeweller->id,
                'customer_name' => 'Muhammad Bilal',
                'rating' => 4,
                'comment' => 'Great customer support and high quality diamond finish. Very happy with the engagement ring purchase.',
                'is_approved' => true,
            ]);
        }
    }
}


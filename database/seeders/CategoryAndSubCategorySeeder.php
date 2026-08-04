<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\SubCategory;
use Illuminate\Support\Str;

class CategoryAndSubCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 3. Categories & SubCategories
        $categoryData = [
            [
                'name' => 'Gold',
                'description' => 'Browse fine gold jewelry crafted in 22K and 21K gold by Pakistan\'s best artisans.',
                'image' => 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop',
                'is_featured' => true,
                'subcategories' => [
                    ['name' => 'Rings', 'slug' => 'women-rings'],
                    ['name' => 'Earrings', 'slug' => 'women-earrings'],
                    ['name' => 'Necklaces', 'slug' => 'women-necklaces'],
                    ['name' => 'Bangles', 'slug' => 'women-bangles'],
                    ['name' => 'Bridal Sets', 'slug' => 'women-bridal-sets'],
                    ['name' => 'Rings', 'slug' => 'men-rings'],
                    ['name' => 'Chains', 'slug' => 'men-chains'],
                    ['name' => 'Bracelets', 'slug' => 'men-bracelets'],
                    ['name' => 'Earrings', 'slug' => 'kids-earrings'],
                    ['name' => 'Bracelets', 'slug' => 'kids-bracelets'],
                    ['name' => 'Pendants', 'slug' => 'kids-pendants'],
                ]
            ],
            [
                'name' => 'Diamond',
                'description' => 'Exquisite diamond necklaces, certified solitaire rings, and fine diamond bracelets.',
                'image' => 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop',
                'is_featured' => true,
                'subcategories' => [
                    ['name' => 'Engagement Rings', 'slug' => 'women-engagement-rings'],
                    ['name' => 'Earrings', 'slug' => 'women-earrings'],
                    ['name' => 'Pendants', 'slug' => 'women-pendants'],
                    ['name' => 'Bracelets', 'slug' => 'women-bracelets'],
                    ['name' => 'Rings', 'slug' => 'men-rings'],
                    ['name' => 'Cufflinks', 'slug' => 'men-cufflinks'],
                ]
            ],
            [
                'name' => 'Watches',
                'description' => 'Luxury and everyday watches for men and women.',
                'image' => 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&auto=format&fit=crop',
                'is_featured' => true,
                'subcategories' => [
                    ['name' => 'Luxury Watches', 'slug' => 'women-luxury'],
                    ['name' => 'Everyday Wear', 'slug' => 'women-everyday'],
                    ['name' => 'Automatic', 'slug' => 'men-automatic'],
                    ['name' => 'Chronograph', 'slug' => 'men-chronograph'],
                    ['name' => 'Luxury', 'slug' => 'men-luxury'],
                ]
            ]
        ];

        foreach ($categoryData as $idx => $cat) {
            $category = Category::updateOrCreate(
                ['slug' => Str::slug($cat['name'])],
                [
                    'name' => $cat['name'],
                    'description' => $cat['description'],
                    'image' => $cat['image'],
                    'is_featured' => $cat['is_featured'],
                    'sort_order' => $idx + 1,
                    'is_active' => true
                ]
            );

            foreach ($cat['subcategories'] as $subIdx => $sub) {
                SubCategory::updateOrCreate(
                    ['slug' => $sub['slug'], 'category_id' => $category->id],
                    [
                        'name' => $sub['name'],
                        'sort_order' => $subIdx + 1,
                        'is_active' => true
                    ]
                );
            }
        }
    }
}

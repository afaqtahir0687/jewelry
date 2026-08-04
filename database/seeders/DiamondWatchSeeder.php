<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Jeweller;
use Illuminate\Support\Str;

class DiamondWatchSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            // Watches
            [
                "title" => "Luxury Men's Chronograph Watch",
                "price" => 125000,
                "primaryImg" => "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop",
                "hoverImg" => "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=800&auto=format&fit=crop",
                "targetCategoryName" => "Watches",
                "subCategorySlug" => "men-luxury"
            ],
            [
                "title" => "Elegant Women's Rose Gold Watch",
                "price" => 85000,
                "primaryImg" => "https://images.unsplash.com/photo-1587836374828-564a51e5abe3?q=80&w=800&auto=format&fit=crop",
                "hoverImg" => "https://images.unsplash.com/photo-1587836374828-564a51e5abe3?q=80&w=800&auto=format&fit=crop",
                "targetCategoryName" => "Watches",
                "subCategorySlug" => "women-luxury"
            ],
            [
                "title" => "Classic Leather Band Vintage Watch",
                "price" => 45000,
                "primaryImg" => "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop",
                "hoverImg" => "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=800&auto=format&fit=crop",
                "targetCategoryName" => "Watches",
                "subCategorySlug" => "men-luxury"
            ],
            [
                "title" => "Minimalist Silver Dial Watch",
                "price" => 65000,
                "primaryImg" => "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop",
                "hoverImg" => "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=800&auto=format&fit=crop",
                "targetCategoryName" => "Watches",
                "subCategorySlug" => "men-luxury"
            ],
            
            // Diamonds
            [
                "title" => "Solitaire Diamond Engagement Ring",
                "price" => 450000,
                "primaryImg" => "https://images.unsplash.com/photo-1605100804763-247f6612d54e?q=80&w=800&auto=format&fit=crop",
                "hoverImg" => "https://images.unsplash.com/photo-1605100804763-247f6612d54e?q=80&w=800&auto=format&fit=crop",
                "targetCategoryName" => "Diamond",
                "subCategorySlug" => "women-engagement-rings"
            ],
            [
                "title" => "Diamond Halo Pendant Necklace",
                "price" => 280000,
                "primaryImg" => "https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?q=80&w=800&auto=format&fit=crop",
                "hoverImg" => "https://images.unsplash.com/photo-1599643478524-fb66f70d00f8?q=80&w=800&auto=format&fit=crop",
                "targetCategoryName" => "Diamond",
                "subCategorySlug" => "women-pendants"
            ],
            [
                "title" => "Tennis Diamond Bracelet",
                "price" => 550000,
                "primaryImg" => "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
                "hoverImg" => "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?q=80&w=800&auto=format&fit=crop",
                "targetCategoryName" => "Diamond",
                "subCategorySlug" => "women-bracelets"
            ],
            [
                "title" => "Classic Diamond Stud Earrings",
                "price" => 150000,
                "primaryImg" => "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
                "hoverImg" => "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=800&auto=format&fit=crop",
                "targetCategoryName" => "Diamond",
                "subCategorySlug" => "women-earrings"
            ],
            [
                "title" => "Princess Cut Diamond Ring",
                "price" => 390000,
                "primaryImg" => "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
                "hoverImg" => "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
                "targetCategoryName" => "Diamond",
                "subCategorySlug" => "women-rings"
            ]
        ];

        $jewellers = Jeweller::all();
        if ($jewellers->isEmpty()) {
            return;
        }

        foreach ($products as $pData) {
            $category = Category::where('name', $pData['targetCategoryName'])->first();
            if (!$category) continue;

            $sub = SubCategory::where('category_id', $category->id)->where('slug', $pData['subCategorySlug'])->first();
            if (!$sub) {
                $sub = SubCategory::where('category_id', $category->id)->first();
            }
            
            $jeweller = $jewellers->random();
            $isFeatured = rand(1, 10) > 4; 
            $isLatest = rand(1, 10) > 3;

            $hasDiscount = rand(1, 10) > 5;
            $discountPrice = $hasDiscount ? round($pData['price'] * 0.85) : null;

            $product = Product::create([
                'jeweller_id' => $jeweller->id,
                'category_id' => $category->id,
                'subcategory_id' => $sub ? $sub->id : null,
                'title' => $pData['title'],
                'slug' => Str::slug($pData['title'] . '-' . Str::random(4)),
                'description' => "A beautifully crafted piece. Elegant, modern, and high quality.",
                'price_on_request' => false,
                'price' => $pData['price'],
                'discount_price' => $discountPrice,
                'gold_purity' => $pData['targetCategoryName'] === 'Diamond' ? '18K White Gold' : 'N/A',
                'approximate_weight' => rand(5, 25) . ' grams',
                'status' => 'available',
                'is_featured' => $isFeatured,
                'is_latest_arrival' => $isLatest,
                'sort_order' => rand(1, 100),
            ]);

            ProductImage::create([
                'product_id' => $product->id,
                'path' => $pData['primaryImg'],
                'sort_order' => 0
            ]);

            ProductImage::create([
                'product_id' => $product->id,
                'path' => $pData['hoverImg'],
                'sort_order' => 1
            ]);
        }
    }
}

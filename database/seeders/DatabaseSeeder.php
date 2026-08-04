<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\City;
use App\Models\Category;
use App\Models\SubCategory;
use App\Models\Jeweller;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\Review;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
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

        // 3. Categories & SubCategories
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

        // 4. Jewellers
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

        $jewellerModels = [];
        foreach ($jewellerData as $jd) {
            $user = User::updateOrCreate(
                ['email' => $jd['email']],
                ['name' => $jd['name'], 'password' => bcrypt('seller1234')]
            );
            $user->syncRoles([$sellerRole]);

            $city = City::where('slug', $jd['city_slug'])->first();

            $jewellerModels[] = Jeweller::updateOrCreate(
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

        // 5. Scraped products from Zeesy.pk (40 products - 10 per category)
        $scrapedProducts = [
            // Earrings
            [
                "title" => "Jasmine Cut Heritage Pearl Earrings",
                "price" => 3500,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/JasmineCutHeritagePearlEarrings-G-2.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/JasmineCutHeritagePearlEarrings-G-1.webp",
                "category" => "Earrings"
            ],
            [
                "title" => "Tatiana Glam Crystal Studs Earrings",
                "price" => 2000,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/TatianaGlamCrystalStudsEarrings-G-5.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/TatianaGlamCrystalStudsEarrings-G-4.webp",
                "category" => "Earrings"
            ],
            [
                "title" => "Leaf Zircon Dangle Earrings",
                "price" => 999,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/LeafZirconDangleEarrings-S-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/LeafZirconDangleEarrings-S-2.webp",
                "category" => "Earrings"
            ],
            [
                "title" => "Lotus Floral Beads Earrings",
                "price" => 1400,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/LotusFloralBeadsBridalEarrings-Red-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/LotusFloralBeadsBridalEarrings-Red-4.webp",
                "category" => "Earrings"
            ],
            [
                "title" => "Moon Pearl Stone Chandbali Earrings",
                "price" => 1400,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/MoonPearlStoneChandbaliEarrings-GR-3.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/MoonPearlStoneChandbaliEarrings-GG-2.webp",
                "category" => "Earrings"
            ],
            [
                "title" => "Floral Square Stone Pave Earrings",
                "price" => 4250,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/FloralSquareStoneBridalEarrings-GG-2.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/FloralSquareStoneBridalEarrings-GR-1.webp",
                "category" => "Earrings"
            ],
            [
                "title" => "Regal Drop Stone Jhumka Earrings",
                "price" => 2000,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/RegalDropStoneJhumkaEarrings-GR-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/RegalDropStoneJhumkaEarrings-GG-2.webp",
                "category" => "Earrings"
            ],
            [
                "title" => "Flora Petite Studs Earrings",
                "price" => 999,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/FloraPetiteStudsEarrings-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/FloraPetiteStudsEarrings-4.webp",
                "category" => "Earrings"
            ],
            [
                "title" => "Elegant Vertex Minimal Earring",
                "price" => 699,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/ElegantVertexMinimalEarrings-5_2ace4fb4-2d3a-403b-9b84-bf63aadc0044.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/ElegantVertexMinimalEarrings-1_1bb934de-eb8e-4512-99a2-4fa88588d85e.webp",
                "category" => "Earrings"
            ],
            [
                "title" => "Bella Triple Layers Earring Sahara",
                "price" => 1890,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/BellaTripleLayersEarringSahara-G-R-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/BellaTripleLayersEarringSahara-G-1.webp",
                "category" => "Earrings"
            ],

            // Finger Rings
            [
                "title" => "Silver Vintage Uncut Stone Ring",
                "price" => 1590,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/SilverVintageUncutStoneRing-S-Mint_Pink-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/SilverVintageUncutStoneRing-S-Whit-1.webp",
                "category" => "Finger Rings"
            ],
            [
                "title" => "Silver Stunning Circle Crystal Ring",
                "price" => 2970,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/SilverStunningCircleCrystalRing-S-Whit-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/SilverStunningCircleCrystalRing-S-Mint_Pink-2.webp",
                "category" => "Finger Rings"
            ],
            [
                "title" => "Royal Azure Cluster Ring",
                "price" => 3750,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/RoyalAzureClusterRing-G-Ruby-2.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/RoyalAzureClusterRing-G-Ruby-3.webp",
                "category" => "Finger Rings"
            ],
            [
                "title" => "Elegant Center Stone Ring",
                "price" => 3750,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/ElegantCenterStoneRing-G-Gree-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/ElegantCenterStoneRing-G-Red-1.webp",
                "category" => "Finger Rings"
            ],
            [
                "title" => "Golden Stunning Circle Crystal Ring",
                "price" => 2970,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/GoldenStunningCircleCrystalRing-G-Ruby-2.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/GoldenStunningCircleCrystalRing-G-Cham-1.webp",
                "category" => "Finger Rings"
            ],
            [
                "title" => "Golden Pretty Bold Stone Ring",
                "price" => 1390,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/GoldenPrettyBoldStoneRing-G-Whit-3.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/GoldenPrettyBoldStoneRing-G-Whit-2.webp",
                "category" => "Finger Rings"
            ],
            [
                "title" => "Golden Bloom Leaf Stone Ring",
                "price" => 1680,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/GoldenBloomLeafStoneRing-G-Blue-2.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/GoldenBloomLeafStoneRing-G-Cham-2.webp",
                "category" => "Finger Rings"
            ],
            [
                "title" => "Velora Circle Bold Stone Ring",
                "price" => 3750,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/VeloraCircleBoldStoneRing-G-Ruby_Red-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/VeloraCircleBoldStoneRing-G-Ruby_Blue-2_040212dc-2bf2-4aba-8e25-c561da6fb45c.webp",
                "category" => "Finger Rings"
            ],
            [
                "title" => "Silver Bloom Leaf Stone Ring",
                "price" => 1680,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/SilverBloomLeafStoneRing-S-Mint_Gree-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/SilverBloomLeafStoneRing-S-Gree-1.webp",
                "category" => "Finger Rings"
            ],
            [
                "title" => "Metallic Statement Gemstone Ring",
                "price" => 1590,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/MetallicStatementGemstoneRing-M-Multi-2.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/MetallicStatementGemstoneRing-M-Ruby-2.webp",
                "category" => "Finger Rings"
            ],

            // Necklace Sets
            [
                "title" => "Square Bold Stone Necklace Set",
                "price" => 3000,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/SquareBoldStoneNecklaceSet-GP-3.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/SquareBoldStoneNecklaceSet-GR-3.webp",
                "category" => "Necklace Sets"
            ],
            [
                "title" => "Moon Pearl Stone Necklace Set",
                "price" => 2700,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/MoonPearlStoneNecklaceSet-G_R-2.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/MoonPearlStoneNecklaceSet-S_W-2.webp",
                "category" => "Necklace Sets"
            ],
            [
                "title" => "Ethereal Gemstone Beads Necklace Set",
                "price" => 4000,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/EtherealGemstoneBeadsNecklaceSet-G-R-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/EtherealGemstoneBeadsNecklaceSet-G-W-3.webp",
                "category" => "Necklace Sets"
            ],
            [
                "title" => "Heritage Stone Beads Necklace Set",
                "price" => 4000,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/HeritageStoneBeadsNecklaceSet-G-3.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/HeritageStoneBeadsNecklaceSet-M_P-2.webp",
                "category" => "Necklace Sets"
            ],
            [
                "title" => "Gulnar Baroque Pearl Choker Set",
                "price" => 5000,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/GulnarBaroquePearlChokerSet-GR-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/GulnarBaroquePearlChokerSet-F-1_5ff419c3-88ba-41ee-9bfe-61c3f60ab0fb.webp",
                "category" => "Necklace Sets"
            ],
            [
                "title" => "Geometric Bold Kundan Necklace Set",
                "price" => 6000,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/GeometricBoldKundanNecklaceSet-G-W-4.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/GeometricBoldKundanNecklaceSet-G-5.webp",
                "category" => "Necklace Sets"
            ],
            [
                "title" => "Crimson Wave Pearl Choker Set",
                "price" => 5000,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/CrimsonWavePearlChokerSet-G-2.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/CrimsonWavePearlChokerSet-Multi-1.webp",
                "category" => "Necklace Sets"
            ],
            [
                "title" => "Glow Baroque Pearl Choker Set",
                "price" => 5000,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/GlowBaroquePearlChokerSet-R-3.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/GlowBaroquePearlChokerSet-M-2.webp",
                "category" => "Necklace Sets"
            ],
            [
                "title" => "Crimson Gemstone Hasli Necklace Set",
                "price" => 5600,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/CrimsonGemstoneHasliNecklaceSet-R-2.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/CrimsonGemstoneHasliNecklaceSet-B-3.webp",
                "category" => "Necklace Sets"
            ],
            [
                "title" => "Mosaic Pearl Royale Malla Set",
                "price" => 7000,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/MosaicPearlRoyaleMallaSet-TP-3.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/MosaicPearlRoyaleMallaSet-M-1.webp",
                "category" => "Necklace Sets"
            ],

            // Bracelets & Bangles
            [
                "title" => "Sweetheart Charm Modern Chain Bracelet",
                "price" => 1099,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/SweetheartCharmModernChainBracelet-G-3_d4c72910-02e4-4e51-b229-5d599fb8fb93.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/SweetheartCharmModernChainBracelet-G-1_931c457e-c5a1-4dda-8d76-a4903f4035e5.webp",
                "category" => "Bracelets & Bangles"
            ],
            [
                "title" => "Orchid Petal Minimal Delicate Bracelet",
                "price" => 1199,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/OrchidPetalMinimalDelicateBracelet-G-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/OrchidPetalMinimalDelicateBracelet-G-5.webp",
                "category" => "Bracelets & Bangles"
            ],
            [
                "title" => "Heart Bezel Modern Zircon Bracelet",
                "price" => 1199,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/HeartBezelModernZirconBracelet-G-4.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/HeartBezelModernZirconBracelet-G-3.webp",
                "category" => "Bracelets & Bangles"
            ],
            [
                "title" => "Dawn Link Minimal Delicate Bracelet",
                "price" => 899,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/DawnLinkMinimalDelicateBracelet-G-3.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/DawnLinkMinimalDelicateBracelet-G-2.webp",
                "category" => "Bracelets & Bangles"
            ],
            [
                "title" => "Daisy Minimalist Pearl Bracelet",
                "price" => 1099,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/DaisyMinimalistPearlBracelet-G-1.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/DaisyMinimalistPearlBracelet-G-3.webp",
                "category" => "Bracelets & Bangles"
            ],
            [
                "title" => "Celestial Layered Minimal Delicate Bracelet",
                "price" => 1499,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/AsterBowZirconiaStrandBracelet-G-4_9354a247-a005-4ef2-957d-e30e34020d77.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/CelestialLayeredMinimalDelicateBracelet-G-2.webp",
                "category" => "Bracelets & Bangles"
            ],
            [
                "title" => "Aster Bow Zirconia Strand Bracelet",
                "price" => 800,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/AsterBowZirconiaStrandBracelet-G-4_148f9afa-b8bc-42f8-80ef-669c6941d3e8.webp",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/AsterBowZirconiaStrandBracelet-G-3.webp",
                "category" => "Bracelets & Bangles"
            ],
            [
                "title" => "Stardust Delicate Zircon Bangle",
                "price" => 2500,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/OrnatePetalMedallionBangles.webp?v=1785322796",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/OrnatePetalMedallionBangles.webp?v=1785322796",
                "category" => "Bracelets & Bangles"
            ],
            [
                "title" => "Gilded Dual Tone Dewdrop Bangles",
                "price" => 4000,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/GildedDualToneDewdropBangles.webp?v=1785322796",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/GildedDualToneDewdropBangles.webp?v=1785322796",
                "category" => "Bracelets & Bangles"
            ],
            [
                "title" => "Gulaal Flora Ruby Stone Bangles",
                "price" => 38600,
                "primaryImg" => "https://zeesy.pk/cdn/shop/files/GulaalFloraRubyStoneBangles.webp?v=1783335128",
                "hoverImg" => "https://zeesy.pk/cdn/shop/files/GulaalFloraRubyStoneBangles.webp?v=1783335128",
                "category" => "Bracelets & Bangles"
            ]
        ];

        foreach ($scrapedProducts as $pData) {
            $titleLower = strtolower($pData['title']);
            
            if (str_contains($titleLower, 'watch')) {
                $targetCategoryName = 'Watches';
                if (str_contains($titleLower, 'men')) {
                    $subCategorySlug = 'men-luxury';
                } else {
                    $subCategorySlug = 'women-luxury';
                }
            } elseif (str_contains($titleLower, 'diamond')) {
                $targetCategoryName = 'Diamond';
                if (str_contains($titleLower, 'earring')) {
                    $subCategorySlug = 'women-earrings';
                } elseif (str_contains($titleLower, 'ring')) {
                    $subCategorySlug = str_contains($titleLower, 'engagement') ? 'women-engagement-rings' : 'men-rings';
                } elseif (str_contains($titleLower, 'pendant')) {
                    $subCategorySlug = 'women-pendants';
                } elseif (str_contains($titleLower, 'bracelet') || str_contains($titleLower, 'bangle')) {
                    $subCategorySlug = 'women-bracelets';
                } else {
                    $subCategorySlug = 'women-engagement-rings';
                }
            } else {
                $targetCategoryName = 'Gold';
                if (str_contains($titleLower, 'earring') || str_contains($titleLower, 'jhumka') || str_contains($titleLower, 'stud') || str_contains($titleLower, 'chandbali')) {
                    $subCategorySlug = 'women-earrings';
                } elseif (str_contains($titleLower, 'ring')) {
                    $subCategorySlug = 'women-rings';
                } elseif (str_contains($titleLower, 'necklace') || str_contains($titleLower, 'choker') || str_contains($titleLower, 'haram') || str_contains($titleLower, 'malla') || str_contains($titleLower, 'hasli')) {
                    $subCategorySlug = str_contains($titleLower, 'bridal') ? 'women-bridal-sets' : 'women-necklaces';
                } elseif (str_contains($titleLower, 'bracelet') || str_contains($titleLower, 'bangle')) {
                    $subCategorySlug = 'women-bangles';
                } else {
                    $subCategorySlug = 'women-rings';
                }
            }

            $category = Category::where('name', $targetCategoryName)->first();
            if (!$category) {
                continue;
            }

            $sub = SubCategory::where('category_id', $category->id)->where('slug', $subCategorySlug)->first();
            if (!$sub) {
                $sub = SubCategory::where('category_id', $category->id)->first();
            }
            $jeweller = $jewellerModels[array_rand($jewellerModels)];
            
            // Randomly flag some as featured / latest arrivals
            $isFeatured = rand(1, 10) > 4; // high percentage to show up
            $isLatest = rand(1, 10) > 3;

            // Calculate a random discount on 30% of the products
            $hasDiscount = rand(1, 10) > 7;
            $discountPrice = $hasDiscount ? round($pData['price'] * 0.85) : null; // 15% off

            $product = Product::create([
                'jeweller_id' => $jeweller->id,
                'category_id' => $category->id,
                'subcategory_id' => $sub ? $sub->id : null,
                'title' => $pData['title'],
                'slug' => Str::slug($pData['title'] . '-' . Str::random(4)),
                'description' => "A beautifully crafted piece from Zeesy. Elegant, modern, and lightweight.",
                'price_on_request' => false,
                'price' => $pData['price'],
                'discount_price' => $discountPrice,
                'gold_purity' => '22K Gold',
                'approximate_weight' => rand(3, 45) . ' grams',
                'status' => 'available',
                'is_featured' => $isFeatured,
                'is_latest_arrival' => $isLatest,
                'sort_order' => rand(1, 100),
            ]);

            // Save the two product images (Primary and Hover)
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

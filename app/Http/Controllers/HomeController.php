<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Contracts\CityRepositoryInterface;
use App\Services\CategoryService;
use App\Services\ProductService;
use Inertia\Inertia;

class HomeController extends Controller
{
    protected CategoryService $categoryService;
    protected CityRepositoryInterface $cityRepo;
    protected ProductService $productService;

    public function __construct(
        CategoryService $categoryService,
        CityRepositoryInterface $cityRepo,
        ProductService $productService
    ) {
        $this->categoryService = $categoryService;
        $this->cityRepo        = $cityRepo;
        $this->productService  = $productService;
    }

    public function index()
    {
        $latestArrivals    = $this->productService->getLatestArrivals(10);
        $featuredCategories = $this->categoryService->getFeaturedCategories(4);

        return Inertia::render('Home', [
            'categories'         => $this->categoryService->getActiveCategories(),
            'cities'             => $this->cityRepo->getActiveCities(),
            'latestArrivals'     => $latestArrivals->map(fn ($p) => $this->formatProductForCard($p)),
            'featuredCategories' => $featuredCategories->map(fn ($cat) => [
                'id'          => $cat->id,
                'name'        => $cat->name,
                'slug'        => $cat->slug,
                'description' => $cat->description,
                'image'       => $cat->image,
                'products'    => $cat->products->map(fn ($p) => $this->formatProductForCard($p)),
                'total_products' => $cat->products()->count(),
            ]),
            'faqs' => Faq::where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(['id', 'question', 'answer']),
        ]);
    }

    private function formatProductForCard($product): array
    {
        $images = $product->productImages;
        $legacyImages = $product->images ?? [];

        $primaryImage = $images->first()?->url
            ?? (is_array($legacyImages) ? ($legacyImages[0] ?? null) : null);
        $hoverImage   = $images->skip(1)->first()?->url ?? $primaryImage;

        return [
            'id'               => $product->id,
            'title'            => $product->title,
            'slug'             => $product->slug,
            'price'            => $product->price,
            'discount_price'   => $product->discount_price,
            'price_on_request' => $product->price_on_request,
            'status'           => $product->status,
            'is_featured'      => $product->is_featured,
            'is_latest_arrival'=> $product->is_latest_arrival,
            'primary_image'    => $primaryImage,
            'hover_image'      => $hoverImage,
            'category'         => [
                'id'   => $product->category?->id,
                'name' => $product->category?->name,
                'slug' => $product->category?->slug,
            ],
        ];
    }
}

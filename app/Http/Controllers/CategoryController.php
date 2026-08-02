<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Contracts\CityRepositoryInterface;
use App\Services\CategoryService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
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

    /**
     * Display all active categories.
     */
    public function index()
    {
        return Inertia::render('Categories', [
            'categories' => $this->categoryService->getActiveCategories(),
        ]);
    }

    /**
     * Display products for a specific category.
     */
    public function show(Request $request, Category $category)
    {
        if (!$category->is_active) {
            abort(404);
        }

        $filters = $request->only(['subcategory_id', 'status', 'purity', 'budget_max']);

        $category->load('subcategories');

        $paginatedProducts = $this->productService->getPaginatedList(
            array_merge(['category_id' => $category->id], $filters)
        );

        // Format products for the card
        $paginatedProducts->through(fn ($p) => $this->formatProductForCard($p));

        return Inertia::render('Category', [
            'category'      => [
                'id'           => $category->id,
                'name'         => $category->name,
                'slug'         => $category->slug,
                'description'  => $category->description,
                'image'        => $category->image,
                'banner_image' => $category->banner_image,
            ],
            'subcategories' => $category->subcategories->map(fn ($sc) => [
                'id'   => $sc->id,
                'name' => $sc->name,
            ])->values(),
            'products'      => $paginatedProducts,
            'cities'        => $this->cityRepo->getActiveCities(),
            'categories'    => $this->categoryService->getActiveCategories(),
            'filters'       => $filters,
        ]);
    }

    private function formatProductForCard($product): array
    {
        $images = $product->productImages ?? collect();
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
            'primary_image'    => $primaryImage,
            'hover_image'      => $hoverImage,
            'category'         => [
                'id'   => $product->category?->id,
                'name' => $product->category?->name,
                'slug' => $product->category?->slug,
            ],
            'subcategory'      => $product->subcategory ? [
                'id'   => $product->subcategory->id,
                'name' => $product->subcategory->name,
            ] : null,
        ];
    }
}

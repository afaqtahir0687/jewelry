<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Services\ProductService;
use Inertia\Inertia;

class ProductController extends Controller
{
    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function show(Product $product, string $slug)
    {
        // SEO-friendly redirect if slug doesn't match
        if ($product->slug !== $slug) {
            return redirect()->route('product.show', ['product' => $product->id, 'slug' => $product->slug], 301);
        }

        $product->load([
            'productImages' => fn($q) => $q->orderBy('sort_order'),
            'category',
            'subcategory',
        ]);

        $relatedProducts = $this->productService->getRelatedProducts($product->category_id, $product->id, 8);

        $images = $product->productImages;
        $legacyImages = $product->images ?? [];

        return Inertia::render('Product/Show', [
            'product' => [
                'id'                    => $product->id,
                'title'                 => $product->title,
                'slug'                  => $product->slug,
                'description'           => $product->description,
                'price'                 => $product->price,
                'price_on_request'      => $product->price_on_request,
                'gold_purity'           => $product->gold_purity,
                'approximate_weight'    => $product->approximate_weight,
                'stone_info'            => $product->stone_info,
                'status'                => $product->status,
                'customisation_options' => $product->customisation_options,
                'is_featured'           => $product->is_featured,
                'images'                => $images->isNotEmpty()
                    ? $images->map(fn ($i) => ['id' => $i->id, 'url' => $i->url])->values()
                    : collect($legacyImages)->map(fn ($url) => ['id' => null, 'url' => $url])->values(),
                'category'    => $product->category ? [
                    'id'   => $product->category->id,
                    'name' => $product->category->name,
                    'slug' => $product->category->slug,
                ] : null,
                'subcategory' => $product->subcategory ? [
                    'id'   => $product->subcategory->id,
                    'name' => $product->subcategory->name,
                ] : null,
            ],
            'relatedProducts' => $relatedProducts->map(fn ($p) => $this->formatProductForCard($p)),
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
            'price_on_request' => $product->price_on_request,
            'status'           => $product->status,
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

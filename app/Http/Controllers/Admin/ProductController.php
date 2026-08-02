<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\SubCategory;
use App\Services\ProductService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    protected ProductService $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request): Response
    {
        $filters  = $request->only(['search', 'sortField', 'sortDirection', 'category_id']);
        $products = $this->productService->getPaginatedList($filters)
            ->through(fn ($p) => [
                'id'                => $p->id,
                'title'             => $p->title,
                'slug'              => $p->slug,
                'category'          => $p->category?->name,
                'subcategory'       => $p->subcategory?->name,
                'price'             => $p->price,
                'discount_price'    => $p->discount_price,
                'price_on_request'  => $p->price_on_request,
                'status'            => $p->status,
                'gold_purity'       => $p->gold_purity,
                'is_featured'       => $p->is_featured,
                'is_latest_arrival' => $p->is_latest_arrival,
                'product_images'    => $p->productImages->map(fn ($img) => [
                    'id'   => $img->id,
                    'url'  => $img->url,
                    'path' => $img->path,
                ])->values(),
                'created_at' => $p->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Admin/Products/Index', [
            'products'   => $products,
            'filters'    => $filters,
            'categories' => Category::where('is_active', true)->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Products/Create', [
            'categories' => Category::where('is_active', true)->orderBy('name')->get(['id', 'name', 'slug']),
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $data = $request->safe()->except(['images', 'deleted_image_ids']);
        $this->productService->storeWithImages($data, $request->file('images') ?? []);

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product): Response
    {
        $product->load(['productImages' => fn($q) => $q->orderBy('sort_order'), 'category', 'subcategory']);

        return Inertia::render('Admin/Products/Edit', [
            'product'     => [
                'id'                  => $product->id,
                'title'               => $product->title,
                'slug'                => $product->slug,
                'category_id'         => $product->category_id,
                'subcategory_id'      => $product->subcategory_id,
                'description'         => $product->description,
                'price_on_request'    => $product->price_on_request,
                'price'               => $product->price,
                'discount_price'      => $product->discount_price,
                'gold_purity'         => $product->gold_purity,
                'approximate_weight'  => $product->approximate_weight,
                'stone_info'          => $product->stone_info,
                'status'              => $product->status,
                'customisation_options' => $product->customisation_options,
                'is_featured'         => $product->is_featured,
                'is_latest_arrival'   => $product->is_latest_arrival,
                'sort_order'          => $product->sort_order,
                'product_images'      => $product->productImages->map(fn ($img) => [
                    'id'         => $img->id,
                    'url'        => $img->url,
                    'path'       => $img->path,
                    'sort_order' => $img->sort_order,
                ])->values(),
            ],
            'categories'  => Category::where('is_active', true)->orderBy('name')->get(['id', 'name']),
            'subcategories' => SubCategory::where('category_id', $product->category_id)
                ->orderBy('sort_order')->get(['id', 'name', 'category_id']),
        ]);
    }

    public function update(StoreProductRequest $request, Product $product): RedirectResponse
    {
        $data           = $request->safe()->except(['images', 'deleted_image_ids']);
        $deletedImageIds = $request->input('deleted_image_ids', []);

        $this->productService->updateWithImages(
            $product->id,
            $data,
            $request->file('images') ?? [],
            $deletedImageIds
        );

        return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->productService->deleteWithImages($product->id);

        return redirect()->route('admin.products.index')->with('success', 'Product deleted.');
    }

    public function deleteImage(ProductImage $image): RedirectResponse
    {
        $this->productService->deleteSingleImage($image->id);

        return back()->with('success', 'Image removed.');
    }

    public function reorderImages(Request $request, Product $product): \Illuminate\Http\JsonResponse
    {
        $request->validate(['ordered_ids' => ['required', 'array'], 'ordered_ids.*' => ['integer']]);
        $this->productService->reorderImages($product->id, $request->input('ordered_ids'));

        return response()->json(['message' => 'Images reordered.']);
    }
}

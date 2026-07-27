<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Requests\Seller\StoreProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $jewellerId = auth()->user()->jeweller?->id;

        $products = Product::with('category')
            ->where('jeweller_id', $jewellerId)
            ->latest()
            ->paginate(12)
            ->through(fn ($p) => [
                'id'               => $p->id,
                'title'            => $p->title,
                'category'         => $p->category?->name,
                'price'            => $p->price,
                'price_on_request' => $p->price_on_request,
                'status'           => $p->status,
                'gold_purity'      => $p->gold_purity,
                'images'           => $p->images,
                'created_at'       => $p->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Seller/Products/Index', [
            'products' => $products,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Seller/Products/Create', [
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(StoreProductRequest $request): RedirectResponse
    {
        $jewellerId = auth()->user()->jeweller?->id;
        $data       = $request->validated();

        $images = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $images[] = $image->store('products', 'public');
            }
        }

        Product::create([
            ...$data,
            'jeweller_id' => $jewellerId,
            'slug'        => Str::slug($data['title']).'-'.uniqid(),
            'images'      => $images,
        ]);

        return redirect()->route('seller.products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product): Response
    {
        $this->authorizeProductAccess($product);

        return Inertia::render('Seller/Products/Edit', [
            'product'    => $product,
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(StoreProductRequest $request, Product $product): RedirectResponse
    {
        $this->authorizeProductAccess($product);

        $data = $request->validated();

        if ($request->hasFile('images')) {
            $images = [];
            foreach ($request->file('images') as $image) {
                $images[] = $image->store('products', 'public');
            }
            $data['images'] = $images;
        }

        $product->update($data);

        return redirect()->route('seller.products.index')->with('success', 'Product updated.');
    }

    public function destroy(Product $product): RedirectResponse
    {
        $this->authorizeProductAccess($product);
        $product->delete();

        return redirect()->route('seller.products.index')->with('success', 'Product deleted.');
    }

    private function authorizeProductAccess(Product $product): void
    {
        $jewellerId = auth()->user()->jeweller?->id;

        if ($product->jeweller_id !== $jewellerId) {
            abort(403, 'You do not have access to this product.');
        }
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Jeweller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        $products = Product::with(['jeweller', 'category'])
            ->latest()
            ->paginate(20)
            ->through(fn ($p) => [
                'id'             => $p->id,
                'title'          => $p->title,
                'jeweller'       => $p->jeweller?->business_name,
                'category'       => $p->category?->name,
                'price'          => $p->price,
                'price_on_request' => $p->price_on_request,
                'status'         => $p->status,
                'gold_purity'    => $p->gold_purity,
                'images'         => $p->images,
                'created_at'     => $p->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
        ]);
    }

    public function destroy(Product $product): RedirectResponse
    {
        $product->delete();

        return redirect()->route('admin.products.index')->with('success', 'Product deleted.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Contracts\CityRepositoryInterface;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    protected CategoryRepositoryInterface $categoryRepo;
    protected CityRepositoryInterface $cityRepo;
    protected ProductRepositoryInterface $productRepo;

    public function __construct(
        CategoryRepositoryInterface $categoryRepo,
        CityRepositoryInterface $cityRepo,
        ProductRepositoryInterface $productRepo
    ) {
        $this->categoryRepo = $categoryRepo;
        $this->cityRepo = $cityRepo;
        $this->productRepo = $productRepo;
    }

    public function show(Request $request, Category $category)
    {
        if (!$category->is_active) {
            abort(404);
        }

        $filters = $request->only(['city_id', 'status', 'purity', 'budget_max']);

        return Inertia::render('Category', [
            'category' => $category,
            'products' => $this->productRepo->getCategoryProductsPaginated($category->id, $filters),
            'cities' => $this->cityRepo->getActiveCities(),
            'categories' => $this->categoryRepo->getActiveCategories(),
            'filters' => $filters,
        ]);
    }
}

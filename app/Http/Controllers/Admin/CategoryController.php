<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    protected CategoryService $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    public function index(Request $request): Response
    {
        $filters    = $request->only(['search', 'sortField', 'sortDirection']);
        $categories = $this->categoryService->getPaginatedList($filters)
            ->through(fn ($c) => [
                'id'            => $c->id,
                'name'          => $c->name,
                'slug'          => $c->slug,
                'description'   => $c->description,
                'image'         => $c->image,
                'banner_image'  => $c->banner_image,
                'is_active'     => $c->is_active,
                'is_featured'   => $c->is_featured,
                'sort_order'    => $c->sort_order,
                'products_count'=> $c->products_count,
                'created_at'    => $c->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
            'filters'    => $filters,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Categories/Create');
    }

    public function store(StoreCategoryRequest $request): RedirectResponse
    {
        $this->categoryService->createCategory($request->validated());

        return redirect()->route('admin.categories.index')->with('success', 'Category created successfully.');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(StoreCategoryRequest $request, Category $category): RedirectResponse
    {
        $this->categoryService->updateCategory($category->id, $request->validated());

        return redirect()->route('admin.categories.index')->with('success', 'Category updated successfully.');
    }

    public function destroy(Category $category): RedirectResponse
    {
        $this->categoryService->deleteCategory($category->id);

        return redirect()->route('admin.categories.index')->with('success', 'Category deleted.');
    }

    public function toggleFeatured(Category $category): RedirectResponse
    {
        $newValue = $this->categoryService->toggleFeatured($category->id);
        $label    = $newValue ? 'marked as featured' : 'unmarked from featured';

        return back()->with('success', "Category \"{$category->name}\" {$label}.");
    }

    public function toggleActive(Category $category): RedirectResponse
    {
        $newValue = $this->categoryService->toggleActive($category->id);
        $label    = $newValue ? 'activated' : 'deactivated';

        return back()->with('success', "Category \"{$category->name}\" {$label}.");
    }
}

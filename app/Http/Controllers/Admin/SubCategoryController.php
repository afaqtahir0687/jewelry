<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreSubCategoryRequest;
use App\Models\Category;
use App\Models\SubCategory;
use App\Services\SubCategoryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class SubCategoryController extends Controller
{
    protected SubCategoryService $subCategoryService;

    public function __construct(SubCategoryService $subCategoryService)
    {
        $this->subCategoryService = $subCategoryService;
    }

    public function index(Request $request): Response
    {
        $filters       = $request->only(['search', 'category_id', 'sortField', 'sortDirection']);
        $subcategories = $this->subCategoryService->getPaginatedList($filters)
            ->through(fn ($sc) => [
                'id'          => $sc->id,
                'name'        => $sc->name,
                'slug'        => $sc->slug,
                'category'    => $sc->category?->name,
                'category_id' => $sc->category_id,
                'is_active'   => $sc->is_active,
                'sort_order'  => $sc->sort_order,
                'created_at'  => $sc->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Admin/SubCategories/Index', [
            'subcategories' => $subcategories,
            'filters'       => $filters,
            'categories'    => Category::where('is_active', true)->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/SubCategories/Create', [
            'categories' => Category::where('is_active', true)->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function store(StoreSubCategoryRequest $request): RedirectResponse
    {
        $data = $request->validated();
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        $this->subCategoryService->createSubCategory($data);

        return redirect()->route('admin.subcategories.index')->with('success', 'Subcategory created successfully.');
    }

    public function edit(SubCategory $subcategory): Response
    {
        return Inertia::render('Admin/SubCategories/Edit', [
            'subcategory' => $subcategory,
            'categories'  => Category::where('is_active', true)->orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(StoreSubCategoryRequest $request, SubCategory $subcategory): RedirectResponse
    {
        $data = $request->validated();
        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        $this->subCategoryService->updateSubCategory($subcategory->id, $data);

        return redirect()->route('admin.subcategories.index')->with('success', 'Subcategory updated successfully.');
    }

    public function destroy(SubCategory $subcategory): RedirectResponse
    {
        $this->subCategoryService->deleteSubCategory($subcategory->id);

        return redirect()->route('admin.subcategories.index')->with('success', 'Subcategory deleted.');
    }
}

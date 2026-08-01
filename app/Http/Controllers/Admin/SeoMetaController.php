<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SeoMeta;
use App\Http\Requests\SeoMetaRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SeoMetaController extends Controller
{
    public function index(Request $request)
    {
        $query = SeoMeta::query();
        if ($search = $request->input('search')) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('url_path', 'like', "%{$search}%");
        }
        $sortField = $request->input('sortField', 'id');
        $sortDirection = $request->input('sortDirection', 'desc');
        $query->orderBy($sortField, $sortDirection);

        return Inertia::render('Admin/SeoMetas/Index', [
            'seoMetas' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only(['search', 'sortField', 'sortDirection'])
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/SeoMetas/Create');
    }

    public function store(SeoMetaRequest $request)
    {
        SeoMeta::create($request->validated());
        return redirect()->route('admin.seo-metas.index')->with('success', 'SEO Meta added successfully.');
    }

    public function edit(SeoMeta $seo_meta)
    {
        return Inertia::render('Admin/SeoMetas/Edit', [
            'seoMeta' => $seo_meta
        ]);
    }

    public function update(SeoMetaRequest $request, SeoMeta $seo_meta)
    {
        $seo_meta->update($request->validated());
        return redirect()->route('admin.seo-metas.index')->with('success', 'SEO Meta updated successfully.');
    }

    public function destroy(SeoMeta $seo_meta)
    {
        $seo_meta->delete();
        return redirect()->route('admin.seo-metas.index')->with('success', 'SEO Meta deleted successfully.');
    }
}

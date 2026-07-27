<?php

namespace App\Http\Controllers;

use App\Models\Jeweller;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Contracts\CityRepositoryInterface;
use App\Repositories\Contracts\JewellerRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JewellerController extends Controller
{
    protected JewellerRepositoryInterface $jewellerRepo;
    protected CityRepositoryInterface $cityRepo;
    protected CategoryRepositoryInterface $categoryRepo;

    public function __construct(
        JewellerRepositoryInterface $jewellerRepo,
        CityRepositoryInterface $cityRepo,
        CategoryRepositoryInterface $categoryRepo
    ) {
        $this->jewellerRepo = $jewellerRepo;
        $this->cityRepo = $cityRepo;
        $this->categoryRepo = $categoryRepo;
    }

    public function show(Jeweller $jeweller)
    {
        if (!$jeweller->is_verified) {
            abort(404);
        }

        $jeweller->load(['city', 'products.category', 'reviews' => function ($query) {
            $query->where('is_approved', true)->latest();
        }]);

        return Inertia::render('Jeweller', [
            'jeweller' => $jeweller,
        ]);
    }

    public function index(Request $request)
    {
        $filters = $request->only(['city_id', 'area', 'speciality', 'custom_order', 'delivery', 'repair']);

        return Inertia::render('Search', [
            'jewellers' => $this->jewellerRepo->searchJewellers($filters),
            'cities' => $this->cityRepo->getActiveCities(),
            'categories' => $this->categoryRepo->getActiveCategories(),
            'filters' => $filters,
        ]);
    }
}

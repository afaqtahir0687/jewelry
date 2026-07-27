<?php

namespace App\Http\Controllers;

use App\Models\City;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Contracts\CityRepositoryInterface;
use App\Repositories\Contracts\JewellerRepositoryInterface;
use Inertia\Inertia;

class CityController extends Controller
{
    protected CityRepositoryInterface $cityRepo;
    protected CategoryRepositoryInterface $categoryRepo;
    protected JewellerRepositoryInterface $jewellerRepo;

    public function __construct(
        CityRepositoryInterface $cityRepo,
        CategoryRepositoryInterface $categoryRepo,
        JewellerRepositoryInterface $jewellerRepo
    ) {
        $this->cityRepo = $cityRepo;
        $this->categoryRepo = $categoryRepo;
        $this->jewellerRepo = $jewellerRepo;
    }

    public function show(City $city)
    {
        if (!$city->is_active) {
            abort(404);
        }

        return Inertia::render('City', [
            'city' => $city,
            'jewellers' => $this->jewellerRepo->getCityJewellers($city->id),
            'categories' => $this->categoryRepo->getActiveCategories(),
        ]);
    }
}

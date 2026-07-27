<?php

namespace App\Http\Controllers;

use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Contracts\CityRepositoryInterface;
use App\Repositories\Contracts\JewellerRepositoryInterface;
use App\Repositories\Contracts\ProductRepositoryInterface;
use Inertia\Inertia;

class HomeController extends Controller
{
    protected CategoryRepositoryInterface $categoryRepo;
    protected CityRepositoryInterface $cityRepo;
    protected JewellerRepositoryInterface $jewellerRepo;
    protected ProductRepositoryInterface $productRepo;

    public function __construct(
        CategoryRepositoryInterface $categoryRepo,
        CityRepositoryInterface $cityRepo,
        JewellerRepositoryInterface $jewellerRepo,
        ProductRepositoryInterface $productRepo
    ) {
        $this->categoryRepo = $categoryRepo;
        $this->cityRepo = $cityRepo;
        $this->jewellerRepo = $jewellerRepo;
        $this->productRepo = $productRepo;
    }

    public function index()
    {
        return Inertia::render('Home', [
            'categories' => $this->categoryRepo->getActiveCategories(),
            'cities' => $this->cityRepo->getActiveCities(),
            'featuredJewellers' => $this->jewellerRepo->getFeaturedJewellers(6),
            'latestProducts' => $this->productRepo->getLatestProducts(6),
        ]);
    }
}

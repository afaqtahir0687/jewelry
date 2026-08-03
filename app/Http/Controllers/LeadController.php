<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreLeadRequest;
use App\Models\Jeweller;
use App\Repositories\Contracts\CategoryRepositoryInterface;
use App\Repositories\Contracts\CityRepositoryInterface;
use App\Repositories\Contracts\LeadRepositoryInterface;
use App\Services\LeadService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LeadController extends Controller
{
    protected LeadService $leadService;
    protected LeadRepositoryInterface $leadRepo;
    protected CityRepositoryInterface $cityRepo;
    protected CategoryRepositoryInterface $categoryRepo;

    public function __construct(
        LeadService $leadService,
        LeadRepositoryInterface $leadRepo,
        CityRepositoryInterface $cityRepo,
        CategoryRepositoryInterface $categoryRepo
    ) {
        $this->leadService = $leadService;
        $this->leadRepo = $leadRepo;
        $this->cityRepo = $cityRepo;
        $this->categoryRepo = $categoryRepo;
    }

    public function custom(Request $request)
    {
        $selectedJeweller = null;
        if ($request->filled('jeweller_id')) {
            $selectedJeweller = Jeweller::with('city')->find($request->jeweller_id);
        }

        $productTitle = $request->query('product_title');
        $productId = $request->query('product_id');
        $productImage = null;

        if ($productId) {
            $product = \App\Models\Product::with('productImages')->find($productId);
            if ($product) {
                $productImage = $product->primary_image_url;
                $categoryId = $product->category_id;
                if (!$productTitle) {
                    $productTitle = $product->title;
                }
            }
        }

        return Inertia::render('CustomQuote', [
            'cities' => $this->cityRepo->getActiveCities(),
            'categories' => $this->categoryRepo->getActiveCategories(),
            'selectedJeweller' => $selectedJeweller,
            'productTitle' => $productTitle,
            'productId' => $productId,
            'categoryId' => $categoryId ?? null,
            'productImage' => $productImage,
        ]);
    }

    public function store(StoreLeadRequest $request)
    {
        $validatedData = $request->validated();
        
        $lead = $this->leadService->createLead(
            $validatedData,
            $request->file('reference_image')
        );

        return redirect()->route('lead.success', ['lead_id' => $lead->lead_id]);
    }

    public function success(Request $request)
    {
        $leadId = $request->get('lead_id');
        $lead = $this->leadRepo->findByLeadId($leadId);

        return Inertia::render('Success', [
            'lead' => $lead,
        ]);
    }
}

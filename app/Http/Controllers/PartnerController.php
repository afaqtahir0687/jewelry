<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePartnerRequestRequest;
use App\Repositories\Contracts\CityRepositoryInterface;
use App\Services\JewellerRequestService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PartnerController extends Controller
{
    public function __construct(
        protected JewellerRequestService $jewellerRequestService,
        protected CityRepositoryInterface $cityRepo
    ) {}

    public function create(): Response
    {
        return Inertia::render('BecomePartner', [
            'cities' => $this->cityRepo->getActiveCities(),
        ]);
    }

    public function store(StorePartnerRequestRequest $request): RedirectResponse
    {
        $this->jewellerRequestService->createRequest($request->validated());

        return back()->with('success', 'Thank you for applying! Our team will review your application and get back to you soon.');
    }
}

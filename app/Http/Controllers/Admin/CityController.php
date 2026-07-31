<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCityRequest;
use App\Models\City;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Services\CityService;

class CityController extends Controller
{
    protected CityService $cityService;

    public function __construct(CityService $cityService)
    {
        $this->cityService = $cityService;
    }

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'sortField', 'sortDirection']);
        $cities = $this->cityService->getPaginatedList($filters);

        return Inertia::render('Admin/Cities/Index', [
            'cities' => $cities,
            'filters' => $filters
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Cities/Create');
    }

    public function store(StoreCityRequest $request): RedirectResponse
    {
        $this->cityService->createCity($request->validated());

        return redirect()->route('admin.cities.index')->with('success', 'City created.');
    }

    public function edit(City $city): Response
    {
        return Inertia::render('Admin/Cities/Edit', [
            'city' => $city
        ]);
    }

    public function update(StoreCityRequest $request, City $city): RedirectResponse
    {
        $this->cityService->updateCity($city->id, $request->validated());

        return redirect()->route('admin.cities.index')->with('success', 'City updated.');
    }

    public function destroy(City $city): RedirectResponse
    {
        $this->cityService->deleteCity($city->id);

        return redirect()->route('admin.cities.index')->with('success', 'City deleted.');
    }
}

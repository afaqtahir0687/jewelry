<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCityRequest;
use App\Models\City;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class CityController extends Controller
{
    public function index(): Response
    {
        $cities = City::withCount('jewellers')
            ->orderBy('name')
            ->paginate(20)
            ->through(fn ($c) => [
                'id'              => $c->id,
                'name'            => $c->name,
                'slug'            => $c->slug,
                'jewellers_count' => $c->jewellers_count,
                'created_at'      => $c->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Admin/Cities/Index', [
            'cities' => $cities,
        ]);
    }

    public function store(StoreCityRequest $request): RedirectResponse
    {
        City::create($request->validated());

        return back()->with('success', 'City created.');
    }

    public function update(StoreCityRequest $request, City $city): RedirectResponse
    {
        $city->update($request->validated());

        return back()->with('success', 'City updated.');
    }

    public function destroy(City $city): RedirectResponse
    {
        $city->delete();

        return back()->with('success', 'City deleted.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreJewellerRequest;
use App\Http\Requests\Admin\UpdateJewellerRequest;
use App\Models\City;
use App\Models\Jeweller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class JewellerController extends Controller
{
    public function index(): Response
    {
        $jewellers = Jeweller::with(['city', 'user'])
            ->withCount(['leads', 'products', 'reviews'])
            ->latest()
            ->paginate(20)
            ->through(fn ($j) => [
                'id'            => $j->id,
                'business_name' => $j->business_name,
                'slug'          => $j->slug,
                'city'          => $j->city?->name,
                'phone'         => $j->phone,
                'is_verified'   => $j->is_verified,
                'leads_count'   => $j->leads_count,
                'products_count' => $j->products_count,
                'reviews_count' => $j->reviews_count,
                'user_email'    => $j->user?->email,
                'created_at'    => $j->created_at->format('Y-m-d'),
            ]);

        return Inertia::render('Admin/Jewellers/Index', [
            'jewellers' => $jewellers,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Jewellers/Create', [
            'cities'        => City::orderBy('name')->get(['id', 'name']),
            'sellerUsers'   => User::role('seller')->whereDoesntHave('jeweller')->get(['id', 'name', 'email']),
        ]);
    }

    public function store(StoreJewellerRequest $request): RedirectResponse
    {
        Jeweller::create($request->validated());

        return redirect()->route('admin.jewellers.index')->with('success', 'Jeweller created successfully.');
    }

    public function edit(Jeweller $jeweller): Response
    {
        $jeweller->load('city', 'user');

        return Inertia::render('Admin/Jewellers/Edit', [
            'jeweller'    => $jeweller,
            'cities'      => City::orderBy('name')->get(['id', 'name']),
            'sellerUsers' => User::role('seller')->get(['id', 'name', 'email']),
        ]);
    }

    public function update(UpdateJewellerRequest $request, Jeweller $jeweller): RedirectResponse
    {
        $jeweller->update($request->validated());

        return back()->with('success', 'Jeweller updated successfully.');
    }

    public function destroy(Jeweller $jeweller): RedirectResponse
    {
        $jeweller->delete();

        return redirect()->route('admin.jewellers.index')->with('success', 'Jeweller deleted.');
    }
}

<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Lead;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $jeweller = auth()->user()->jeweller;

        if (! $jeweller) {
            return Inertia::render('Seller/Dashboard', [
                'stats'       => null,
                'recentLeads' => [],
                'noJeweller'  => true,
            ]);
        }

        $stats = [
            'total_leads'        => Lead::where('jeweller_id', $jeweller->id)->count(),
            'new_leads'          => Lead::where('jeweller_id', $jeweller->id)->where('status', 'new')->count(),
            'appointments_today' => Appointment::where('jeweller_id', $jeweller->id)
                ->whereDate('appointment_date', today())
                ->count(),
            'total_products'     => Product::where('jeweller_id', $jeweller->id)->count(),
            'pending_leads'      => Lead::where('jeweller_id', $jeweller->id)->where('status', 'contacted')->count(),
        ];

        $recentLeads = Lead::with(['city', 'category'])
            ->where('jeweller_id', $jeweller->id)
            ->latest()
            ->take(8)
            ->get()
            ->map(fn ($lead) => [
                'id'            => $lead->id,
                'lead_id'       => $lead->lead_id,
                'customer_name' => $lead->customer_name,
                'city'          => $lead->city?->name,
                'category'      => $lead->category?->name,
                'status'        => $lead->status,
                'budget'        => $lead->budget,
                'created_at'    => $lead->created_at->diffForHumans(),
            ]);

        return Inertia::render('Seller/Dashboard', [
            'stats'       => $stats,
            'recentLeads' => $recentLeads,
            'jeweller'    => [
                'business_name' => $jeweller->business_name,
                'is_verified'   => $jeweller->is_verified,
            ],
        ]);
    }
}

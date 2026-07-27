<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Jeweller;
use App\Models\Lead;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $stats = [
            'total_leads'      => Lead::count(),
            'new_leads'        => Lead::where('status', 'new')->count(),
            'total_jewellers'  => Jeweller::count(),
            'verified_jewellers' => Jeweller::where('is_verified', true)->count(),
            'total_products'   => Product::count(),
            'appointments_today' => Appointment::whereDate('appointment_date', today())->count(),
            'pending_reviews'  => Review::where('is_approved', false)->count(),
            'total_users'      => User::count(),
        ];

        $recentLeads = Lead::with(['jeweller', 'city', 'category'])
            ->latest()
            ->take(10)
            ->get()
            ->map(fn ($lead) => [
                'id'            => $lead->id,
                'lead_id'       => $lead->lead_id,
                'customer_name' => $lead->customer_name,
                'city'          => $lead->city?->name,
                'category'      => $lead->category?->name,
                'jeweller'      => $lead->jeweller?->business_name,
                'status'        => $lead->status,
                'created_at'    => $lead->created_at->diffForHumans(),
            ]);

        return Inertia::render('Admin/Dashboard', [
            'stats'       => $stats,
            'recentLeads' => $recentLeads,
        ]);
    }
}

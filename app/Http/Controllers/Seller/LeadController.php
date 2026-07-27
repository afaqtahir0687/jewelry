<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Requests\Seller\UpdateLeadRequest;
use App\Models\Lead;
use App\Services\LeadService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LeadController extends Controller
{
    public function __construct(private readonly LeadService $leadService) {}

    public function index(): Response
    {
        $jewellerId = auth()->user()->jeweller?->id;

        $leads = Lead::with(['city', 'category'])
            ->where('jeweller_id', $jewellerId)
            ->latest()
            ->paginate(15)
            ->through(fn ($lead) => [
                'id'              => $lead->id,
                'lead_id'         => $lead->lead_id,
                'customer_name'   => $lead->customer_name,
                'customer_phone'  => $lead->customer_phone,
                'city'            => $lead->city?->name,
                'category'        => $lead->category?->name,
                'status'          => $lead->status,
                'budget'          => $lead->budget,
                'sale_amount'     => $lead->sale_amount,
                'commission_type' => $lead->commission_type,
                'commission_amount' => $lead->commission_amount,
                'payment_status'  => $lead->payment_status,
                'preferred_contact_time' => $lead->preferred_contact_time,
                'created_at'      => $lead->created_at->format('Y-m-d H:i'),
            ]);

        return Inertia::render('Seller/Leads/Index', [
            'leads' => $leads,
        ]);
    }

    public function show(Lead $lead): Response
    {
        $this->authorizeLeadAccess($lead);

        $lead->load(['city', 'category', 'appointments']);

        return Inertia::render('Seller/Leads/Show', [
            'lead' => [
                'id'                      => $lead->id,
                'lead_id'                 => $lead->lead_id,
                'customer_name'           => $lead->customer_name,
                'customer_phone'          => $lead->customer_phone,
                'requirement_description' => $lead->requirement_description,
                'budget'                  => $lead->budget,
                'reference_image'         => $lead->reference_image,
                'preferred_contact_time'  => $lead->preferred_contact_time,
                'status'                  => $lead->status,
                'sale_amount'             => $lead->sale_amount,
                'commission_type'         => $lead->commission_type,
                'commission_amount'       => $lead->commission_amount,
                'payment_status'          => $lead->payment_status,
                'notes'                   => $lead->notes,
                'city'                    => $lead->city?->name,
                'category'                => $lead->category?->name,
                'appointments'            => $lead->appointments->map(fn ($a) => [
                    'id'               => $a->id,
                    'appointment_date' => $a->appointment_date?->format('Y-m-d'),
                    'appointment_time' => $a->appointment_time,
                    'status'           => $a->status,
                ]),
                'created_at' => $lead->created_at->format('Y-m-d H:i'),
            ],
        ]);
    }

    public function edit(Lead $lead): Response
    {
        return $this->show($lead);
    }

    public function update(UpdateLeadRequest $request, Lead $lead): RedirectResponse
    {
        $this->authorizeLeadAccess($lead);

        $data = $request->validated();

        if (! empty($data['sale_amount']) && $data['sale_amount'] > 0) {
            $commission = $this->leadService->calculateCommission($lead, (float) $data['sale_amount']);
            $data['commission_type']   = $commission['type'];
            $data['commission_amount'] = $commission['amount'];
        }

        $lead->update($data);

        return back()->with('success', 'Lead updated successfully.');
    }

    private function authorizeLeadAccess(Lead $lead): void
    {
        $jewellerId = auth()->user()->jeweller?->id;

        if ($lead->jeweller_id !== $jewellerId) {
            abort(403, 'You do not have access to this lead.');
        }
    }
}

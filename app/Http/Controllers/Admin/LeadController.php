<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateLeadRequest;
use App\Models\Lead;
use App\Repositories\Contracts\LeadRepositoryInterface;
use App\Services\LeadService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LeadController extends Controller
{
    public function __construct(
        private readonly LeadRepositoryInterface $leadRepo,
        private readonly LeadService $leadService,
    ) {}

    public function index(): Response
    {
        $leads = Lead::with(['jeweller', 'city', 'category'])
            ->latest()
            ->paginate(20)
            ->through(fn ($lead) => [
                'id'              => $lead->id,
                'lead_id'         => $lead->lead_id,
                'customer_name'   => $lead->customer_name,
                'customer_phone'  => $lead->customer_phone,
                'city'            => $lead->city?->name,
                'category'        => $lead->category?->name,
                'jeweller'        => $lead->jeweller?->business_name,
                'status'          => $lead->status,
                'budget'          => $lead->budget,
                'sale_amount'     => $lead->sale_amount,
                'commission_type' => $lead->commission_type,
                'commission_amount' => $lead->commission_amount,
                'payment_status'  => $lead->payment_status,
                'created_at'      => $lead->created_at->format('Y-m-d H:i'),
            ]);

        return Inertia::render('Admin/Leads/Index', [
            'leads' => $leads,
        ]);
    }

    public function show(Lead $lead): Response
    {
        $lead->load(['jeweller.city', 'city', 'category', 'appointments']);

        return Inertia::render('Admin/Leads/Show', [
            'lead' => [
                'id'                       => $lead->id,
                'lead_id'                  => $lead->lead_id,
                'customer_name'            => $lead->customer_name,
                'customer_phone'           => $lead->customer_phone,
                'requirement_description'  => $lead->requirement_description,
                'budget'                   => $lead->budget,
                'reference_image'          => $lead->reference_image,
                'preferred_contact_time'   => $lead->preferred_contact_time,
                'status'                   => $lead->status,
                'sale_amount'              => $lead->sale_amount,
                'commission_type'          => $lead->commission_type,
                'commission_amount'        => $lead->commission_amount,
                'payment_status'           => $lead->payment_status,
                'notes'                    => $lead->notes,
                'city'                     => $lead->city?->name,
                'category'                 => $lead->category?->name,
                'jeweller'                 => $lead->jeweller ? [
                    'id'            => $lead->jeweller->id,
                    'business_name' => $lead->jeweller->business_name,
                    'phone'         => $lead->jeweller->phone,
                    'whatsapp'      => $lead->jeweller->whatsapp,
                ] : null,
                'appointments' => $lead->appointments->map(fn ($a) => [
                    'id'               => $a->id,
                    'appointment_date' => $a->appointment_date?->format('Y-m-d'),
                    'appointment_time' => $a->appointment_time,
                    'status'           => $a->status,
                    'notes'            => $a->notes,
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
        $data = $request->validated();

        if (isset($data['sale_amount']) && $data['sale_amount'] > 0) {
            $commission = $this->leadService->calculateCommission($lead, (float) $data['sale_amount']);
            $data['commission_type']   = $commission['type'];
            $data['commission_amount'] = $commission['amount'];
        }

        $lead->update($data);

        return back()->with('success', 'Lead updated successfully.');
    }

    public function destroy(Lead $lead): RedirectResponse
    {
        $lead->delete();

        return redirect()->route('admin.leads.index')->with('success', 'Lead deleted.');
    }
}

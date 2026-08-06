<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\RejectJewellerRequestRequest;
use App\Models\JewellerRequest;
use App\Services\JewellerRequestService;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PartnerRequestController extends Controller
{
    public function __construct(protected JewellerRequestService $jewellerRequestService) {}

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status', 'sortField', 'sortDirection']);

        $requests = $this->jewellerRequestService->getPaginatedList($filters)
            ->through(fn (JewellerRequest $r) => [
                'id'             => $r->id,
                'name'           => $r->name,
                'business_name'  => $r->business_name,
                'email'          => $r->email,
                'phone'          => $r->phone,
                'city'           => $r->city?->name,
                'status'         => $r->status,
                'created_at'     => $r->created_at->format('d M Y, h:i A'),
            ]);

        return Inertia::render('Admin/PartnerRequests/Index', [
            'requests' => $requests,
            'filters'  => $filters,
        ]);
    }

    public function show(JewellerRequest $partnerRequest): Response
    {
        $partnerRequest->load('city', 'user');

        return Inertia::render('Admin/PartnerRequests/Show', [
            'partnerRequest' => $partnerRequest,
        ]);
    }

    public function approve(JewellerRequest $partnerRequest): RedirectResponse
    {
        $this->jewellerRequestService->approve($partnerRequest->id);

        return back()->with('success', 'Application approved. The applicant now has a seller account.');
    }

    public function reject(RejectJewellerRequestRequest $request, JewellerRequest $partnerRequest): RedirectResponse
    {
        $this->jewellerRequestService->reject($partnerRequest->id, $request->validated('rejection_reason'));

        return back()->with('success', 'Application rejected.');
    }

    public function destroy(JewellerRequest $partnerRequest): RedirectResponse
    {
        $this->jewellerRequestService->deleteRequest($partnerRequest->id);

        return redirect()->route('admin.partner-requests.index')->with('success', 'Application deleted.');
    }
}

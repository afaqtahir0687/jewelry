<?php

namespace App\Services;

use App\Models\Jeweller;
use App\Models\User;
use App\Repositories\Contracts\JewellerRequestRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Spatie\Permission\Models\Role;

class JewellerRequestService
{
    protected JewellerRequestRepositoryInterface $jewellerRequestRepository;
    protected EmailService $emailService;

    public function __construct(
        JewellerRequestRepositoryInterface $jewellerRequestRepository,
        EmailService $emailService
    ) {
        $this->jewellerRequestRepository = $jewellerRequestRepository;
        $this->emailService = $emailService;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->jewellerRequestRepository->getPaginatedList($filters, $perPage);
    }

    public function findRequest(int $id)
    {
        return $this->jewellerRequestRepository->findOrFail($id);
    }

    public function createRequest(array $data)
    {
        $data['status'] = 'pending';

        $request = $this->jewellerRequestRepository->create($data);

        $this->emailService->sendNewPartnerRequestNotification($request);

        return $request;
    }

    public function deleteRequest(int $id)
    {
        return $this->jewellerRequestRepository->delete($id);
    }

    /**
     * Approve a partner application: link to (or create) a User with the
     * 'seller' role, create their Jeweller shop record, and mark the
     * request approved.
     */
    public function approve(int $id)
    {
        $request = $this->jewellerRequestRepository->findOrFail($id);

        if ($request->status === 'approved') {
            return $request;
        }

        return DB::transaction(function () use ($request) {
            $sellerRole = Role::firstOrCreate(['name' => 'seller']);

            $user = User::where('email', $request->email)->first();
            $temporaryPassword = null;

            if (!$user) {
                $temporaryPassword = Str::password(12);
                $user = User::create([
                    'name'     => $request->name,
                    'email'    => $request->email,
                    'password' => bcrypt($temporaryPassword),
                ]);
            }

            if (!$user->hasRole('seller')) {
                $user->assignRole($sellerRole);
            }

            if (!$user->jeweller) {
                Jeweller::create([
                    'user_id'           => $user->id,
                    'business_name'     => $request->business_name,
                    'slug'              => Str::slug($request->business_name) . '-' . uniqid(),
                    'city_id'           => $request->city_id,
                    'area'              => $request->area ?? 'N/A',
                    'full_address'      => $request->full_address,
                    'phone'             => $request->phone,
                    'whatsapp'          => $request->whatsapp,
                    'years_in_business' => $request->years_in_business,
                    'specialities'      => $request->specialities,
                ]);
            }

            $request->update([
                'status'      => 'approved',
                'user_id'     => $user->id,
                'reviewed_at' => now(),
            ]);

            $this->emailService->sendPartnerRequestApprovedNotification($request, $temporaryPassword);

            return $request;
        });
    }

    public function reject(int $id, ?string $reason = null)
    {
        $request = $this->jewellerRequestRepository->findOrFail($id);

        $request->update([
            'status'            => 'rejected',
            'rejection_reason'  => $reason,
            'reviewed_at'       => now(),
        ]);

        $this->emailService->sendPartnerRequestRejectedNotification($request);

        return $request;
    }
}

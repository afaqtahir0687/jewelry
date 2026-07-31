<?php

namespace App\Services;

use App\Repositories\Contracts\LeadRepositoryInterface;
use App\Models\City;

class LeadService
{
    protected LeadRepositoryInterface $leadRepository;

    public function __construct(LeadRepositoryInterface $leadRepository)
    {
        $this->leadRepository = $leadRepository;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->leadRepository->getPaginatedList($filters, $perPage);
    }

    public function updateLead(int $id, array $data)
    {
        return $this->leadRepository->update($data, $id);
    }

    public function deleteLead(int $id)
    {
        return $this->leadRepository->delete($id);
    }

    public function findLead(int $id)
    {
        return $this->leadRepository->findOrFail($id);
    }

    public function createLead(array $data, $imageFile = null)
    {
        if ($imageFile) {
            $path = $imageFile->store('leads', 'public');
            $data['reference_image'] = $path;
        }

        // Generate Lead ID based on selected city name code
        $data['lead_id'] = $this->generateUniqueLeadId($data['city_id']);

        // Auto-assign and set status if jeweller_id is present
        if (!empty($data['jeweller_id'])) {
            $data['status'] = 'assigned';
        } else {
            $data['status'] = 'new';
        }

        return $this->leadRepository->create($data);
    }

    protected function generateUniqueLeadId($cityId): string
    {
        $cityCode = 'GEN';
        $city = City::find($cityId);
        
        if ($city) {
            $cityName = strtolower($city->name);
            if (str_contains($cityName, 'lahore')) {
                $cityCode = 'LHR';
            } elseif (str_contains($cityName, 'karachi')) {
                $cityCode = 'KHI';
            } elseif (str_contains($cityName, 'islamabad')) {
                $cityCode = 'ISB';
            } elseif (str_contains($cityName, 'rawalpindi')) {
                $cityCode = 'RWP';
            } elseif (str_contains($cityName, 'faisalabad')) {
                $cityCode = 'FSD';
            } elseif (str_contains($cityName, 'multan')) {
                $cityCode = 'MUX';
            } elseif (str_contains($cityName, 'peshawar')) {
                $cityCode = 'PEW';
            } elseif (str_contains($cityName, 'quetta')) {
                $cityCode = 'UET';
            }
        }
        
        $randomNum = str_pad(rand(1, 999999), 6, '0', STR_PAD_LEFT);
        return strtoupper($cityCode) . '-CUSTOM-' . $randomNum;
    }

    /**
     * Calculate commission for a completed sale.
     *
     * Rules:
     *   - If sale_amount >= 50,000 PKR → 3% percentage commission
     *   - Otherwise → flat Rs. 500 fixed commission
     *
     * @return array{type: string, amount: float}
     */
    public function calculateCommission(\App\Models\Lead $lead, float $saleAmount): array
    {
        if ($saleAmount >= 50000) {
            return [
                'type'   => 'percentage',
                'amount' => round($saleAmount * 0.03, 2),
            ];
        }

        return [
            'type'   => 'fixed',
            'amount' => 500.00,
        ];
    }
}


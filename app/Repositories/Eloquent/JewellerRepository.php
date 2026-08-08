<?php

namespace App\Repositories\Eloquent;

use App\Models\Jeweller;
use App\Repositories\Contracts\JewellerRepositoryInterface;

class JewellerRepository extends BaseRepository implements JewellerRepositoryInterface
{
    public function __construct(Jeweller $model)
    {
        parent::__construct($model);
    }

    public function getFeaturedJewellers($limit = 6)
    {
        return $this->model->where('is_verified', true)
            ->with('city')
            ->latest('verified_at')
            ->take($limit)
            ->get();
    }

    public function searchJewellers(array $filters)
    {
        $query = $this->model->where('is_verified', true)->with(['city']);

        if (!empty($filters['city_id'])) {
            $query->where('city_id', $filters['city_id']);
        }

        if (!empty($filters['area'])) {
            $query->where('area', 'like', '%' . $filters['area'] . '%');
        }

        if (!empty($filters['speciality'])) {
            $query->whereJsonContains('specialities', $filters['speciality']);
        }

        if (!empty($filters['category'])) {
            $query->whereHas('products', function ($q) use ($filters) {
                $q->whereHas('category', function ($cq) use ($filters) {
                    $cq->where('slug', $filters['category']);
                });
            });
        }

        if (!empty($filters['budget'])) {
            [$min, $max] = $this->parseBudgetRange($filters['budget']);
            $query->whereHas('products', function ($q) use ($min, $max) {
                if ($min !== null) {
                    $q->where('price', '>=', $min);
                }
                if ($max !== null) {
                    $q->where('price', '<=', $max);
                }
            });
        }

        if (!empty($filters['custom_order'])) {
            $query->where('custom_order_available', true);
        }

        if (!empty($filters['delivery'])) {
            $query->where('delivery_available', true);
        }

        if (!empty($filters['repair'])) {
            $query->where('repair_services_available', true);
        }

        return $query->paginate(9);
    }

    protected function parseBudgetRange(string $budget): array
    {
        return match ($budget) {
            'Under Rs. 100,000' => [null, 100000],
            'Rs. 100,000 - 250,000' => [100000, 250000],
            'Rs. 250,000 - 500,000' => [250000, 500000],
            'Above Rs. 500,000' => [500000, null],
            default => [null, null],
        };
    }

    public function getCityJewellers($cityId)
    {
        return $this->model->where('city_id', $cityId)
            ->where('is_verified', true)
            ->withCount('products')
            ->get();
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        $query = $this->model->with(['city', 'user'])
            ->withCount(['leads', 'products', 'reviews']);

        if (!empty($filters['search'])) {
            $query->where('business_name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('phone', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['sortField']) && !empty($filters['sortDirection'])) {
            $query->orderBy($filters['sortField'], $filters['sortDirection']);
        } else {
            $query->latest();
        }

        return $query->paginate($perPage);
    }
}

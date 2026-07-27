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

    public function getCityJewellers($cityId)
    {
        return $this->model->where('city_id', $cityId)
            ->where('is_verified', true)
            ->withCount('products')
            ->get();
    }
}

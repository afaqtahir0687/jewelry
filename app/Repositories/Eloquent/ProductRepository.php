<?php

namespace App\Repositories\Eloquent;

use App\Models\Product;
use App\Repositories\Contracts\ProductRepositoryInterface;

class ProductRepository extends BaseRepository implements ProductRepositoryInterface
{
    public function __construct(Product $model)
    {
        parent::__construct($model);
    }

    public function getLatestProducts($limit = 6)
    {
        return $this->model->with(['jeweller', 'category'])
            ->latest()
            ->take($limit)
            ->get();
    }

    public function getCategoryProductsPaginated($categoryId, array $filters)
    {
        $query = $this->model->where('category_id', $categoryId)
            ->with(['jeweller.city']);

        if (!empty($filters['city_id'])) {
            $query->whereHas('jeweller', function ($q) use ($filters) {
                $q->where('city_id', $filters['city_id']);
            });
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['purity'])) {
            $query->where('gold_purity', $filters['purity']);
        }

        if (!empty($filters['budget_max'])) {
            $query->where('price', '<=', $filters['budget_max']);
        }

        return $query->paginate(12);
    }
}

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

    public function getLatestArrivals(int $limit = 8)
    {
        return $this->model
            ->where('is_latest_arrival', true)
            ->with(['productImages' => fn($q) => $q->orderBy('sort_order'), 'category'])
            ->orderBy('sort_order')
            ->orderBy('created_at', 'desc')
            ->take($limit)
            ->get();
    }

    public function getFeaturedProducts(int $limit = 8)
    {
        return $this->model
            ->where('is_featured', true)
            ->with(['productImages' => fn($q) => $q->orderBy('sort_order'), 'category'])
            ->orderBy('sort_order')
            ->take($limit)
            ->get();
    }

    public function getCategoryProductsPaginated($categoryId, array $filters)
    {
        $query = $this->model
            ->where('category_id', $categoryId)
            ->with([
                'productImages' => fn($q) => $q->orderBy('sort_order'),
                'subcategory',
            ]);

        if (!empty($filters['subcategory_id'])) {
            $query->where('subcategory_id', $filters['subcategory_id']);
        }

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['purity'])) {
            $query->where('gold_purity', $filters['purity']);
        }

        if (!empty($filters['budget_max'])) {
            $query->where('price', '<=', $filters['budget_max'])
                  ->where('price_on_request', false);
        }

        return $query->orderBy('sort_order')->orderBy('created_at', 'desc')->paginate(12);
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        $query = $this->model->with(['category', 'subcategory'])
            ->withCount('productImages');

        if (!empty($filters['search'])) {
            $query->where('title', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (!empty($filters['sortField']) && !empty($filters['sortDirection'])) {
            $query->orderBy($filters['sortField'], $filters['sortDirection']);
        } else {
            $query->latest();
        }

        return $query->paginate($perPage);
    }

    public function findBySlug(string $slug)
    {
        return $this->model
            ->where('slug', $slug)
            ->with([
                'productImages' => fn($q) => $q->orderBy('sort_order'),
                'category',
                'subcategory',
            ])
            ->firstOrFail();
    }

    public function getRelatedProducts(int $categoryId, int $excludeProductId, int $limit = 8)
    {
        return $this->model
            ->where('category_id', $categoryId)
            ->where('id', '!=', $excludeProductId)
            ->with(['productImages' => fn($q) => $q->orderBy('sort_order')])
            ->inRandomOrder()
            ->take($limit)
            ->get();
    }

    // Legacy method kept for backward compatibility
    public function getLatestProducts($limit = 6)
    {
        return $this->getLatestArrivals($limit);
    }
}

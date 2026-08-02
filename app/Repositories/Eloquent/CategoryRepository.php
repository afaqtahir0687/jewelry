<?php

namespace App\Repositories\Eloquent;

use App\Models\Category;
use App\Repositories\Contracts\CategoryRepositoryInterface;

class CategoryRepository extends BaseRepository implements CategoryRepositoryInterface
{
    public function __construct(Category $model)
    {
        parent::__construct($model);
    }

    public function getActiveCategories()
    {
        return $this->model
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();
    }

    public function getFeaturedCategories(int $limit = 4)
    {
        return $this->model
            ->where('is_active', true)
            ->where('is_featured', true)
            ->orderBy('sort_order')
            ->with(['products' => function ($q) {
                $q->with(['productImages' => fn($q2) => $q2->orderBy('sort_order')])
                  ->where('status', '!=', 'design_inspiration')
                  ->orderBy('sort_order')
                  ->take(10);
            }])
            ->take($limit)
            ->get();
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        $query = $this->model->withCount('products');

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['sortField']) && !empty($filters['sortDirection'])) {
            $query->orderBy($filters['sortField'], $filters['sortDirection']);
        } else {
            $query->orderBy('sort_order')->orderBy('id', 'desc');
        }

        return $query->paginate($perPage);
    }
}

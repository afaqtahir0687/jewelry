<?php

namespace App\Repositories\Eloquent;

use App\Models\SubCategory;
use App\Repositories\Contracts\SubCategoryRepositoryInterface;

class SubCategoryRepository extends BaseRepository implements SubCategoryRepositoryInterface
{
    public function __construct(SubCategory $model)
    {
        parent::__construct($model);
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        $query = $this->model->with('category');

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['category_id'])) {
            $query->where('category_id', $filters['category_id']);
        }

        if (!empty($filters['sortField']) && !empty($filters['sortDirection'])) {
            $query->orderBy($filters['sortField'], $filters['sortDirection']);
        } else {
            $query->orderBy('category_id')->orderBy('sort_order');
        }

        return $query->paginate($perPage);
    }

    public function getByCategory(int $categoryId)
    {
        return $this->model->where('category_id', $categoryId)->orderBy('sort_order')->get();
    }

    public function getActiveByCategory(int $categoryId)
    {
        return $this->model
            ->where('category_id', $categoryId)
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->get();
    }
}

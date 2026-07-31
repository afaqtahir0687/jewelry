<?php

namespace App\Repositories\Eloquent;

use App\Models\Review;
use App\Repositories\Contracts\ReviewRepositoryInterface;

class ReviewRepository extends BaseRepository implements ReviewRepositoryInterface
{
    public function __construct(Review $model)
    {
        parent::__construct($model);
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        $query = $this->model->with(['jeweller']);

        if (!empty($filters['search'])) {
            $query->where('reviewer_name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('comment', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['sortField']) && !empty($filters['sortDirection'])) {
            $query->orderBy($filters['sortField'], $filters['sortDirection']);
        } else {
            $query->latest();
        }

        return $query->paginate($perPage);
    }
}

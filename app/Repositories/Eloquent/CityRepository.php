<?php

namespace App\Repositories\Eloquent;

use App\Models\City;
use App\Repositories\Contracts\CityRepositoryInterface;

class CityRepository extends BaseRepository implements CityRepositoryInterface
{
    public function __construct(City $model)
    {
        parent::__construct($model);
    }

    public function getActiveCities()
    {
        return $this->model->where('is_active', true)->get();
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        $query = $this->model->withCount('jewellers');

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['sortField']) && !empty($filters['sortDirection'])) {
            $query->orderBy($filters['sortField'], $filters['sortDirection']);
        } else {
            $query->orderBy('id', 'desc');
        }

        return $query->paginate($perPage);
    }
}

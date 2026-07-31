<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\PermissionRepositoryInterface;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Eloquent\Builder;

class PermissionRepository extends BaseRepository implements PermissionRepositoryInterface
{
    public function __construct(Permission $model)
    {
        parent::__construct($model);
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        $query = $this->model->newQuery();

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

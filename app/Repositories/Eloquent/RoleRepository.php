<?php

namespace App\Repositories\Eloquent;

use App\Repositories\Contracts\RoleRepositoryInterface;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Eloquent\Builder;

class RoleRepository extends BaseRepository implements RoleRepositoryInterface
{
    public function __construct(Role $model)
    {
        parent::__construct($model);
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        $query = $this->model->with('permissions');

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

    public function syncPermissions(int $roleId, array $permissions)
    {
        $role = $this->findOrFail($roleId);
        $role->syncPermissions($permissions);
    }
}

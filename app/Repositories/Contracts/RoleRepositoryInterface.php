<?php

namespace App\Repositories\Contracts;

interface RoleRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedList(array $filters = [], int $perPage = 15);
    public function syncPermissions(int $roleId, array $permissions);
}

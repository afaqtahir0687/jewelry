<?php

namespace App\Repositories\Contracts;

interface PermissionRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedList(array $filters = [], int $perPage = 15);
}

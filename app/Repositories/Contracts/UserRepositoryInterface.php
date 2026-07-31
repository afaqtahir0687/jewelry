<?php

namespace App\Repositories\Contracts;

interface UserRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedList(array $filters = [], int $perPage = 15);
}

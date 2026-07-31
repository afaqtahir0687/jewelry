<?php

namespace App\Repositories\Contracts;

interface ReviewRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedList(array $filters = [], int $perPage = 15);
}

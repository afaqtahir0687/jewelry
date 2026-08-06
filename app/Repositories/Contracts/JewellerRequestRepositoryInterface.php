<?php

namespace App\Repositories\Contracts;

interface JewellerRequestRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedList(array $filters = [], int $perPage = 15);
}

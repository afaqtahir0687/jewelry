<?php

namespace App\Repositories\Contracts;

interface CityRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedList(array $filters = [], int $perPage = 15);
    public function getActiveCities();
}

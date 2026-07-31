<?php

namespace App\Repositories\Contracts;

interface CategoryRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedList(array $filters = [], int $perPage = 15);
    public function getActiveCategories();
}

<?php

namespace App\Repositories\Contracts;

interface SubCategoryRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedList(array $filters = [], int $perPage = 15);
    public function getByCategory(int $categoryId);
    public function getActiveByCategory(int $categoryId);
}

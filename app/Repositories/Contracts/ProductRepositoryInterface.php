<?php

namespace App\Repositories\Contracts;

interface ProductRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedList(array $filters = [], int $perPage = 15);
    public function getLatestProducts($limit = 6);
    public function getCategoryProductsPaginated($categoryId, array $filters);
}

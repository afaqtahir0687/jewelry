<?php

namespace App\Repositories\Contracts;

interface ProductRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedList(array $filters = [], int $perPage = 15);
    public function getLatestArrivals(int $limit = 8);
    public function getFeaturedProducts(int $limit = 8);
    public function getCategoryProductsPaginated($categoryId, array $filters);
    public function findBySlug(string $slug);
    public function getRelatedProducts(int $categoryId, int $excludeProductId, int $limit = 8);
}

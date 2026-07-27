<?php

namespace App\Repositories\Contracts;

interface JewellerRepositoryInterface extends BaseRepositoryInterface
{
    public function getFeaturedJewellers($limit = 6);
    public function searchJewellers(array $filters);
    public function getCityJewellers($cityId);
}

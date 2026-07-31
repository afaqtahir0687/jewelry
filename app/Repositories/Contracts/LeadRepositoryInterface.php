<?php

namespace App\Repositories\Contracts;

interface LeadRepositoryInterface extends BaseRepositoryInterface
{
    public function getPaginatedList(array $filters = [], int $perPage = 15);
    public function findByLeadId($leadId);
}

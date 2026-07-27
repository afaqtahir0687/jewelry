<?php

namespace App\Repositories\Contracts;

interface LeadRepositoryInterface extends BaseRepositoryInterface
{
    public function findByLeadId($leadId);
}

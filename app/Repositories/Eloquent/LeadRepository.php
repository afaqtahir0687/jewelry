<?php

namespace App\Repositories\Eloquent;

use App\Models\Lead;
use App\Repositories\Contracts\LeadRepositoryInterface;

class LeadRepository extends BaseRepository implements LeadRepositoryInterface
{
    public function __construct(Lead $model)
    {
        parent::__construct($model);
    }

    public function findByLeadId($leadId)
    {
        return $this->model->where('lead_id', $leadId)
            ->with(['city', 'jeweller'])
            ->firstOrFail();
    }
}

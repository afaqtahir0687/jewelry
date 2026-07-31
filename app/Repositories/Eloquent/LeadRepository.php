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

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        $query = $this->model->with(['city', 'jeweller']);

        if (!empty($filters['search'])) {
            $query->where('name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('phone', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('lead_id', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['sortField']) && !empty($filters['sortDirection'])) {
            $query->orderBy($filters['sortField'], $filters['sortDirection']);
        } else {
            $query->latest();
        }

        return $query->paginate($perPage);
    }
}

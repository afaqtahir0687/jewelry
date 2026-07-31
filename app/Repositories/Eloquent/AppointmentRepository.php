<?php

namespace App\Repositories\Eloquent;

use App\Models\Appointment;
use App\Repositories\Contracts\AppointmentRepositoryInterface;

class AppointmentRepository extends BaseRepository implements AppointmentRepositoryInterface
{
    public function __construct(Appointment $model)
    {
        parent::__construct($model);
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        $query = $this->model->with(['jeweller', 'lead']);

        if (!empty($filters['search'])) {
            $query->where('customer_name', 'like', '%' . $filters['search'] . '%')
                  ->orWhere('customer_phone', 'like', '%' . $filters['search'] . '%');
        }

        if (!empty($filters['sortField']) && !empty($filters['sortDirection'])) {
            $query->orderBy($filters['sortField'], $filters['sortDirection']);
        } else {
            $query->latest('appointment_date');
        }

        return $query->paginate($perPage);
    }
}

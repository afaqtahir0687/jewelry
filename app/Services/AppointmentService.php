<?php

namespace App\Services;

use App\Repositories\Contracts\AppointmentRepositoryInterface;

class AppointmentService
{
    protected AppointmentRepositoryInterface $appointmentRepository;

    public function __construct(AppointmentRepositoryInterface $appointmentRepository)
    {
        $this->appointmentRepository = $appointmentRepository;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->appointmentRepository->getPaginatedList($filters, $perPage);
    }

    public function createAppointment(array $data)
    {
        return $this->appointmentRepository->create($data);
    }

    public function updateAppointment(int $id, array $data)
    {
        return $this->appointmentRepository->update($data, $id);
    }

    public function deleteAppointment(int $id)
    {
        return $this->appointmentRepository->delete($id);
    }

    public function findAppointment(int $id)
    {
        return $this->appointmentRepository->findOrFail($id);
    }
}

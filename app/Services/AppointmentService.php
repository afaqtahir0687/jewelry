<?php

namespace App\Services;

use App\Repositories\Contracts\AppointmentRepositoryInterface;

class AppointmentService
{
    protected AppointmentRepositoryInterface $appointmentRepository;
    protected EmailService $emailService;

    public function __construct(
        AppointmentRepositoryInterface $appointmentRepository,
        EmailService $emailService
    ) {
        $this->appointmentRepository = $appointmentRepository;
        $this->emailService          = $emailService;
    }

    public function getPaginatedList(array $filters = [], int $perPage = 15)
    {
        return $this->appointmentRepository->getPaginatedList($filters, $perPage);
    }

    public function createAppointment(array $data)
    {
        $appointment = $this->appointmentRepository->create($data);

        // Email: notify admin + jeweller of new appointment
        $this->emailService->sendNewAppointmentNotification($appointment);

        return $appointment;
    }

    public function updateAppointment(int $id, array $data)
    {
        $appointment = $this->appointmentRepository->findOrFail($id);
        $oldStatus   = $appointment->status;

        $updated = $this->appointmentRepository->update($data, $id);

        // Email: notify if status changed
        if (isset($data['status']) && $data['status'] !== $oldStatus) {
            $appointment->refresh();
            $this->emailService->sendAppointmentStatusUpdatedNotification($appointment);
        }

        return $updated;
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

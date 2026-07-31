<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Http\Requests\Admin\UpdateAppointmentRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

use Illuminate\Http\Request;
use App\Services\AppointmentService;

class AppointmentController extends Controller
{
    protected AppointmentService $appointmentService;

    public function __construct(AppointmentService $appointmentService)
    {
        $this->appointmentService = $appointmentService;
    }

    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'sortField', 'sortDirection']);
        $appointments = $this->appointmentService->getPaginatedList($filters)
            ->through(fn ($a) => [
                'id'               => $a->id,
                'lead_id'          => $a->lead?->lead_id,
                'jeweller'         => $a->jeweller?->business_name,
                'customer_name'    => $a->customer_name,
                'customer_phone'   => $a->customer_phone,
                'appointment_date' => $a->appointment_date?->format('Y-m-d'),
                'appointment_time' => $a->appointment_time,
                'status'           => $a->status,
                'notes'            => $a->notes,
            ]);

        return Inertia::render('Admin/Appointments/Index', [
            'appointments' => $appointments,
            'filters' => $filters
        ]);
    }

    public function update(UpdateAppointmentRequest $request, Appointment $appointment): RedirectResponse
    {
        $this->appointmentService->updateAppointment($appointment->id, $request->validated());

        return back()->with('success', 'Appointment updated.');
    }

    public function destroy(Appointment $appointment): RedirectResponse
    {
        $this->appointmentService->deleteAppointment($appointment->id);

        return redirect()->route('admin.appointments.index')->with('success', 'Appointment deleted.');
    }
}

<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Http\Requests\Admin\UpdateAppointmentRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AppointmentController extends Controller
{
    public function index(): Response
    {
        $appointments = Appointment::with(['jeweller', 'lead'])
            ->latest('appointment_date')
            ->paginate(20)
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
        ]);
    }

    public function update(UpdateAppointmentRequest $request, Appointment $appointment): RedirectResponse
    {
        $appointment->update($request->validated());

        return back()->with('success', 'Appointment updated.');
    }

    public function destroy(Appointment $appointment): RedirectResponse
    {
        $appointment->delete();

        return redirect()->route('admin.appointments.index')->with('success', 'Appointment deleted.');
    }
}

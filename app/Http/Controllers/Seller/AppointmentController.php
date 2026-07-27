<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use App\Http\Requests\Seller\UpdateAppointmentRequest;
use App\Models\Appointment;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AppointmentController extends Controller
{
    public function index(): Response
    {
        $jewellerId = auth()->user()->jeweller?->id;

        $appointments = Appointment::with('lead')
            ->where('jeweller_id', $jewellerId)
            ->latest('appointment_date')
            ->paginate(15)
            ->through(fn ($a) => [
                'id'               => $a->id,
                'lead_id'          => $a->lead?->lead_id,
                'customer_name'    => $a->customer_name,
                'customer_phone'   => $a->customer_phone,
                'appointment_date' => $a->appointment_date?->format('Y-m-d'),
                'appointment_time' => $a->appointment_time,
                'status'           => $a->status,
                'notes'            => $a->notes,
            ]);

        return Inertia::render('Seller/Appointments/Index', [
            'appointments' => $appointments,
        ]);
    }

    public function update(UpdateAppointmentRequest $request, Appointment $appointment): RedirectResponse
    {
        $this->authorizeAccess($appointment);
        $appointment->update($request->validated());

        return back()->with('success', 'Appointment updated.');
    }

    private function authorizeAccess(Appointment $appointment): void
    {
        $jewellerId = auth()->user()->jeweller?->id;

        if ($appointment->jeweller_id !== $jewellerId) {
            abort(403, 'You do not have access to this appointment.');
        }
    }
}

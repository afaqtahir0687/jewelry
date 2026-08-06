<?php

namespace App\Services;

use App\Mail\AppointmentStatusUpdatedMail;
use App\Mail\LeadAssignedMail;
use App\Mail\LeadStatusUpdatedMail;
use App\Mail\NewAppointmentMail;
use App\Mail\NewContactMessageMail;
use App\Mail\NewLeadReceivedMail;
use App\Models\Appointment;
use App\Models\ContactMessage;
use App\Models\Lead;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class EmailService
{
    private string $adminEmail;

    public function __construct()
    {
        $this->adminEmail = config('mail.admin_email', env('ADMIN_EMAIL', 'afaqtahir0687@gmail.com'));
    }

    /**
     * Scenario 1: New lead submitted — notify admin
     */
    public function sendNewLeadNotification(Lead $lead): void
    {
        try {
            Mail::to($this->adminEmail)->send(new NewLeadReceivedMail($lead));
        } catch (\Throwable $e) {
            Log::error('EmailService::sendNewLeadNotification failed', ['error' => $e->getMessage(), 'lead_id' => $lead->lead_id]);
        }
    }

    /**
     * Scenario 2: Lead assigned to jeweller — notify jeweller
     */
    public function sendLeadAssignedNotification(Lead $lead): void
    {
        try {
            $jeweller = $lead->jeweller?->load('user');
            $jewellerEmail = $jeweller?->user?->email;

            if ($jewellerEmail) {
                Mail::to($jewellerEmail)->send(new LeadAssignedMail($lead));
            }
        } catch (\Throwable $e) {
            Log::error('EmailService::sendLeadAssignedNotification failed', ['error' => $e->getMessage(), 'lead_id' => $lead->lead_id]);
        }
    }

    /**
     * Scenario 3: Lead status updated — notify admin + customer (if email exists)
     */
    public function sendLeadStatusUpdatedNotification(Lead $lead): void
    {
        try {
            // Notify admin
            Mail::to($this->adminEmail)->send(new LeadStatusUpdatedMail($lead));

            // Notify customer if email available
            if (!empty($lead->customer_email)) {
                Mail::to($lead->customer_email)->send(new LeadStatusUpdatedMail($lead));
            }
        } catch (\Throwable $e) {
            Log::error('EmailService::sendLeadStatusUpdatedNotification failed', ['error' => $e->getMessage(), 'lead_id' => $lead->lead_id]);
        }
    }

    /**
     * Scenario 4: New appointment booked — notify admin + jeweller
     */
    public function sendNewAppointmentNotification(Appointment $appointment): void
    {
        try {
            $appointment->load(['lead', 'jeweller.user']);

            // Notify admin
            Mail::to($this->adminEmail)->send(new NewAppointmentMail($appointment));

            // Notify jeweller
            $jewellerEmail = $appointment->jeweller?->user?->email;
            if ($jewellerEmail) {
                Mail::to($jewellerEmail)->send(new NewAppointmentMail($appointment));
            }
        } catch (\Throwable $e) {
            Log::error('EmailService::sendNewAppointmentNotification failed', ['error' => $e->getMessage(), 'appointment_id' => $appointment->id]);
        }
    }

    /**
     * Scenario 5: Appointment status updated — notify customer + admin
     */
    public function sendAppointmentStatusUpdatedNotification(Appointment $appointment): void
    {
        try {
            // Notify admin
            Mail::to($this->adminEmail)->send(new AppointmentStatusUpdatedMail($appointment));

            // Notify customer if email available
            if (!empty($appointment->customer_email)) {
                Mail::to($appointment->customer_email)->send(new AppointmentStatusUpdatedMail($appointment));
            }
        } catch (\Throwable $e) {
            Log::error('EmailService::sendAppointmentStatusUpdatedNotification failed', ['error' => $e->getMessage(), 'appointment_id' => $appointment->id]);
        }
    }

    /**
     * Scenario 6: Contact form submitted — notify admin
     */
    public function sendContactMessageNotification(ContactMessage $contactMessage): void
    {
        try {
            Mail::to($this->adminEmail)->send(new NewContactMessageMail($contactMessage));
        } catch (\Throwable $e) {
            Log::error('EmailService::sendContactMessageNotification failed', ['error' => $e->getMessage(), 'contact_id' => $contactMessage->id]);
        }
    }

}

<?php

namespace App\Mail;

use App\Models\Appointment;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class AppointmentStatusUpdatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly Appointment $appointment)
    {
        $this->appointment->load(['lead', 'jeweller']);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Appointment is ' . ucfirst($this->appointment->status) . ' — Jewellery Shop PK',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.appointments.appointment-status-updated',
        );
    }
}

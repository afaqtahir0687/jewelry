<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LeadStatusUpdatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly Lead $lead)
    {
        $this->lead->load(['city', 'category', 'jeweller']);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Lead #' . $this->lead->lead_id . ' Status Updated — ' . ucfirst($this->lead->status),
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.leads.lead-status-updated',
        );
    }
}

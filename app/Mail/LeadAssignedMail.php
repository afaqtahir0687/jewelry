<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class LeadAssignedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly Lead $lead)
    {
        $this->lead->load(['city', 'category', 'jeweller.user', 'product']);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Lead Assigned to You — ' . $this->lead->lead_id,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.leads.lead-assigned',
        );
    }
}

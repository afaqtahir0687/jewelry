<?php

namespace App\Mail;

use App\Models\Lead;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewLeadReceivedMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly Lead $lead)
    {
        $this->lead->load(['city', 'category', 'jeweller']);
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'New Lead Received — ' . $this->lead->lead_id,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.leads.new-lead-received',
        );
    }
}

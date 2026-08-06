@extends('emails.layout')

@section('title', 'New Contact Message')
@section('badge', 'Contact Form')

@section('content')
    <h2>✉️ New Contact Message</h2>
    <p>Someone has submitted a message through the Contact Us form on Jewellery Shop PK.</p>

    <div class="info-card">
        <div class="row">
            <span class="label">Name</span>
            <span class="value">{{ $contactMessage->name }}</span>
        </div>
        <div class="row">
            <span class="label">Email</span>
            <span class="value">{{ $contactMessage->email }}</span>
        </div>
        @if(!empty($contactMessage->phone))
        <div class="row">
            <span class="label">Phone</span>
            <span class="value">{{ $contactMessage->phone }}</span>
        </div>
        @endif
        @if(!empty($contactMessage->subject))
        <div class="row">
            <span class="label">Subject</span>
            <span class="value">{{ $contactMessage->subject }}</span>
        </div>
        @endif
        <div class="row">
            <span class="label">Received At</span>
            <span class="value">{{ $contactMessage->created_at->format('d M Y, h:i A') }}</span>
        </div>
    </div>

    <p><strong>Message:</strong></p>
    <div style="background: #f8f9fc; border-radius: 8px; padding: 16px 20px; margin-top: 8px; font-size: 14px; line-height: 1.8; color: #444; white-space: pre-wrap;">{{ $contactMessage->message }}</div>

    <hr class="divider">
    <p style="font-size: 13px; color: #888;">Reply directly to: <a href="mailto:{{ $contactMessage->email }}" style="color: #c9a227;">{{ $contactMessage->email }}</a></p>
@endsection

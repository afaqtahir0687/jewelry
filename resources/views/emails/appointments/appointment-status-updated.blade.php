@extends('emails.layout')

@section('title', 'Appointment Status Updated')
@section('badge', 'Appointment Update')

@section('content')
    <h2>🔄 Appointment Status Updated</h2>
    <p>Your appointment status has been updated to <strong>{{ ucfirst($appointment->status) }}</strong>.</p>

    <div class="info-card">
        <div class="row">
            <span class="label">Customer Name</span>
            <span class="value">{{ $appointment->customer_name }}</span>
        </div>
        @if($appointment->jeweller)
        <div class="row">
            <span class="label">Jeweller</span>
            <span class="value">{{ $appointment->jeweller->business_name }}</span>
        </div>
        @endif
        <div class="row">
            <span class="label">Appointment Date</span>
            <span class="value">{{ $appointment->appointment_date?->format('d M Y') ?? '—' }}</span>
        </div>
        <div class="row">
            <span class="label">Appointment Time</span>
            <span class="value">{{ $appointment->appointment_time ?? '—' }}</span>
        </div>
        <div class="row">
            <span class="label">New Status</span>
            <span class="value">
                <span class="status-pill status-{{ $appointment->status }}">{{ ucfirst($appointment->status) }}</span>
            </span>
        </div>
        <div class="row">
            <span class="label">Updated At</span>
            <span class="value">{{ now()->format('d M Y, h:i A') }}</span>
        </div>
    </div>

    @if($appointment->notes)
    <p><strong>Notes:</strong><br>{{ $appointment->notes }}</p>
    @endif

    @if($appointment->status === 'cancelled')
    <p style="color: #c62828;">We're sorry your appointment was cancelled. Please contact us to reschedule.</p>
    @elseif($appointment->status === 'confirmed')
    <p style="color: #2e7d32;">✅ Your appointment is confirmed! Please arrive on time.</p>
    @endif

    <hr class="divider">
    <p style="font-size: 13px; color: #888;">For queries, contact us at <a href="mailto:{{ config('mail.from.address') }}" style="color: #c9a227;">{{ config('mail.from.address') }}</a></p>
@endsection

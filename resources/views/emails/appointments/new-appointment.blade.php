@extends('emails.layout')

@section('title', 'New Appointment Scheduled')
@section('badge', 'New Appointment')

@section('content')
    <h2>📅 New Appointment Scheduled</h2>
    <p>A new appointment has been booked on Jewellery Shop PK.</p>

    <div class="info-card">
        <div class="row">
            <span class="label">Customer Name</span>
            <span class="value">{{ $appointment->customer_name }}</span>
        </div>
        <div class="row">
            <span class="label">Customer Phone</span>
            <span class="value">{{ $appointment->customer_phone }}</span>
        </div>
        @if($appointment->customer_email)
        <div class="row">
            <span class="label">Customer Email</span>
            <span class="value">{{ $appointment->customer_email }}</span>
        </div>
        @endif
        @if($appointment->lead)
        <div class="row">
            <span class="label">Lead ID</span>
            <span class="value">{{ $appointment->lead->lead_id }}</span>
        </div>
        @endif
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
            <span class="label">Status</span>
            <span class="value">
                <span class="status-pill status-{{ $appointment->status }}">{{ ucfirst($appointment->status) }}</span>
            </span>
        </div>
    </div>

    @if($appointment->notes)
    <p><strong>Notes:</strong><br>{{ $appointment->notes }}</p>
    @endif

    <a class="cta-btn" href="{{ config('app.url') }}/admin/appointments">View in Admin Panel →</a>
@endsection

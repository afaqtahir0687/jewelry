@extends('emails.layout')

@section('title', 'Application Update')
@section('badge', 'Application Update')

@section('content')
    <h2>Application Update</h2>
    <p>Dear {{ $jewellerRequest->name }},</p>
    <p>Thank you for your interest in joining Online Jewelry Shop as a verified partner for <strong>{{ $jewellerRequest->business_name }}</strong>. After review, we're unable to approve your application at this time.</p>

    @if($jewellerRequest->rejection_reason)
    <div class="info-card">
        <div class="row">
            <span class="label">Reason</span>
            <span class="value">{{ $jewellerRequest->rejection_reason }}</span>
        </div>
    </div>
    @endif

    <p>If you believe this was a mistake or would like to re-apply with updated information, please get in touch with us.</p>
@endsection

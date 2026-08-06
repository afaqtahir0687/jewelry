@extends('emails.layout')

@section('title', 'Application Approved')
@section('badge', 'Approved')

@section('content')
    <h2>🎉 Congratulations, {{ $jewellerRequest->name }}!</h2>
    <p>Your application for <strong>{{ $jewellerRequest->business_name }}</strong> to join Online Jewelry Shop as a verified partner has been approved.</p>

    @if($temporaryPassword)
    <div class="info-card">
        <div class="row">
            <span class="label">Login Email</span>
            <span class="value"><strong>{{ $jewellerRequest->email }}</strong></span>
        </div>
        <div class="row">
            <span class="label">Temporary Password</span>
            <span class="value"><strong>{{ $temporaryPassword }}</strong></span>
        </div>
    </div>
    <p>Please log in and change your password as soon as possible.</p>
    @else
    <p>You can log in to your existing seller account to manage your shop.</p>
    @endif

    <a class="cta-btn" href="{{ config('app.url') }}/seller/login">Log In to Seller Dashboard →</a>
@endsection

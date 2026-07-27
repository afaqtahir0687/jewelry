<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('lead_id')->unique();
            $table->string('customer_name');
            $table->string('customer_phone');
            $table->foreignId('city_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('jeweller_id')->nullable()->constrained()->nullOnDelete();
            $table->text('requirement_description')->nullable();
            $table->string('budget')->nullable();
            $table->string('reference_image')->nullable();
            $table->string('preferred_contact_time')->nullable();
            $table->string('status')->default('new'); // new, assigned, contacted, responded, appointment_booked, shop_visited, quotation_sent, sale_completed, sale_lost, followup_required, commission_due, commission_paid
            $table->decimal('sale_amount', 12, 2)->nullable();
            $table->string('commission_type')->nullable(); // fixed, percentage
            $table->decimal('commission_amount', 12, 2)->nullable();
            $table->string('payment_status')->default('pending'); // pending, paid
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};

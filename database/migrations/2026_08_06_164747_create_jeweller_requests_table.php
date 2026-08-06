<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jeweller_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('whatsapp')->nullable();
            $table->string('business_name');
            $table->foreignId('city_id')->constrained()->cascadeOnDelete();
            $table->string('area')->nullable();
            $table->string('full_address');
            $table->unsignedSmallInteger('years_in_business')->nullable();
            $table->json('specialities')->nullable();
            $table->text('message')->nullable();

            // pending | approved | rejected
            $table->string('status')->default('pending');
            $table->text('rejection_reason')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jeweller_requests');
    }
};

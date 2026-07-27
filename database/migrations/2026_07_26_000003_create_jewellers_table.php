<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('jewellers', function (Blueprint $table) {
            $table->id();
            $table->string('business_name');
            $table->string('slug')->unique();
            $table->string('logo')->nullable();
            $table->string('cover_image')->nullable();
            $table->json('shop_gallery')->nullable();
            $table->foreignId('city_id')->constrained()->cascadeOnDelete();
            $table->string('area');
            $table->text('full_address');
            $table->text('google_maps_link')->nullable();
            $table->string('phone')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('business_timings')->nullable();
            $table->integer('years_in_business')->nullable();
            $table->json('specialities')->nullable();
            $table->boolean('custom_order_available')->default(false);
            $table->boolean('delivery_available')->default(false);
            $table->boolean('repair_services_available')->default(false);
            $table->json('payment_methods')->nullable();
            $table->text('return_policy')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamp('verified_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('jewellers');
    }
};

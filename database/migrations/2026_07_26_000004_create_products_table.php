<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->foreignId('jeweller_id')->constrained()->cascadeOnDelete();
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->json('images')->nullable();
            $table->text('description')->nullable();
            $table->boolean('price_on_request')->default(true);
            $table->decimal('price', 12, 2)->nullable();
            $table->string('gold_purity')->nullable();
            $table->string('approximate_weight')->nullable();
            $table->string('stone_info')->nullable();
            $table->string('status')->default('available'); // 'available', 'made_to_order', 'design_inspiration'
            $table->text('customisation_options')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

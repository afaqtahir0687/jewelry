<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->foreignId('subcategory_id')->nullable()->constrained('subcategories')->nullOnDelete()->after('category_id');
            $table->boolean('is_featured')->default(false)->after('status');
            $table->boolean('is_latest_arrival')->default(false)->after('is_featured');
            $table->unsignedSmallInteger('sort_order')->default(0)->after('is_latest_arrival');
            // Make jeweller_id nullable so admin-created products don't need a jeweller
            $table->foreignId('jeweller_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropConstrainedForeignId('subcategory_id');
            $table->dropColumn(['is_featured', 'is_latest_arrival', 'sort_order']);
            $table->foreignId('jeweller_id')->nullable(false)->change();
        });
    }
};

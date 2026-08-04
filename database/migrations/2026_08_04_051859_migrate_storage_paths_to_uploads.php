<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update categories
        DB::table('categories')->whereNotNull('image')->where('image', 'not like', 'http%')->where('image', 'not like', 'uploads/%')->update([
            'image' => DB::raw("CONCAT('uploads/', image)")
        ]);
        DB::table('categories')->whereNotNull('banner_image')->where('banner_image', 'not like', 'http%')->where('banner_image', 'not like', 'uploads/%')->update([
            'banner_image' => DB::raw("CONCAT('uploads/', banner_image)")
        ]);

        // Update subcategories
        DB::table('subcategories')->whereNotNull('image')->where('image', 'not like', 'http%')->where('image', 'not like', 'uploads/%')->update([
            'image' => DB::raw("CONCAT('uploads/', image)")
        ]);

        // Update product images
        DB::table('product_images')->whereNotNull('path')->where('path', 'not like', 'http%')->where('path', 'not like', 'uploads/%')->update([
            'path' => DB::raw("CONCAT('uploads/', path)")
        ]);

        // Update leads
        DB::table('leads')->whereNotNull('reference_image')->where('reference_image', 'not like', 'http%')->where('reference_image', 'not like', 'uploads/%')->update([
            'reference_image' => DB::raw("CONCAT('uploads/', reference_image)")
        ]);

        // Update products legacy images column (JSON array of strings)
        $products = DB::table('products')->whereNotNull('images')->get();
        foreach ($products as $product) {
            $images = json_decode($product->images, true);
            if (is_array($images)) {
                $updated = false;
                foreach ($images as $key => $image) {
                    if ($image && !str_starts_with($image, 'http') && !str_starts_with($image, 'uploads/')) {
                        $images[$key] = 'uploads/' . $image;
                        $updated = true;
                    }
                }
                if ($updated) {
                    DB::table('products')->where('id', $product->id)->update([
                        'images' => json_encode($images)
                    ]);
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Update categories
        DB::table('categories')->where('image', 'like', 'uploads/%')->update([
            'image' => DB::raw("SUBSTRING(image, 9)") // 9 is the length of 'uploads/' + 1
        ]);
        DB::table('categories')->where('banner_image', 'like', 'uploads/%')->update([
            'banner_image' => DB::raw("SUBSTRING(banner_image, 9)")
        ]);

        // Update subcategories
        DB::table('subcategories')->where('image', 'like', 'uploads/%')->update([
            'image' => DB::raw("SUBSTRING(image, 9)")
        ]);

        // Update product images
        DB::table('product_images')->where('path', 'like', 'uploads/%')->update([
            'path' => DB::raw("SUBSTRING(path, 9)")
        ]);

        // Update leads
        DB::table('leads')->where('reference_image', 'like', 'uploads/%')->update([
            'reference_image' => DB::raw("SUBSTRING(reference_image, 9)")
        ]);

        // Update products legacy images column (JSON array of strings)
        $products = DB::table('products')->whereNotNull('images')->get();
        foreach ($products as $product) {
            $images = json_decode($product->images, true);
            if (is_array($images)) {
                $updated = false;
                foreach ($images as $key => $image) {
                    if (str_starts_with($image, 'uploads/')) {
                        $images[$key] = substr($image, 8);
                        $updated = true;
                    }
                }
                if ($updated) {
                    DB::table('products')->where('id', $product->id)->update([
                        'images' => json_encode($images)
                    ]);
                }
            }
        }
    }
};

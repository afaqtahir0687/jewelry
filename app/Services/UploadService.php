<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class UploadService
{
    /**
     * Upload a file directly to the public/uploads directory.
     *
     * @param UploadedFile $file The file to upload.
     * @param string $folder The subfolder name (e.g., 'products', 'categories').
     * @return string The relative path to the uploaded file (e.g., 'uploads/products/xyz.jpg').
     */
    public function upload(UploadedFile $file, string $folder): string
    {
        $directory = public_path('uploads/' . $folder);

        if (!File::exists($directory)) {
            File::makeDirectory($directory, 0755, true);
        }

        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        
        $file->move($directory, $filename);

        return 'uploads/' . $folder . '/' . $filename;
    }

    /**
     * Delete a file from the public directory.
     *
     * @param string|null $path The relative path to the file (e.g., 'uploads/products/xyz.jpg').
     * @return bool True if deleted or doesn't exist, false otherwise.
     */
    public function delete(?string $path): bool
    {
        if (empty($path)) {
            return true;
        }

        // Do not attempt to delete absolute URLs (e.g. http://...)
        if (str_starts_with($path, 'http')) {
            return true;
        }

        $fullPath = public_path($path);

        if (File::exists($fullPath)) {
            return File::delete($fullPath);
        }

        return true;
    }
}

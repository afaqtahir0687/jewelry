<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            [
                'title' => 'About Us',
                'slug' => 'about-us',
                'content' => '<div class="prose max-w-none"><h2 class="text-3xl font-luxury text-[#d4af37] mb-6">Our Story</h2><p class="text-gray-600 leading-relaxed mb-4">Welcome to Online Jewelry Shop, your number one source for all things jewelry in Pakistan. We\'re dedicated to giving you the very best of verified artisans, with a focus on dependability, customer service and uniqueness.</p><p class="text-gray-600 leading-relaxed">Founded by industry experts, our platform connects you with the finest jewelers across Lahore, Karachi, and Islamabad. Whether you are looking for a bespoke engagement ring or traditional bridal sets, we bring the market to your fingertips.</p></div>',
                'is_active' => true,
            ],
            [
                'title' => 'Terms and Conditions',
                'slug' => 'terms-and-conditions',
                'content' => '<div class="prose max-w-none"><h2 class="text-2xl font-semibold mb-4">1. Introduction</h2><p class="text-gray-600 mb-4">These terms and conditions govern your use of this website; by using this website, you accept these terms and conditions in full.</p><h2 class="text-2xl font-semibold mb-4">2. Connections</h2><p class="text-gray-600 mb-4">Online Jewelry Shop acts solely as a connecting platform between customers and verified jewelers. All purchases are made directly with the jeweler.</p></div>',
                'is_active' => true,
            ],
            [
                'title' => 'Privacy Policy',
                'slug' => 'privacy-policy',
                'content' => '<div class="prose max-w-none"><h2 class="text-2xl font-semibold mb-4">Privacy Overview</h2><p class="text-gray-600 mb-4">Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.</p><p class="text-gray-600 mb-4">We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent.</p></div>',
                'is_active' => true,
            ],
            [
                'title' => 'FAQs',
                'slug' => 'faqs',
                'content' => '<div class="space-y-6"><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100"><h3 class="text-lg font-semibold text-[#0f172a] mb-2">Are all jewelers verified?</h3><p class="text-gray-600">Yes, we ensure that every jeweler listed on our platform goes through a strict verification process to guarantee authenticity and quality.</p></div><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100"><h3 class="text-lg font-semibold text-[#0f172a] mb-2">How do I place a custom order?</h3><p class="text-gray-600">You can use our Custom Order form to submit your requirements, or contact any jeweler directly through their profile.</p></div><div class="bg-white p-6 rounded-lg shadow-sm border border-gray-100"><h3 class="text-lg font-semibold text-[#0f172a] mb-2">Do you handle the payments?</h3><p class="text-gray-600">No, all payments are handled directly between you and the verified jeweler to ensure transparency.</p></div></div>',
                'is_active' => true,
            ]
        ];

        foreach ($pages as $page) {
            Page::updateOrCreate(['slug' => $page['slug']], $page);
        }
    }
}

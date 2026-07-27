-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 27, 2026 at 04:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jewelry`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lead_id` bigint(20) UNSIGNED NOT NULL,
  `jeweller_id` bigint(20) UNSIGNED NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_phone` varchar(255) NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `image`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Gold Jewellery', 'gold-jewellery', 'Browse fine gold jewelry crafted in 22K and 21K gold by pakistans best artisans.', 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop', 1, '2026-07-27 07:51:01', '2026-07-27 07:51:01'),
(2, 'Diamond Jewellery', 'diamond-jewellery', 'Exquisite diamond necklaces, certified solitaire rings, and fine diamond bracelets.', 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&auto=format&fit=crop', 1, '2026-07-27 07:51:01', '2026-07-27 07:51:01'),
(3, 'Bridal Jewellery', 'bridal-jewellery', 'Traditional Pakistani bridal sets, Chokers, Jhumkas, and complete wedding sets.', 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&auto=format&fit=crop', 1, '2026-07-27 07:51:01', '2026-07-27 07:51:01'),
(4, 'Engagement Rings', 'engagement-rings', 'Beautiful proposal rings, diamond solitaires, and luxury wedding bands.', 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&auto=format&fit=crop', 1, '2026-07-27 07:51:01', '2026-07-27 07:51:01'),
(5, 'Necklaces & Pendants', 'necklaces', 'Gold lockets, layered chain necklaces, and traditional bridal harams.', 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop', 1, '2026-07-27 07:51:01', '2026-07-27 07:51:01'),
(6, 'Custom Designs', 'custom-jewellery', 'Upload your own reference image and get custom quotes from top jewellers.', 'https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=600&auto=format&fit=crop', 1, '2026-07-27 07:51:01', '2026-07-27 07:51:01'),
(7, 'ddfg', 'ddfg', NULL, NULL, 1, '2026-07-27 09:37:38', '2026-07-27 09:38:11');

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`, `slug`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Lahore', 'lahore', 1, '2026-07-27 07:51:01', '2026-07-27 07:51:01'),
(3, 'Islamabad', 'islamabad', 1, '2026-07-27 07:51:01', '2026-07-27 07:51:01'),
(4, 'Faisalabad', 'faisalabad', 1, '2026-07-27 07:51:01', '2026-07-27 07:51:01'),
(5, 'Multan', 'multan', 1, '2026-07-27 07:51:01', '2026-07-27 07:51:01'),
(6, 'KARACHI', 'karachi', 1, '2026-07-27 09:39:39', '2026-07-27 09:39:39');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jewellers`
--

CREATE TABLE `jewellers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `business_name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `shop_gallery` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`shop_gallery`)),
  `city_id` bigint(20) UNSIGNED NOT NULL,
  `area` varchar(255) NOT NULL,
  `full_address` text NOT NULL,
  `google_maps_link` text DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `whatsapp` varchar(255) DEFAULT NULL,
  `business_timings` varchar(255) DEFAULT NULL,
  `years_in_business` int(11) DEFAULT NULL,
  `specialities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specialities`)),
  `custom_order_available` tinyint(1) NOT NULL DEFAULT 0,
  `delivery_available` tinyint(1) NOT NULL DEFAULT 0,
  `repair_services_available` tinyint(1) NOT NULL DEFAULT 0,
  `payment_methods` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`payment_methods`)),
  `return_policy` text DEFAULT NULL,
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
  `verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `jewellers`
--

INSERT INTO `jewellers` (`id`, `user_id`, `business_name`, `slug`, `logo`, `cover_image`, `shop_gallery`, `city_id`, `area`, `full_address`, `google_maps_link`, `phone`, `whatsapp`, `business_timings`, `years_in_business`, `specialities`, `custom_order_available`, `delivery_available`, `repair_services_available`, `payment_methods`, `return_policy`, `is_verified`, `verified_at`, `created_at`, `updated_at`) VALUES
(1, 2, 'Al-Haram Jewellers', 'al-haram-jewellers', 'https://images.unsplash.com/photo-1541535881962-e668f2244a26?w=150&auto=format&fit=crop', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&auto=format&fit=crop', '[\"https:\\/\\/images.unsplash.com\\/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop\",\"https:\\/\\/images.unsplash.com\\/photo-1573408301185-9146fe634ad0?w=600&auto=format&fit=crop\"]', 1, 'DHA Phase 5', 'Building 45-CCA, Block Block-C, DHA Phase 5, Lahore, Pakistan', 'https://maps.google.com/?q=Al-Haram+Jewellers+DHA+Lahore', '+92 42 35698711', '+92 300 1234567', '11:00 AM - 9:00 PM', 15, '[\"22K Gold\",\"Heritage Bridal Sets\",\"Gold Bangles\"]', 1, 1, 1, '[\"Cash\",\"Bank Transfer\",\"Credit Card\"]', 'Exchange within 7 days with original invoice. Making charges are non-refundable.', 1, '2026-07-27 07:51:02', '2026-07-27 07:51:02', '2026-07-27 07:51:02'),
(3, 4, 'Gohar Jewellers', 'gohar-jewellers', 'https://images.unsplash.com/photo-1541535881962-e668f2244a26?w=150&auto=format&fit=crop', 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&auto=format&fit=crop', '[]', 3, 'F-7 Markaz', 'Plaza 24, F-7 Markaz, Islamabad, Pakistan', 'https://maps.google.com/?q=Gohar+Jewellers+F-7+Islamabad', '+92 51 2276541', '+92 333 4567890', '11:00 AM - 8:30 PM', 20, '[\"Kundan Jewellery\",\"Pola Work\",\"Polki Bridal Sets\"]', 1, 1, 0, '[\"Cash\",\"Bank Transfer\"]', 'No returns. Standard exchange policy applies.', 1, '2026-07-27 07:51:02', '2026-07-27 07:51:02', '2026-07-27 07:51:02'),
(4, 3, 'R', 'r-6a66c63fdef85', NULL, NULL, NULL, 4, 'R', 'DE', NULL, '+923017730687', 'E', NULL, 10, NULL, 0, 0, 0, NULL, NULL, 1, NULL, '2026-07-27 09:45:19', '2026-07-27 09:45:19');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leads`
--

CREATE TABLE `leads` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `lead_id` varchar(255) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_phone` varchar(255) NOT NULL,
  `city_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `jeweller_id` bigint(20) UNSIGNED DEFAULT NULL,
  `requirement_description` text DEFAULT NULL,
  `budget` varchar(255) DEFAULT NULL,
  `reference_image` varchar(255) DEFAULT NULL,
  `preferred_contact_time` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'new',
  `sale_amount` decimal(12,2) DEFAULT NULL,
  `commission_type` varchar(255) DEFAULT NULL,
  `commission_amount` decimal(12,2) DEFAULT NULL,
  `payment_status` varchar(255) NOT NULL DEFAULT 'pending',
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_07_26_000001_create_cities_table', 1),
(5, '2026_07_26_000002_create_categories_table', 1),
(6, '2026_07_26_000003_create_jewellers_table', 1),
(7, '2026_07_26_000004_create_products_table', 1),
(8, '2026_07_26_000005_create_leads_table', 1),
(9, '2026_07_26_000006_create_appointments_table', 1),
(10, '2026_07_26_000007_create_reviews_table', 1),
(11, '2026_07_27_000001_add_role_and_user_id_to_tables', 1),
(12, '2026_07_27_004229_create_permission_tables', 1);

-- --------------------------------------------------------

--
-- Table structure for table `model_has_permissions`
--

CREATE TABLE `model_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `model_has_roles`
--

CREATE TABLE `model_has_roles` (
  `role_id` bigint(20) UNSIGNED NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `model_has_roles`
--

INSERT INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
(1, 'App\\Models\\User', 1),
(2, 'App\\Models\\User', 2),
(2, 'App\\Models\\User', 3),
(2, 'App\\Models\\User', 4);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `jeweller_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED NOT NULL,
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `description` text DEFAULT NULL,
  `price_on_request` tinyint(1) NOT NULL DEFAULT 1,
  `price` decimal(12,2) DEFAULT NULL,
  `gold_purity` varchar(255) DEFAULT NULL,
  `approximate_weight` varchar(255) DEFAULT NULL,
  `stone_info` varchar(255) DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'available',
  `customisation_options` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `title`, `slug`, `jeweller_id`, `category_id`, `images`, `description`, `price_on_request`, `price`, `gold_purity`, `approximate_weight`, `stone_info`, `status`, `customisation_options`, `created_at`, `updated_at`) VALUES
(1, '22K Gold Royal Bridal Haram Set', '22k-gold-royal-bridal-haram-set', 1, 3, '[\"https:\\/\\/images.unsplash.com\\/photo-1601121141461-9d6647bca1ed?w=600&auto=format&fit=crop\"]', 'A beautifully designed heritage 22K gold necklace set featuring intricate filigree work and premium gemstones. Perfect for brides who want a royal traditional look.', 1, NULL, '22K Gold', '85 grams', 'Red Rubies and Emerald embellishments', 'made_to_order', 'Weight can be adjusted between 60 to 110 grams. Gemstones can be custom selected.', '2026-07-27 07:51:02', '2026-07-27 07:51:02'),
(2, 'Classic Gold Bangles Set of 4', 'classic-gold-bangles-set-of-4', 1, 1, '[\"https:\\/\\/images.unsplash.com\\/photo-1617038260897-41a1f14a8ca0?w=600&auto=format&fit=crop\"]', 'Traditional Pakistani style 22K gold bangles with detailed floral carvings. A perfect anniversary or wedding gift.', 0, 380000.00, '22K Gold', '32 grams', 'Solid gold, no stones', 'available', 'Available in sizes 2.4, 2.6, and 2.8. Width can be customized.', '2026-07-27 07:51:02', '2026-07-27 07:51:02');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `jeweller_id` bigint(20) UNSIGNED NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL,
  `comment` text DEFAULT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `jeweller_id`, `customer_name`, `rating`, `comment`, `is_approved`, `created_at`, `updated_at`) VALUES
(1, 1, 'Ayesha Khan', 5, 'Ordered my bridal set from them and they delivered exactly what was promised. Highly recommended for premium designs!', 1, '2026-07-27 07:51:02', '2026-07-27 07:51:02'),
(2, 1, 'Muhammad Bilal', 4, 'Great customer support and high quality diamond finish. Very happy with the engagement ring purchase.', 1, '2026-07-27 07:51:02', '2026-07-27 07:51:02'),
(5, 3, 'Ayesha Khan', 5, 'Ordered my bridal set from them and they delivered exactly what was promised. Highly recommended for premium designs!', 1, '2026-07-27 07:51:02', '2026-07-27 07:51:02'),
(6, 3, 'Muhammad Bilal', 4, 'Great customer support and high quality diamond finish. Very happy with the engagement ring purchase.', 1, '2026-07-27 07:51:02', '2026-07-27 07:51:02');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'web', '2026-07-27 07:51:01', '2026-07-27 07:51:01'),
(2, 'seller', 'web', '2026-07-27 07:51:01', '2026-07-27 07:51:01');

-- --------------------------------------------------------

--
-- Table structure for table `role_has_permissions`
--

CREATE TABLE `role_has_permissions` (
  `permission_id` bigint(20) UNSIGNED NOT NULL,
  `role_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('Pl3VuBRBui7ZS5w4RBSaFI1NK21uYphxNvDcXqm0', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiY2c0UHFpTjdFNTRqUFpDMkRsYWZweUNRck8yMm5XalRldFhBQWZiWCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9maW5kLWEtamV3ZWxsZXIiO3M6NToicm91dGUiO3M6MTI6InNlYXJjaC5pbmRleCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6MzoidXJsIjthOjA6e31zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1785120637);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'customer',
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@jewelry.com', NULL, '$2y$12$0E90mEgTUSP6bKP/NsQiXOXkylApQ7/h7pgm0FTA14sDhJbdKz3lK', 'customer', NULL, '2026-07-27 07:51:01', '2026-07-27 07:51:01'),
(2, 'Al-Haram Seller', 'alharam@jewelry.com', NULL, '$2y$12$nftlsaw05p6xtoWh73bwwOqF47Wj/negNPuSU0Nagx23m9x27djem', 'customer', NULL, '2026-07-27 07:51:02', '2026-07-27 07:51:02'),
(3, 'Kundan Seller', 'kundan@jewelry.com', NULL, '$2y$12$Fovd1dtn5zC6GXpJSJCQBueCn.pr0P7oxxo5mcWPTJwF.0CQJBuo2', 'customer', NULL, '2026-07-27 07:51:02', '2026-07-27 07:51:02'),
(4, 'Gohar Seller', 'gohar@jewelry.com', NULL, '$2y$12$Y8PQlpFkxsqkNb71elvkbu3aLcav1htSLcjebev.p.Nmqj5EkYh/W', 'customer', NULL, '2026-07-27 07:51:02', '2026-07-27 07:51:02');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointments_lead_id_foreign` (`lead_id`),
  ADD KEY `appointments_jeweller_id_foreign` (`jeweller_id`);

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_slug_unique` (`slug`);

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `cities_slug_unique` (`slug`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jewellers`
--
ALTER TABLE `jewellers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `jewellers_slug_unique` (`slug`),
  ADD KEY `jewellers_city_id_foreign` (`city_id`),
  ADD KEY `jewellers_user_id_foreign` (`user_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `leads`
--
ALTER TABLE `leads`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `leads_lead_id_unique` (`lead_id`),
  ADD KEY `leads_city_id_foreign` (`city_id`),
  ADD KEY `leads_category_id_foreign` (`category_id`),
  ADD KEY `leads_jeweller_id_foreign` (`jeweller_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  ADD KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  ADD KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_slug_unique` (`slug`),
  ADD KEY `products_jeweller_id_foreign` (`jeweller_id`),
  ADD KEY `products_category_id_foreign` (`category_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_jeweller_id_foreign` (`jeweller_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`);

--
-- Indexes for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `role_has_permissions_role_id_foreign` (`role_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jewellers`
--
ALTER TABLE `jewellers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leads`
--
ALTER TABLE `leads`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_jeweller_id_foreign` FOREIGN KEY (`jeweller_id`) REFERENCES `jewellers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `appointments_lead_id_foreign` FOREIGN KEY (`lead_id`) REFERENCES `leads` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `jewellers`
--
ALTER TABLE `jewellers`
  ADD CONSTRAINT `jewellers_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `jewellers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `leads`
--
ALTER TABLE `leads`
  ADD CONSTRAINT `leads_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `leads_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `leads_jeweller_id_foreign` FOREIGN KEY (`jeweller_id`) REFERENCES `jewellers` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `model_has_permissions`
--
ALTER TABLE `model_has_permissions`
  ADD CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `model_has_roles`
--
ALTER TABLE `model_has_roles`
  ADD CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_jeweller_id_foreign` FOREIGN KEY (`jeweller_id`) REFERENCES `jewellers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_jeweller_id_foreign` FOREIGN KEY (`jeweller_id`) REFERENCES `jewellers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `role_has_permissions`
--
ALTER TABLE `role_has_permissions`
  ADD CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

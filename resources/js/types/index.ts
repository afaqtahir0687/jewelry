export interface Role {
    id: number;
    name: string;
    permissions?: Permission[];
    created_at?: string;
}

export interface Permission {
    id: number;
    name: string;
    created_at?: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles: string[];
}

export interface City {
    id: number;
    name: string;
    slug: string;
    jewellers_count?: number;
    created_at?: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    products_count?: number;
    created_at?: string;
}

export interface Jeweller {
    id: number;
    user_id?: number;
    business_name: string;
    slug: string;
    logo?: string;
    cover_image?: string;
    shop_gallery?: string[];
    city_id?: number;
    city?: string;
    area?: string;
    full_address?: string;
    google_maps_link?: string;
    phone?: string;
    whatsapp?: string;
    business_timings?: string;
    years_in_business?: number;
    specialities?: string[];
    custom_order_available?: boolean;
    delivery_available?: boolean;
    repair_services_available?: boolean;
    payment_methods?: string[];
    return_policy?: string;
    is_verified: boolean;
    verified_at?: string;
    leads_count?: number;
    products_count?: number;
    reviews_count?: number;
    user_email?: string;
    created_at?: string;
}

export interface Lead {
    id: number;
    lead_id: string;
    customer_name: string;
    customer_phone: string;
    city?: string;
    city_id?: number;
    category?: string;
    category_id?: number;
    jeweller?: string | { id: number; business_name: string; phone?: string; whatsapp?: string };
    jeweller_id?: number;
    requirement_description?: string;
    budget?: string;
    reference_image?: string;
    preferred_contact_time?: string;
    status: LeadStatus;
    sale_amount?: number | null;
    commission_type?: CommissionType | null;
    commission_amount?: number | null;
    payment_status?: PaymentStatus;
    notes?: string | null;
    appointments?: Appointment[];
    created_at?: string;
}

export type LeadStatus = 'new' | 'contacted' | 'appointment_booked' | 'sale_completed' | 'lost' | 'assigned';
export type CommissionType = 'fixed' | 'percentage';
export type PaymentStatus = 'unpaid' | 'paid' | 'partial';

export interface Product {
    id: number;
    title: string;
    slug?: string;
    jeweller_id?: number;
    jeweller?: string;
    category_id?: number;
    category?: string;
    images?: string[];
    description?: string;
    price_on_request: boolean;
    price?: number | null;
    gold_purity?: string | null;
    approximate_weight?: string | null;
    stone_info?: string | null;
    status: ProductStatus;
    customisation_options?: string | null;
    created_at?: string;
}

export type ProductStatus = 'available' | 'made_to_order' | 'design_inspiration';

export interface Appointment {
    id: number;
    lead_id?: string;
    jeweller?: string;
    jeweller_id?: number;
    customer_name?: string;
    customer_phone?: string;
    appointment_date?: string;
    appointment_time?: string;
    status: AppointmentStatus;
    notes?: string | null;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Review {
    id: number;
    jeweller?: string;
    reviewer_name: string;
    rating: number;
    comment?: string;
    status?: 'pending' | 'approved' | 'rejected';
    created_at?: string;
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    first_page_url: string;
    from: number | null;
    last_page: number;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    per_page: number;
    to: number | null;
    total: number;
}

export interface PageProps {
    auth: {
        user: User | null;
    };
    flash: {
        success?: string | null;
        error?: string | null;
    };
    seo_meta?: {
        title: string;
        description?: string | null;
        keywords?: string | null;
        og_image?: string | null;
    } | null;
    [key: string]: unknown;
}

export interface AdminDashboardStats {
    total_leads: number;
    new_leads: number;
    total_jewellers: number;
    verified_jewellers: number;
    total_products: number;
    appointments_today: number;
    pending_reviews: number;
    total_users: number;
}

export interface SellerDashboardStats {
    total_leads: number;
    new_leads: number;
    appointments_today: number;
    total_products: number;
    pending_leads: number;
}

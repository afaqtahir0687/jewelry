import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { City, User, Jeweller } from '@/types';

interface EditJewellerProps {
    jeweller: Jeweller;
    cities: City[];
    sellerUsers: User[];
}

export default function AdminJewellerEdit({ jeweller, cities, sellerUsers }: EditJewellerProps) {
    const { data, setData, patch, processing, errors } = useForm({
        user_id:                   jeweller.user_id ?? '',
        business_name:             jeweller.business_name ?? '',
        city_id:                   jeweller.city_id ?? '',
        area:                      jeweller.area ?? '',
        full_address:              jeweller.full_address ?? '',
        phone:                     jeweller.phone ?? '',
        whatsapp:                  jeweller.whatsapp ?? '',
        years_in_business:         jeweller.years_in_business ?? '',
        is_verified:               jeweller.is_verified ?? false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/admin/jewellers/${jeweller.id}`);
    };

    return (
        <AdminLayout title={`Edit Jeweller: ${jeweller.business_name}`}>
            <Head title={`Edit ${jeweller.business_name} — Admin`} />

            <div className="max-w-2xl space-y-6">
                <Link href="/admin/jewellers">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white -ml-2">
                        <ArrowLeft size={16} className="mr-2" /> Back to Jewellers
                    </Button>
                </Link>

                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="user_id">Link Seller Account</Label>
                                <select
                                    id="user_id"
                                    value={data.user_id}
                                    onChange={(e) => setData('user_id', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold"
                                >
                                    <option value="" className="bg-[#0f172a]">-- Select Seller Account (Optional) --</option>
                                    {sellerUsers.map((user) => (
                                        <option key={user.id} value={user.id} className="bg-[#0f172a]">{user.name} ({user.email})</option>
                                    ))}
                                </select>
                                {errors.user_id && <p className="text-red-400 text-xs">{errors.user_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="business_name">Business Name</Label>
                                <Input
                                    id="business_name"
                                    value={data.business_name}
                                    onChange={(e) => setData('business_name', e.target.value)}
                                    required
                                />
                                {errors.business_name && <p className="text-red-400 text-xs">{errors.business_name}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="city_id">City</Label>
                                <select
                                    id="city_id"
                                    value={data.city_id}
                                    onChange={(e) => setData('city_id', e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold"
                                    required
                                >
                                    <option value="" className="bg-[#0f172a]">-- Select City --</option>
                                    {cities.map((city) => (
                                        <option key={city.id} value={city.id} className="bg-[#0f172a]">{city.name}</option>
                                    ))}
                                </select>
                                {errors.city_id && <p className="text-red-400 text-xs">{errors.city_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="area">Area / Sector</Label>
                                <Input
                                    id="area"
                                    value={data.area}
                                    onChange={(e) => setData('area', e.target.value)}
                                />
                                {errors.area && <p className="text-red-400 text-xs">{errors.area}</p>}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="full_address">Full Address</Label>
                            <Input
                                id="full_address"
                                value={data.full_address}
                                onChange={(e) => setData('full_address', e.target.value)}
                            />
                            {errors.full_address && <p className="text-red-400 text-xs">{errors.full_address}</p>}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input
                                    id="phone"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    required
                                />
                                {errors.phone && <p className="text-red-400 text-xs">{errors.phone}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="whatsapp">WhatsApp Number</Label>
                                <Input
                                    id="whatsapp"
                                    value={data.whatsapp}
                                    onChange={(e) => setData('whatsapp', e.target.value)}
                                />
                                {errors.whatsapp && <p className="text-red-400 text-xs">{errors.whatsapp}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                            <div className="space-y-2">
                                <Label htmlFor="years_in_business">Years in Business</Label>
                                <Input
                                    id="years_in_business"
                                    type="number"
                                    value={data.years_in_business}
                                    onChange={(e) => setData('years_in_business', e.target.value)}
                                />
                                {errors.years_in_business && <p className="text-red-400 text-xs">{errors.years_in_business}</p>}
                            </div>

                            <div className="flex items-center gap-2 mt-6">
                                <input
                                    id="is_verified"
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold"
                                    checked={data.is_verified}
                                    onChange={(e) => setData('is_verified', e.target.checked)}
                                />
                                <Label htmlFor="is_verified" className="cursor-pointer">Verified Status</Label>
                            </div>
                        </div>

                        <Button type="submit" className="w-full mt-4" disabled={processing}>
                            {processing ? 'Saving...' : 'Save Jeweller'}
                        </Button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

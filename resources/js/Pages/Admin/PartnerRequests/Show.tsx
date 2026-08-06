import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Check, X, Mail, Phone, MessageCircle, MapPin, Briefcase } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import { confirmAction, promptText } from '@/lib/swal';

interface PartnerRequestDetail {
    id: number;
    name: string;
    email: string;
    phone: string;
    whatsapp: string | null;
    business_name: string;
    area: string | null;
    full_address: string;
    years_in_business: number | null;
    specialities: string[] | null;
    message: string | null;
    status: 'pending' | 'approved' | 'rejected';
    rejection_reason: string | null;
    created_at: string;
    city?: { name: string } | null;
    user?: { name: string; email: string } | null;
}

interface PartnerRequestShowProps {
    partnerRequest: PartnerRequestDetail;
}

export default function AdminPartnerRequestShow({ partnerRequest: r }: PartnerRequestShowProps) {
    const handleApprove = () => {
        confirmAction(
            'Approve Application?',
            `"${r.business_name}" will get a seller account and a live shop on the platform.`,
            'Yes, approve',
            () => router.patch(`/admin/partner-requests/${r.id}/approve`)
        );
    };

    const handleReject = () => {
        promptText(
            `Reject "${r.business_name}"?`,
            'Reason (optional) — shared with the applicant',
            'Reject Application',
            (reason) => router.patch(`/admin/partner-requests/${r.id}/reject`, { rejection_reason: reason })
        );
    };

    return (
        <AdminLayout title="Partner Application">
            <Head title={`Partner Application: ${r.business_name}`} />

            <div className="max-w-3xl space-y-6">
                <Link href="/admin/partner-requests">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white -ml-2">
                        <ArrowLeft size={16} className="mr-2" /> Back to Partner Requests
                    </Button>
                </Link>

                <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-semibold text-white">{r.business_name}</h2>
                            <p className="text-gray-400 text-sm mt-1">Applied by {r.name} · {r.created_at}</p>
                        </div>
                        <StatusBadge status={r.status} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-3 text-sm">
                            <Mail size={16} className="text-gold flex-shrink-0" />
                            <span className="text-gray-300">{r.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <Phone size={16} className="text-gold flex-shrink-0" />
                            <span className="text-gray-300">{r.phone}</span>
                        </div>
                        {r.whatsapp && (
                            <div className="flex items-center gap-3 text-sm">
                                <MessageCircle size={16} className="text-gold flex-shrink-0" />
                                <span className="text-gray-300">{r.whatsapp}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-3 text-sm">
                            <MapPin size={16} className="text-gold flex-shrink-0" />
                            <span className="text-gray-300">
                                {[r.area, r.city?.name].filter(Boolean).join(', ') || '—'}
                            </span>
                        </div>
                        {r.years_in_business !== null && (
                            <div className="flex items-center gap-3 text-sm">
                                <Briefcase size={16} className="text-gold flex-shrink-0" />
                                <span className="text-gray-300">{r.years_in_business} years in business</span>
                            </div>
                        )}
                    </div>

                    <div className="mb-6">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Full Address</p>
                        <p className="text-gray-300 text-sm">{r.full_address}</p>
                    </div>

                    {r.specialities && r.specialities.length > 0 && (
                        <div className="mb-6">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Specialities</p>
                            <div className="flex flex-wrap gap-2">
                                {r.specialities.map((s) => (
                                    <span key={s} className="px-2.5 py-1 rounded-full text-xs bg-gold/10 text-gold border border-gold/20">{s}</span>
                                ))}
                            </div>
                        </div>
                    )}

                    {r.message && (
                        <div className="mb-6">
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1.5">Message</p>
                            <p className="text-gray-300 text-sm whitespace-pre-line">{r.message}</p>
                        </div>
                    )}

                    {r.status === 'rejected' && r.rejection_reason && (
                        <div className="mb-6 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-1.5">Rejection Reason</p>
                            <p className="text-gray-300 text-sm">{r.rejection_reason}</p>
                        </div>
                    )}

                    {r.status === 'approved' && r.user && (
                        <div className="mb-6 rounded-lg border border-green-500/20 bg-green-500/5 p-4">
                            <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-1.5">Seller Account</p>
                            <p className="text-gray-300 text-sm">{r.user.name} · {r.user.email}</p>
                        </div>
                    )}

                    {r.status === 'pending' && (
                        <div className="flex gap-3 pt-2 border-t border-white/10 mt-6">
                            <Button
                                type="button"
                                className="flex-1 bg-green-600 hover:bg-green-500 text-white"
                                onClick={handleApprove}
                            >
                                <Check size={16} className="mr-2" /> Approve
                            </Button>
                            <Button
                                type="button"
                                variant="destructive"
                                className="flex-1"
                                onClick={handleReject}
                            >
                                <X size={16} className="mr-2" /> Reject
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}

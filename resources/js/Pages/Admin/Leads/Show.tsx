import React from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { ArrowLeft, Phone, MessageCircle } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import type { Lead } from '@/types';

interface LeadShowProps {
    lead: Lead;
}

const STATUS_OPTIONS = ['new', 'contacted', 'appointment_booked', 'sale_completed', 'lost'];
const PAYMENT_OPTIONS = ['unpaid', 'paid', 'partial'];

export default function AdminLeadShow({ lead }: LeadShowProps) {
    const { data, setData, patch, processing, errors } = useForm({
        status:         lead.status,
        jeweller_id:    lead.jeweller_id ?? '',
        sale_amount:    lead.sale_amount ?? '',
        payment_status: lead.payment_status ?? 'unpaid',
        notes:          lead.notes ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/admin/leads/${lead.id}`);
    };

    const jeweller = typeof lead.jeweller === 'object' ? lead.jeweller : null;
    const productDetail = lead.product ? ` regarding your inquiry for ${lead.product.title}` : ' regarding your custom jewellery request';
    const whatsappMsg = `Hi ${lead.customer_name}, I am reaching out from Online Jewelry Shop${productDetail} (Lead ID: ${lead.lead_id}). How can we assist you today?`;
    const jewellerMsg = jeweller ? `Hi ${jeweller.business_name}, we have a new lead for you (Lead ID: ${lead.lead_id}). Please check your dashboard for details.` : '';

    return (
        <AdminLayout title={`Lead: ${lead.lead_id}`}>
            <Head title={`Lead ${lead.lead_id}`} />

            <div className="max-w-4xl space-y-6">
                {/* Back */}
                <Link href="/admin/leads">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white -ml-2">
                        <ArrowLeft size={16} className="mr-2" /> Back to Leads
                    </Button>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Lead Details */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-white">{lead.customer_name}</h2>
                                    <p className="font-mono text-gold text-sm">{lead.lead_id}</p>
                                </div>
                                <StatusBadge status={lead.status} />
                            </div>

                            {lead.product && (
                                <div className="mb-6 bg-white/5 rounded-lg border border-white/10 p-4 flex items-center gap-4">
                                    {lead.product.image ? (
                                        <div className="w-16 h-16 rounded overflow-hidden border border-white/10 bg-white flex-shrink-0">
                                            <img src={lead.product.image} alt={lead.product.title} className="w-full h-full object-contain" />
                                        </div>
                                    ) : (
                                        <div className="w-16 h-16 rounded flex items-center justify-center bg-white/10 border border-white/10 text-white flex-shrink-0">
                                            <i className="fa-solid fa-ring text-xl text-gold"></i>
                                        </div>
                                    )}
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Inquiring About Product</p>
                                        <p className="text-white font-medium">{lead.product.title}</p>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Phone</p>
                                    <p className="text-white flex items-center gap-2">
                                        {lead.customer_phone}
                                        <a
                                            href={`https://wa.me/${lead.customer_phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMsg)}`}
                                            target="_blank"
                                            className="text-green-400 hover:text-green-300"
                                            title="Message on WhatsApp"
                                        >
                                            <MessageCircle size={14} />
                                        </a>
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">City</p>
                                    <p className="text-white">{lead.city ?? '—'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Category</p>
                                    <p className="text-white">{lead.category ?? '—'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Budget</p>
                                    <p className="text-white">{lead.budget ?? '—'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Contact Time</p>
                                    <p className="text-white">{lead.preferred_contact_time ?? '—'}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Submitted</p>
                                    <p className="text-white">{lead.created_at}</p>
                                </div>
                            </div>

                            {lead.requirement_description && (
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Requirements</p>
                                    <p className="text-gray-300 text-sm leading-relaxed">{lead.requirement_description}</p>
                                </div>
                            )}

                            {lead.reference_image && (
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Reference Design Image</p>
                                    <div className="max-w-md rounded-lg overflow-hidden border border-white/10 bg-white/5">
                                        <a href={lead.reference_image.startsWith('http') ? lead.reference_image : `/storage/${lead.reference_image}`} target="_blank" rel="noreferrer">
                                            <img 
                                                src={lead.reference_image.startsWith('http') ? lead.reference_image : `/storage/${lead.reference_image}`} 
                                                alt="Reference Design" 
                                                className="w-full max-h-96 object-contain hover:scale-105 transition-transform duration-300"
                                            />
                                        </a>
                                    </div>
                                </div>
                            )}

                            {jeweller && (
                                <div className="mt-4 pt-4 border-t border-white/10">
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Assigned Jeweller</p>
                                    <p className="text-white font-medium">{jeweller.business_name}</p>
                                    <div className="flex gap-3 mt-2">
                                        {jeweller.phone && (
                                            <a href={`tel:${jeweller.phone}`} className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                                                <Phone size={13} /> {jeweller.phone}
                                            </a>
                                        )}
                                        {jeweller.whatsapp && (
                                            <a
                                                href={`https://wa.me/${jeweller.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(jewellerMsg)}`}
                                                target="_blank"
                                                className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1"
                                            >
                                                <MessageCircle size={13} /> WhatsApp
                                            </a>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Appointments */}
                        {lead.appointments && lead.appointments.length > 0 && (
                            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                                <h3 className="font-semibold text-white mb-3">Appointments</h3>
                                <div className="space-y-3">
                                    {lead.appointments.map((appt) => (
                                        <div key={appt.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                                            <div>
                                                <p className="text-sm text-white">{appt.appointment_date} at {appt.appointment_time}</p>
                                                {appt.notes && <p className="text-xs text-gray-400">{appt.notes}</p>}
                                            </div>
                                            <StatusBadge status={appt.status} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Edit Form */}
                    <div className="rounded-xl border border-white/10 bg-white/5 p-6 h-fit">
                        <h3 className="font-semibold text-white mb-4">Update Lead</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value as typeof data.status)}
                                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold"
                                >
                                    {STATUS_OPTIONS.map((s) => (
                                        <option key={s} value={s} className="bg-[#0f172a]">{s.replace('_', ' ')}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label>Sale Amount (PKR)</Label>
                                <Input
                                    type="number"
                                    placeholder="0"
                                    value={data.sale_amount}
                                    onChange={(e) => setData('sale_amount', e.target.value)}
                                />
                                {lead.commission_amount && (
                                    <p className="text-xs text-gold">
                                        Commission: {lead.commission_type === 'percentage' ? '3%' : 'Fixed'} = Rs. {lead.commission_amount}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label>Payment Status</Label>
                                <select
                                    value={data.payment_status}
                                    onChange={(e) => setData('payment_status', e.target.value as typeof data.payment_status)}
                                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold"
                                >
                                    {PAYMENT_OPTIONS.map((s) => (
                                        <option key={s} value={s} className="bg-[#0f172a]">{s}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label>Notes</Label>
                                <Textarea
                                    placeholder="Internal notes..."
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={4}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

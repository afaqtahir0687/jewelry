import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Phone, MessageCircle } from 'lucide-react';
import SellerLayout from '@/Layouts/SellerLayout';
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

export default function SellerLeadShow({ lead }: LeadShowProps) {
    const { data, setData, patch, processing, errors } = useForm({
        status:         lead.status,
        sale_amount:    lead.sale_amount ?? '',
        payment_status: lead.payment_status ?? 'unpaid',
        notes:          lead.notes ?? '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/seller/leads/${lead.id}`);
    };

    const whatsappMsg = `Hi ${lead.customer_name}, thank you for your request on Online Jewelry Shop. How can I assist you with your custom design?`;

    return (
        <SellerLayout title={`Lead Details: ${lead.lead_id}`}>
            <Head title={`Lead ${lead.lead_id} — Seller`} />

            <div className="max-w-4xl space-y-6">
                <Link href="/seller/leads">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white -ml-2">
                        <ArrowLeft size={16} className="mr-2" /> Back to My Leads
                    </Button>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Details Column */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h2 className="text-lg font-semibold text-white">{lead.customer_name}</h2>
                                    <p className="font-mono text-gold text-sm">{lead.lead_id}</p>
                                </div>
                                <StatusBadge status={lead.status} />
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                                <div>
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Phone</p>
                                    <p className="text-white">{lead.customer_phone}</p>
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
                                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-1">Date Assigned</p>
                                    <p className="text-white">{lead.created_at}</p>
                                </div>
                            </div>

                            <div className="flex gap-3 py-3 border-t border-b border-white/5 my-4">
                                <a href={`tel:${lead.customer_phone}`}>
                                    <Button size="sm" variant="outline" className="flex items-center gap-1.5">
                                        <Phone size={14} /> Call Customer
                                    </Button>
                                </a>
                                <a
                                    href={`https://wa.me/${lead.customer_phone.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMsg)}`}
                                    target="_blank"
                                >
                                    <Button size="sm" variant="outline" className="text-green-400 border-green-500/30 hover:bg-green-500/10 flex items-center gap-1.5">
                                        <MessageCircle size={14} /> Message WhatsApp
                                    </Button>
                                </a>
                            </div>

                            {lead.requirement_description && (
                                <div className="space-y-1">
                                    <p className="text-gray-500 text-xs uppercase tracking-wider">Customer Requirements</p>
                                    <p className="text-gray-300 text-sm leading-relaxed">{lead.requirement_description}</p>
                                </div>
                            )}
                        </div>

                        {/* Appointments */}
                        {lead.appointments && lead.appointments.length > 0 && (
                            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                                <h3 className="font-semibold text-white mb-3">Appointments scheduled</h3>
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
                        <h3 className="font-semibold text-white mb-4">Update Status</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Lead Status</Label>
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
                                <Label>Final Sale Amount (PKR)</Label>
                                <Input
                                    type="number"
                                    placeholder="e.g. 75000"
                                    value={data.sale_amount}
                                    onChange={(e) => setData('sale_amount', e.target.value)}
                                />
                                {lead.commission_amount && (
                                    <p className="text-xs text-gold">
                                        Calculated Commission: Rs. {lead.commission_amount} ({lead.commission_type})
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
                                <Label>My Private Notes</Label>
                                <Textarea
                                    placeholder="Write customer preferences, metal choice, followups..."
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={4}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={processing}>
                                {processing ? 'Updating...' : 'Save Changes'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </SellerLayout>
    );
}

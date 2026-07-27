import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import SellerLayout from '@/Layouts/SellerLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Appointment, PaginatedData } from '@/types';

interface AppointmentsIndexProps {
    appointments: PaginatedData<Appointment>;
}

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function SellerAppointmentsIndex({ appointments }: AppointmentsIndexProps) {
    const [editingAppt, setEditingAppt] = useState<Appointment | null>(null);
    const [status, setStatus] = useState('');
    const [notes, setNotes] = useState('');
    const [saving, setSaving] = useState(false);

    const handleStatusChange = (id: number, status: string) => {
        router.patch(`/seller/appointments/${id}`, { status });
    };

    const startEditing = (appt: Appointment) => {
        setEditingAppt(appt);
        setStatus(appt.status);
        setNotes(appt.notes ?? '');
    };

    const handleSave = () => {
        if (!editingAppt) return;
        setSaving(true);
        router.patch(`/seller/appointments/${editingAppt.id}`, {
            status,
            notes,
        }, {
            onSuccess: () => {
                setEditingAppt(null);
                setSaving(false);
            },
            onFinish: () => setSaving(false),
        });
    };

    return (
        <SellerLayout title="My Appointments">
            <Head title="My Appointments — Seller" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Appointments Table */}
                <div className="lg:col-span-2 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10">
                        <h2 className="font-semibold text-white">Appointments Calendar</h2>
                        <p className="text-xs text-gray-400 mt-0.5">{appointments.total} scheduled</p>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Lead ID</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-gray-500 py-12">
                                        No appointments scheduled yet.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                appointments.data.map((a) => (
                                    <TableRow key={a.id}>
                                        <TableCell className="font-mono text-gold text-xs">{a.lead_id ?? '—'}</TableCell>
                                        <TableCell className="font-medium">{a.customer_name}</TableCell>
                                        <TableCell className="text-sm text-gray-400">{a.customer_phone}</TableCell>
                                        <TableCell>{a.appointment_date}</TableCell>
                                        <TableCell>{a.appointment_time}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={a.status} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                onClick={() => startEditing(a)}
                                            >
                                                Manage
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {appointments.last_page > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                            <p className="text-sm text-gray-400">Page {appointments.current_page} of {appointments.last_page}</p>
                            <div className="flex gap-2">
                                {appointments.prev_page_url && <Link href={appointments.prev_page_url}><Button variant="outline" size="sm">Previous</Button></Link>}
                                {appointments.next_page_url && <Link href={appointments.next_page_url}><Button variant="outline" size="sm">Next</Button></Link>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Manage Drawer / Panel */}
                <div>
                    {editingAppt ? (
                        <div className="rounded-xl border border-gold/30 bg-gold/5 p-6 space-y-4">
                            <div>
                                <h3 className="font-semibold text-white">Manage Appointment</h3>
                                <p className="text-xs text-gray-400">Customer: {editingAppt.customer_name}</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Status</Label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none"
                                >
                                    {STATUS_OPTIONS.map((s) => (
                                        <option key={s} value={s} className="bg-[#0f172a]">{s}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label>Notes / Follow-up Details</Label>
                                <Textarea
                                    placeholder="Write notes about custom options discussed, gold weight confirmed..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    rows={4}
                                />
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button className="flex-1" onClick={handleSave} disabled={saving}>
                                    {saving ? 'Saving...' : 'Save Notes'}
                                </Button>
                                <Button variant="outline" className="flex-1" onClick={() => setEditingAppt(null)}>
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-gray-500 py-12">
                            Select an appointment to manage status and add consultation notes.
                        </div>
                    )}
                </div>
            </div>
        </SellerLayout>
    );
}

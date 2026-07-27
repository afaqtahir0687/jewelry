import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import StatusBadge from '@/components/admin/StatusBadge';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import type { Appointment, PaginatedData } from '@/types';

interface AppointmentsIndexProps {
    appointments: PaginatedData<Appointment>;
}

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function AdminAppointmentsIndex({ appointments }: AppointmentsIndexProps) {
    const handleStatusChange = (id: number, status: string) => {
        router.patch(`/admin/appointments/${id}`, { status });
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this appointment?')) {
            router.delete(`/admin/appointments/${id}`);
        }
    };

    return (
        <AdminLayout title="Appointments">
            <Head title="Appointments — Admin" />

            <div className="rounded-xl border border-white/10 bg-white/5">
                <div className="px-6 py-4 border-b border-white/10">
                    <h2 className="font-semibold text-white">All Appointments</h2>
                    <p className="text-xs text-gray-400 mt-0.5">{appointments.total} total</p>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Lead ID</TableHead>
                            <TableHead>Jeweller</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Time</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Notes</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {appointments.data.map((a) => (
                            <TableRow key={a.id}>
                                <TableCell className="font-mono text-gold text-xs">{a.lead_id ?? '—'}</TableCell>
                                <TableCell>{a.jeweller ?? '—'}</TableCell>
                                <TableCell>
                                    <div>
                                        <p className="font-medium">{a.customer_name}</p>
                                        <p className="text-xs text-gray-400">{a.customer_phone}</p>
                                    </div>
                                </TableCell>
                                <TableCell>{a.appointment_date ?? '—'}</TableCell>
                                <TableCell>{a.appointment_time ?? '—'}</TableCell>
                                <TableCell>
                                    <select
                                        value={a.status}
                                        onChange={(e) => handleStatusChange(a.id, e.target.value)}
                                        className="text-xs rounded bg-white/5 border border-white/10 text-white px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gold"
                                    >
                                        {STATUS_OPTIONS.map((s) => (
                                            <option key={s} value={s} className="bg-[#0f172a]">{s}</option>
                                        ))}
                                    </select>
                                </TableCell>
                                <TableCell className="text-xs text-gray-400 max-w-[200px] truncate">{a.notes ?? '—'}</TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 hover:text-red-400"
                                        onClick={() => handleDelete(a.id)}
                                    >
                                        <Trash2 size={14} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
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
        </AdminLayout>
    );
}

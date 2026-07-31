import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { confirmDelete } from '@/lib/swal';
import type { Appointment, PaginatedData } from '@/types';

interface AppointmentsIndexProps {
    appointments: PaginatedData<Appointment>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled'];

export default function AdminAppointmentsIndex({ appointments, filters }: AppointmentsIndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/appointments', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/appointments', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleStatusChange = (id: number, status: string) => {
        router.patch(`/admin/appointments/${id}`, { status }, { preserveScroll: true });
    };

    const handleDelete = (id: number) => {
        confirmDelete(
            'Delete Appointment?',
            'Are you sure you want to delete this scheduled appointment? This action cannot be undone.',
            () => router.delete(`/admin/appointments/${id}`)
        );
    };

    const columns: Column<Appointment>[] = [
        { header: 'Lead ID', cell: (a) => <span className="font-mono text-gold text-xs">{a.lead_id ?? '—'}</span> },
        { header: 'Jeweller', cell: (a) => a.jeweller ?? '—' },
        { 
            header: 'Customer',
            accessorKey: 'customer_name',
            sortable: true,
            cell: (a) => (
                <div>
                    <p className="font-medium">{a.customer_name}</p>
                    <p className="text-xs text-gray-400">{a.customer_phone}</p>
                </div>
            )
        },
        { header: 'Date', accessorKey: 'appointment_date', sortable: true, cell: (a) => a.appointment_date ?? '—' },
        { header: 'Time', cell: (a) => a.appointment_time ?? '—' },
        { 
            header: 'Status',
            cell: (a) => (
                <select
                    value={a.status}
                    onChange={(e) => handleStatusChange(a.id, e.target.value)}
                    className="text-xs rounded bg-white/5 border border-white/10 text-white px-2 py-1 focus:outline-none focus:ring-1 focus:ring-gold"
                >
                    {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s} className="bg-[#0f172a]">{s}</option>
                    ))}
                </select>
            )
        },
        { header: 'Notes', cell: (a) => <span className="text-xs text-gray-400 max-w-[200px] truncate block" title={a.notes || ''}>{a.notes ?? '—'}</span> },
        {
            header: 'Actions',
            cell: (a) => (
                <div className="flex items-center justify-end gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        onClick={() => handleDelete(a.id)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Appointments">
            <Head title="Appointments — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Appointments</h2>
                    <p className="text-gray-400 text-sm mt-1">Manage scheduled appointments</p>
                </div>
            </div>

            <DataTable
                data={appointments}
                columns={columns}
                searchQuery={filters?.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters?.sortField || 'id', direction: filters?.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}

import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { DataTable, Column } from '@/components/ui/DataTable';
import { Button } from '@/components/ui/button';
import { confirmDelete } from '@/lib/swal';
import { Trash2, Eye } from 'lucide-react';
import type { PaginatedData } from '@/types';

interface ContactMessage {
    id: number;
    name: string;
    email: string;
    subject: string;
    is_read: boolean;
    created_at: string;
}

interface IndexProps {
    messages: PaginatedData<ContactMessage>;
    filters: { search?: string; sortField?: string; sortDirection?: 'asc' | 'desc' };
}

export default function ContactMessagesIndex({ messages, filters }: IndexProps) {
    const handleSearch = (query: string) => {
        router.get('/admin/contact-messages', { ...filters, search: query }, { preserveState: true, preserveScroll: true });
    };

    const handleSort = (field: string, direction: 'asc' | 'desc') => {
        router.get('/admin/contact-messages', { ...filters, sortField: field, sortDirection: direction }, { preserveState: true, preserveScroll: true });
    };

    const handleDelete = (id: number) => {
        confirmDelete(
            'Delete Message?',
            `Are you sure you want to delete this message? This action cannot be undone.`,
            () => router.delete(`/admin/contact-messages/${id}`)
        );
    };

    const columns: Column<ContactMessage>[] = [
        { header: 'ID', accessorKey: 'id', sortable: true },
        { 
            header: 'Sender', 
            cell: (m) => (
                <div>
                    <div className="font-medium text-white">{m.name}</div>
                    <div className="text-xs text-gray-400">{m.email}</div>
                </div>
            )
        },
        { header: 'Subject', accessorKey: 'subject', sortable: true },
        { 
            header: 'Date', 
            cell: (m) => new Date(m.created_at).toLocaleDateString()
        },
        { 
            header: 'Status', 
            cell: (m) => (
                <span className={`px-2 py-1 rounded text-xs font-semibold ${m.is_read ? 'bg-gray-700 text-gray-300' : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'}`}>
                    {m.is_read ? 'Read' : 'Unread'}
                </span>
            )
        },
        {
            header: 'Actions',
            cell: (m) => (
                <div className="flex items-center gap-2">
                    <Link href={`/admin/contact-messages/${m.id}`}>
                        <Button size="icon" variant="ghost" className="h-8 w-8 hover:text-gold text-gray-400">
                            <Eye size={14} />
                        </Button>
                    </Link>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 hover:text-red-400 text-gray-400"
                        onClick={() => handleDelete(m.id)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ];

    return (
        <AdminLayout title="Inquiries">
            <Head title="Inquiries — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white">Contact Inquiries</h2>
                    <p className="text-gray-400 text-sm mt-1">View messages sent from the Contact Us page</p>
                </div>
            </div>

            <DataTable
                data={messages}
                columns={columns}
                searchQuery={filters.search}
                onSearch={handleSearch}
                onSort={handleSort}
                currentSort={{ field: filters.sortField || 'created_at', direction: filters.sortDirection || 'desc' }}
            />
        </AdminLayout>
    );
}

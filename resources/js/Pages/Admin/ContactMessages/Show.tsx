import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, Mail, Calendar, User, Tag } from 'lucide-react';
import { confirmDelete } from '@/lib/swal';

export default function ContactMessageShow({ messageData }: { messageData: any }) {
    const handleDelete = () => {
        confirmDelete(
            'Delete Message?',
            `Are you sure you want to delete this message? This action cannot be undone.`,
            () => router.delete(`/admin/contact-messages/${messageData.id}`)
        );
    };

    return (
        <AdminLayout title="View Inquiry">
            <Head title="View Inquiry — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <Link href="/admin/contact-messages" className="mr-4 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Inquiry Details</h2>
                        <p className="text-gray-400 text-sm mt-1">Read contact message</p>
                    </div>
                </div>
                <Button variant="destructive" onClick={handleDelete} className="flex items-center gap-2">
                    <Trash2 size={16} /> Delete Message
                </Button>
            </div>

            <div className="bg-[#1e293b] rounded-lg border border-white/10 overflow-hidden max-w-4xl">
                <div className="p-6 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-gray-300">
                            <User size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-white">{messageData.name}</h3>
                            <a href={`mailto:${messageData.email}`} className="text-sm text-gold hover:underline flex items-center gap-1 mt-0.5">
                                <Mail size={12} /> {messageData.email}
                            </a>
                        </div>
                    </div>
                    <div className="text-sm text-gray-400 flex flex-col md:items-end gap-1">
                        <span className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(messageData.created_at).toLocaleString()}</span>
                        <span className="flex items-center gap-1.5 mt-1"><Tag size={14} /> Subject: <strong className="text-gray-300 font-normal">{messageData.subject || 'No Subject'}</strong></span>
                    </div>
                </div>
                
                <div className="p-8">
                    <div className="bg-[#0f172a] rounded-md p-6 border border-white/5">
                        <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                            {messageData.message}
                        </p>
                    </div>
                </div>
                
                <div className="bg-white/5 px-6 py-4 border-t border-white/5">
                    <a href={`mailto:${messageData.email}`} className="text-sm font-medium text-black bg-gold hover:bg-gold/90 px-4 py-2 rounded shadow-sm inline-block transition-colors">
                        Reply via Email
                    </a>
                </div>
            </div>
        </AdminLayout>
    );
}

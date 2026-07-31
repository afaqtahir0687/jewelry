import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import type { Permission } from '@/types';

interface PermissionsEditProps {
    permission: Permission;
}

export default function PermissionsEdit({ permission }: PermissionsEditProps) {
    const { data, setData, patch, processing, errors } = useForm({
        name: permission.name
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/admin/permissions/${permission.id}`);
    };

    return (
        <AdminLayout title="Edit Permission">
            <Head title="Edit Permission — Admin" />

            <div className="mb-6">
                <Link href="/admin/permissions" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-2">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Permissions
                </Link>
                <h2 className="text-2xl font-bold text-white">Edit Permission: {permission.name}</h2>
            </div>

            <div className="max-w-xl rounded-xl border border-white/10 bg-white/5 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Permission Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            className="bg-white/5 border-white/10 text-white"
                        />
                        {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <Link href="/admin/permissions">
                            <Button type="button" variant="outline" className="border-white/10 text-gray-300 hover:text-white">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="bg-gold text-black hover:bg-gold/90">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';
import type { Role, Permission } from '@/types';

interface RolesEditProps {
    role: Role;
    permissions: Permission[];
}

export default function RolesEdit({ role, permissions }: RolesEditProps) {
    const { data, setData, patch, processing, errors } = useForm({
        name: role.name,
        permissions: role.permissions?.map(p => p.name) || []
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/admin/roles/${role.id}`);
    };

    const togglePermission = (permissionName: string) => {
        if (data.permissions.includes(permissionName)) {
            setData('permissions', data.permissions.filter(p => p !== permissionName));
        } else {
            setData('permissions', [...data.permissions, permissionName]);
        }
    };

    return (
        <AdminLayout title="Edit Role">
            <Head title="Edit Role — Admin" />

            <div className="mb-6">
                <Link href="/admin/roles" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-2">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Roles
                </Link>
                <h2 className="text-2xl font-bold text-white">Edit Role: {role.name}</h2>
            </div>

            <div className="max-w-3xl rounded-xl border border-white/10 bg-white/5 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Role Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            className="bg-white/5 border-white/10 text-white"
                        />
                        {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label>Permissions</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                            {permissions.map((perm) => (
                                <label key={perm.id} className="flex items-center space-x-2 text-sm text-gray-300 hover:text-white cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded border-white/20 bg-white/5 text-gold focus:ring-gold focus:ring-offset-gray-900"
                                        checked={data.permissions.includes(perm.name)}
                                        onChange={() => togglePermission(perm.name)}
                                    />
                                    <span>{perm.name}</span>
                                </label>
                            ))}
                        </div>
                        {errors.permissions && <p className="text-red-400 text-sm">{errors.permissions}</p>}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                        <Link href="/admin/roles">
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

import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import type { Role } from '@/types';

interface UsersCreateProps {
    roles: Role[];
}

export default function AdminUsersCreate({ roles }: UsersCreateProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: ''
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/users');
    };

    return (
        <AdminLayout title="Add User">
            <Head title="Add User — Admin" />

            <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                    <Link href="/admin/users">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <div>
                        <h2 className="text-2xl font-bold text-white">Add User</h2>
                        <p className="text-gray-400 text-sm mt-1">Create a new system user</p>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-white">Name <span className="text-red-500">*</span></Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="bg-black/50 border-white/10 text-white"
                                placeholder="John Doe"
                                required
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">Email <span className="text-red-500">*</span></Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="bg-black/50 border-white/10 text-white"
                                placeholder="john@example.com"
                                required
                            />
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white">Password <span className="text-red-500">*</span></Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="bg-black/50 border-white/10 text-white"
                                placeholder="••••••••"
                                required
                            />
                            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        </div>
                        
                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation" className="text-white">Confirm Password <span className="text-red-500">*</span></Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="bg-black/50 border-white/10 text-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="role" className="text-white">Role <span className="text-red-500">*</span></Label>
                            <select
                                id="role"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="w-full bg-black/50 border-white/10 text-white rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold"
                                required
                            >
                                <option value="">Select a role...</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.name}>
                                        {role.name}
                                    </option>
                                ))}
                            </select>
                            {errors.role && <p className="text-red-400 text-sm mt-1">{errors.role}</p>}
                        </div>

                        <div className="pt-4 flex items-center gap-4">
                            <Button
                                type="submit"
                                className="bg-gold text-black hover:bg-gold/90"
                                disabled={processing}
                            >
                                {processing ? 'Creating...' : 'Create User'}
                            </Button>
                            <Link href="/admin/users">
                                <Button type="button" variant="ghost" className="text-gray-400 hover:text-white">
                                    Cancel
                                </Button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

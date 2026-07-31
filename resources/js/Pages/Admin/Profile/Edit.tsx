import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { User } from '@/types';

interface ProfileEditProps {
    user: User;
}

export default function AdminProfileEdit({ user }: ProfileEditProps) {
    const { data, setData, patch, processing, errors, recentlySuccessful } = useForm({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: ''
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch('/admin/profile');
    };

    return (
        <AdminLayout title="My Profile">
            <Head title="My Profile — Admin" />

            <div className="max-w-xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">Profile Information</h2>
                    <p className="text-gray-400 text-sm mt-1">Update your account's profile details and password.</p>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                    <form onSubmit={submit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-white">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="bg-black/50 border-white/10 text-white"
                                required
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-white">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="bg-black/50 border-white/10 text-white"
                                required
                            />
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-white">New Password (leave blank to keep current)</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                className="bg-black/50 border-white/10 text-white"
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password_confirmation" className="text-white">Confirm New Password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                className="bg-black/50 border-white/10 text-white"
                                placeholder="••••••••"
                            />
                        </div>

                        <div className="pt-4 flex items-center gap-4">
                            <Button
                                type="submit"
                                className="bg-gold text-black hover:bg-gold/90"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>

                            {recentlySuccessful && (
                                <p className="text-green-400 text-sm">Saved successfully.</p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

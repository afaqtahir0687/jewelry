import React from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import type { User, PaginatedData } from '@/types';

interface UsersIndexProps {
    users: PaginatedData<User & { has_jeweller?: boolean }>;
}

export default function AdminUsersIndex({ users }: UsersIndexProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'seller',
    });

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/users', {
            onSuccess: () => reset(),
        });
    };

    const handleDelete = (id: number, email: string) => {
        if (confirm(`Delete user "${email}"?`)) {
            router.delete(`/admin/users/${id}`);
        }
    };

    return (
        <AdminLayout title="System Users">
            <Head title="Users — Admin" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Users List */}
                <div className="md:col-span-2 rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="px-6 py-4 border-b border-white/10">
                        <h2 className="font-semibold text-white">All Users</h2>
                        <p className="text-xs text-gray-400 mt-0.5">{users.total} users registered</p>
                    </div>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Roles</TableHead>
                                <TableHead>Jeweller Profile</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.data.map((u) => (
                                <TableRow key={u.id}>
                                    <TableCell className="font-medium">{u.name}</TableCell>
                                    <TableCell>{u.email}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-1">
                                            {u.roles.map((r) => (
                                                <Badge key={r} variant={r === 'admin' ? 'default' : 'secondary'}>
                                                    {r}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {u.roles.includes('seller') ? (
                                            u.has_jeweller ? (
                                                <span className="text-xs text-green-400">Linked</span>
                                            ) : (
                                                <span className="text-xs text-yellow-500 font-semibold">Not Linked</span>
                                            )
                                        ) : (
                                            <span className="text-gray-500">—</span>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 hover:text-red-400"
                                            onClick={() => handleDelete(u.id, u.email)}
                                        >
                                            <Trash2 size={14} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {users.last_page > 1 && (
                        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10">
                            <p className="text-sm text-gray-400">Page {users.current_page} of {users.last_page}</p>
                            <div className="flex gap-2">
                                {users.prev_page_url && <Link href={users.prev_page_url}><Button variant="outline" size="sm">Previous</Button></Link>}
                                {users.next_page_url && <Link href={users.next_page_url}><Button variant="outline" size="sm">Next</Button></Link>}
                            </div>
                        </div>
                    )}
                </div>

                {/* Create User Form */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-6 h-fit">
                    <h3 className="font-semibold text-white mb-4">Create System User</h3>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="Afaq Tahir"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && <p className="text-red-400 text-xs">{errors.name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="user@jewelry.com"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                            />
                            {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                required
                            />
                            {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label>Portal Role</Label>
                            <select
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="flex h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gold"
                            >
                                <option value="seller" className="bg-[#0f172a]">Seller (Jeweller Shop Owner)</option>
                                <option value="admin" className="bg-[#0f172a]">Admin (Full Access)</option>
                            </select>
                            {errors.role && <p className="text-red-400 text-xs">{errors.role}</p>}
                        </div>

                        <Button type="submit" className="w-full" disabled={processing}>
                            Create User
                        </Button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

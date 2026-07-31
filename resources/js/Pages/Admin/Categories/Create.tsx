import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';

export default function CategoriesCreate() {
    const { data, setData, post, processing, errors } = useForm({
        name: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/categories');
    };

    return (
        <AdminLayout title="Create Category">
            <Head title="Create Category — Admin" />

            <div className="mb-6">
                <Link href="/admin/categories" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-2">
                    <ChevronLeft className="h-4 w-4 mr-1" /> Back to Categories
                </Link>
                <h2 className="text-2xl font-bold text-white">Create Category</h2>
            </div>

            <div className="max-w-xl rounded-xl border border-white/10 bg-white/5 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Category Name</Label>
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
                        <Link href="/admin/categories">
                            <Button type="button" variant="outline" className="border-white/10 text-gray-300 hover:text-white">
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" disabled={processing} className="bg-gold text-black hover:bg-gold/90">
                            Create Category
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

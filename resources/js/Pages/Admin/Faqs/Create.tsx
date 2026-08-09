import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

export default function FaqCreate() {
    const { data, setData, post, processing, errors } = useForm({
        question: '',
        answer: '',
        sort_order: 0,
        is_active: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/faqs');
    };

    return (
        <AdminLayout title="Create FAQ">
            <Head title="Create FAQ — Admin" />

            <div className="flex items-center mb-6">
                <Link href="/admin/faqs" className="mr-4 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h2 className="text-2xl font-bold text-white">Create FAQ</h2>
                    <p className="text-gray-400 text-sm mt-1">Add a new frequently asked question</p>
                </div>
            </div>

            <div className="bg-[#1e293b] rounded-lg border border-white/10 p-6 max-w-4xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="question" className="text-gray-300">Question</Label>
                        <Input
                            id="question"
                            value={data.question}
                            onChange={e => setData('question', e.target.value)}
                            className="bg-[#0f172a] border-white/10 text-white focus:border-gold"
                        />
                        {errors.question && <p className="text-red-400 text-xs">{errors.question}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="answer" className="text-gray-300">Answer</Label>
                        <Textarea
                            id="answer"
                            value={data.answer}
                            onChange={e => setData('answer', e.target.value)}
                            rows={6}
                            className="bg-[#0f172a] border-white/10 text-white focus:border-gold"
                        />
                        {errors.answer && <p className="text-red-400 text-xs">{errors.answer}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="sort_order" className="text-gray-300">Sort Order</Label>
                            <Input
                                id="sort_order"
                                type="number"
                                min={0}
                                value={data.sort_order}
                                onChange={e => setData('sort_order', Number(e.target.value))}
                                className="bg-[#0f172a] border-white/10 text-white focus:border-gold"
                            />
                            {errors.sort_order && <p className="text-red-400 text-xs">{errors.sort_order}</p>}
                        </div>

                        <div className="flex items-center gap-2 pt-8">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={e => setData('is_active', e.target.checked)}
                                className="rounded border-gray-300 text-gold focus:ring-gold"
                            />
                            <Label htmlFor="is_active" className="text-gray-300 cursor-pointer">Active (Visible to public)</Label>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-white/10">
                        <Button type="button" variant="ghost" className="mr-3 text-gray-400 hover:text-white" onClick={() => history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing} className="bg-gold text-black hover:bg-gold/90">
                            {processing ? 'Saving...' : 'Save FAQ'}
                        </Button>
                    </div>
                </form>
            </div>
        </AdminLayout>
    );
}

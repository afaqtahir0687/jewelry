import React from 'react';
import { useForm, Head } from '@inertiajs/react';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}

export default function AdminLogin() {
    const [showPassword, setShowPassword] = React.useState(false);

    const { data, setData, post, processing, errors } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <>
            <Head title="Admin Login" />
            <div className="min-h-screen bg-[#060d1a] flex items-center justify-center p-4">

                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
                </div>

                <div className="w-full max-w-md relative z-10">
                    {/* Card */}
                    <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-8 shadow-2xl">

                        {/* Header */}
                        <div className="text-center mb-8">
                            <img src="/images/gehna-logo.svg" alt="Gehna" className="h-16 w-auto mx-auto mb-4" />
                            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
                            <p className="text-gray-400 text-sm mt-1">Admin CRM</p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="admin@jewelry.com"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    autoComplete="email"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="••••••••"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        autoComplete="current-password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-400 text-xs mt-1">{errors.password}</p>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-gold focus:ring-gold"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <Label htmlFor="remember" className="cursor-pointer">Remember me</Label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gold hover:bg-gold/90 text-white font-semibold py-2.5"
                                disabled={processing}
                            >
                                {processing ? 'Signing in...' : 'Sign In to Admin'}
                            </Button>
                        </form>

                        <div className="mt-6 pt-6 border-t border-white/10 text-center">
                            <a href="/seller/login" className="text-sm text-gray-500 hover:text-gold transition-colors">
                                Are you a seller? Sign in here →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

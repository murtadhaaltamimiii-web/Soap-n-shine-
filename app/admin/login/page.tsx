'use client';

import { useState, FormEvent } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!email || !password) {
            setError('Please enter both email and password');
            return;
        }

        setLoading(true);

        try {
            // Guard: Check if Firebase is initialized
            if (!auth) {
                setError('Authentication service unavailable');
                setLoading(false);
                return;
            }

            // Sign in with Firebase
            const userCredential = await signInWithEmailAndPassword(auth, email, password);

            // Get ID token for session
            const token = await userCredential.user.getIdToken();

            // Set session cookie via API route
            const response = await fetch('/api/auth/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token }),
            });

            if (response.ok) {
                // Redirect to admin dashboard
                router.push('/admin');
            } else {
                throw new Error('Failed to create session');
            }
        } catch (err: any) {
            console.error('Login error:', err);

            // User-friendly error messages
            if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
                setError('Invalid email or password');
            } else if (err.code === 'auth/user-not-found') {
                setError('No account found with this email');
            } else if (err.code === 'auth/too-many-requests') {
                setError('Too many failed attempts. Please try again later');
            } else {
                setError('Login failed. Please try again');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
            <div className="max-w-md w-full">
                {/* Logo & Branding */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold tracking-widest text-slate-900 uppercase mb-3">
                        SOAP N SHINE
                    </h1>
                    <p className="text-sm text-gray-500 font-semibold tracking-widest uppercase">Admin Portal</p>
                </div>

                {/* Login Card - Dark Theme */}
                <div className="bg-[#0F1115] border border-[#1f2128] rounded-2xl shadow-2xl p-8">
                    <h2 className="text-2xl font-bold text-white mb-6">Sign In</h2>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-900/20 border border-red-800/50 rounded-lg">
                            <p className="text-sm text-red-400 font-medium">{error}</p>
                        </div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Input */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={loading}
                                className={`w-full px-4 py-3 bg-[#1a1d24] border text-white rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all placeholder:text-gray-600 ${error && !email ? 'border-red-800/50' : 'border-[#2a2d35]'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                placeholder="admin@soapnshine.com"
                                required
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={loading}
                                className={`w-full px-4 py-3 bg-[#1a1d24] border text-white rounded-lg focus:ring-2 focus:ring-brand focus:border-brand outline-none transition-all placeholder:text-gray-600 ${error && !password ? 'border-red-800/50' : 'border-[#2a2d35]'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-brand hover:bg-brand-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Footer Note */}
                    <p className="mt-6 text-center text-xs text-gray-500">
                        Protected admin area • Authorized personnel only
                    </p>
                </div>

                {/* Back to Home Link */}
                <div className="text-center mt-6">
                    <a href="/" className="text-[10px] font-semibold text-slate-500 hover:text-slate-700 uppercase tracking-widest transition">
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    );
}

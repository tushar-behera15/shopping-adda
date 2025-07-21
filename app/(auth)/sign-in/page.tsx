'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function SignInPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                    credentials: "include",
                }),
            })
            const data = await res.json();
            if (res.ok) {
                toast.success("Login Successfully");
            }
            else {
                toast.error(data.error || "Login Failed");
            }

            const userRes = await fetch('/api/profile');
            const { user } = await userRes.json();
            if (user?.role === 'admin') {
                router.push('/admin/dashboard');
            } else {
                router.push('/');
            }

            
        }
        catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-orange-100 px-4">
            <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-center text-gray-600 mb-8">
                    Login in Shopping Adda
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6" autoComplete='off'>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder='Enter your name...'
                            className="mt-1 block w-full h-10 px-4 py-2 rounded-md border shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email ID</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder='Enter your email...'
                            className="mt-1 block w-full h-10 px-4 py-2 rounded-md border shadow-sm"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            placeholder='Enter your password..'
                            className="mt-1 block w-full h-10 px-4 py-2 rounded-md border shadow-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {loading ? "Sign in..." : "Sign in"}
                    </button>
                </form>
            </div>
        </div>
    );
}


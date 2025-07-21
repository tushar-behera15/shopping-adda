'use client';
import {
    LayoutDashboard,
    Users,
    Package,
    ShoppingCart,
    List,
    Menu
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ProgressBarLink } from '@/components/ProgressLink';
import { useEffect, useState } from 'react';

export default function Sidebar() {
    const pathname = usePathname?.();
    const [mounted, setMounted] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <aside className="w-64 bg-white border-r p-6">Loading menu...</aside>;
    }

    const linkClass = (path: string) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg transition ${pathname === path
            ? 'bg-orange-100 text-orange-600 font-semibold'
            : 'text-gray-700 hover:text-orange-500'
        }`;

    return (
        <div className="relative flex min-h-screen">
            {/* Floating toggle button only shown when sidebar is closed */}
            {!sidebarOpen && (
                <button
                    onClick={() => setSidebarOpen(true)}
                    className="absolute top-4 left-4 z-40 text-gray-800 bg-gray-100 p-2 rounded-md shadow-md"
                >
                    <Menu size={22} />
                </button>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-gray-100 border-r p-6 space-y-4 z-30 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                {/* Header row: Dashboard title + Menu icon (on the right) */}
                <div className="flex items-center justify-between">
                    <ProgressBarLink href='/' className="text-xl font-bold">Dashboard</ProgressBarLink>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-gray-700 focus:outline-none"
                    >
                        <Menu size={22} />
                    </button>
                </div>

                {/* Sidebar nav */}
                <nav className="flex flex-col space-y-2">
                    <ProgressBarLink href="/admin/dashboard" className={linkClass('/admin/dashboard')}>
                        <LayoutDashboard size={20} /> Overview
                    </ProgressBarLink>
                    <ProgressBarLink href="/admin/user-management" className={linkClass('/admin/user-management')}>
                        <Users size={20} /> Users
                    </ProgressBarLink>
                    <ProgressBarLink href="/admin/product-management" className={linkClass('/admin/product-management')}>
                        <Package size={20} /> Products
                    </ProgressBarLink>
                    <ProgressBarLink href="/admin/category-management" className={linkClass('/admin/category-management')}>
                        <List size={20} /> Categories
                    </ProgressBarLink>
                    <ProgressBarLink href="/admin/order-management" className={linkClass('/admin/order-management')}>
                        <ShoppingCart size={20} /> Orders
                    </ProgressBarLink>
                </nav>
            </aside>

            <main
                className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'ml-64' : 'ml-0'
                    } p-6`}
            >
            </main>
        </div>
    );
}

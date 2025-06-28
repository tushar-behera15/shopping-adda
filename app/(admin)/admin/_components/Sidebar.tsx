'use client'
import { LayoutDashboard, Users, Package, ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { ProgressBarLink } from "@/components/ProgressLink";
import { useEffect, useState } from "react";

export default function Sidebar() {
    const pathname = usePathname?.();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <aside className="w-64 bg-white border-r p-6">Loading menu...</aside>;
    }

    const linkClass = (path: string) =>
        `flex items-center gap-2 px-4 py-2 rounded-lg ${pathname === path ? "bg-orange-100 text-orange-600 font-semibold" : "text-gray-700 hover:text-orange-500"
        }`;
    return (
        <div className="flex min-h-screen bg-gray-100">
                
        <aside className="w-64 bg-white border-r p-6 space-y-4">
            <h2 className="text-xl font-bold"><ProgressBarLink href='/' className={linkClass('/')}>Dashboard</ProgressBarLink></h2>
            <nav className="flex flex-col space-y-2">
                <ProgressBarLink href="/admin/dashboard" className={linkClass("/admin/dashboard")}>
                    <LayoutDashboard size={20} /> Overview
                </ProgressBarLink>
                <ProgressBarLink href="/admin/user-management" className={linkClass("/admin/user-management")}>
                    <Users size={20} /> Users
                </ProgressBarLink>
                <ProgressBarLink href="/admin/product-management" className={linkClass("/admin/product-management")}>
                    <Package size={20} /> Products
                </ProgressBarLink>
                <ProgressBarLink href="/admin/category-management" className={linkClass("/admin/category-management")}>
                    <Package size={20} /> Categories
                </ProgressBarLink>
                <ProgressBarLink href="/admin/order-management" className={linkClass("/admin/order-management")}>
                    <ShoppingCart size={20} /> Orders
                </ProgressBarLink>
            </nav>
        </aside>
        </div>
    )
}

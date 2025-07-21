'use client';

import { ShoppingCart, Store, Menu, X, UserCircle2, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ProgressBarLink } from "./ProgressLink";
import Image from "next/image";
import { toast } from "sonner";

type User = {
    name: string;
    avatarUrl?: string;
};
export default function Header() {
    const navLinks = [
        { id: 1, href: "/", label: "Home" },
        { id: 2, href: "/all-products", label: "All Products" },
        { id: 3, href: "/about-us", label: "About Us" },
        { id: 4, href: "/contact-us", label: "Contacts" },
    ];

    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchUser = async () => {
        try {
            const res = await fetch('/api/profile');
            const data = await res.json();
            setUser(data.user);
        } catch (err) {
            console.error("Error fetching user profile:", err);
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);


    const handleLogout = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) {
                toast.success("Logout sucessfully");
                setUser(null);
            }
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <header className="w-full border-b-2 border-gray-200">
            <div className="flex justify-between items-center p-4">
                {/* Logo */}
                <ProgressBarLink href="/" activeClassName="">
                    <h1 className="text-xl font-semibold">Shopping Adda</h1>
                </ProgressBarLink>

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6 text-sm md:text-base font-medium">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <ProgressBarLink
                                key={link.id}
                                href={link.href}
                                className={`${isActive ? "text-orange-600" : "text-gray-700"
                                    } hover:text-orange-500 transition-colors`}
                            >
                                {link.label}
                            </ProgressBarLink>
                        );
                    })}
                </nav>

                {/* Right Side */}
                <div className="hidden md:flex space-x-4 items-center">
                    {user ? (
                        <>
                            <div className="flex items-center space-x-2">
                                {user.avatarUrl ? (
                                    <Image
                                        src={user.avatarUrl}
                                        alt="User"
                                        className="w-8 h-8 rounded-full"
                                        width={50}
                                        height={50}
                                    />
                                ) : (
                                    <UserCircle2 className="w-6 h-6 text-gray-600" />
                                )}
                                <span className="font-medium text-gray-700">{user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="p-2 border rounded text-sm hover:bg-gray-100"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <ProgressBarLink
                            href="/sign-in"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition"
                        >
                            Sign-in
                        </ProgressBarLink>
                    )}

                    <button title="My-cart" className="p-2 border rounded">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button title="My-orders" className="p-2 border rounded">
                        <Store className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setMenuOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Drawer Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Mobile Drawer Menu (slides in from right) */}
            <div
                className={`fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out md:hidden
          ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold">Menu</h2>
                    <button onClick={() => setMenuOpen(false)}>
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="flex flex-col p-4 space-y-4">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <ProgressBarLink
                                key={link.id}
                                href={link.href}
                                className={`${isActive ? "text-orange-600" : "text-gray-700"
                                    } hover:text-orange-500 transition-colors`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </ProgressBarLink>
                        );
                    })}
                    {user ? (
                        <>
                            <div className="flex items-center space-x-2 mt-4">
                                {user.avatarUrl ? (
                                    <Image
                                        src={user.avatarUrl}
                                        alt="User"
                                        className="w-8 h-8 rounded-full"
                                    />
                                ) : (
                                    <UserCircle2 className="w-6 h-6 text-gray-600" />
                                )}
                                <span className="text-sm font-medium text-gray-700">{user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="p-2 border rounded text-sm hover:bg-gray-100"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </>
                    ) : (
                        <ProgressBarLink
                            href="/sign-in"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition text-center"
                        >
                            Sign-in
                        </ProgressBarLink>
                    )}

                    <div className="flex space-x-4">
                        <button title="My-cart" className="p-2 border rounded w-full">
                            <ShoppingCart className="mx-auto w-5 h-5" />
                        </button>
                        <button title="My-orders" className="p-2 border rounded w-full">
                            <Store className="mx-auto w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}

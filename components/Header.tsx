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

    return (
        <header className="w-full border-b-2 border-gray-200">
            <div className="flex justify-between items-center p-4">
                {/* Logo */}
                <ProgressBarLink href="/" activeClassName="">
                    <h1 className="text-xl font-semibold">Shopping Adda</h1>
                </ProgressBarLink>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex space-x-6 text-sm md:text-base font-medium">
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
                <div className="hidden lg:flex items-center space-x-6">
                    {user ? (
                        <div className="flex items-center space-x-3">
                            {/* Avatar + Name */}
                            <div className="flex items-center space-x-2">
                                {user.avatarUrl ? (
                                    <Image
                                        src={user.avatarUrl}
                                        alt="User"
                                        className="w-8 h-8 rounded-full"
                                        width={32}
                                        height={32}
                                    />
                                ) : (
                                    <UserCircle2 className="w-7 h-7 text-gray-600" />
                                )}
                                <span className="lg:inline font-medium text-gray-700 truncate max-w-[120px]">
                                    {user.name}
                                </span>
                            </div>

                            {/* Logout */}
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="flex items-center justify-center w-9 h-9 rounded-full border bg-white shadow hover:bg-gray-100 active:scale-95 transition"
                                aria-label="Logout"
                            >
                                <LogOut className="w-5 h-5 text-gray-700" />
                            </button>
                        </div>
                    ) : (
                        <ProgressBarLink
                            href="/sign-in"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition"
                        >
                            Sign-in
                        </ProgressBarLink>
                    )}

                    {/* Cart + Orders */}
                    <div className="flex items-center space-x-3">
                        <button title="My-cart" className="p-2 border rounded hover:bg-gray-50 transition">
                            <ShoppingCart className="w-5 h-5" />
                        </button>
                        <button title="My-orders" className="p-2 border rounded hover:bg-gray-50 transition">
                            <Store className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden"
                    onClick={() => setMenuOpen(true)}
                >
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Mobile Drawer Overlay */}
            {menuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
                    onClick={() => setMenuOpen(false)}
                />
            )}

            {/* Mobile Drawer Menu (slides in from right) */}
            <div
                className={`fixed top-0 right-0 w-64 h-full bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden
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
                            {/* User Info Row */}
                            <div className="flex items-center justify-between mt-4 px-2">
                                <div className="flex items-center space-x-2">
                                    {user.avatarUrl ? (
                                        <Image
                                            src={user.avatarUrl}
                                            alt="User"
                                            className="w-8 h-8 rounded-full"
                                            width={32}
                                            height={32}
                                        />
                                    ) : (
                                        <UserCircle2 className="w-8 h-8 text-gray-600" />
                                    )}
                                    <span className="text-lg font-medium text-gray-700">{user.name}</span>
                                </div>

                                {/* Logout button */}
                                <button
                                    onClick={handleLogout}
                                    disabled={loading}
                                    className="flex items-center justify-center w-10 h-10 rounded-full border bg-white shadow hover:bg-gray-100 active:scale-95 transition"
                                    aria-label="Logout"
                                >
                                    <LogOut className="w-5 h-5 text-gray-700" />
                                </button>
                            </div>

                            {/* Divider */}
                            <hr className="my-4 border-gray-200" />

                            {/* Cart + Orders */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    title="My-cart"
                                    className="flex flex-col items-center justify-center border rounded-lg py-3 hover:bg-gray-50 transition"
                                >
                                    <ShoppingCart className="w-6 h-6 mb-1" />
                                    <span className="text-xs font-medium">Cart</span>
                                </button>
                                <button
                                    title="My-orders"
                                    className="flex flex-col items-center justify-center border rounded-lg py-3 hover:bg-gray-50 transition"
                                >
                                    <Store className="w-6 h-6 mb-1" />
                                    <span className="text-xs font-medium">Orders</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <ProgressBarLink
                            href="/sign-in"
                            className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition text-center"
                        >
                            Sign-in
                        </ProgressBarLink>
                    )}
                </div>
            </div>
        </header>
    );
}

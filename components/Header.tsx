'use client';

import { ShoppingCart, Store, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ProgressBarLink } from "./ProgressLink";

export default function Header() {
    const navLinks = [
        { id: 1, href: "/", label: "Home" },
        { id: 2, href: "/all-products", label: "All Products" },
        { id: 3, href: "/about-us", label: "About Us" },
        { id: 4, href: "/contact-us", label: "Contacts" },
    ];

    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

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
                    <ProgressBarLink
                        href="#"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition"
                    >
                        Sign-in
                    </ProgressBarLink>
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

                    <ProgressBarLink
                        href="#"
                        className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-lg transition text-center"
                    >
                        Sign-in
                    </ProgressBarLink>

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

'use client'
import { ShoppingCart, Store } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const navLinks = [
        { id:1,href: "/", label: "Home" },
        { id:2,href: "/#", label: "All Products" },
        { id:3,href: "/##", label: "About Us" },
        { id:4,href: "/###", label: "Contacts" },
    ]
    const pathname = usePathname();
    return (
        <div className="flex justify-between items-center p-4 border-b-2 border-gray-200">
            {/* logo or name */}
            <div>
                <Link href='/'><h1 className="text-xl">Shopping Adda</h1></Link>
            </div>
            <div className="flex space-x-6 text-sm md:text-base font-medium">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href
                    return (
                        <Link
                            key={link.id}
                            href={link.href}
                            className={`${isActive ? "text-orange-600" : "text-gray-700"} hover:text-orange-500 transition-colors`}

                        >
                            {link.label}
                        </Link>
                    )
                })}
            </div>
            {/* sign in */}
            <div className="flex space-x-4">
                <div className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition cursor-pointer">
                    <Link href='#'>Sign-in</Link>
                </div>
                {/* Carts and my orders */}
                <div className="flex items-center space-x-4">
                    {/* Carts */}
                    <button title="My-cart" className="p-3 border rounded">
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                    {/* Orders */}
                    <button title="My-orders" className="p-3 border rounded">
                        <Store className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div >
    )
}


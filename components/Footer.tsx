import { Contact, Mail, PackageSearchIcon, ShoppingCart, Store } from "lucide-react";

const Footer = () => {
    return (
        <div className="flex flex-col md:flex-row justify-evenly p-6 gap-8 bg-orange-100 text-gray-800 w-full mt-9">
            {/* About the website */}
            <div className="w-full md:w-1/3">
                <h1 className="text-2xl font-semibold mb-2">Shopping Adda</h1>
                <p className="text-sm leading-relaxed">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ipsa adipisci corporis est maxime quibusdam! Ea excepturi tempora placeat commodi fuga, eaque voluptatibus nemo exercitationem consequuntur voluptas incidunt sint velit quas nam dolore id, inventore voluptatem libero? Asperiores, dicta repellendus.
                </p>
            </div>

            {/* Pages */}
            <div className="w-full md:w-1/4">
                <div className="flex items-center gap-2 mb-2">
                    <PackageSearchIcon />
                    <h1 className="text-xl font-semibold">All Products</h1>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <Store />
                    <h1 className="text-sm">All Orders</h1>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <ShoppingCart />
                    <h1 className="text-sm">My Carts</h1>
                </div>
            </div>

            {/* Contact */}
            <div className="w-full md:w-1/4">
                <div className="flex items-center gap-2 mb-2">
                    < Contact />
                    <h1 className="text-xl font-semibold">Contact</h1>
                </div>
                <div className="flex items-center gap-2 mb-1">
                    <Mail />
                    <p className="text-sm">Email: beheratushar523@gmail.com</p>
                </div>
            </div>
        </div>
    );
};

export const Copyright = () => {
    return (
        <div className="bg-orange-300 flex justify-center items-center p-4 text-center w-full">
            <h4 className="text-base sm:text-lg font-medium">
                © 2025 Shopping-Adda — Built with ❤️ by Tushar Behera. All rights are reserved
            </h4>
        </div>
    );
};

export default Footer;

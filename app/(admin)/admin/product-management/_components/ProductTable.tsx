import { Plus } from "lucide-react";

export default function ProductTable() {
    const products = [
        { id: 1, title: "Watch", description: "Lorem ipsum dolor sit amet consectetur adipisic", price: "$2.5" , stock:'90'},
        { id: 2, title: "Sofa", description: "Lorem ipsum dolor sit amet consectetur adipis", price: "$3000" , stock:'15'},
        { id: 3, title: "Earbuds", description: "Lorem ipsum dolor sit amet consectetur adip!", price: "$1000" , stock:'100'},
        { id: 4, title: "Water bottle", description: "Lorem ipsum dolor sit amet consectetur", price: "$70" , stock:'200'},
    ];
    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium">All Products</h1>
                <button className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition cursor-pointer mr-4 flex gap-2"><Plus/>Add</button>
            </div>
            <div className="w-full px-4 py-8 flex justify-center">
                <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-sm">

                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700 font-semibold">
                            <tr>
                                <th className="px-6 py-3 text-left">Sr. No.</th>
                                <th className="px-6 py-3 text-left">Title</th>
                                <th className="px-6 py-3 text-left">Description</th>
                                <th className="px-6 py-3 text-left">Price</th>
                                <th className="px-6 py-3 text-left">Stock</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {products.map((product, index) => (
                                <tr key={product.id} className="hover:bg-gray-50 transition">
                                    <td className="px-6 py-3">{index + 1}</td>
                                    <td className="px-6 py-3">{product.title}</td>
                                    <td className="px-6 py-3 line-clamp-[0.5]">{product.description}</td>
                                    <td className="px-6 py-3">{product.price}</td>
                                    <td className="px-6 py-3">
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 space-x-2">
                                        <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition cursor-pointer">Edit</button>
                                        <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition cursor-pointer">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

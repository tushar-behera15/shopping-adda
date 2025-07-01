'use client';

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { SkeletonRow } from "@/components/ui/skeleton-row";
import { toast } from "sonner";
import Image from "next/image";

export default function ProductTable() {
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        stock: '',
        image: '',
        rating: '',
        category_id: '',
    });

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/all-product", { method: "GET" });
            const data = await res.json();
            if (Array.isArray(data)) setProducts(data);
            else toast.error(data.error || "Failed to fetch products");
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        }
        setLoading(false);
    };

    const fetchCategories = async () => {
        try {
            const res = await fetch("/api/all-category", { method: "GET" });
            const data = await res.json();
            if (Array.isArray(data)) setCategories(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (e.target.name === 'image' && e.target instanceof HTMLInputElement && e.target.files) {
            const file = e.target.files[0];
            if (file) {
                setImageFile(file);
                setImagePreview(URL.createObjectURL(file));
            }
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }
    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setCreateLoading(true);
        let imageUrl = form.image;

        if (imageFile) {
            imageUrl = await handleImageUpload(imageFile);
        }
        try {

            const res = await fetch('/api/all-product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form, image: imageUrl
                }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Product created successfully");
                setForm({
                    title: '',
                    description: '',
                    price: '',
                    stock: '',
                    image: '',
                    rating: '',
                    category_id: '',
                });
                setShowModal(false);
                fetchProducts();
            } else toast.error(data.error || "Creation failed");
        } catch (err) {
            console.error(err);
        }
        setCreateLoading(false);
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/delete-product/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (res.ok) {
                toast.success("Product deleted successfully");
                fetchProducts();
            } else toast.error(data.error || "Delete failed");
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdateLoading(true);
        if (!selectedProduct) return;
        try {
            const res = await fetch(`/api/update-product`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: selectedProduct.id, ...form }),
            });
            const data = await res.json();
            if (res.ok) {
                toast.success("Product updated successfully");
                setEditModal(false);
                fetchProducts();
            } else toast.error(data.error || "Update failed");
        } catch (err) {
            console.error(err);
        }
        setUpdateLoading(false);
    };

    const clearForm = () => {
        setForm({
            title: '',
            description: '',
            price: '',
            stock: '',
            image: '',
            rating: '',
            category_id: '',
        });
        setImageFile(null);
        setImagePreview(null);
    };

    const handleImageUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/upload-image', {
            method: 'POST',
            body: formData,
        });

        const data = await res.json();
        return data.url;
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium">Product Management</h1>
                <button onClick={() => {
                    clearForm();
                    setShowModal(true);
                }} className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center gap-2">
                    <Plus /> Add Product
                </button>
            </div>

            <div className="w-full px-4 py-8 overflow-x-auto">
                <table className="min-w-full bg-white shadow border rounded-lg text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Sr no.</th>
                            <th className="px-4 py-2 text-left">Image</th>
                            <th className="px-4 py-2 text-left">Title</th>
                            <th className="px-4 py-2 text-left">Price</th>
                            <th className="px-4 py-2 text-left">Stock</th>
                            <th className="px-4 py-2 text-left">Category</th>
                            <th className="px-4 py-2 text-left">Created At</th>
                            <th className="px-4 py-2 text-left">Updated At</th>
                            <th className="px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? Array(5).fill(0).map((_, idx) => <SkeletonRow key={idx} colCount={9} />) :
                            products.map((product, i) => (
                                <tr key={product.id} className="border-t">
                                    <td className="px-4 py-2">{i + 1}</td>
                                    <td className="px-4 py-2">
                                        <Image src={product.image} alt={product.title} className="h-12 w-12 object-cover rounded" width={50} height={50} />
                                    </td>
                                    <td className="px-4 py-2">{product.title}</td>
                                    <td className="px-4 py-2">₹{product.price}</td>
                                    <td className="px-4 py-2">
                                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">

                                            {product.stock}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2">{product.category_name}</td>
                                    <td className="px-4 py-2">{new Date(product.created_at).toLocaleString()}</td>
                                    <td className="px-4 py-2">{new Date(product.updated_at).toLocaleString()}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                                onClick={() => {
                                                    setSelectedProduct(product);
                                                    setForm({
                                                        title: product.title,
                                                        description: product.description,
                                                        price: product.price,
                                                        stock: product.stock,
                                                        image: product.image,
                                                        rating: '',
                                                        category_id: product.category_id.toString()
                                                    });
                                                    setImageFile(null);
                                                    setImagePreview(product.image);
                                                    setEditModal(true);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>

                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <ProductModal
                    form={form}
                    categories={categories}
                    loading={createLoading}
                    imagePreview={imagePreview}
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    setImagePreview={setImagePreview}
                    onChange={handleChange}
                    onClose={() => setShowModal(false)}
                    onSubmit={handleSubmit}
                    title="Add Product"
                />
            )}

            {editModal && (
                <ProductModal
                    form={form}
                    categories={categories}
                    loading={updateLoading}
                    imagePreview={imagePreview}
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    setImagePreview={setImagePreview}
                    onChange={handleChange}
                    onClose={() => setEditModal(false)}
                    onSubmit={handleEdit}
                    title="Edit Product"
                />
            )}
        </>
    );
}

function ProductModal({ form, categories, loading, onChange, onSubmit, onClose, title, imagePreview, setImageFile, imageFile, setImagePreview }: any) {


    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white w-full max-w-xl p-6 rounded shadow relative">
                <button onClick={onClose} className="absolute right-4 top-4">
                    <X />
                </button>
                <h2 className="text-xl font-semibold mb-4">{title}</h2>
                <form onSubmit={onSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input type="text" name="title" placeholder="Title" value={form.title} onChange={onChange} required className="border p-2 rounded" />
                    <input type="text" name="price" placeholder="Price" value={form.price} onChange={onChange} required className="border p-2 rounded" />
                    <input type="text" name="stock" placeholder="Stock" value={form.stock} onChange={onChange} required className="border p-2 rounded" />
                    <div className="col-span-full">
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Upload Image
                        </label>

                        <div className="flex items-center gap-4">
                            <label
                                htmlFor="image"
                                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-md shadow transition duration-150"
                            >
                                Choose File
                            </label>
                            <span className="text-sm text-gray-600">
                                {imageFile ? imageFile.name : form.image ? "Current image selected" : "No file chosen"}
                            </span>
                        </div>

                        <input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setImageFile(file);
                                    setImagePreview(URL.createObjectURL(file));
                                }
                            }}
                            className="hidden"
                            required={!form.image}
                        />
                    </div>
                    {imagePreview && (
                        <div className="col-span-full">
                            <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                            <Image
                                src={imagePreview}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded border"
                                width={100}
                                height={100}
                            />
                        </div>
                    )}
                    <select name="category_id" value={form.category_id} onChange={onChange} required className="border p-2 rounded">
                        <option value="">Select Category</option>
                        {categories.map((cat: any) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>

                    <textarea name="description" placeholder="Description" value={form.description} onChange={onChange} required className="border p-2 rounded col-span-full"></textarea>
                    <button type="submit" disabled={loading}
                        className={`bg-green-600 text-white rounded p-2 col-span-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </form>
            </div>
        </div>
    );
}

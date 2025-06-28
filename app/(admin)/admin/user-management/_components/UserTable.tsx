'use client';

import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { SkeletonRow } from "@/components/ui/skeleton-row";
import { toast } from "sonner";

export default function UserTable() {
    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [createLoading, setCreateLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);

    const [form, setForm] = useState(
        {
            name: "",
            email: "",
            password: "",
            role: "user"
        }
    );

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const res = await fetch("/api/all-users", {
                method: "GET"
            })
            const data = await res.json();
            if (Array.isArray(data)) {
                setUsers(data);
                setShowModal(false);
            }
            if (!res.ok) {
                alert(data.error || "Something went wrong");
            }
        }
        catch (err) {
            console.log(err);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchUsers();
    }, [])

    useEffect(() => {
        if (showModal) {
            setForm({
                name: "",
                email: "",
                password: "",
                role: "user",
            });
        }
    }, [showModal]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setCreateLoading(true);
            const res = await fetch('/api/all-users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            const data = await res.json();


            if (res.ok) {
                toast.success("User created successfully");
                setForm({
                    name: "",
                    email: "",
                    password: "",
                    role: "user",
                });
                setShowModal(false);
                fetchUsers();
            } else {
                alert(data.error || "Something went wrong");
            }
        } catch (err) {
            console.error("Error during form submit:", err);
            alert("Failed to submit. See console for details.");
        }
        setCreateLoading(false);
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/delete-user/${id}`, {
                method: 'DELETE'
            })

            const data = await res.json();
            console.log(res);
            if (res.ok) {
                toast.success("User delete succesfully");
                fetchUsers();
            }
            else {
                alert(data.error || "Something went wrong");
            }
        }
        catch (err) {
            console.error("Error during deletion:", err);
            alert("Failed to delete. See console for details.");
        }
    }

    const handleEdit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        setUpdateLoading(true);
        try {
            const res = await fetch(`/api/update-user/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: selectedUser.id, ...form
                }),
            });
            const result = await res.json();
            if (res.ok) {
                toast.success("User updated successfully");
                setEditModal(false);
                fetchUsers();
            } else {
                alert(result.error || "Something went wrong");
            }
        } catch (err) {
            console.error("Error during update:", err);
            alert("Failed to update. See console for details.");
        }
        setUpdateLoading(false);
    };


    return (
        <>
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-medium">User Management</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition cursor-pointer mr-4 flex gap-2 items-center"
                >
                    <Plus />
                    Create
                </button>
            </div>

            {/* User Table */}

            <div className="w-full px-4 py-8 flex justify-center">
                <div className="w-full max-w-5xl bg-white border border-gray-200 rounded-lg overflow-x-auto shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-gray-700 font-semibold">
                            <tr>
                                <th className="px-6 py-3 text-left">Sr. No.</th>
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Email Address</th>
                                <th className="px-6 py-3 text-left">Role</th>
                                <th className="px-6 py-3 text-left">Created at</th>
                                <th className="px-6 py-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {
                                loading ? Array(5).fill(0).map((_, idx) => <SkeletonRow key={idx} />) :

                                    users.map((user, index) => (
                                        <tr key={user.id} className="hover:bg-gray-50 transition">
                                            <td className="px-6 py-3">{index + 1}</td>
                                            <td className="px-6 py-3">{user.name}</td>
                                            <td className="px-6 py-3">{user.email}</td>
                                            <td className="px-6 py-3">
                                                <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3">{new Date(user.created_at).toLocaleString()}</td>
                                            <td className="px-6 py-3 space-x-2">
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition cursor-pointer"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setForm({ name: user.name, email: user.email, role: user.role, password: '' });
                                                        setEditModal(true)
                                                    }
                                                    }>Edit</button>
                                                <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition cursor-pointer" onClick={() => handleDelete(user.id)}>Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Create a User/Admin</h2>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text"
                                    name="name"
                                    className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter your name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email"
                                    name="email"
                                    className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter your email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input type="password"
                                    name="password"
                                    className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter your password"
                                    required
                                    value={form.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <option value="User" defaultChecked>User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={createLoading}
                                    className={`w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md ${createLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    {createLoading ? 'Creating...' : 'Create'}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
            {editModal && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
                        <button
                            onClick={() => setEditModal(false)}
                            className="absolute top-3 right-3 text-gray-500 hover:text-black"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="text-xl font-semibold mb-4">Update a User/Admin</h2>

                        <form className="space-y-4" onSubmit={handleEdit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text"
                                    name="name"
                                    className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter your name"
                                    required
                                    value={form.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email"
                                    name="email"
                                    className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    placeholder="Enter your email"
                                    required
                                    value={form.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Role</label>
                                <select
                                    className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <option value="User" defaultChecked>User</option>
                                    <option value="Admin">Admin</option>
                                </select>
                            </div>
                            <div className="pt-2">
                                <button
                                    type="submit"
                                    disabled={updateLoading}
                                    className={`w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md ${updateLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                    {updateLoading ? 'Updating...' : 'Update'}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

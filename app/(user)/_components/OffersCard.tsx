import Image from 'next/image'
import React from 'react'

export default function OffersCard() {
    return (
        <div className="py-10 px-2">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Special Offers</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {/* <!-- Card 1 --> */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 relative">
                        <Image
                            src="https://images.unsplash.com/photo-1649433911119-7cf48b3e8f50?q=80&w=871&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Sale"
                            width={100}
                            height={50}
                            className="w-full h-48 object-cover"
                            sizes="(max-width: 768px) 100vw, 33vw"
                            
                        />
                        <div className="p-5 text-center">
                            <h2 className="text-xl font-semibold text-gray-800">🔥 Big Sale</h2>
                            <p className="text-gray-600 mt-2">Up to 70% off on selected items</p>
                            <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-5 rounded-lg transition">
                                Shop Now
                            </button>
                        </div>
                    </div>

                    {/* <!-- Card 2 --> */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 relative">
                        <Image
                            src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=901&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="New Arrivals"
                            className="w-full h-48 object-cover"
                            width={100}
                            height={50}
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="p-5 text-center">
                            <h2 className="text-xl font-semibold text-gray-800">🛍️ New Arrivals</h2>
                            <p className="text-gray-600 mt-2">Fresh styles just in!</p>
                            <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-5 rounded-lg transition">
                                Shop Now
                            </button>
                        </div>
                    </div>

                    {/* <!-- Card 3 --> */}
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 relative">
                        <Image
                            src="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Limited Offer"
                            className="w-full h-48 object-cover"
                            width={100}
                            height={50}
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                        <div className="p-5 text-center">
                            <h2 className="text-xl font-semibold text-gray-800">⏳ Limited Time Offer</h2>
                            <p className="text-gray-600 mt-2">Hurry before it ends!</p>
                            <button className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-5 rounded-lg transition">
                                Shop Now
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>


    )
}


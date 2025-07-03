'use client';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";
import { Star } from "lucide-react";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function Testimonials() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024, // below lg
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640, // below sm
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const data = [
        { id: 1, name: "Tushar Behera", review: "Amazing experience with the product!" },
        { id: 2, name: "Aman Chauhan", review: "Fast delivery and great support." },
        { id: 3, name: "Raghav Mandal", review: "Really satisfied with the quality." },
        { id: 4, name: "Rohit Singh", review: "One of the best platforms to shop from." },
        { id: 5, name: "Sandip Rathod", review: "I loved the UI and customer experience." },
        { id: 6, name: "Abhay Singh", review: "Great service and trustworthy brand." },
    ];

    return (
        <div className="w-full px-4 py-10">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Testimonials</h1>
                <Slider {...settings}>
                    {data.map((m) => (
                        <div key={m.id} className="px-2">
                            <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 h-full flex flex-col justify-between">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-[30px] h-[30px] rounded-full bg-gray-700" />
                                        <h2 className="text-xl font-medium text-gray-800">{m.name}</h2>
                                    </div>
                                    <div className="flex text-yellow-500">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400" />
                                        ))}
                                    </div>
                                </div>


                                <p className="text-gray-600 text-sm md:text-base line-clamp-4">{m.review}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

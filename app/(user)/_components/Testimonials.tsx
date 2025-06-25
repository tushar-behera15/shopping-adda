'use client'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from 'next/dynamic';
import { Star } from "lucide-react";
const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function Testimonials() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024, // below 1024px (lg)
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640, // below 640px (sm)
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const data = [
        {
            id: 1,
            name: 'Tushar Behera',
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et sapiente sed impedit repellendus vero facere totam, eligendi maiores, ducimus quo, nisi odio laudantium doloremque laboriosam. Repudiandae incidunt nisi nemo placeat tenetur exercitationem rem temporibus, labore, perspiciatis blanditiis aspernatur quibusdam quis impedit unde magnam non natus laudantium, est vel? Laudantium dicta commodi quod perferendis, dolorem iste repellendus nulla voluptatibus enim. Numquam?'

        },
        {
            id: 2,
            name: 'Aman Chauhan',
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et sapiente sed impedit repellendus vero facere totam, eligendi maiores, ducimus quo, nisi odio laudantium doloremque laboriosam. Repudiandae incidunt nisi nemo placeat tenetur exercitationem rem temporibus, labore, perspiciatis blanditiis aspernatur quibusdam quis impedit unde magnam non natus laudantium, est vel? Laudantium dicta commodi quod perferendis, dolorem iste repellendus nulla voluptatibus enim. Numquam?'

        },
        {
            id: 3,
            name: 'Raghav Mandal',
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et sapiente sed impedit repellendus vero facere totam, eligendi maiores, ducimus quo, nisi odio laudantium doloremque laboriosam. Repudiandae incidunt nisi nemo placeat tenetur exercitationem rem temporibus, labore, perspiciatis blanditiis aspernatur quibusdam quis impedit unde magnam non natus laudantium, est vel? Laudantium dicta commodi quod perferendis, dolorem iste repellendus nulla voluptatibus enim. Numquam?'

        },
        {
            id: 4,
            name: 'Rohit singh',
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et sapiente sed impedit repellendus vero facere totam, eligendi maiores, ducimus quo, nisi odio laudantium doloremque laboriosam. Repudiandae incidunt nisi nemo placeat tenetur exercitationem rem temporibus, labore, perspiciatis blanditiis aspernatur quibusdam quis impedit unde magnam non natus laudantium, est vel? Laudantium dicta commodi quod perferendis, dolorem iste repellendus nulla voluptatibus enim. Numquam?'

        },
        {
            id: 5,
            name: 'Sandip rathod',
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et sapiente sed impedit repellendus vero facere totam, eligendi maiores, ducimus quo, nisi odio laudantium doloremque laboriosam. Repudiandae incidunt nisi nemo placeat tenetur exercitationem rem temporibus, labore, perspiciatis blanditiis aspernatur quibusdam quis impedit unde magnam non natus laudantium, est vel? Laudantium dicta commodi quod perferendis, dolorem iste repellendus nulla voluptatibus enim. Numquam?'

        },
        {
            id: 6,
            name: 'Abhay singh',
            review: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et sapiente sed impedit repellendus vero facere totam, eligendi maiores, ducimus quo, nisi odio laudantium doloremque laboriosam. Repudiandae incidunt nisi nemo placeat tenetur exercitationem rem temporibus, labore, perspiciatis blanditiis aspernatur quibusdam quis impedit unde magnam non natus laudantium, est vel? Laudantium dicta commodi quod perferendis, dolorem iste repellendus nulla voluptatibus enim. Numquam?'

        },

    ]
    return (
        <div className="w-3/4 m-auto">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Testimonials</h1>
                <Slider {...settings}>
                    {data.map((m) => (
                        <div key={m.id} className="flex">
                            {/* <!-- Card 1 --> */}
                            <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 m-4">

                                <div className="p-5">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-[30px] h-[30px] rounded-full bg-gray-700">
                                        </div>
                                        <h2 className="text-xl font-semibold text-gray-800">{m.name}</h2>
                                        <div className="flex items-center">

                                            <Star className="w-[16px] h-[16px] ml-10" fill="yellow" />
                                            <Star className="w-[16px] h-[16px]" />
                                            <Star className="w-[16px] h-[16px]" />
                                            
                                        </div>
                                    </div>

                                    <p className="text-gray-600 mt-2 line-clamp-3">{m.review}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>

        </div>
    )
}


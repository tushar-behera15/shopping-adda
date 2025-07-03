"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const images = [
    {
        id: 1,
        url: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/74f0ad81e44e6e6f.jpg?q=80",
        alt: "Sale 1",
    },
    {
        id: 2,
        url: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1558a721300c7f6d.jpg?q=80",
        alt: "New Arrivals",
    },
    {
        id: 3,
        url: "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/c6b40023cdc9c36c.jpg?q=80",
        alt: "Special Offer",
    },
];

export default function HeroSection() {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (!api) return;
        setCurrent(api.selectedScrollSnap());
        api.on("select", () => setCurrent(api.selectedScrollSnap()));
    }, [api]);

    return (
        <div className="w-full px-2 sm:px-4 md:px-6 py-4 flex justify-center">
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 4000,
                        stopOnInteraction: false,
                        stopOnMouseEnter: true,
                    }),
                ]}
                setApi={setApi}
                className="w-full max-w-7xl rounded-xl overflow-hidden"
            >
                <CarouselContent>
                    {images.map((img) => (
                        <CarouselItem key={img.id} className="w-full">
                            <Card className="shadow-none border-none relative">
                                <CardContent className="p-0 relative w-full h-[120px] sm:h-[160px] md:h-[220px] lg:h-[230px] xl:h-[250px]">
                                    <Image
                                        src={img.url}
                                        alt={img.alt}
                                        fill
                                        className="object-cover rounded-xl"
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80vw"
                                        priority
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="-left-3 sm:-left-4 md:-left-5" />
                <CarouselNext className="-right-3 sm:-right-4 md:-right-5" />

                {/* Dots/Indicators */}
                <div className="flex justify-center gap-2 mt-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`h-2 w-2 rounded-full ${current === index ? "bg-gray-800" : "bg-gray-400"
                                } transition-all`}
                        />
                    ))}
                </div>
            </Carousel>
        </div>
    );
}

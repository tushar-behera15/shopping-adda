import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

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
    return (
        <div className="w-full px-2 sm:px-4 md:px-6 py-4 flex justify-center">
            <Carousel className="w-full max-w-7xl rounded-xl overflow-hidden">
                <CarouselContent>
                    {images.map((img) => (
                        <CarouselItem key={img.id} className="w-full">
                            <Card className=" shadow-none border-none relative h-[120px] sm:h-[160px] md:h-[220px] lg:h-[270px] xl:h-[300px]">
                                <CardContent className="p-0 relative w-full h-full">
                                    <Image
                                        src={img.url}
                                        alt={img.alt}
                                        fill
                                        className="object-contain rounded-xl bg-white"
                                        sizes="(max-width: 768px) 100vw, 100vw"
                                        priority
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="-left-3" />
                <CarouselNext className="-right-3" />
            </Carousel>
        </div>
    );
}

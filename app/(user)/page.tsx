import Footer, { Copyright } from "@/components/Footer";
import HeroSection from "./_components/HeroSection";
import OffersCard from "./_components/OffersCard";
import Testimonials from "./_components/Testimonials";

export default function HomePage() {
  return (
    <div className="max-w-vh">
      {/* Hero section */}
      <HeroSection/>
    {/* Special offers */}
      <OffersCard/>

    {/* Testimonials */}
    <Testimonials/>

    {/* Footer */}
    <Footer/>
    {/* Copyright */}
    <Copyright/>
    </div>
  );
}

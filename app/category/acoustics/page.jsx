"use client";
import { HeroSection } from "@/components/acoustics/HeroSection";
import { JourneySection } from "@/components/acoustics/JourneySection";
import { CommercialSolutionsSection } from "@/components/acoustics/CommercialSolutionsSection";
import { ApplicationsSection } from "@/components/acoustics/ApplicationsSection";
import { ClientsSection } from "@/components/acoustics/ClientsSection";
import { ContactSection } from "@/components/acoustics/ContactSection";
import SustainableMaterialsSection from "@/components/acoustics/SustainableMaterialsSection";
import AdvancedTechnologySection from "@/components/acoustics/AdvancedTechnologySection";
import CustomSolutionsSection from "@/components/acoustics/CustomSolutionsSection";
import { FeaturedAcousticSection } from "@/components/acoustics/FeaturedAcousticSection";
import { SoundDiffusionSection } from "@/components/acoustics/SoundDiffusionSection";
import ContactFormSection from "@/components/acoustics/ContactFormSection";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AcousticsPage = () => {
  const router=useRouter();
  useEffect(()=>{
    router.replace("/acoustics")
  },[]);

  if(true){
    router.replace("/acoustics");
  }
  return (
    <div className="-mt-12 bg-white overflow-x-hidden">
      {/* <HeroSection /> */}
      <section className="relative h-[540px]  overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://www.muffle.co.uk/cdn/shop/articles/Home_Cinema.jpg?v=1747737541&width=1100"
            alt="Acoustic Solutions Background"
            fill
            className="object-cover opacity-90"
            priority
          />
        </div>
        <div className="relative h-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Elevate Your Space with Premium Acoustic Solutions
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl">
            Discover a curated selection of acoustic panels, sound barriers, and
            more, designed to enhance any environment.
          </p>
          <Link
            href="/products?category=acoustics"
            className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition duration-300 text-lg font-medium"
          >
            Explore Products
          </Link>
        </div>
      </section>
      {/* <CommercialSolutionsSection /> */}
      <JourneySection />
      <ApplicationsSection />
      <SustainableMaterialsSection />
      <AdvancedTechnologySection />
      <CustomSolutionsSection />
      <ClientsSection />
      <ContactFormSection />
      {/* <ContactSection /> */}
    </div>
  );
};

export default AcousticsPage;

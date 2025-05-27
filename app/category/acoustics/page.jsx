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

const AcousticsPage = () => {
  return (
    <div className="-mt-12 bg-white overflow-x-hidden">
      <HeroSection />
      <CommercialSolutionsSection />
      <JourneySection />
      <ApplicationsSection />
      <SustainableMaterialsSection />
      <AdvancedTechnologySection />
      <CustomSolutionsSection />
      <ClientsSection />
      <ContactFormSection/>
      <ContactSection />
    </div>
  );
};

export default AcousticsPage;

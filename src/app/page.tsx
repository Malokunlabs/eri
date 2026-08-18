import { BrandsSection } from "@/components/home/brands-section";
import { HeroSection } from "@/components/home/hero-section";
import { WorkDoneSection } from "@/components/home/work-done-section";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <BrandsSection />
      <WorkDoneSection />
    </main>
  );
}

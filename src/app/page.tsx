import { AudienceSection } from "@/components/home/audience-section";
import { BrandsSection } from "@/components/home/brands-section";
import { HeroSection } from "@/components/home/hero-section";
import { InsightsSection } from "@/components/home/insights-section";
import { ReportsSection } from "@/components/home/reports-section";
import { WorkDoneSection } from "@/components/home/work-done-section";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />
      <BrandsSection />
      <WorkDoneSection />
      <AudienceSection />
      <ReportsSection />
      <InsightsSection />
    </main>
  );
}

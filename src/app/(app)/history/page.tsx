import { BehindTheScenesSection } from "./sections/BehindTheScenesSection";
import FeaturedMomentsSection from "./sections/FeaturedMomentsSection";
import TeamEvolutionSection from "./sections/TeamEvolutionSection";

export default function Page() {
  return (
    <main>
      <FeaturedMomentsSection />
      <TeamEvolutionSection />
      <BehindTheScenesSection />
    </main>
  )
}
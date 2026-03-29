import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { EducationSkills } from "@/components/EducationSkills";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-white">
      <Hero />
      <Experience />
      <Projects />
      <EducationSkills />
      <Footer />
    </main>
  );
}

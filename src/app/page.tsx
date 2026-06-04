import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/sections/hero";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Coding } from "@/components/sections/coding";
import { Contact } from "@/components/sections/contact";
import { EasterEgg } from "@/components/interactive/easter-egg";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Skills />
        <Coding />
        <Contact />
      </main>
      <EasterEgg />
    </>
  );
}

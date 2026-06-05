import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

/**
 * ISR: the page stays fully static (instant for every visitor), but Next is
 * allowed to regenerate it in the background at most once per hour — which is
 * when the live LeetCode fetch (a POST, so not covered by fetch-level caching)
 * re-runs. Lazy stale-while-revalidate: zero traffic = zero API calls.
 * Must be a literal number (statically analyzable).
 */
export const revalidate = 3600;

/**
 * The home page is just the sections composed in order. Reordering, adding, or
 * removing a section is a one-line change here. Each section reads its own data
 * from content/profile.ts.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Achievements />
      <Education />
      <Contact />
    </>
  );
}

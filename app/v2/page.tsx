import Hero from "@/components/Hero";
import V2PageNav from "@/components/V2PageNav";

export default function V2Home() {
  return (
    <div>
      <Hero projectsHref="/v2/projects" contactHref="/v2/contact" />
      <V2PageNav />
    </div>
  );
}

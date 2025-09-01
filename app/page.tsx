import AboutSection from "@/components/home/about-section"
import ContactForm from "@/components/home/contact-form"
import HeroSection from "@/components/home/hero-section"
import GalleryCarousel from "@/components/home/gallery-carousel"
import MissionVisionValues from "@/components/home/mission-vision-values"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <HeroSection />
      <AboutSection />
      <MissionVisionValues />
      <GalleryCarousel />
      <ContactForm />
    </div>
  )
}

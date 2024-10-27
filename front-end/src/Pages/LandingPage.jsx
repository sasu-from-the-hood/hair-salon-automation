import Explore from "../Componets/ui/Explore";
import Service from "../Componets/ui/Service";
import Hero from "../Componets/ui/Hero";
import Footer from "../Componets/ui/Footer";
import OurStory from "../Componets/ui/OurStory";
import Header from "../Componets/ui/Header";
export default function LandingPage() {
  return (
    <div>
      <Header />
      <Hero />
      <Explore />
      <Service />
      <OurStory />
      <Footer />
    </div>
  );
}

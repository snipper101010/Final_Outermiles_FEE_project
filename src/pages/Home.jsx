import Header from "../components/Header";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowItWorks from "../components/HowItWorks";
import FeaturedTrips from "../components/FeaturedTrips";
import Gallery from "../components/Gallery";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <FeaturedTrips />
        <Gallery />
      </main>
      <Footer />
    </>
  );
}


export default Home;
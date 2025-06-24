import ContentSection from "@/components/content-hero";
import HeroSection from "@/components/hero";
import NavbarHome from "@/components/nav-home";

const Home = () => {
    return (
        <div>
            <NavbarHome />
            <HeroSection />
            <ContentSection />
        </div>
    );
}

export default Home;
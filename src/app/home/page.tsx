import ContentSection from "@/components/content-hero";
import HeroSection from "@/components/hero";
import NavbarHome from "@/components/nav-home";
import ContentTwo from "../../components/content-two";
import StatsSection from "@/components/stats";
import FAQ from "@/components/faq";
import FooterSection from "@/components/footer";

const Home = () => {
    return (
        <div>
            <NavbarHome />
            <HeroSection />
            <ContentSection />
            <StatsSection />
            <ContentTwo />
            <FAQ />
            <FooterSection />
        </div>
    );
}

export default Home;
import ContentSection from "@/components/content-hero";
import HeroSection from "@/components/hero";
import NavbarHome from "@/components/nav-home";
import ContentTwo from "../../components/content-two";
import StatsSection from "@/components/stats";
import FAQ from "@/components/faq";
import FooterSection from "@/components/footer";
import ScrollToTopButton from "@/components/scroll-to-top";

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
            <ScrollToTopButton />
        </div>
    );
}

export default Home;
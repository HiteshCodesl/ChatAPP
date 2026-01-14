import Navbar from '../../Landing/Navbar';
import Hero from '../../Landing/Hero';
import Features from '../../Landing/Features';
import Stats from '../../Landing/Stats';
import Testimonials from '../../Landing/Testimonials';
import Pricing from '../../Landing/Pricing';
import CTA from '../../Landing/CTA';
import Footer from '../../Landing/Footer';

export function LandingPage() {
    return (
        <div>
            <Navbar />
            <Hero />
            <Stats />
            <Features />
            <Testimonials />
            <Pricing />
            <CTA />
            <Footer />
        </div>
    )
}

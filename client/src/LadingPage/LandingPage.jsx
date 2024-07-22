import React from 'react'

import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from './Navbar/Navbar';
import Hero from './Hero/Hero';
import Services from './Services/Services';
import Banner from './Banner/Banner';
import CoverBanner from './CoverBanner/CoverBanner';
import AppStore from './AppStore/AppStore';
import Testimonial from './Testimonial/Testimonial';
import Footer from './Footer/Footer';


const LandingPage = () => {
    React.useEffect(() => {
        AOS.init({
          offset: 100,
          duration: 500,
          easing: "ease-in-sine",
          delay: 100,
        });
        AOS.refresh();
    }, []);
    
    return (
        <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
            <Navbar/>
            <Hero/>
            <Services/>
            <Banner/>
            <CoverBanner/> 
            <AppStore/>
            <Testimonial/>
            <Footer/>
        </div>
    );
}

export default LandingPage;
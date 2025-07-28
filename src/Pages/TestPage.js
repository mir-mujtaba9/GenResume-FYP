import React from 'react'
import 'react-modal-video/css/modal-video.css'
// import AboutSectionOne from "../components/About/AboutSectionOne";
// import AboutSectionTwo from "../components/About/AboutSectionTwo";
// import Blog from "../components/Blog";
// import Brands from "../components/Brands";
import ScrollUp from "../components/Common/ScrollUp";
// import Contact from "../components/Contact";
import Features from "../components/Features";
import Hero from "../components/Hero";
// import Pricing from "../components/Pricing";
// import Testimonials from "../components/Testimonials";
// import Video from "../components/Video";
import { ThemeProvider } from 'next-themes';
import Header from "../components/Header"
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

function TestPage() {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
    
      <div className='bg-[#FCFCFC] dark:bg-black'>
      <div>
        <Header />
        <ScrollUp />
        <div>
        <Hero />
        <Features />
        {/* <Video /> */}
        {/* <Brands /> */}
        {/* <AboutSectionOne /> */}
        {/* <AboutSectionTwo /> */}
        {/* <Testimonials /> */}
        {/* <Pricing /> */}
        {/* <Blog /> */}
        {/* <Contact /> */}
        </div>
        <Footer />
        <ScrollToTop />
        
        </div>
      </div>
      
      </ThemeProvider>
  )
}

export default TestPage
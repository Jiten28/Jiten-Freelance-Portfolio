import React from 'react';
import Header from './components/Header';
import Hero from './sections/Hero';
import ValueProposition from './sections/ValueProposition';
import Services from './sections/Services';
import FeaturedWork from './sections/FeaturedWork';
import MenuExperiences from './sections/MenuExperiences';
import DesignStyles from './sections/DesignStyles';
import WebsiteExperience from './sections/WebsiteExperience';
import Pricing from './sections/Pricing';
import HowItWorks from './sections/HowItWorks';
import WhyChooseMe from './sections/WhyChooseMe';
import About from './sections/About';
import ProjectPlanner from './sections/ProjectPlanner';
import AIConceptPreview from './sections/AIConceptPreview';
import ProjectSummary from './sections/ProjectSummary';
import ProposalContact from './sections/ProposalContact';
import Footer from './sections/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueProposition />
        <Services />
        <FeaturedWork />
        <MenuExperiences />
        <DesignStyles />
        <WebsiteExperience />
        <Pricing />
        <HowItWorks />
        <WhyChooseMe />
        <About />
        <ProjectPlanner />
        <AIConceptPreview />
        <ProjectSummary />
        <ProposalContact />
        <Footer />
      </main>
    </>
  );
}

export default App;
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../sections/Navbar';
import LogoHeader from '../components/LogoHeader';
import ProjectsDemoDashboard from '../components/ProjectsDemoDashboard';
import Contact from '../sections/Contact';

/**
 * Projects Demo Page
 * Renders the interactive portfolio walkthrough dashboard with working widgets
 * and architecture breakdowns.
 */
const ProjectsDemoPage = () => {
  return (
    <>
      <Helmet>
        <title>Interactive Project Demos & Walkthroughs | Captain Solo</title>
        <meta name="description" content="findYOU workshop — tasks, Pomodoro, scrapers. Plus Light Years and captainsolo.ca walkthroughs. Rough on purpose." />
      </Helmet>
      
      {/* Logo Header */}
      <LogoHeader />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Walkthrough & Demos Dashboard Container */}
      <div className="pt-24 min-h-screen bg-neutral-950 text-white">
        <ProjectsDemoDashboard />
      </div>
      
      {/* Contact Section */}
      <Contact />
    </>
  );
};

export default ProjectsDemoPage;

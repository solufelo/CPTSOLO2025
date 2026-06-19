import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

/**
 * Privacy Policy Page
 * Required for OAuth consent screen and legal compliance
 * Simplified version with inline styles to ensure it always renders
 */
const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    // Set background color directly
    document.body.style.backgroundColor = '#1a1a1a';
    document.body.style.color = '#f5f5f5';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
  }, []);

  const containerStyle = {
    minHeight: '100vh',
    backgroundColor: '#1a1a1a',
    padding: '5rem 1rem 2rem',
    color: '#f5f5f5',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  };

  const contentStyle = {
    maxWidth: '896px',
    margin: '0 auto',
  };

  const headingStyle = {
    fontSize: '3rem',
    fontWeight: 900,
    color: '#f5f5f5',
    marginBottom: '2rem',
    marginTop: 0,
  };

  const sectionHeadingStyle = {
    fontSize: '1.5rem',
    fontWeight: 900,
    color: '#d4af37',
    marginBottom: '1rem',
    marginTop: '2rem',
  };

  const textStyle = {
    color: 'rgba(245, 245, 245, 0.8)',
    lineHeight: 1.75,
    marginBottom: '1rem',
  };

  const linkStyle = {
    color: '#d4af37',
    textDecoration: 'none',
    position: 'fixed',
    top: '1.5rem',
    left: '1.5rem',
    zIndex: 1000,
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    borderRadius: '4px',
  };

  return (
    <>
      <Helmet>
        <title>Privacy Policy | CaptainSolo</title>
        <meta name="description" content="Privacy Policy for CaptainSolo - How we collect, use, and protect your personal information." />
        <link rel="canonical" href="https://captainsolo.ca/privacy-policy" />
      </Helmet>

      <Link to="/" style={linkStyle}>← Home</Link>

      <div style={containerStyle}>
        <div style={contentStyle}>
          <h1 style={headingStyle}>Privacy Policy</h1>
          
          <p style={{ ...textStyle, fontSize: '0.875rem', color: '#9ca3af' }}>
            Last updated: January 2025
          </p>

          <section>
            <h2 style={sectionHeadingStyle}>1. Introduction</h2>
            <p style={textStyle}>
              CaptainSolo ("we," "our," or "us") operates the website https://captainsolo.ca 
              (the "Service"). This page informs you of our policies regarding the collection, 
              use, and disclosure of personal data when you use our Service.
            </p>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>2. Information We Collect</h2>
            <p style={textStyle}>We collect the following types of information:</p>
            <ul style={{ ...textStyle, listStyle: 'disc', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Account Information:</strong> Name, email address, phone number</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Order Information:</strong> Service requests, payment information, project details</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>File Uploads:</strong> Files you upload through our service (voice tag recordings, project files)</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Usage Data:</strong> Information about how you use our Service</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Device Information:</strong> IP address, browser type, device information</li>
            </ul>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>3. How We Use Your Information</h2>
            <p style={textStyle}>We use your information to:</p>
            <ul style={{ ...textStyle, listStyle: 'disc', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Process and fulfill your orders</li>
              <li style={{ marginBottom: '0.5rem' }}>Communicate with you about your orders</li>
              <li style={{ marginBottom: '0.5rem' }}>Provide customer support</li>
              <li style={{ marginBottom: '0.5rem' }}>Improve our services</li>
              <li style={{ marginBottom: '0.5rem' }}>Send you marketing communications (with your consent)</li>
              <li style={{ marginBottom: '0.5rem' }}>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>4. Third-Party Services</h2>
            <p style={textStyle}>
              We use the following third-party services that may collect information:
            </p>
            <ul style={{ ...textStyle, listStyle: 'disc', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Supabase:</strong> Database and authentication (privacy policy: https://supabase.com/privacy)</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Stripe:</strong> Payment processing (privacy policy: https://stripe.com/privacy)</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Google Drive:</strong> File storage (privacy policy: https://policies.google.com/privacy)</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Netlify:</strong> Hosting and deployment (privacy policy: https://www.netlify.com/privacy/)</li>
            </ul>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>5. Data Security</h2>
            <p style={textStyle}>
              We implement appropriate technical and organizational measures to protect your 
              personal information. However, no method of transmission over the Internet is 
              100% secure.
            </p>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>6. Your Rights</h2>
            <p style={textStyle}>You have the right to:</p>
            <ul style={{ ...textStyle, listStyle: 'disc', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Access your personal information</li>
              <li style={{ marginBottom: '0.5rem' }}>Correct inaccurate information</li>
              <li style={{ marginBottom: '0.5rem' }}>Request deletion of your information</li>
              <li style={{ marginBottom: '0.5rem' }}>Object to processing of your information</li>
              <li style={{ marginBottom: '0.5rem' }}>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>7. Cookies</h2>
            <p style={textStyle}>
              We use cookies to improve your experience on our Service. You can set your 
              browser to refuse cookies, but some features may not work properly.
            </p>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>8. Children's Privacy</h2>
            <p style={textStyle}>
              Our Service is not intended for children under 13. We do not knowingly collect 
              personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>9. Changes to This Privacy Policy</h2>
            <p style={textStyle}>
              We may update our Privacy Policy from time to time. We will notify you of any 
              changes by posting the new Privacy Policy on this page.
            </p>
          </section>

          <section>
            <h2 style={sectionHeadingStyle}>10. Contact Us</h2>
            <p style={textStyle}>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul style={{ ...textStyle, listStyle: 'none', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Email:</strong> work@captainsolo.ca</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Website:</strong> https://captainsolo.ca</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;

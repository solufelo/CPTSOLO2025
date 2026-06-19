import { Helmet } from 'react-helmet-async';
import LogoHeader from '../components/LogoHeader';
import Navbar from '../sections/Navbar';

/**
 * Terms of Service Page
 * Required for OAuth consent screen and legal compliance
 */
const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | CaptainSolo</title>
        <meta name="description" content="Terms of Service for CaptainSolo - Terms and conditions for using our services." />
        <link rel="canonical" href="https://captainsolo.ca/terms-of-service" />
      </Helmet>

      <LogoHeader />
      <Navbar />

      <div className="min-h-screen bg-DarkLava py-20 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-amiamie-round text-4xl sm:text-5xl font-black text-primary mb-8">
            Terms of Service
          </h1>
          
          <div className="font-amiamie text-primary/80 space-y-6 leading-relaxed">
            <p className="text-sm text-SageGray">
              Last updated: January 2025
            </p>

            <section>
              <h2 className="font-amiamie-round text-2xl font-black text-gold mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="mb-4">
                By accessing and using https://captainsolo.ca (the "Service"), you accept and 
                agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="font-amiamie-round text-2xl font-black text-gold mb-4">
                2. Services
              </h2>
              <p className="mb-4">
                CaptainSolo provides the following services:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Voice tag and producer tag creation</li>
                <li>Web development services</li>
                <li>Videography and video production</li>
                <li>Related creative services</li>
              </ul>
            </section>

            <section>
              <h2 className="font-amiamie-round text-2xl font-black text-gold mb-4">
                3. Orders and Payments
              </h2>
              <p className="mb-4">
                <strong>Payment:</strong> All orders must be paid in full before work begins. 
                We accept payment through Stripe.
              </p>
              <p className="mb-4">
                <strong>Refunds:</strong> Refunds are handled on a case-by-case basis. Once 
                work has begun, refunds may be partial or not available.
              </p>
              <p className="mb-4">
                <strong>Delivery:</strong> Delivery times are estimates and not guarantees. 
                We will communicate any delays.
              </p>
            </section>

            <section>
              <h2 className="font-amiamie-round text-2xl font-black text-gold mb-4">
                4. Intellectual Property
              </h2>
              <p className="mb-4">
                <strong>Client Ownership:</strong> Upon full payment, you receive full 
                commercial rights to the delivered work. You may use it for commercial purposes, 
                including monetized content.
              </p>
              <p className="mb-4">
                <strong>Portfolio Use:</strong> We reserve the right to use completed work 
                in our portfolio and for marketing purposes, unless otherwise agreed.
              </p>
            </section>

            <section>
              <h2 className="font-amiamie-round text-2xl font-black text-gold mb-4">
                5. Revisions
              </h2>
              <p className="mb-4">
                Revision policies vary by package:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li><strong>Basic:</strong> 1 revision included</li>
                <li><strong>Standard:</strong> 2 revisions included</li>
                <li><strong>Premium:</strong> Unlimited revisions</li>
              </ul>
              <p className="mb-4">
                Additional revisions may be available for an additional fee.
              </p>
            </section>

            <section>
              <h2 className="font-amiamie-round text-2xl font-black text-gold mb-4">
                6. User Responsibilities
              </h2>
              <p className="mb-4">You agree to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4 mb-4">
                <li>Provide accurate information</li>
                <li>Provide necessary materials and feedback in a timely manner</li>
                <li>Use the Service in compliance with applicable laws</li>
                <li>Not use the Service for illegal or unauthorized purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="font-amiamie-round text-2xl font-black text-gold mb-4">
                7. Limitations of Liability
              </h2>
              <p className="mb-4">
                CaptainSolo shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages resulting from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="font-amiamie-round text-2xl font-black text-gold mb-4">
                8. Indemnification
              </h2>
              <p className="mb-4">
                You agree to indemnify and hold harmless CaptainSolo from any claims, damages, 
                losses, liabilities, and expenses arising from your use of the Service.
              </p>
            </section>

            <section>
              <h2 className="font-amiamie-round text-2xl font-black text-gold mb-4">
                9. Termination
              </h2>
              <p className="mb-4">
                We reserve the right to terminate or suspend your account and access to the 
                Service at our sole discretion, without prior notice, for conduct that we 
                believe violates these Terms.
              </p>
            </section>

            <section>
              <h2 className="font-amiamie-round text-2xl font-black text-gold mb-4">
                10. Changes to Terms
              </h2>
              <p className="mb-4">
                We reserve the right to modify these terms at any time. We will notify users 
                of any material changes by posting the new Terms on this page.
              </p>
            </section>

            <section>
              <h2 className="font-amiamie-round text-2xl font-black text-gold mb-4">
                11. Governing Law
              </h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws 
                of Ontario, Canada, without regard to its conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="font-amiamie-round text-2xl font-black text-gold mb-4">
                12. Contact Information
              </h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us:
              </p>
              <ul className="list-none space-y-2 ml-4 mb-4">
                <li><strong>Email:</strong> work@captainsolo.ca</li>
                <li><strong>Website:</strong> https://captainsolo.ca</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;


import { Helmet } from 'react-helmet-async';

/**
 * SEO Head Component for Voice Tags Page
 * Optimized for Google search ranking for voice tag related keywords
 */
const VoiceTagsSEO = () => {
  const pageTitle = "Professional Voice Tags & Producer Tags | CaptainSolo - 24H Delivery";
  const pageDescription = "Get professional voice tags and producer tags in 24 hours. Custom DJ drops, beat tags, and vocal branding for producers. Male & female voices, unlimited revisions, 500+ clients served.";
  const pageUrl = "https://captainsolo.ca/voice-tags";
  const pageImage = "https://captainsolo.ca/images/voice-tags-og.jpg";
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content="voice tags, producer tags, dj drops, beat tags, custom voice tags, metro boomin style tags, professional producer tags, 24 hour voice tags, cheap voice tags, voice tag maker, voice tag service, producer tag maker, trap voice tags, hip hop producer tags" />
      <link rel="canonical" href={pageUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={pageImage} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta property="twitter:title" content={pageTitle} />
      <meta property="twitter:description" content={pageDescription} />
      <meta property="twitter:image" content={pageImage} />

      {/* Structured Data / Schema.org for Google */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Professional Voice Tags & Producer Tags",
          "description": pageDescription,
          "provider": {
            "@type": "Person",
            "name": "Solomon CaptainSolo Olufelo",
            "url": "https://captainsolo.ca",
            "sameAs": [
              "https://instagram.com/caaptainsolo",
              "https://www.fiverr.com/solufelo/"
            ]
          },
          "serviceType": "Voice Over Services",
          "areaServed": "Worldwide",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Voice Tag Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Basic Voice Tag Package"
                },
                "price": "10.00",
                "priceCurrency": "USD"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Standard Voice Tag Package"
                },
                "price": "20.00",
                "priceCurrency": "USD"
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Premium Voice Tag Package"
                },
                "price": "35.00",
                "priceCurrency": "USD"
              }
            ]
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "500"
          }
        })}
      </script>
    </Helmet>
  );
};

export default VoiceTagsSEO;


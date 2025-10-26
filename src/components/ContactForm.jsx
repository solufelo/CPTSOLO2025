import { useState, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/**
 * ContactForm Component
 * Fully functional contact form with PHP/cPanel backend integration
 * Features form validation, loading states, and success/error handling
 * 
 * SETUP: Update PHP_API_URL with your cPanel domain
 */
const ContactForm = () => {
  const formRef = useRef(null);
  
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });
  
  // Helper function to map package price to budget dropdown option
  const mapPriceToBudget = (priceRange) => {
    if (!priceRange) return "";
    
    // Extract numeric values from price range (e.g., "$1,500-2,500" -> [1500, 2500])
    const matches = priceRange.match(/\$?([\d,]+)/g);
    if (!matches) return "Not sure yet";
    
    const minPrice = parseInt(matches[0].replace(/[,$]/g, ''));
    const maxPrice = matches[1] ? parseInt(matches[1].replace(/[,$]/g, '')) : minPrice;
    const avgPrice = (minPrice + maxPrice) / 2;
    
    // Map to budget options
    if (avgPrice < 500) return "Under $500";
    if (avgPrice <= 1000) return "$500 - $1,000";
    if (avgPrice <= 2500) return "$1,000 - $2,500";
    if (avgPrice <= 5000) return "$2,500 - $5,000";
    return "$5,000+";
  };

  // Helper function to map package name to service dropdown option
  const mapPackageToService = (packageName) => {
    if (!packageName) return "";
    
    const serviceMapping = {
      "Landing Page": "Landing Page ($400-600)",
      "Business Website": "Business Website ($800-1,500)",
      "Video Content Package": "Video Content Package ($500-900)",
      "Website + Video Combo": "Website + Video Combo ($1,500-2,500)",
      "Full Web App": "Full Web App ($2,500-5,000)",
      "Music Video Production": "Music Video ($600-1,200)",
      "Run & Gun Music Video": "Music Video ($600-1,200)",
      "Freestyle Mic Promo": "Video Content Package ($500-900)",
    };
    
    // Check for exact match first
    if (serviceMapping[packageName]) {
      return serviceMapping[packageName];
    }
    
    // Check for partial match
    for (const [key, value] of Object.entries(serviceMapping)) {
      if (packageName.includes(key)) {
        return value;
      }
    }
    
    // Default to custom if no match
    return "Custom Project (Let's discuss)";
  };

  // Auto-fill from selected package on mount
  useEffect(() => {
    const selectedPackage = sessionStorage.getItem('selectedPackage');
    if (selectedPackage) {
      try {
        const pkg = JSON.parse(selectedPackage);
        const mappedService = mapPackageToService(pkg.name);
        const mappedBudget = mapPriceToBudget(pkg.price);
        
        setFormData(prev => ({
          ...prev,
          service: mappedService,
          budget: mappedBudget,
          message: `Hi! I'm interested in the ${pkg.name} package (${pkg.price}). `,
        }));
        
        // Scroll to contact form for better UX
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
        
        // Clear after using
        sessionStorage.removeItem('selectedPackage');
      } catch (error) {
        console.error('Error parsing selected package:', error);
      }
    }
  }, []);
  
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  });

  // Service options for dropdown
  const serviceOptions = [
    "Landing Page ($400-600)",
    "Business Website ($800-1,500)",
    "Video Content Package ($500-900)",
    "Website + Video Combo ($1,500-2,500)",
    "Full Web App ($2,500-5,000)",
    "Music Video ($600-1,200)",
    "Custom Project (Let's discuss)",
  ];

  // Budget ranges
  const budgetOptions = [
    "Under $500",
    "$500 - $1,000",
    "$1,000 - $2,500",
    "$2,500 - $5,000",
    "$5,000+",
    "Not sure yet",
  ];

  // Form animation on mount
  useGSAP(() => {
    gsap.from(formRef.current, {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
      },
    });
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error when user starts typing
    if (formStatus.error) {
      setFormStatus((prev) => ({ ...prev, error: false }));
    }
  };

  // Form validation
  const validateForm = () => {
    if (!formData.name.trim()) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: "Please enter your name",
      });
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: "Please enter a valid email address",
      });
      return false;
    }

    if (!formData.message.trim()) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: "Please tell me about your project",
      });
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) return;
    
    // Set loading state
    setFormStatus({
      loading: true,
      success: false,
      error: false,
      message: "Sending your message...",
    });

    try {
      // Netlify Forms - automatically handles form submissions
      const formElement = formRef.current;
      const formDataToSend = new FormData(formElement);
      
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formDataToSend).toString(),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
      
      // Success state
      setFormStatus({
        loading: false,
        success: true,
        error: false,
        message: "Message sent! I'll get back to you within 24 hours. 🚀",
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          budget: "",
          message: "",
        });
        setFormStatus({
          loading: false,
          success: false,
          error: false,
          message: "",
        });
      }, 3000);

    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        message: error.message || "Oops! Something went wrong. Please email me directly at work@captainsolo.ca",
      });
    }
  };

  return (
    <form 
      ref={formRef}
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-5"
    >
      {/* Netlify form detection */}
      <input type="hidden" name="form-name" value="contact" />
      
      {/* Honeypot spam protection */}
      <p className="hidden">
        <label>
          Don't fill this out if you're human: <input name="bot-field" />
        </label>
      </p>
      {/* Name and Email row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name input */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                     text-white placeholder-white/40 
                     focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                     transition-colors duration-200"
            placeholder="John Doe"
          />
        </div>

        {/* Email input */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                     text-white placeholder-white/40 
                     focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                     transition-colors duration-200"
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Phone and Service row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Phone input */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-2">
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                     text-white placeholder-white/40 
                     focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                     transition-colors duration-200"
            placeholder="(289) 123-4567"
          />
        </div>

        {/* Service dropdown */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-white/80 mb-2">
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                     text-white
                     focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                     transition-colors duration-200"
          >
            <option value="" className="bg-black">Select a service</option>
            {serviceOptions.map((service, index) => (
              <option key={index} value={service} className="bg-black">
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Budget dropdown */}
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-white/80 mb-2">
          Budget Range
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                   text-white
                   focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                   transition-colors duration-200"
        >
          <option value="" className="bg-black">Select your budget</option>
          {budgetOptions.map((budget, index) => (
            <option key={index} value={budget} className="bg-black">
              {budget}
            </option>
          ))}
        </select>
      </div>

      {/* Message textarea */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-2">
          Tell me about your project *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg 
                   text-white placeholder-white/40 
                   focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
                   transition-colors duration-200 resize-none"
          placeholder="Describe your vision, goals, timeline, and any specific requirements..."
        />
      </div>

      {/* Status message */}
      {formStatus.message && (
        <div
          className={`p-4 rounded-lg text-center font-medium ${
            formStatus.success
              ? "bg-green-500/20 text-green-300 border border-green-500/30"
              : formStatus.error
              ? "bg-red-500/20 text-red-300 border border-red-500/30"
              : "bg-blue/20 text-blue border border-blue/30"
          }`}
        >
          {formStatus.message}
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={formStatus.loading || formStatus.success}
        className={`w-full py-4 rounded-lg font-medium text-lg
                  transition-all duration-200
                  ${
                    formStatus.loading || formStatus.success
                      ? "bg-white/20 text-white/50 cursor-not-allowed"
                      : "bg-gold text-black hover:bg-gold-dark hover:scale-[1.02]"
                  }`}
      >
        {formStatus.loading ? "Sending..." : formStatus.success ? "Message Sent! ✓" : "Send Message"}
      </button>

      {/* Privacy note */}
      <p className="text-xs text-white/50 text-center">
        Your information is safe with me. I'll only use it to respond to your inquiry.
      </p>
    </form>
  );
};

export default ContactForm;


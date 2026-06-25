import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTheme } from "../context/ThemeContext";

/**
 * ContactForm Component
 * Fully functional contact form with PHP/cPanel backend integration
 * Features form validation, loading states, and success/error handling
 * 
 * SETUP: Update PHP_API_URL with your cPanel domain
 */
const ContactForm = () => {
  const formRef = useRef(null);
  const { theme } = useTheme();
  
  // Form state management
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    budget: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: "",
  });

  // Service options for dropdown
  const serviceOptions = [
    "Web app / full-stack build",
    "Website",
    "Video / motion",
    "Collaboration / other",
  ];

  // Budget ranges
  const budgetOptions = [
    "Under $1,000",
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
      // Submit form via cPanel API
      const response = await fetch("/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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

  // Theme-aware classes
  const getInputClass = () => {
    const font = "font-body";
    if (theme === 'light') {
      return `${font} w-full px-4 py-3 bg-gray-100 border border-gray-400 rounded-sm 
              text-gray-900 placeholder-gray-600 
              focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600
              transition-colors duration-200`;
    }
    return `${font} w-full px-4 py-3 bg-white/10 border border-white/20 rounded-sm 
            text-white placeholder-white/40 
            focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold
            transition-colors duration-200`;
  };

  const getLabelClass = () => {
    const base = "block text-xs font-display font-bold uppercase tracking-widest mb-2";
    if (theme === 'light') {
      return `${base} text-gray-900`;
    }
    return `${base} text-white/90`;
  };

  const getSelectOptionClass = () => {
    if (theme === 'light') {
      return "bg-white text-gray-900";
    }
    return "bg-black text-white";
  };

  const getButtonClass = () => {
    const base = "w-full py-4 rounded-sm font-display font-bold uppercase tracking-widest text-lg transition-all duration-200";
    if (theme === 'light') {
      return `${base}
              ${formStatus.loading || formStatus.success
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02]"
              }`;
    }
    return `${base}
            ${formStatus.loading || formStatus.success
              ? "bg-white/20 text-white/50 cursor-not-allowed"
              : "bg-gold text-black hover:bg-gold-dark hover:scale-[1.02]"
            }`;
  };

  return (
    <form 
      ref={formRef}
      name="contact"
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-5"
    >
      {/* Name and Email row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name input */}
        <div>
          <label htmlFor="name" className={getLabelClass()}>
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={getInputClass()}
            placeholder="John Doe"
          />
        </div>

        {/* Email input */}
        <div>
          <label htmlFor="email" className={getLabelClass()}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={getInputClass()}
            placeholder="john@example.com"
          />
        </div>
      </div>

      {/* Phone and Service row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Phone input */}
        <div>
          <label htmlFor="phone" className={getLabelClass()}>
            Phone (Optional)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={getInputClass()}
            placeholder="(289) 123-4567"
          />
        </div>

        {/* Service dropdown */}
        <div>
          <label htmlFor="service" className={getLabelClass()}>
            Service Interested In
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className={getInputClass()}
          >
            <option value="" className={getSelectOptionClass()}>Select a service</option>
            {serviceOptions.map((service, index) => (
              <option key={index} value={service} className={getSelectOptionClass()}>
                {service}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Budget dropdown */}
      <div>
        <label htmlFor="budget" className={getLabelClass()}>
          Budget Range
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={getInputClass()}
        >
          <option value="" className={getSelectOptionClass()}>Select your budget</option>
          {budgetOptions.map((budget, index) => (
            <option key={index} value={budget} className={getSelectOptionClass()}>
              {budget}
            </option>
          ))}
        </select>
      </div>

      {/* Message textarea */}
      <div>
        <label htmlFor="message" className={getLabelClass()}>
          Tell me about your project *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className={`${getInputClass()} resize-none`}
          placeholder="Describe your vision, goals, timeline, and any specific requirements..."
        />
      </div>

      {/* Status message */}
      {formStatus.message && (
        <div
          role={formStatus.error ? 'alert' : 'status'}
          aria-live={formStatus.error ? 'assertive' : 'polite'}
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
        className={getButtonClass()}
      >
        {formStatus.loading ? "Sending..." : formStatus.success ? "Message Sent! ✓" : "Send Message"}
      </button>

      {/* Privacy note */}
      <p className={`text-xs text-center ${theme === 'light' ? 'text-gray-500' : 'text-white/50'}`}>
        Your information is safe with me. I'll only use it to respond to your inquiry.
      </p>
    </form>
  );
};

export default ContactForm;
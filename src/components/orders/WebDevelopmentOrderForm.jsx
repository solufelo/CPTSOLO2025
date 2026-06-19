/**
 * Web Development Order Form
 * Form for ordering web development services
 */

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { ensureProfileExists } from '../../lib/profileUtils';
import FileUpload from './FileUpload';
import PaymentCheckout from './PaymentCheckout';

const PACKAGES = {
  basic: { name: 'Basic Website', price: 500, description: 'Simple 5-page website with contact form' },
  standard: { name: 'Standard Website', price: 1500, description: 'Custom website with CMS, SEO optimization' },
  premium: { name: 'Premium Website', price: 3500, description: 'Full-stack web application with custom features' },
};

const WEBSITE_TYPES = [
  'Portfolio/Personal',
  'Business/Corporate',
  'E-commerce',
  'Blog',
  'Landing Page',
  'Web Application',
  'Other',
];

const WebDevelopmentOrderForm = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    packageType: '',
    websiteType: '',
    projectDescription: '',
    targetAudience: '',
    desiredFeatures: [],
    designPreferences: '',
    colorScheme: '',
    timeline: '',
    budget: '',
    additionalNotes: '',
    agreedToTerms: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleFeatureToggle = (feature) => {
    const currentFeatures = formData.desiredFeatures || [];
    if (currentFeatures.includes(feature)) {
      handleInputChange('desiredFeatures', currentFeatures.filter(f => f !== feature));
    } else {
      handleInputChange('desiredFeatures', [...currentFeatures, feature]);
    }
  };

  const validateStep = (stepNumber) => {
    setError(null);
    
    if (stepNumber === 1) {
      if (!formData.packageType) {
        setError('Please select a package');
        return false;
      }
    }
    
    if (stepNumber === 2) {
      if (!formData.websiteType) {
        setError('Please select a website type');
        return false;
      }
      if (!formData.projectDescription.trim()) {
        setError('Please provide a project description');
        return false;
      }
    }
    
    if (stepNumber === 3) {
      if (!formData.agreedToTerms) {
        setError('You must agree to the Terms of Service to continue');
        return false;
      }
    }
    
    return true;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setError(null);
  };

  const createOrderBeforeCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      // Ensure profile exists before creating order
      await ensureProfileExists(user);
      
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            service_type: 'web-development',
            package_type: formData.packageType,
            price: PACKAGES[formData.packageType].price,
            status: 'pending',
            requirements: JSON.stringify({
              websiteType: formData.websiteType,
              projectDescription: formData.projectDescription,
              targetAudience: formData.targetAudience,
              desiredFeatures: formData.desiredFeatures,
              designPreferences: formData.designPreferences,
              colorScheme: formData.colorScheme,
              timeline: formData.timeline,
              budget: formData.budget,
              additionalNotes: formData.additionalNotes,
              uploadedFiles: uploadedFiles.map(f => ({ name: f.name, url: f.url })),
            }),
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;
      return order.id;
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.message || 'Failed to create order');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const availableFeatures = [
    'Contact Form',
    'Blog/News Section',
    'User Authentication',
    'Payment Integration',
    'Social Media Integration',
    'Analytics',
    'SEO Optimization',
    'Mobile Responsive',
    'CMS (Content Management)',
    'E-commerce Functionality',
    'Custom Animations',
    'Multi-language Support',
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-8">
        <h1 className="font-amiamie-round text-4xl font-black text-primary mb-2">
          Order Web Development Service
        </h1>
        <p className="text-SageGray mb-8">
          Tell us about your project and we'll bring your vision to life
        </p>

        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-bold ${step >= 1 ? 'text-gold' : 'text-SageGray'}`}>
              Package
            </span>
            <span className={`text-sm font-bold ${step >= 2 ? 'text-gold' : 'text-SageGray'}`}>
              Details
            </span>
            <span className={`text-sm font-bold ${step >= 3 ? 'text-gold' : 'text-SageGray'}`}>
              Review
            </span>
          </div>
          <div className="h-2 bg-SageGray/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 rounded p-3 mb-6">
            {error}
          </div>
        )}

        {/* Step 1: Package Selection */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="font-amiamie-round text-2xl font-black text-primary mb-4">
              Select a Package
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(PACKAGES).map(([key, pkg]) => (
                <button
                  key={key}
                  onClick={() => handleInputChange('packageType', key)}
                  className={`p-6 rounded-lg border-2 text-left transition-all ${
                    formData.packageType === key
                      ? 'border-gold bg-gold/10'
                      : 'border-SageGray/30 bg-primary/5 hover:border-gold/50'
                  }`}
                >
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-2xl font-black text-gold mb-2">${pkg.price}</p>
                  <p className="text-sm text-SageGray">{pkg.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Project Details */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="font-amiamie-round text-2xl font-black text-primary mb-4">
              Project Details
            </h2>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Website Type *
              </label>
              <select
                value={formData.websiteType}
                onChange={(e) => handleInputChange('websiteType', e.target.value)}
                className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary"
              >
                <option value="">Select website type</option>
                {WEBSITE_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Project Description *
              </label>
              <textarea
                value={formData.projectDescription}
                onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary"
                rows="5"
                placeholder="Describe your project, goals, and vision..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Target Audience
              </label>
              <input
                type="text"
                value={formData.targetAudience}
                onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary"
                placeholder="Who is your target audience?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Desired Features
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {availableFeatures.map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-primary/5"
                  >
                    <input
                      type="checkbox"
                      checked={formData.desiredFeatures?.includes(feature) || false}
                      onChange={() => handleFeatureToggle(feature)}
                      className="rounded border-SageGray/30"
                    />
                    <span className="text-sm text-primary">{feature}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Design Preferences
              </label>
              <textarea
                value={formData.designPreferences}
                onChange={(e) => handleInputChange('designPreferences', e.target.value)}
                className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary"
                rows="3"
                placeholder="Describe your design preferences, style, or reference websites..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Color Scheme
              </label>
              <input
                type="text"
                value={formData.colorScheme}
                onChange={(e) => handleInputChange('colorScheme', e.target.value)}
                className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary"
                placeholder="Preferred colors or brand colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Timeline
              </label>
              <input
                type="text"
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary"
                placeholder="When do you need this completed?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Additional Notes
              </label>
              <textarea
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                className="w-full bg-primary/5 border border-SageGray/30 rounded px-4 py-2 text-primary"
                rows="3"
                placeholder="Any other information we should know?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Reference Files (Optional)
              </label>
              <FileUpload
                onFilesUploaded={(files) => setUploadedFiles(files)}
                allowedTypes={['image', 'document', 'pdf']}
              />
            </div>
          </div>
        )}

        {/* Step 3: Review & Payment */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="font-amiamie-round text-2xl font-black text-primary mb-4">
              Review Your Order
            </h2>

            <div className="bg-primary/5 border border-SageGray/30 rounded-lg p-6 space-y-4">
              <div>
                <h3 className="font-bold text-primary mb-2">Package</h3>
                <p className="text-SageGray">
                  {PACKAGES[formData.packageType].name} - ${PACKAGES[formData.packageType].price}
                </p>
              </div>

              <div>
                <h3 className="font-bold text-primary mb-2">Website Type</h3>
                <p className="text-SageGray">{formData.websiteType}</p>
              </div>

              <div>
                <h3 className="font-bold text-primary mb-2">Project Description</h3>
                <p className="text-SageGray">{formData.projectDescription}</p>
              </div>

              {formData.desiredFeatures.length > 0 && (
                <div>
                  <h3 className="font-bold text-primary mb-2">Desired Features</h3>
                  <p className="text-SageGray">{formData.desiredFeatures.join(', ')}</p>
                </div>
              )}

              <div>
                <h3 className="font-bold text-primary mb-2">Total</h3>
                <p className="text-2xl font-black text-gold">
                  ${PACKAGES[formData.packageType].price}
                </p>
              </div>
            </div>

            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                  className="rounded border-SageGray/30"
                />
                <span className="text-sm text-primary">
                  I agree to the{' '}
                  <a
                    href="/terms-of-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold hover:underline"
                  >
                    Terms of Service
                  </a>
                </span>
              </label>
            </div>

            <PaymentCheckout
              amount={PACKAGES[formData.packageType].price}
              serviceType="web-development"
              packageType={formData.packageType}
              createOrderBeforeCheckout={createOrderBeforeCheckout}
              onSuccess={() => {
                // Redirect handled by PaymentCheckout
              }}
              onError={(err) => {
                setError(err.message || 'Payment failed');
              }}
            />
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="bg-primary/10 border border-SageGray/30 text-primary px-6 py-3 rounded-lg
                       hover:bg-primary/20 transition-colors font-amiamie-round font-bold"
            >
              ← Back
            </button>
          )}
          {step < 3 && (
            <button
              onClick={handleNext}
              className="bg-gold text-DarkLava px-6 py-3 rounded-lg hover:bg-gold/90 transition-colors
                       font-amiamie-round font-bold ml-auto"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebDevelopmentOrderForm;


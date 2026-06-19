/**
 * Order Form Component
 * Multi-step form for placing orders with file upload and payment
 */

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import FileUpload from './FileUpload';
import PaymentCheckout from './PaymentCheckout';

const SERVICE_TYPES = {
  'voice-tag': {
    name: 'Voice Tag',
    packages: {
      basic: { name: 'Basic', price: 10, description: '1 Dry Tag (clean vocal stem)' },
      standard: { name: 'Standard', price: 20, description: '2 Tags (1 wet + 1 dry)' },
      premium: { name: 'Premium', price: 35, description: '3 Tags (wet + dry + FX)' },
    },
  },
  'web-development': {
    name: 'Web Development',
    packages: {
      basic: { name: 'Basic', price: 500, description: 'Landing Page' },
      standard: { name: 'Standard', price: 1500, description: 'Multi-page Website' },
      premium: { name: 'Premium', price: 3000, description: 'Full-Stack Application' },
    },
  },
  'videography': {
    name: 'Videography',
    packages: {
      basic: { name: 'Basic', price: 500, description: 'Event Coverage' },
      standard: { name: 'Standard', price: 1000, description: 'Commercial Video' },
      premium: { name: 'Premium', price: 2500, description: 'Full Production' },
    },
  },
};

const OrderForm = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [orderData, setOrderData] = useState({
    serviceType: '',
    packageType: '',
    requirements: '',
    files: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleServiceSelect = (serviceType) => {
    setOrderData({ ...orderData, serviceType, packageType: '' });
    setStep(2);
  };

  const handlePackageSelect = (packageType) => {
    setOrderData({ ...orderData, packageType });
    setStep(3);
  };

  const handleRequirementsChange = (e) => {
    setOrderData({ ...orderData, requirements: e.target.value });
  };

  const handleFilesUploaded = (files) => {
    setOrderData({ ...orderData, files });
  };

  const handlePaymentSuccess = async (paymentIntentId, checkoutSessionId) => {
    setLoading(true);
    setError(null);

    try {
      // Create order in database
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            service_type: orderData.serviceType,
            package_type: orderData.packageType,
            price: SERVICE_TYPES[orderData.serviceType].packages[orderData.packageType].price,
            status: 'paid',
            stripe_payment_intent_id: paymentIntentId,
            stripe_checkout_session_id: checkoutSessionId,
            requirements: orderData.requirements,
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;

      // Upload files if any
      if (orderData.files.length > 0) {
        const filePromises = orderData.files.map(async (file) => {
          const fileName = `${order.id}/${file.name}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('order-files')
            .upload(fileName, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('order-files')
            .getPublicUrl(fileName);

          // Save file record
          await supabase.from('order_files').insert([
            {
              order_id: order.id,
              file_name: file.name,
              file_url: publicUrl,
              file_type: file.type,
            },
          ]);
        });

        await Promise.all(filePromises);
      }

      setStep(4); // Success step
    } catch (err) {
      setError(err.message || 'Failed to create order');
    } finally {
      setLoading(false);
    }
  };

  const selectedService = orderData.serviceType ? SERVICE_TYPES[orderData.serviceType] : null;
  const selectedPackage = selectedService && orderData.packageType
    ? selectedService.packages[orderData.packageType]
    : null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-primary/10 border border-SageGray/30 rounded-lg p-8">
        {/* Progress Steps */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-amiamie-round font-bold
                  ${step >= s ? 'bg-gold text-DarkLava' : 'bg-SageGray/30 text-SageGray'}
                  ${step === s ? 'ring-4 ring-gold/30' : ''}
                `}
              >
                {s}
              </div>
              <span className="text-xs text-SageGray mt-2 text-center">
                {s === 1 && 'Service'}
                {s === 2 && 'Package'}
                {s === 3 && 'Details'}
                {s === 4 && 'Payment'}
              </span>
            </div>
          ))}
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 rounded p-3 mb-6">
            {error}
          </div>
        )}

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div>
            <h2 className="font-amiamie-round text-3xl font-black text-primary mb-6">
              Select a Service
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(SERVICE_TYPES).map(([key, service]) => (
                <button
                  key={key}
                  onClick={() => handleServiceSelect(key)}
                  className="bg-primary/5 border border-SageGray/30 rounded-lg p-6 hover:border-gold transition
                           text-left group"
                >
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-2 group-hover:text-gold">
                    {service.name}
                  </h3>
                  <p className="text-sm text-SageGray">Click to select</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Package Selection */}
        {step === 2 && selectedService && (
          <div>
            <button
              onClick={() => setStep(1)}
              className="text-gold hover:underline mb-6 text-sm"
            >
              ← Back to Services
            </button>
            <h2 className="font-amiamie-round text-3xl font-black text-primary mb-6">
              Select a Package
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(selectedService.packages).map(([key, pkg]) => (
                <button
                  key={key}
                  onClick={() => handlePackageSelect(key)}
                  className={`bg-primary/5 border-2 rounded-lg p-6 text-left transition
                    ${orderData.packageType === key
                      ? 'border-gold bg-gold/10'
                      : 'border-SageGray/30 hover:border-gold'
                    }`}
                >
                  <h3 className="font-amiamie-round text-xl font-bold text-primary mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-2xl font-bold text-gold mb-2">${pkg.price}</p>
                  <p className="text-sm text-SageGray">{pkg.description}</p>
                </button>
              ))}
            </div>
            {orderData.packageType && (
              <button
                onClick={() => setStep(3)}
                className="mt-6 bg-gold text-DarkLava font-amiamie-round font-bold py-3 px-6 rounded-lg
                         hover:bg-gold/90 transition-colors"
              >
                Continue →
              </button>
            )}
          </div>
        )}

        {/* Step 3: Requirements & Files */}
        {step === 3 && selectedPackage && (
          <div>
            <button
              onClick={() => setStep(2)}
              className="text-gold hover:underline mb-6 text-sm"
            >
              ← Back to Packages
            </button>
            <h2 className="font-amiamie-round text-3xl font-black text-primary mb-6">
              Order Details
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-primary/80 mb-2">
                  Requirements / Special Instructions
                </label>
                <textarea
                  value={orderData.requirements}
                  onChange={handleRequirementsChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-white/10 border border-SageGray/30 rounded-lg 
                           text-primary placeholder-SageGray 
                           focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                  placeholder="Tell us about your project, any specific requirements, deadlines, etc."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary/80 mb-2">
                  Upload Files (Optional)
                </label>
                <FileUpload onFilesUploaded={handleFilesUploaded} />
                <p className="text-xs text-SageGray mt-2">
                  Upload reference files, examples, or any materials related to your project.
                </p>
              </div>

              {/* Order Summary */}
              <div className="bg-primary/5 border border-SageGray/30 rounded-lg p-6">
                <h3 className="font-amiamie-round text-xl font-bold text-primary mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-SageGray">Service:</span>
                    <span className="text-primary">{selectedService.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-SageGray">Package:</span>
                    <span className="text-primary">{selectedPackage.name}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-SageGray/30 pt-2 mt-2">
                    <span className="text-primary">Total:</span>
                    <span className="text-gold">${selectedPackage.price}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setStep(4)}
                className="w-full bg-gold text-DarkLava font-amiamie-round font-bold py-3 rounded-lg
                         hover:bg-gold/90 transition-colors"
              >
                Proceed to Payment →
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && selectedPackage && (
          <div>
            <button
              onClick={() => setStep(3)}
              className="text-gold hover:underline mb-6 text-sm"
            >
              ← Back to Details
            </button>
            <h2 className="font-amiamie-round text-3xl font-black text-primary mb-6">
              Payment
            </h2>
            <PaymentCheckout
              amount={selectedPackage.price}
              serviceType={orderData.serviceType}
              packageType={orderData.packageType}
              onPaymentSuccess={handlePaymentSuccess}
              loading={loading}
            />
          </div>
        )}

        {/* Step 5: Success */}
        {step === 5 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="font-amiamie-round text-3xl font-black text-gold mb-4">
              Order Placed Successfully!
            </h2>
            <p className="text-primary/80 mb-6">
              Your order has been received and payment processed.
            </p>
            <p className="text-sm text-SageGray mb-8">
              You'll receive a confirmation email shortly. Check your dashboard to track order progress.
            </p>
            <a
              href="/dashboard"
              className="inline-block bg-gold text-DarkLava font-amiamie-round font-bold py-3 px-6 rounded-lg
                       hover:bg-gold/90 transition-colors"
            >
              View Dashboard
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderForm;


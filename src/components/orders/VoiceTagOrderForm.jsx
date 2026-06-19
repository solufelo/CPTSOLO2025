/**
 * Voice Tag Order Form
 * Detailed form for voice tag orders with all customization options
 */

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';
import { ensureProfileExists } from '../../lib/profileUtils';
import FileUpload from './FileUpload';
import PaymentCheckout from './PaymentCheckout';

const TONE_OPTIONS = [
  'Sexy',
  'Serious',
  'Confident',
  'Dark',
  'Excited',
  'Happy',
  'Sad',
  'Whispered (True whisper)',
  'Soft (Almost Whispered)',
];

const EFFECT_OPTIONS = [
  'Reverse Reverb (Reverb Riser)',
  'Stutter',
  'Tapestop (Pitch drop)',
  'Reverb',
  'Echo/Delay',
  'Chorus',
  'Phaser',
  'Flanger',
  'Telephone EQ filter',
  "I'm not sure. Do your thing!",
  'No FX, leave dry!',
];

const PITCH_OPTIONS = [
  'Keep Normal Voice Pitch',
  'Higher Pitch',
  'Lower Pitch',
  'Auto-tuned',
];

const PACKAGES = {
  basic: { name: 'Basic', price: 10, description: '1 Dry Tag (clean vocal stem)' },
  standard: { name: 'Standard', price: 20, description: '2 Tags (1 wet + 1 dry)' },
  premium: { name: 'Premium', price: 35, description: '3 Tags (wet + dry + FX)' },
};

const VoiceTagOrderForm = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Package selection
    packageType: '',
    
    // Voice tag details
    voiceTagText: '',
    pronunciation: '',
    pronunciationAudio: null,
    
    // Contact
    secondaryEmail: '',
    
    // Voice customization
    toneOfVoice: '',
    effects: [],
    needsTempoSync: false,
    bpm: '',
    vocalPitch: 'Keep Normal Voice Pitch',
    
    // Instructions
    instructions: '',
    
    // Agreement
    agreedToTerms: false,
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pronunciationFile, setPronunciationFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleEffectToggle = (effect) => {
    const currentEffects = formData.effects || [];
    if (currentEffects.includes(effect)) {
      handleInputChange('effects', currentEffects.filter(e => e !== effect));
    } else {
      handleInputChange('effects', [...currentEffects, effect]);
    }
  };

  const handlePronunciationFileUpload = (file) => {
    setPronunciationFile(file);
    handleInputChange('pronunciationAudio', file.name);
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
      if (!formData.voiceTagText.trim()) {
        setError('Voice tag text is required');
        return false;
      }
      if (!formData.toneOfVoice) {
        setError('Please select a tone of voice');
        return false;
      }
      if (!formData.effects || formData.effects.length === 0) {
        setError('Please select at least one effect option');
        return false;
      }
      if (!formData.vocalPitch) {
        setError('Please select a vocal pitch option');
        return false;
      }
    }
    
    if (stepNumber === 3) {
      if (!formData.instructions.trim()) {
        setError('Please provide instructions (type "None" if you have no specific instructions)');
        return false;
      }
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

  // Create order before checkout (so webhook can update it)
  const createOrderBeforeCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      // Ensure profile exists before creating order
      await ensureProfileExists(user);
      
      // Upload pronunciation audio if provided
      let pronunciationAudioUrl = null;
      if (pronunciationFile) {
        const fileName = `pronunciation-${Date.now()}-${pronunciationFile.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('order-files')
          .upload(`${user.id}/${fileName}`, pronunciationFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('order-files')
          .getPublicUrl(`${user.id}/${fileName}`);

        pronunciationAudioUrl = publicUrl;
      }

      // Create order in database with 'pending' status
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user.id,
            service_type: 'voice-tag',
            package_type: formData.packageType,
            price: PACKAGES[formData.packageType].price,
            status: 'pending', // Set to pending initially
            requirements: JSON.stringify({
              voiceTagText: formData.voiceTagText,
              pronunciation: formData.pronunciation,
              pronunciationAudio: pronunciationAudioUrl,
              secondaryEmail: formData.secondaryEmail,
              toneOfVoice: formData.toneOfVoice,
              effects: formData.effects,
              needsTempoSync: formData.needsTempoSync,
              bpm: formData.bpm || null,
              vocalPitch: formData.vocalPitch,
              instructions: formData.instructions,
              uploadedFiles: uploadedFiles.map(f => ({ name: f.name, url: f.url })),
            }),
          },
        ])
        .select()
        .single();

      if (orderError) throw orderError;
      return order.id; // Return the newly created order ID
    } catch (err) {
      console.error('Error creating order:', err);
      setError(err.message || 'Failed to create order');
      throw err; // Re-throw to be caught by PaymentCheckout
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId, checkoutSessionId) => {
    // Payment success is handled by webhook now
    // This function is kept for manual payment flow
    setStep(5); // Success step
  };

  const selectedPackage = formData.packageType ? PACKAGES[formData.packageType] : null;

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
                {s === 1 && 'Package'}
                {s === 2 && 'Details'}
                {s === 3 && 'Review'}
                {s === 4 && 'Payment'}
              </span>
            </div>
          ))}
        </div>

        <h1 className="font-amiamie-round text-4xl font-black text-primary mb-2">
          Voice Tag Order Form
        </h1>
        <p className="text-SageGray mb-8">
          Let's start with your voice tag information
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-400 rounded p-3 mb-6">
            {error}
          </div>
        )}

        {/* Step 1: Package Selection */}
        {step === 1 && (
          <div>
            <h2 className="font-amiamie-round text-2xl font-black text-primary mb-6">
              Select a Package
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {Object.entries(PACKAGES).map(([key, pkg]) => (
                <button
                  key={key}
                  onClick={() => handleInputChange('packageType', key)}
                  className={`bg-primary/5 border-2 rounded-lg p-6 text-left transition
                    ${formData.packageType === key
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
            {formData.packageType && (
              <button
                onClick={handleNext}
                className="bg-gold text-DarkLava font-amiamie-round font-bold py-3 px-6 rounded-lg
                         hover:bg-gold/90 transition-colors"
              >
                Continue →
              </button>
            )}
          </div>
        )}

        {/* Step 2: Voice Tag Details */}
        {step === 2 && (
          <div className="space-y-6">
            <button
              onClick={handleBack}
              className="text-gold hover:underline mb-4 text-sm"
            >
              ← Back
            </button>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                What do you want your voice tag to say? *
              </label>
              <p className="text-xs text-SageGray mb-2">
                You are granted 1 name or phrase per order. We DO NOT come up with names/phrases for you. 
                Your voice tag will say exactly what you type here.
              </p>
              <input
                type="text"
                value={formData.voiceTagText}
                onChange={(e) => handleInputChange('voiceTagText', e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-SageGray/30 rounded-lg 
                         text-primary placeholder-SageGray 
                         focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                placeholder="Enter your voice tag phrase"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Pronunciation *
              </label>
              <p className="text-xs text-SageGray mb-2">
                Example: PRO·NUN·CI·A·TION
              </p>
              <input
                type="text"
                value={formData.pronunciation}
                onChange={(e) => handleInputChange('pronunciation', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-SageGray/30 rounded-lg 
                         text-primary placeholder-SageGray 
                         focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                placeholder="PRO·NUN·CI·A·TION"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Would you like to upload an audio pronunciation? *
              </label>
              <div className="flex gap-4 mb-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="uploadPronunciation"
                    checked={!formData.pronunciationAudio}
                    onChange={() => {
                      handleInputChange('pronunciationAudio', null);
                      setPronunciationFile(null);
                    }}
                    className="mr-2"
                  />
                  <span className="text-primary">No</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="uploadPronunciation"
                    checked={!!formData.pronunciationAudio}
                    onChange={() => handleInputChange('pronunciationAudio', 'yes')}
                    className="mr-2"
                  />
                  <span className="text-primary">Yes</span>
                </label>
              </div>
              {formData.pronunciationAudio && (
                <div className="mt-2">
                  <FileUpload
                    onFilesUploaded={(files) => {
                      if (files.length > 0) {
                        handlePronunciationFileUpload(files[0]);
                      }
                    }}
                    maxFiles={1}
                    maxSizeMB={10}
                  />
                  <p className="text-xs text-SageGray mt-2">
                    (Optional, but extremely helpful!) You may upload an audio file and send us an example of how to say your voice tag
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Secondary Email
              </label>
              <p className="text-xs text-SageGray mb-2">
                In case something goes wrong. Is there another email address we can send your order to?
              </p>
              <input
                type="email"
                value={formData.secondaryEmail}
                onChange={(e) => handleInputChange('secondaryEmail', e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-SageGray/30 rounded-lg 
                         text-primary placeholder-SageGray 
                         focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                placeholder="secondary@email.com (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Tone of Voice *
              </label>
              <p className="text-xs text-SageGray mb-2">
                Pick the tone of voice you want your vocalist to use for your voice tag.
              </p>
              <select
                value={formData.toneOfVoice}
                onChange={(e) => handleInputChange('toneOfVoice', e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-SageGray/30 rounded-lg 
                         text-primary 
                         focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              >
                <option value="">Select tone of voice</option>
                {TONE_OPTIONS.map((tone) => (
                  <option key={tone} value={tone}>{tone}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Effects *
              </label>
              <p className="text-xs text-SageGray mb-2">
                Select the fx you want your voice tag to have. 
                <a href="#" className="text-gold hover:underline ml-1">
                  Not sure what to pick? Click here.
                </a>
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {EFFECT_OPTIONS.map((effect) => (
                  <label
                    key={effect}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer transition
                      ${formData.effects?.includes(effect)
                        ? 'border-gold bg-gold/10'
                        : 'border-SageGray/30 hover:border-gold/50'
                      }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.effects?.includes(effect) || false}
                      onChange={() => handleEffectToggle(effect)}
                      className="mr-2"
                    />
                    <span className="text-sm text-primary">{effect}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Tempo / BPM
              </label>
              <p className="text-xs text-SageGray mb-2">
                Does it need to be tempo synced? *
              </p>
              <div className="flex gap-4 mb-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="needsTempoSync"
                    checked={!formData.needsTempoSync}
                    onChange={() => handleInputChange('needsTempoSync', false)}
                    className="mr-2"
                  />
                  <span className="text-primary">No</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="needsTempoSync"
                    checked={formData.needsTempoSync}
                    onChange={() => handleInputChange('needsTempoSync', true)}
                    className="mr-2"
                  />
                  <span className="text-primary">Yes</span>
                </label>
              </div>
              {formData.needsTempoSync && (
                <div>
                  <label className="block text-sm font-medium text-primary/80 mb-2">
                    What BPM would you prefer?
                  </label>
                  <p className="text-xs text-SageGray mb-2">
                    Leave blank if you don't need it to be tempo synced.
                  </p>
                  <input
                    type="number"
                    value={formData.bpm}
                    onChange={(e) => handleInputChange('bpm', e.target.value)}
                    min="60"
                    max="200"
                    className="w-full px-4 py-3 bg-white/10 border border-SageGray/30 rounded-lg 
                             text-primary placeholder-SageGray 
                             focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                    placeholder="e.g., 128"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Vocal Pitch *
              </label>
              <p className="text-xs text-SageGray mb-2">
                Choose the pitch you would like your vocalist to use on their voice.
              </p>
              <select
                value={formData.vocalPitch}
                onChange={(e) => handleInputChange('vocalPitch', e.target.value)}
                required
                className="w-full px-4 py-3 bg-white/10 border border-SageGray/30 rounded-lg 
                         text-primary 
                         focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              >
                {PITCH_OPTIONS.map((pitch) => (
                  <option key={pitch} value={pitch}>{pitch}</option>
                ))}
              </select>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-gold text-DarkLava font-amiamie-round font-bold py-3 rounded-lg
                       hover:bg-gold/90 transition-colors"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 3: Instructions & Agreement */}
        {step === 3 && (
          <div className="space-y-6">
            <button
              onClick={handleBack}
              className="text-gold hover:underline mb-4 text-sm"
            >
              ← Back
            </button>

            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Instructions For Your Voice Tag Order *
              </label>
              <p className="text-xs text-SageGray mb-2">
                Share your ideas with us if you have any! Keep it brief.
              </p>
              <textarea
                value={formData.instructions}
                onChange={(e) => handleInputChange('instructions', e.target.value)}
                required
                rows={6}
                className="w-full px-4 py-3 bg-white/10 border border-SageGray/30 rounded-lg 
                         text-primary placeholder-SageGray 
                         focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                placeholder='If you have no instructions, type "None"'
              />
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-medium text-primary/80 mb-2">
                Upload Reference Files (Optional)
              </label>
              <p className="text-xs text-SageGray mb-2">
                Upload audio files, images, or other reference materials
              </p>
              <FileUpload
                onFilesUploaded={(files) => {
                  setUploadedFiles(files);
                }}
                maxFiles={10}
                maxSizeMB={50}
                accept="audio/*,image/*,video/*"
              />
            </div>

            {/* Order Summary */}
            <div className="bg-primary/5 border border-SageGray/30 rounded-lg p-6">
              <h3 className="font-amiamie-round text-xl font-bold text-primary mb-4">
                Order Summary
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-SageGray">Package:</span>
                  <span className="text-primary">{selectedPackage?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-SageGray">Voice Tag:</span>
                  <span className="text-primary">{formData.voiceTagText}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-SageGray">Tone:</span>
                  <span className="text-primary">{formData.toneOfVoice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-SageGray">Effects:</span>
                  <span className="text-primary">{formData.effects?.join(', ') || 'None'}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t border-SageGray/30 pt-2 mt-2">
                  <span className="text-primary">Total:</span>
                  <span className="text-gold">${selectedPackage?.price}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                  required
                  className="mt-1 mr-3"
                />
                <span className="text-sm text-primary">
                  By clicking the box below, you agree that you are the owner or authorized purchaser 
                  for the PayPal account or credit/debit card that you are using to make a purchase on 
                  this site and that you have read and agreed to our Terms of Service. *
                  <a href="/terms-of-service" target="_blank" className="text-gold hover:underline ml-1">
                    Click Here To Read: Terms of Service
                  </a>
                </span>
              </label>
            </div>

            <button
              onClick={handleNext}
              className="w-full bg-gold text-DarkLava font-amiamie-round font-bold py-3 rounded-lg
                       hover:bg-gold/90 transition-colors"
            >
              Proceed to Payment →
            </button>
          </div>
        )}

        {/* Step 4: Payment */}
        {step === 4 && selectedPackage && (
          <div>
            <button
              onClick={handleBack}
              className="text-gold hover:underline mb-6 text-sm"
            >
              ← Back
            </button>
            <h2 className="font-amiamie-round text-3xl font-black text-primary mb-6">
              Payment
            </h2>
            <PaymentCheckout
              amount={selectedPackage.price}
              serviceType="voice-tag"
              packageType={formData.packageType}
              orderData={formData}
              onCreateOrder={createOrderBeforeCheckout}
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
              Your voice tag order has been received and payment processed.
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

export default VoiceTagOrderForm;


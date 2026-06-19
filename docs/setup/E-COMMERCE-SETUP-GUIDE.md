# E-Commerce & Order System Setup Guide
**Complete guide for integrating payments, authentication, and Google Drive uploads**

---

## 🎯 What We're Building

1. **User Authentication** (Login/Signup)
2. **Order System** with Stripe payments
3. **Google Drive File Upload** for order requirements
4. **User Dashboard** to view orders
5. **Protected Routes** for authenticated users

---

## 📦 Tech Stack

### Frontend (Already Set Up)
- React 19 + Vite ✅
- Tailwind CSS ✅
- React Router DOM ✅
- Stripe JS (`@stripe/stripe-js`) ✅

### Backend (New - To Set Up)
- **Supabase** (Recommended)
  - Authentication (email/password, OAuth)
  - PostgreSQL Database (orders, users)
  - Storage (file uploads backup)
  - Real-time subscriptions

### Payment Processing
- **Stripe** (Already in dependencies)
  - Payment processing
  - Checkout sessions
  - Webhooks for order status

### File Upload
- **Google Drive API** (For client file uploads)
  - Alternative: Supabase Storage (simpler, integrated)

---

## 🚀 Implementation Steps

### Phase 1: Supabase Setup (30 minutes)

1. **Create Supabase Account**
   - Go to https://supabase.com
   - Create free account (generous free tier)
   - Create new project: `captainsolo-orders`

2. **Get API Keys**
   - Project Settings → API
   - Copy:
     - `Project URL`
     - `anon public` key
     - `service_role` key (keep secret!)

3. **Set Environment Variables**
   ```env
   VITE_SUPABASE_URL=your-project-url
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Install Supabase Client**
   ```bash
   npm install @supabase/supabase-js
   ```

### Phase 2: Database Schema

Create tables in Supabase SQL Editor:

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id),
  service_type TEXT NOT NULL, -- 'voice-tag', 'web-development', 'videography'
  package_type TEXT NOT NULL, -- 'basic', 'standard', 'premium'
  price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'in-progress', 'completed', 'cancelled'
  stripe_payment_intent_id TEXT,
  stripe_checkout_session_id TEXT,
  requirements TEXT, -- JSON: file URLs, special instructions
  google_drive_folder_id TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Order files table (track uploaded files)
CREATE TABLE public.order_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  uploaded_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_files ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Users can only see their own orders
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);
```

### Phase 3: Authentication Components

Create:
- `src/components/auth/Login.jsx`
- `src/components/auth/Signup.jsx`
- `src/components/auth/AuthGuard.jsx`
- `src/context/AuthContext.jsx`

### Phase 4: Order System

Create:
- `src/components/orders/OrderForm.jsx` (Service selection, file upload, payment)
- `src/components/orders/FileUpload.jsx` (Google Drive integration)
- `src/components/orders/PaymentCheckout.jsx` (Stripe checkout)
- `src/pages/Dashboard.jsx` (User dashboard)

### Phase 5: Google Drive Integration

**Option A: Google Drive API (Recommended for client file uploads)**
- Set up Google Cloud Project
- Enable Google Drive API
- Create OAuth credentials
- Use `googleapis` library

**Option B: Supabase Storage (Simpler, integrated)**
- Use Supabase Storage buckets
- Direct file upload from frontend
- Automatic URL generation

---

## 🔐 Environment Variables

Create `.env.local` (add to `.gitignore`):

```env
# Supabase
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key

# Stripe
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Google Drive (if using)
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GOOGLE_API_KEY=your-google-api-key
```

---

## 💳 Stripe Setup

1. **Create Stripe Account**
   - Go to https://stripe.com
   - Get API keys (test mode first)

2. **Install Stripe**
   - Already installed: `@stripe/stripe-js`
   - Need backend: `stripe` (Node.js) for webhooks

3. **Stripe Webhook Endpoint**
   - Create Netlify function for webhooks
   - Or use Supabase Edge Functions

---

## 📁 Google Drive Setup (Optional)

### Option A: Direct Client Upload to Your Drive

1. **Google Cloud Console**
   - Create project
   - Enable Google Drive API
   - Create OAuth 2.0 credentials
   - Set redirect URI

2. **Implementation**
   - Use Google Picker API (easier)
   - Or Drive API with OAuth flow

### Option B: Supabase Storage (Recommended)

Simpler alternative:
- Client uploads to Supabase Storage
- You receive notification
- Files automatically organized by order ID

---

## 🎨 UI/UX Flow

### 1. User Journey
```
Home → Services → Select Service → Login/Signup → Order Form → 
Upload Files → Payment → Confirmation → Dashboard
```

### 2. Order Form Steps
1. **Service Selection** (Voice Tag, Web Dev, Videography)
2. **Package Selection** (Basic, Standard, Premium)
3. **Requirements** (Text input, file upload)
4. **Review & Payment** (Stripe checkout)
5. **Confirmation** (Order created, payment processing)

### 3. Dashboard Features
- View all orders
- Order status tracking
- Download deliverables
- Upload additional files
- Contact support

---

## 🚦 Implementation Priority

### Week 1: Foundation
- [x] Set up Supabase project
- [ ] Create database schema
- [ ] Set up authentication (login/signup)
- [ ] Create protected routes

### Week 2: Order System
- [ ] Create order form component
- [ ] Integrate Stripe payment
- [ ] Set up file upload (Supabase Storage)
- [ ] Create order confirmation

### Week 3: Dashboard & Polish
- [ ] Create user dashboard
- [ ] Order status tracking
- [ ] Email notifications
- [ ] Admin panel (view all orders)

---

## 📊 Database Schema Diagram

```
users (Supabase Auth)
  └── profiles (extends user data)
      └── orders
          ├── order_files (uploaded files)
          └── stripe_payment_intent
```

---

## 🔒 Security Considerations

1. **Row Level Security (RLS)** - Users can only see their own data
2. **Stripe Webhooks** - Verify payments server-side
3. **File Upload Limits** - Max file size, type validation
4. **Environment Variables** - Never commit secrets
5. **HTTPS Only** - All API calls over HTTPS

---

## 💰 Pricing Structure

### Voice Tags
- Basic: $10 (1 dry tag)
- Standard: $20 (2 tags: wet + dry)
- Premium: $35 (3 tags + FX variations)

### Web Development
- Basic: $500-1,500 (Landing page)
- Standard: $1,500-3,000 (Multi-page)
- Premium: $3,000+ (Full-stack app)

### Videography
- Basic: $500-1,000 (Event coverage)
- Standard: $1,000-2,500 (Commercial)
- Premium: $2,500+ (Full production)

---

## 🧪 Testing

### Test Mode
1. Use Stripe test keys
2. Test payment flows
3. Test file uploads
4. Test authentication

### Production
1. Switch to live Stripe keys
2. Set up production webhooks
3. Test with real payments (small amount)
4. Monitor error logs

---

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Google Drive API](https://developers.google.com/drive)
- [React Router Protected Routes](https://reactrouter.com/en/main/start/overview)

---

## 🎯 Next Steps

1. **Set up Supabase** (30 min)
2. **Create authentication** (2 hours)
3. **Build order form** (4 hours)
4. **Integrate Stripe** (3 hours)
5. **Add file upload** (2 hours)
6. **Create dashboard** (3 hours)

**Total Time Estimate: 14-16 hours**

---

Let's start building! 🚀


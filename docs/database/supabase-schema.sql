-- Supabase Database Schema for Order System
-- Run this in Supabase SQL Editor: https://supabase.com/dashboard/project/oqzenbmylfyezibinxda/sql

-- ============================================
-- 1. Profiles Table (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  phone TEXT,
  notifications BOOLEAN DEFAULT true,
  email_updates BOOLEAN DEFAULT true,
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_online BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. Orders Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  service_type TEXT NOT NULL,
  package_type TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'in-progress', 'completed', 'cancelled')),
  stripe_payment_intent_id TEXT,
  stripe_checkout_session_id TEXT,
  requirements JSONB,
  google_drive_folder_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 3. Order Files Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.order_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 4. Blog Posts Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  content TEXT NOT NULL,
  read_time TEXT DEFAULT '5 min',
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 5. Enable Row Level Security (RLS)
-- ============================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 6. Helper Functions (must be created before policies)
-- ============================================
-- Function to check if user is admin (checks auth.users.email directly)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email IN ('solomonolufelo@outlook.com')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 7. RLS Policies - Profiles
-- ============================================
-- Drop existing policies if they exist (makes script idempotent)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

-- Users can view their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Users can insert their own profile (handled by trigger)
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- ============================================
-- 8. RLS Policies - Orders
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can create own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can update own orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can update all orders" ON public.orders;

-- Users can view their own orders
CREATE POLICY "Users can view own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

-- Users can create their own orders
CREATE POLICY "Users can create own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own orders (for status changes, etc.)
CREATE POLICY "Users can update own orders" ON public.orders
  FOR UPDATE USING (auth.uid() = user_id);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders" ON public.orders
  FOR SELECT USING (public.is_admin());

-- Admins can update all orders
CREATE POLICY "Admins can update all orders" ON public.orders
  FOR UPDATE USING (public.is_admin());

-- ============================================
-- 9. RLS Policies - Order Files
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own order files" ON public.order_files;
DROP POLICY IF EXISTS "Users can create own order files" ON public.order_files;

-- Users can view files for their own orders
CREATE POLICY "Users can view own order files" ON public.order_files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_files.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Users can create files for their own orders
CREATE POLICY "Users can create own order files" ON public.order_files
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_files.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- ============================================
-- 10. RLS Policies - Blog Posts
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view published posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can view all posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can create posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can update own posts" ON public.blog_posts;
DROP POLICY IF EXISTS "Admins can delete own posts" ON public.blog_posts;

-- Anyone can view published blog posts
CREATE POLICY "Anyone can view published posts" ON public.blog_posts
  FOR SELECT USING (published = true);

-- Admins can view all posts
CREATE POLICY "Admins can view all posts" ON public.blog_posts
  FOR SELECT USING (public.is_admin());

-- Admins can create blog posts
CREATE POLICY "Admins can create posts" ON public.blog_posts
  FOR INSERT WITH CHECK (public.is_admin() AND user_id = auth.uid());

-- Admins can update their own posts
CREATE POLICY "Admins can update own posts" ON public.blog_posts
  FOR UPDATE USING (public.is_admin() AND user_id = auth.uid());

-- Admins can delete their own posts
CREATE POLICY "Admins can delete own posts" ON public.blog_posts
  FOR DELETE USING (public.is_admin() AND user_id = auth.uid());

-- ============================================
-- 11. Function to automatically create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 12. Trigger to create profile on user signup
-- ============================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- 13. Function to update updated_at timestamp
-- ============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 14. Triggers for updated_at
-- ============================================
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON public.orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 15. Create Storage Bucket for Order Files
-- ============================================
-- Note: You need to create this bucket in Supabase Dashboard → Storage
-- Or run this in SQL (if you have the right permissions):
-- INSERT INTO storage.buckets (id, name, public) 
-- VALUES ('order-files', 'order-files', false);

-- ============================================
-- 16. Direct Messages Table (General messaging, not tied to orders)
-- ============================================
CREATE TABLE IF NOT EXISTS public.direct_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  admin_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL, -- Admin who responds
  subject TEXT,
  message TEXT NOT NULL,
  file_url TEXT, -- Optional file attachment
  file_name TEXT,
  read BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed', 'archived')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 17. Order Messages Table (Live Chat)
-- ============================================
CREATE TABLE IF NOT EXISTS public.order_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  file_url TEXT, -- Optional file attachment
  file_name TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 18. Order Revisions Table
-- ============================================
CREATE TABLE IF NOT EXISTS public.order_revisions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  revision_number INTEGER NOT NULL,
  request_description TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in-progress', 'completed', 'rejected')),
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(order_id, revision_number)
);

-- ============================================
-- 19. Enable RLS for Messages and Revisions
-- ============================================
ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_revisions ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 20. RLS Policies - Direct Messages
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own direct messages" ON public.direct_messages;
DROP POLICY IF EXISTS "Admins can view all direct messages" ON public.direct_messages;
DROP POLICY IF EXISTS "Users can create direct messages" ON public.direct_messages;
DROP POLICY IF EXISTS "Admins can create direct messages for any user" ON public.direct_messages;
DROP POLICY IF EXISTS "Users can update own direct messages" ON public.direct_messages;
DROP POLICY IF EXISTS "Admins can update any direct message" ON public.direct_messages;

-- Users can view their own direct messages
CREATE POLICY "Users can view own direct messages" ON public.direct_messages
  FOR SELECT USING (user_id = auth.uid());

-- Admins can view all direct messages
CREATE POLICY "Admins can view all direct messages" ON public.direct_messages
  FOR SELECT USING (public.is_admin());

-- Users can create direct messages
CREATE POLICY "Users can create direct messages" ON public.direct_messages
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Admins can create messages for any user
CREATE POLICY "Admins can create direct messages for any user" ON public.direct_messages
  FOR INSERT WITH CHECK (public.is_admin());

-- Users can update their own messages
CREATE POLICY "Users can update own direct messages" ON public.direct_messages
  FOR UPDATE USING (user_id = auth.uid());

-- Admins can update any direct message
CREATE POLICY "Admins can update any direct message" ON public.direct_messages
  FOR UPDATE USING (public.is_admin());

-- ============================================
-- 21. RLS Policies - Order Messages
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view messages for own orders" ON public.order_messages;
DROP POLICY IF EXISTS "Admins can view all messages" ON public.order_messages;
DROP POLICY IF EXISTS "Users can create messages for own orders" ON public.order_messages;
DROP POLICY IF EXISTS "Admins can create messages for any order" ON public.order_messages;
DROP POLICY IF EXISTS "Users can update own messages" ON public.order_messages;
DROP POLICY IF EXISTS "Admins can update any message" ON public.order_messages;

-- Users can view messages for their own orders
CREATE POLICY "Users can view messages for own orders" ON public.order_messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_messages.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Admins can view messages for all orders
CREATE POLICY "Admins can view all messages" ON public.order_messages
  FOR SELECT USING (public.is_admin());

-- Users can create messages for their own orders
CREATE POLICY "Users can create messages for own orders" ON public.order_messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_messages.order_id
      AND orders.user_id = auth.uid()
    )
    AND user_id = auth.uid()
  );

-- Admins can create messages for any order
CREATE POLICY "Admins can create messages for any order" ON public.order_messages
  FOR INSERT WITH CHECK (public.is_admin());

-- Users can update read status of their own messages
CREATE POLICY "Users can update own messages" ON public.order_messages
  FOR UPDATE USING (user_id = auth.uid());

-- Admins can update any message
CREATE POLICY "Admins can update any message" ON public.order_messages
  FOR UPDATE USING (public.is_admin());

-- ============================================
-- 22. RLS Policies - Order Revisions
-- ============================================
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view revisions for own orders" ON public.order_revisions;
DROP POLICY IF EXISTS "Admins can view all revisions" ON public.order_revisions;
DROP POLICY IF EXISTS "Users can create revisions for own orders" ON public.order_revisions;
DROP POLICY IF EXISTS "Admins can update revisions" ON public.order_revisions;

-- Users can view revisions for their own orders
CREATE POLICY "Users can view revisions for own orders" ON public.order_revisions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_revisions.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Admins can view all revisions
CREATE POLICY "Admins can view all revisions" ON public.order_revisions
  FOR SELECT USING (public.is_admin());

-- Users can create revisions for their own orders
CREATE POLICY "Users can create revisions for own orders" ON public.order_revisions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.orders
      WHERE orders.id = order_revisions.order_id
      AND orders.user_id = auth.uid()
    )
    AND user_id = auth.uid()
  );

-- Admins can update revisions
CREATE POLICY "Admins can update revisions" ON public.order_revisions
  FOR UPDATE USING (public.is_admin());

-- ============================================
-- 23. Function to get next revision number
-- ============================================
CREATE OR REPLACE FUNCTION public.get_next_revision_number(p_order_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN COALESCE(
    (SELECT MAX(revision_number) FROM public.order_revisions WHERE order_id = p_order_id),
    0
  ) + 1;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 24. Trigger for revision updated_at
-- ============================================
DROP TRIGGER IF EXISTS update_order_revisions_updated_at ON public.order_revisions;
CREATE TRIGGER update_order_revisions_updated_at
  BEFORE UPDATE ON public.order_revisions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 25. Trigger for direct messages updated_at
-- ============================================
DROP TRIGGER IF EXISTS update_direct_messages_updated_at ON public.direct_messages;
CREATE TRIGGER update_direct_messages_updated_at
  BEFORE UPDATE ON public.direct_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 27. Function to update user online status
-- ============================================
CREATE OR REPLACE FUNCTION public.update_user_online_status()
RETURNS TRIGGER AS $$
BEGIN
  -- Update last_seen and set is_online to true when user is active
  UPDATE public.profiles
  SET 
    last_seen = NOW(),
    is_online = true,
    updated_at = NOW()
  WHERE id = auth.uid();
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 28. Function to mark user as offline (call periodically)
-- ============================================
CREATE OR REPLACE FUNCTION public.mark_users_offline()
RETURNS void AS $$
BEGIN
  -- Mark users as offline if they haven't been seen in the last 5 minutes
  UPDATE public.profiles
  SET is_online = false
  WHERE last_seen < NOW() - INTERVAL '5 minutes';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 29. Function to send email notification (placeholder for email service)
-- ============================================
CREATE OR REPLACE FUNCTION public.notify_user_of_message(
  p_order_id UUID,
  p_message_id UUID,
  p_recipient_email TEXT,
  p_sender_name TEXT,
  p_message_preview TEXT
)
RETURNS void AS $$
BEGIN
  -- This function will be called by a database trigger or application code
  -- You can integrate with Resend, SendGrid, or Supabase Edge Functions
  -- For now, this is a placeholder that logs the notification
  RAISE NOTICE 'Email notification: Order %, Message %, To: %, From: %, Preview: %',
    p_order_id, p_message_id, p_recipient_email, p_sender_name, p_message_preview;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- 26. Enable Realtime for Messages
-- ============================================
-- Note: Enable this in Supabase Dashboard → Database → Replication
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.order_messages;
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.direct_messages;

-- ============================================
-- 16. Storage Policies (for order-files bucket)
-- ============================================
-- Users can upload files to their own folder
-- Note: Run these after creating the bucket in Storage dashboard

-- Policy: Users can upload files to their own folder
-- CREATE POLICY "Users can upload own files"
-- ON storage.objects FOR INSERT
-- TO authenticated
-- WITH CHECK (bucket_id = 'order-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Policy: Users can view their own files
-- CREATE POLICY "Users can view own files"
-- ON storage.objects FOR SELECT
-- TO authenticated
-- USING (bucket_id = 'order-files' AND (storage.foldername(name))[1] = auth.uid()::text);

-- ============================================
-- Done! ✅
-- ============================================
-- Next steps:
-- 1. Go to Storage → Create bucket named "order-files" (private)
-- 2. Set up storage policies (see comments above)
-- 3. Enable Realtime for order_messages table in Supabase Dashboard
-- 4. Test the authentication flow
-- 5. Test order creation
-- 6. Test chat and revision system


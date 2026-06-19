-- Initialize Admin Profile
-- Run this SQL in Supabase SQL Editor to ensure your admin profile exists
-- Replace 'solomonolufelo@outlook.com' with your admin email

-- Step 1: Create profile for admin user if it doesn't exist
INSERT INTO public.profiles (id, email, full_name)
SELECT 
  id,
  email,
  COALESCE(raw_user_meta_data->>'full_name', '')
FROM auth.users
WHERE email = 'solomonolufelo@outlook.com'
ON CONFLICT (id) DO UPDATE
SET 
  email = EXCLUDED.email,
  updated_at = NOW();

-- Step 2: Verify the profile was created
SELECT id, email, full_name, created_at
FROM public.profiles
WHERE email = 'solomonolufelo@outlook.com';

-- Step 3: Test the is_admin() function
-- This should return 'true' for your admin account
SELECT public.is_admin() as is_admin;

-- If the function returns false, verify:
-- 1. Your email matches the email in the is_admin() function (supabase-schema.sql line 80)
-- 2. You're logged in as the correct user
-- 3. The function was created correctly

-- To update the admin email in the is_admin() function, run:
-- CREATE OR REPLACE FUNCTION public.is_admin()
-- RETURNS BOOLEAN AS $$
-- BEGIN
--   RETURN EXISTS (
--     SELECT 1 FROM auth.users
--     WHERE id = auth.uid()
--     AND email IN ('your-new-admin-email@example.com')
--   );
-- END;
-- $$ LANGUAGE plpgsql SECURITY DEFINER;


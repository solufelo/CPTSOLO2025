# Supabase Setup Instructions

## ✅ Step 1: Environment Variables (DONE)

Your `.env.local` file has been created with your Supabase credentials:
- ✅ URL: `https://oqzenbmylfyezibinxda.supabase.co`
- ✅ Anon Key: Configured

## 📋 Step 2: Run Database Schema

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/oqzenbmylfyezibinxda
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy and paste the contents of `supabase-schema.sql`
5. Click **Run** (or press `Ctrl+Enter`)

This will create:
- ✅ `profiles` table
- ✅ `orders` table
- ✅ `order_files` table
- ✅ Row Level Security (RLS) policies
- ✅ Triggers for automatic profile creation
- ✅ Updated_at timestamp triggers

## 🗄️ Step 3: Create Storage Bucket

1. Go to **Storage** in the left sidebar
2. Click **New bucket**
3. Name: `order-files`
4. **Make it PRIVATE** (uncheck "Public bucket")
5. Click **Create bucket**

## 🔒 Step 4: Set Up Storage Policies

1. Click on the `order-files` bucket
2. Go to **Policies** tab
3. Click **New Policy**
4. Use the template: **"Allow authenticated users to upload their own files"**

Or create these policies manually:

### Policy 1: Upload Files
```sql
CREATE POLICY "Users can upload own files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'order-files' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

### Policy 2: View Files
```sql
CREATE POLICY "Users can view own files"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'order-files' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

### Policy 3: Delete Files
```sql
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'order-files' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);
```

## 🧪 Step 5: Test the Setup

1. **Restart your dev server** (if running):
   ```bash
   npm run dev
   ```

2. **Test Authentication**:
   - Go to `/login`
   - Try creating an account
   - Check Supabase Dashboard → Authentication → Users (should see new user)
   - Check Table Editor → `profiles` (should see new profile)

3. **Test Order Creation**:
   - Go to `/order/voice-tag`
   - Fill out the form
   - Submit order
   - Check Table Editor → `orders` (should see new order)

## ✅ Verification Checklist

- [ ] Database schema ran successfully
- [ ] `profiles` table exists
- [ ] `orders` table exists
- [ ] `order_files` table exists
- [ ] Storage bucket `order-files` created
- [ ] Storage policies set up
- [ ] Can create account (test signup)
- [ ] Profile automatically created on signup
- [ ] Can create order
- [ ] Can upload files

## 🚨 Troubleshooting

### Error: "relation does not exist"
- Make sure you ran the SQL schema in the correct project
- Check that tables were created in Table Editor

### Error: "permission denied"
- Check RLS policies are enabled
- Verify policies allow the operations you're trying

### Files not uploading
- Check storage bucket exists and is named `order-files`
- Verify storage policies are set up
- Check browser console for errors

### Profile not created on signup
- Check trigger `on_auth_user_created` exists
- Verify function `handle_new_user()` exists
- Check Supabase logs for errors

## 📚 Next Steps

1. ✅ Set up Stripe (see `STRIPE-SETUP-GUIDE.md`)
2. ✅ Test complete order flow
3. ✅ Deploy to Netlify
4. ✅ Add environment variables in Netlify dashboard

## 🔗 Useful Links

- Supabase Dashboard: https://supabase.com/dashboard/project/oqzenbmylfyezibinxda
- SQL Editor: https://supabase.com/dashboard/project/oqzenbmylfyezibinxda/sql
- Storage: https://supabase.com/dashboard/project/oqzenbmylfyezibinxda/storage
- Table Editor: https://supabase.com/dashboard/project/oqzenbmylfyezibinxda/editor

---

**Your Supabase is now configured!** 🎉

You can now test the authentication and order system locally.


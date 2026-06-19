# 🔧 Fix Database Setup - Orders Table Error

## ❌ Error: "Could not find the table 'public.orders' in the schema cache"

This error means the `orders` table doesn't exist in your Supabase database yet.

---

## ✅ Quick Fix (5 minutes)

### Step 1: Open Supabase Dashboard
1. Go to: https://supabase.com/dashboard
2. Select your project: `oqzenbmylfyezibinxda`
3. Click **"SQL Editor"** in the left sidebar

### Step 2: Run the Schema SQL
1. Open the file: `supabase-schema.sql` in your project
2. Copy **ALL** the SQL code
3. Paste it into the Supabase SQL Editor
4. Click **"Run"** or press `Ctrl+Enter`

### Step 3: Verify Tables Created
1. Go to **"Table Editor"** in the left sidebar
2. You should see these tables:
   - ✅ `profiles`
   - ✅ `orders`
   - ✅ `order_files`

### Step 4: Create Storage Bucket
1. Go to **"Storage"** in the left sidebar
2. Click **"New bucket"**
3. Bucket name: `order-files`
4. Set to **Public** (or configure RLS policies)
5. Click **"Create bucket"**

---

## 📋 What the Schema Creates

### 1. **profiles** table
- Extends Supabase auth.users
- Stores user profile information
- Auto-created when user signs up

### 2. **orders** table
- Stores all customer orders
- Links to user via `user_id`
- Stores order details in `requirements` (JSON)
- Tracks payment status

### 3. **order_files** table
- Stores file uploads for orders
- Links to orders via `order_id`

### 4. **RLS Policies**
- Users can only see their own orders
- Users can only create orders for themselves
- Secure access control

### 5. **Triggers**
- Auto-creates profile on signup
- Auto-updates `updated_at` timestamps

---

## 🧪 Test After Setup

1. **Refresh your dashboard:**
   - Go to: `/dashboard`
   - Error should be gone

2. **Create a test order:**
   - Go to: `/order/voice-tag`
   - Fill out form
   - Complete payment
   - Check dashboard - order should appear

3. **Verify in Supabase:**
   - Go to: Table Editor → `orders`
   - Your order should be there

---

## 🐛 If Still Getting Errors

### Error: "permission denied for table orders"
**Fix:** Check RLS policies are enabled and correct

### Error: "relation does not exist"
**Fix:** Make sure you ran the SQL in the correct database

### Error: "storage bucket not found"
**Fix:** Create the `order-files` bucket in Storage

---

## 📝 Quick SQL Check

Run this in SQL Editor to check if tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('profiles', 'orders', 'order_files');
```

You should see all 3 tables listed.

---

## ✅ Success Checklist

- [ ] SQL schema executed successfully
- [ ] `profiles` table exists
- [ ] `orders` table exists
- [ ] `order_files` table exists
- [ ] RLS policies enabled
- [ ] Storage bucket `order-files` created
- [ ] Dashboard loads without errors
- [ ] Can create test order

---

**Once the schema is run, your dashboard will work!** ✅


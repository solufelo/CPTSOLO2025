# Admin Setup Guide

This guide explains how to set up admin access for the CaptainSolo website.

## Admin Access

Admin access is currently granted to users with the email:
- `solomonolufelo@outlook.com`
- Any email containing `admin` (for testing)

## Setting Up Admin on Site Launch

### Option 1: Automatic Setup (Recommended)

The admin email is hardcoded in the following files:
- `src/pages/Dashboard.jsx` (line 22)
- `src/pages/admin/AdminDashboard.jsx` (line 14)
- `src/pages/admin/AdminBlogEditor.jsx` (line 31)
- `src/pages/admin/AdminOrdersPage.jsx` (line 15)
- `supabase-schema.sql` (line 80 - in `is_admin()` function)

To change the admin email, update all occurrences of:
```javascript
const isAdmin = user?.email === 'solomonolufelo@outlook.com' || user?.email?.includes('admin');
```

To:
```javascript
const isAdmin = user?.email === 'your-admin-email@example.com' || user?.email?.includes('admin');
```

And in `supabase-schema.sql`, update:
```sql
AND email IN ('solomonolufelo@outlook.com')
```

To:
```sql
AND email IN ('your-admin-email@example.com')
```

### Option 2: Database-Based Admin (Future Enhancement)

For a more scalable solution, you could:
1. Add an `is_admin` boolean column to the `profiles` table
2. Update the `is_admin()` function to check this column
3. Create an admin interface to manage admin users

## Initial Admin Setup Steps

1. **Create your admin account:**
   - Sign up at `/signup` with your admin email
   - Verify your email address

2. **Ensure profile exists:**
   - The system should automatically create a profile when you sign up
   - If you get a foreign key error, run this SQL in Supabase:
     ```sql
     INSERT INTO public.profiles (id, email, full_name)
     SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', '')
     FROM auth.users
     WHERE email = 'solomonolufelo@outlook.com'
     ON CONFLICT (id) DO NOTHING;
     ```

3. **Verify admin access:**
   - Log in with your admin email
   - You should be automatically redirected to `/dashboard/admin`
   - You should see the Admin Dashboard with admin tools

## Admin Features

### Blog Management (`/dashboard/admin/blog`)
- Create, edit, and delete blog posts
- Manage published/draft status
- View all blog posts

### Order Management (`/dashboard/admin/orders`)
- View all customer orders
- Filter orders by status
- Update order status
- View customer details

### User Dashboard Access
- Admins can switch to user dashboard at `/dashboard` to see their own orders
- Regular users cannot access admin dashboard

## Troubleshooting

### "Foreign key constraint violation" when creating blog post
- **Solution:** The profile might not exist. Run the SQL query in step 2 above, or the system will automatically create it when you try to save a blog post.

### "Admin dashboard not showing"
- **Solution:** 
  1. Verify your email matches the admin email in the code
  2. Clear browser cache and cookies
  3. Log out and log back in
  4. Check browser console for errors

### "403 Forbidden" when accessing admin features
- **Solution:**
  1. Make sure you've run the updated `supabase-schema.sql` with the `is_admin()` function
  2. Verify your email in the database matches the admin email
  3. Check RLS policies are correctly set up

## Security Notes

- Admin access is currently based on email matching
- For production, consider implementing:
  - Role-based access control (RBAC)
  - Admin approval workflow
  - Activity logging
  - Two-factor authentication (2FA)
  - IP whitelisting for admin access

## Adding More Admins

To add more admin users, update the `is_admin()` function in `supabase-schema.sql`:

```sql
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM auth.users
    WHERE id = auth.uid()
    AND email IN (
      'admin1@example.com',
      'admin2@example.com',
      'solomonolufelo@outlook.com'
    )
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

Then update the frontend code to match.

## Production Checklist

Before launching to production:

- [ ] Update admin email in all files
- [ ] Remove test admin emails (emails containing "admin")
- [ ] Set up proper error logging
- [ ] Configure backup admin accounts
- [ ] Document admin procedures
- [ ] Set up monitoring/alerts for admin actions
- [ ] Review and test all admin features
- [ ] Set up database backups


# Admin & User Management System

Complete guide for the admin dashboard, user management, analytics, and settings system.

## Features Implemented

### Admin Features

1. **Admin Analytics Dashboard** (`/dashboard/admin/analytics`)
   - Total revenue tracking
   - Total orders count
   - Pending orders
   - Completed orders
   - Total users
   - Total messages
   - Total revisions
   - Completion rate
   - Recent orders list

2. **User Management** (`/dashboard/admin/users`)
   - View all registered users
   - User search functionality
   - User order counts
   - Total spent per user
   - Online/offline status
   - User registration dates
   - Quick access to user orders

3. **Admin Settings** (`/dashboard/admin/settings`)
   - Email notification preferences
   - Order default status
   - Auto-complete settings
   - Business information
   - Timezone settings

4. **Blog Management** (`/dashboard/admin/blog`)
   - Create blog posts
   - Edit blog posts
   - Delete blog posts
   - Publish/unpublish posts
   - Blog posts now appear in blog index

5. **Order Management** (`/dashboard/admin/orders`)
   - View all orders
   - Update order status
   - Access order chat and revisions

### User Features

1. **User Settings** (`/settings`)
   - Update profile information
   - Change notification preferences
   - Update email preferences
   - Delete account option

2. **User Dashboard** (`/dashboard`)
   - View own orders
   - Access order chat
   - Request revisions
   - Quick order actions
   - Settings link

## Database Schema Updates

### Profiles Table
Added new fields:
- `phone` - User phone number
- `notifications` - Push notification preference
- `email_updates` - Email update preference
- `last_seen` - Last activity timestamp
- `is_online` - Online status

## Setup Instructions

### 1. Update Database Schema

Run the updated `supabase-schema.sql` to add:
- Phone field to profiles
- Notification preferences
- Online status fields

### 2. Access Admin Features

1. **Login as Admin:**
   - Use admin email: `solomonolufelo@outlook.com`
   - Or any email containing `admin`

2. **Navigate to Admin Dashboard:**
   - Go to `/dashboard/admin`
   - Or click "admin dashboard" in navbar

3. **Access Admin Tools:**
   - Analytics: View business metrics
   - User Management: Manage all users
   - Settings: Configure admin preferences
   - Blog Management: Create/edit posts
   - Order Management: Manage orders

### 3. User Settings

1. **Access Settings:**
   - Go to `/settings`
   - Or click "Settings" in dashboard

2. **Update Profile:**
   - Change full name
   - Update phone number
   - Manage notification preferences

## Blog Post System

### How It Works

1. **Creating Blog Posts:**
   - Go to Admin Dashboard → Blog Management
   - Fill in title, slug, description, category, content
   - Mark as "Published" to make it visible
   - Save post

2. **Displaying Blog Posts:**
   - Blog index fetches from database on load
   - Only published posts are shown
   - Database posts appear alongside static posts
   - Database posts take precedence if slug matches

3. **Viewing Blog Posts:**
   - Click on any blog post card
   - Dynamic route handles both static and database posts
   - Database posts render HTML content
   - Static posts render their component

### Categories

Available categories:
- Music Production
- Local Business (Brampton/GTA)
- Web Development
- Videography
- Productivity

## Routes

### Admin Routes
- `/dashboard/admin` - Admin dashboard
- `/dashboard/admin/analytics` - Analytics dashboard
- `/dashboard/admin/users` - User management
- `/dashboard/admin/settings` - Admin settings
- `/dashboard/admin/blog` - Blog management
- `/dashboard/admin/orders` - Order management

### User Routes
- `/dashboard` - User dashboard
- `/settings` - User settings
- `/order/:orderId` - Order detail page

### Blog Routes
- `/blog` - Blog index (shows all published posts)
- `/blog/:slug` - Dynamic blog post page

## Security

### Admin Access
- Only users with admin email can access admin features
- Admin check: `user.email === 'solomonolufelo@outlook.com' || user.email?.includes('admin')`
- All admin routes are protected with `AuthGuard`

### User Access
- Users can only see their own orders
- Users can only update their own profile
- RLS policies enforce data access

## Analytics Metrics

### Revenue Tracking
- Total revenue from all orders
- Revenue per user
- Revenue by service type

### Order Metrics
- Total orders
- Pending orders
- Completed orders
- Completion rate

### User Metrics
- Total registered users
- Users with orders
- Online users
- User activity

### Communication Metrics
- Total messages
- Total revision requests
- Average messages per order

## Future Enhancements

- [ ] Advanced analytics with charts
- [ ] Export data to CSV
- [ ] User role management
- [ ] Bulk user actions
- [ ] Email templates
- [ ] Automated reports
- [ ] Activity logs
- [ ] Audit trail


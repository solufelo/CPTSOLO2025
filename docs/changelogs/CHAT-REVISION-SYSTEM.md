# Chat & Revision System Guide

This document explains the live chat and revision request system for order communication.

## Features

### 💬 Live Chat
- **Real-time messaging** between customers and admins
- **Instant updates** via Supabase Realtime
- **Message history** with timestamps
- **Admin/Customer distinction** with visual indicators
- **File attachments** support (ready for implementation)

### 🔄 Revision Requests
- **Request revisions** on any order
- **Track revision status** (pending, in-progress, completed, rejected)
- **Admin notes** for each revision
- **Automatic numbering** of revisions
- **Status updates** with visual indicators

## Database Schema

### Tables Created

1. **`order_messages`** - Stores chat messages
   - `id` - Message ID
   - `order_id` - Reference to order
   - `user_id` - Message sender
   - `message` - Message content
   - `file_url` - Optional file attachment
   - `file_name` - Attachment name
   - `read` - Read status
   - `created_at` - Timestamp

2. **`order_revisions`** - Stores revision requests
   - `id` - Revision ID
   - `order_id` - Reference to order
   - `user_id` - Request creator
   - `revision_number` - Sequential number
   - `request_description` - Revision details
   - `status` - pending/in-progress/completed/rejected
   - `admin_notes` - Admin comments
   - `created_at` / `updated_at` - Timestamps

### Functions Created

- **`get_next_revision_number(order_id)`** - Returns next revision number for an order

## Setup Instructions

### 1. Run Database Schema

Run the updated `supabase-schema.sql` in Supabase SQL Editor. This creates:
- `order_messages` table
- `order_revisions` table
- RLS policies for both tables
- Revision numbering function

### 2. Enable Realtime

1. Go to Supabase Dashboard → **Database** → **Replication**
2. Find `order_messages` table
3. Toggle **Enable Realtime**
4. Save changes

Or run this SQL:
```sql
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_messages;
```

### 3. Test the System

1. **Create an order** (as a customer)
2. **Go to order detail page** (`/order/{orderId}`)
3. **Send a message** in the chat
4. **Open the same order as admin** (in another browser/incognito)
5. **Messages should appear in real-time**
6. **Request a revision** as customer
7. **Update revision status** as admin

## Usage

### For Customers

1. **View Order Details:**
   - Go to Dashboard → Click "View Details & Chat" on any order
   - Or navigate to `/order/{orderId}`

2. **Chat with Admin:**
   - Type message in chat box
   - Click "Send"
   - Messages appear instantly

3. **Request Revision:**
   - Click "+ Request Revision" button
   - Describe what you'd like to change
   - Submit request
   - Track status (pending → in-progress → completed)

### For Admins

1. **View All Orders:**
   - Go to Admin Dashboard → Order Management
   - Click "💬 View Chat & Details" on any order

2. **Chat with Customer:**
   - Messages appear in real-time
   - Admin messages are highlighted
   - Customer can see admin responses instantly

3. **Manage Revisions:**
   - View all revision requests
   - Update status: Start Working, Mark Complete, Reject
   - Add admin notes to explain progress
   - Track revision history

## Components

### OrderChat Component
- **Location:** `src/components/orders/OrderChat.jsx`
- **Props:** `orderId`
- **Features:**
  - Real-time message updates
  - Message history
  - Send messages
  - Admin/customer distinction

### RevisionRequest Component
- **Location:** `src/components/orders/RevisionRequest.jsx`
- **Props:** `orderId`, `onRevisionCreated`
- **Features:**
  - Create revision requests
  - View revision history
  - Update revision status (admin)
  - Add admin notes

### OrderDetailPage Component
- **Location:** `src/pages/OrderDetailPage.jsx`
- **Route:** `/order/:orderId`
- **Features:**
  - Order information
  - Live chat
  - Revision requests
  - Order status tracking

## API Endpoints

### Messages
- **Create:** `POST /order_messages` (via Supabase client)
- **Read:** `GET /order_messages?order_id=eq.{orderId}`
- **Realtime:** Subscribed via Supabase Realtime

### Revisions
- **Create:** `POST /order_revisions` (via Supabase client)
- **Read:** `GET /order_revisions?order_id=eq.{orderId}`
- **Update:** `PATCH /order_revisions?id=eq.{revisionId}`

## Security

### Row Level Security (RLS)

**Messages:**
- Users can only view messages for their own orders
- Admins can view messages for all orders
- Users can only create messages for their own orders
- Admins can create messages for any order

**Revisions:**
- Users can only view revisions for their own orders
- Admins can view all revisions
- Users can only create revisions for their own orders
- Only admins can update revision status

## Troubleshooting

### Chat not updating in real-time
1. Check Realtime is enabled in Supabase Dashboard
2. Check browser console for WebSocket errors
3. Verify RLS policies are correct
4. Check network allows WebSocket connections

### Revisions not working
1. Verify `get_next_revision_number` function exists
2. Check RLS policies allow revision creation
3. Check console for permission errors

### Messages not loading
1. Verify user has access to the order
2. Check RLS policies
3. Verify order exists
4. Check Supabase logs

## Future Enhancements

- [ ] File uploads in chat
- [ ] Typing indicators
- [ ] Message read receipts
- [ ] Email notifications
- [ ] Push notifications
- [ ] Voice messages
- [ ] Screen sharing
- [ ] Version control for deliverables
- [ ] Revision comparison tool
- [ ] Automated revision reminders

## Testing Checklist

- [ ] Customer can send messages
- [ ] Admin can send messages
- [ ] Messages appear in real-time for both users
- [ ] Customer can request revisions
- [ ] Admin can update revision status
- [ ] Admin can add notes to revisions
- [ ] Revision history is displayed correctly
- [ ] RLS policies prevent unauthorized access
- [ ] Realtime works across different browsers
- [ ] Messages persist after page refresh


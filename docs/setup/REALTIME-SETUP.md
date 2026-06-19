# Realtime Chat Setup Guide

This guide explains how to enable real-time chat functionality for order communication.

## Supabase Realtime Setup

### Step 1: Enable Realtime for Messages Table

1. Go to your Supabase Dashboard
2. Navigate to **Database** → **Replication**
3. Find the `order_messages` table
4. Toggle **Enable Realtime** for `order_messages`
5. Save changes

### Step 2: Verify Realtime is Enabled

You can verify realtime is enabled by running this SQL in the SQL Editor:

```sql
-- Check if realtime is enabled
SELECT * FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime' 
AND tablename = 'order_messages';
```

If the table is not in the list, enable it manually:

```sql
-- Enable realtime for order_messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_messages;
```

## How It Works

### Real-time Message Updates

- When a user sends a message, it's inserted into the `order_messages` table
- Supabase Realtime automatically pushes the update to all subscribed clients
- The chat component receives the update and refreshes the message list
- Messages appear instantly for both users and admins

### Revision System

- Users can request revisions on their orders
- Each revision has a status: pending, in-progress, completed, or rejected
- Admins can update revision status and add notes
- Revision numbers are automatically incremented

## Features

### Live Chat
- ✅ Real-time message delivery
- ✅ Message history
- ✅ File attachments (optional)
- ✅ Read receipts (optional)
- ✅ Admin/customer distinction
- ✅ Timestamps

### Revision Requests
- ✅ Create revision requests
- ✅ Track revision status
- ✅ Admin notes on revisions
- ✅ Revision history
- ✅ Automatic numbering

## Testing

### Test Chat
1. Create an order
2. Go to order detail page
3. Send a message as the customer
4. Open the same order as admin (in another browser/incognito)
5. Messages should appear in real-time

### Test Revisions
1. Go to order detail page
2. Click "Request Revision"
3. Fill in revision request
4. Submit
5. Admin can see and update revision status

## Troubleshooting

### Messages not updating in real-time

1. **Check Realtime is enabled:**
   - Go to Supabase Dashboard → Database → Replication
   - Ensure `order_messages` has realtime enabled

2. **Check browser console:**
   - Look for WebSocket connection errors
   - Check for subscription errors

3. **Verify RLS policies:**
   - Ensure user has permission to read messages
   - Check RLS policies are correctly set

4. **Check network:**
   - Ensure WebSocket connections are allowed
   - Check firewall settings

### Revision requests not working

1. **Check function exists:**
   ```sql
   SELECT * FROM pg_proc WHERE proname = 'get_next_revision_number';
   ```

2. **Verify RLS policies:**
   - Users should be able to create revisions for their own orders
   - Admins should be able to update any revision

3. **Check console for errors:**
   - Look for permission errors
   - Check for validation errors

## Security Notes

- Messages are only visible to order owner and admins
- Revisions can only be created by order owner
- Admin actions are logged (via RLS policies)
- All communication is encrypted via Supabase's secure connections

## Future Enhancements

- [ ] File uploads in chat
- [ ] Typing indicators
- [ ] Message reactions
- [ ] Email notifications for new messages
- [ ] Mobile push notifications
- [ ] Voice messages
- [ ] Screen sharing for revisions
- [ ] Version control for deliverables


# Online Status Tracking Setup Guide

This guide explains how online status tracking works and how to set it up.

## Overview

The system tracks user online status to show:
- **Online/Offline indicators** in chat
- **Last seen timestamps**
- **Real-time status updates**

## How It Works

### Database Schema

The `profiles` table includes:
- `last_seen` - Last activity timestamp
- `is_online` - Boolean online status

### Status Updates

1. **Automatic Updates:**
   - Updates every 30 seconds when user is active
   - Updates when user sends a message
   - Updates on page load

2. **Offline Detection:**
   - Users marked offline if inactive for 5 minutes
   - Automatically marked offline on logout
   - Marked offline when page closes

## Setup Instructions

### 1. Run Database Schema

The schema has already been updated with:
- `last_seen` column in `profiles` table
- `is_online` column in `profiles` table

Run the updated `supabase-schema.sql` if you haven't already.

### 2. Update Existing Profiles

If you have existing profiles, update them:

```sql
-- Update existing profiles to have online status fields
UPDATE public.profiles
SET 
  last_seen = COALESCE(last_seen, created_at),
  is_online = false
WHERE last_seen IS NULL;
```

### 3. Automatic Setup

Online status tracking is automatically set up when:
- User logs in (via `AuthContext`)
- User visits any page (via `setupOnlineStatusTracking`)
- User sends a message (via `OrderChat`)

## Usage

### For Users

1. **Online Status:**
   - Automatically shown as online when active
   - Shown as offline after 5 minutes of inactivity
   - Status updates in real-time

2. **In Chat:**
   - See online/offline status of other users
   - Green dot indicates online
   - Gray dot indicates offline
   - "X users online" counter at top of chat

### For Admins

1. **View Customer Status:**
   - See if customer is online
   - Know when customer was last active
   - Better communication timing

## API Functions

### `updateOnlineStatus()`
Updates user's online status and last_seen timestamp.

```javascript
import { updateOnlineStatus } from '../lib/onlineStatus';

// Call periodically (every 30 seconds)
updateOnlineStatus();
```

### `markOffline()`
Marks user as offline.

```javascript
import { markOffline } from '../lib/onlineStatus';

// Call on logout or page close
markOffline();
```

### `setupOnlineStatusTracking()`
Sets up automatic status tracking.

```javascript
import { setupOnlineStatusTracking } from '../lib/onlineStatus';

// Call in main app component
const cleanup = setupOnlineStatusTracking();

// Cleanup on unmount
cleanup();
```

### `isUserOnline(lastSeen)`
Checks if user is online based on last_seen timestamp.

```javascript
import { isUserOnline } from '../lib/onlineStatus';

const online = isUserOnline(user.last_seen);
```

## Customization

### Change Update Frequency

Edit `src/lib/onlineStatus.js`:

```javascript
// Change from 30 seconds to 1 minute
const interval = setInterval(() => {
  updateOnlineStatus();
}, 60000); // 60 seconds
```

### Change Offline Threshold

Edit `src/lib/onlineStatus.js`:

```javascript
// Change from 5 minutes to 10 minutes
export const isUserOnline = (lastSeen) => {
  if (!lastSeen) return false;
  const now = new Date();
  const lastSeenDate = new Date(lastSeen);
  const diffMinutes = (now - lastSeenDate) / (1000 * 60);
  return diffMinutes < 10; // 10 minutes
};
```

### Change Database Offline Threshold

Edit `supabase-schema.sql`:

```sql
-- Change from 5 minutes to 10 minutes
CREATE OR REPLACE FUNCTION public.mark_users_offline()
RETURNS void AS $$
BEGIN
  UPDATE public.profiles
  SET is_online = false
  WHERE last_seen < NOW() - INTERVAL '10 minutes';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## Performance

### Optimization

1. **Batch Updates:**
   - Status updates are batched every 30 seconds
   - Reduces database load

2. **Client-side Caching:**
   - Online status cached in component state
   - Reduces API calls

3. **Real-time Updates:**
   - Uses Supabase Realtime for instant updates
   - No polling required

## Troubleshooting

### Status not updating:

1. **Check user authentication:**
   - Ensure user is logged in
   - Check `AuthContext` is working

2. **Check database:**
   - Verify `profiles` table has `last_seen` and `is_online` columns
   - Check RLS policies allow updates

3. **Check browser console:**
   - Look for errors in console
   - Check network requests

### Status showing incorrectly:

1. **Check last_seen timestamp:**
   ```sql
   SELECT id, email, last_seen, is_online 
   FROM public.profiles 
   WHERE id = 'user-id';
   ```

2. **Check timezone:**
   - Ensure server timezone is correct
   - Check client timezone settings

3. **Check offline threshold:**
   - Verify threshold is set correctly
   - Check if user was active recently

## Security

### RLS Policies

Users can only update their own online status:

```sql
-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
```

### Privacy

- Online status is only visible to:
  - Order owner (customer)
  - Admin users
  - Other users in the same order chat

## Future Enhancements

- [ ] Typing indicators
- [ ] "Last seen" timestamps
- [ ] Activity status (active, away, busy)
- [ ] Custom status messages
- [ ] Do not disturb mode
- [ ] Status history
- [ ] Status analytics


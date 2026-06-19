# Email Notification Setup Guide

This guide explains how to set up email notifications for chat messages and revision requests.

## Overview

The system sends email notifications when:
1. **New chat message** - When admin or customer sends a message
2. **New revision request** - When customer submits a revision request
3. **Revision status update** - When admin updates revision status

## Email Service Options

### Option 1: Resend (Recommended)

Resend is a modern email API built for developers. It's easy to set up and has a generous free tier.

#### Setup Steps:

1. **Sign up for Resend:**
   - Go to https://resend.com
   - Create an account
   - Verify your domain (captainsolo.ca) or use Resend's test domain

2. **Get API Key:**
   - Go to API Keys section
   - Create a new API key
   - Copy the key (starts with `re_`)

3. **Install Resend:**
   ```bash
   npm install resend
   ```

4. **Update Netlify Function:**
   - Open `netlify/functions/send-message-notification.js`
   - Uncomment the Resend code section
   - Add your API key to Netlify environment variables:
     - Variable name: `RESEND_API_KEY`
     - Value: Your Resend API key

5. **Update `send-revision-notification.js` similarly**

6. **Add Environment Variable to Netlify:**
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add `RESEND_API_KEY` with your Resend API key

### Option 2: SendGrid

SendGrid is another popular email service provider.

#### Setup Steps:

1. **Sign up for SendGrid:**
   - Go to https://sendgrid.com
   - Create an account
   - Verify your domain

2. **Get API Key:**
   - Go to Settings → API Keys
   - Create a new API key with "Mail Send" permissions
   - Copy the key

3. **Install SendGrid:**
   ```bash
   npm install @sendgrid/mail
   ```

4. **Update Netlify Functions:**
   - Replace Resend code with SendGrid code
   - Add `SENDGRID_API_KEY` to Netlify environment variables

### Option 3: AWS SES

Amazon SES is cost-effective for high-volume sending.

#### Setup Steps:

1. **Set up AWS SES:**
   - Go to AWS Console → SES
   - Verify your domain
   - Get AWS credentials

2. **Install AWS SDK:**
   ```bash
   npm install @aws-sdk/client-ses
   ```

3. **Update Netlify Functions:**
   - Add AWS credentials to environment variables
   - Update function code to use AWS SES

### Option 4: Supabase Edge Functions

You can also use Supabase Edge Functions with an email service.

## Implementation Example (Resend)

Here's a complete example using Resend:

```javascript
// netlify/functions/send-message-notification.js
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

exports.handler = async (event) => {
  // ... existing code ...

  try {
    const { data, error } = await resend.emails.send({
      from: 'CaptainSolo <notifications@captainsolo.ca>',
      to: recipientEmail,
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      throw error;
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully',
        emailId: data.id,
      }),
    };
  } catch (error) {
    // ... error handling ...
  }
};
```

## Email Templates

The system uses HTML email templates with:
- **Header** - CaptainSolo branding
- **Content** - Message/revision details
- **Call-to-action** - Link to view order
- **Footer** - Unsubscribe/contact info

### Customizing Templates

Edit the `emailHtml` variable in:
- `netlify/functions/send-message-notification.js`
- `netlify/functions/send-revision-notification.js`

## Testing

### Test Email Notifications:

1. **Create a test order** (as customer)
2. **Send a message** (as admin or customer)
3. **Check email** for notification
4. **Request a revision** (as customer)
5. **Update revision status** (as admin)
6. **Check email** for notification

### Local Testing:

1. **Run Netlify CLI:**
   ```bash
   ntl dev
   ```

2. **Test function directly:**
   ```bash
   curl -X POST http://localhost:8888/.netlify/functions/send-message-notification \
     -H "Content-Type: application/json" \
     -d '{
       "orderId": "test-order-id",
       "recipientEmail": "test@example.com",
       "senderName": "Test User",
       "messagePreview": "Test message",
       "isAdmin": false,
       "orderUrl": "http://localhost:8888/order/test-order-id"
     }'
   ```

## Environment Variables

Add these to Netlify Dashboard → Site Settings → Environment Variables:

```
RESEND_API_KEY=re_xxxxxxxxxxxxx  # If using Resend
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx  # If using SendGrid
AWS_ACCESS_KEY_ID=xxxxxxxxxxxxx  # If using AWS SES
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxx  # If using AWS SES
```

## Troubleshooting

### Emails not sending:

1. **Check API key:**
   - Verify API key is correct
   - Check API key has proper permissions
   - Ensure key is in Netlify environment variables

2. **Check domain verification:**
   - Ensure sender domain is verified
   - Check SPF/DKIM records

3. **Check function logs:**
   - Go to Netlify Dashboard → Functions → Logs
   - Look for error messages

4. **Check spam folder:**
   - Emails might be going to spam
   - Add sender to contacts

### Function errors:

1. **Check Netlify function logs:**
   - Go to Netlify Dashboard → Functions
   - Check for errors in function logs

2. **Test function locally:**
   ```bash
   ntl dev
   ```

3. **Check CORS:**
   - Ensure CORS headers are set correctly
   - Check browser console for CORS errors

## Security Best Practices

1. **Never commit API keys:**
   - Use environment variables only
   - Add `.env` to `.gitignore`

2. **Rate limiting:**
   - Implement rate limiting to prevent abuse
   - Limit emails per user per hour

3. **Email validation:**
   - Validate email addresses before sending
   - Check for spam patterns

4. **Unsubscribe:**
   - Add unsubscribe links to emails
   - Respect user preferences

## Future Enhancements

- [ ] Email templates in database
- [ ] Email preferences per user
- [ ] Unsubscribe functionality
- [ ] Email analytics
- [ ] Batch email sending
- [ ] Email scheduling
- [ ] Rich email templates
- [ ] Multi-language support

## Support

For issues or questions:
- Check function logs in Netlify Dashboard
- Review email service documentation
- Contact support for your email service provider


# 📧 EmailJS Contact Form Setup Guide

## What is EmailJS?
EmailJS lets your contact form send emails **directly from the browser** without needing your own server. It's free for up to 200 emails/month, perfect for portfolio sites.

---

## 🚀 Quick Setup (10 Minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Click "**Sign Up**" (top right)
3. Sign up with Google or email
4. **Verify your email** (check inbox)

---

### Step 2: Connect Your Email Service
1. On EmailJS dashboard, click "**Add New Service**"
2. Choose your email provider:
   - **Gmail** (recommended if you have Gmail)
   - **Outlook** (if you use Outlook/Hotmail)
   - Or any other service

#### For Gmail (Most Common):
1. Click "**Gmail**"
2. Click "**Connect Account**"
3. Sign in with your Google account (**use your work@captainsolo.ca if it's Gmail**)
4. Allow EmailJS permissions
5. Give it a name: `Captain Solo Contact`
6. Click "**Create Service**"
7. **Copy the Service ID** (looks like `service_abc123`) — **Save this!**

---

### Step 3: Create Email Template
1. Click "**Email Templates**" (left sidebar)
2. Click "**Create New Template**"
3. Delete default content and paste this:

```
Subject: New Client Inquiry from {{from_name}}

FROM: {{from_name}}
EMAIL: {{from_email}}
PHONE: {{phone}}

SERVICE INTERESTED IN:
{{service}}

BUDGET:
{{budget}}

PROJECT DETAILS:
{{message}}

---
Reply to this email to respond directly to {{from_name}}.
```

4. **Template Settings:**
   - Name: `Contact Form Template`
   - To Email: **YOUR EMAIL** (`work@captainsolo.ca` or wherever you want to receive inquiries)
   - From Name: `{{from_name}}`
   - Reply To: `{{from_email}}` (so you can hit reply and it goes to the client)

5. Click "**Save**"
6. **Copy the Template ID** (looks like `template_xyz789`) — **Save this!**

---

### Step 4: Get Your Public Key
1. Click "**Account**" (top right)
2. Click "**General**"
3. Find "**Public Key**" section
4. **Copy the Public Key** (long string like `xYz123AbC...`) — **Save this!**

---

### Step 5: Add Keys to Your Code

Open `src/components/ContactForm.jsx` and find these lines (around line 94):

```javascript
// Replace with your EmailJS credentials after setup
const serviceId = "YOUR_SERVICE_ID"; // Get from EmailJS dashboard
const templateId = "YOUR_TEMPLATE_ID"; // Get from EmailJS dashboard
const publicKey = "YOUR_PUBLIC_KEY"; // Get from EmailJS dashboard
```

**Replace with your actual values:**

```javascript
const serviceId = "service_abc123"; // ← Your Service ID
const templateId = "template_xyz789"; // ← Your Template ID
const publicKey = "xYz123AbC..."; // ← Your Public Key
```

---

### Step 6: Uncomment the Email Code

In the same file (`ContactForm.jsx`), find this section (around line 97-118):

```javascript
// For now, we'll use a simple fetch to demonstrate
// Uncomment this when you set up EmailJS:
/*
const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
  // ... rest of code
});
*/
```

**DELETE the comment markers (`/*` and `*/`)** so the code runs!

Then **DELETE this temporary code** (lines 120-121):
```javascript
// TEMPORARY: Simulate successful send (remove when EmailJS is set up)
await new Promise((resolve) => setTimeout(resolve, 1500));
```

---

### Step 7: Update the Imports

At the top of `ContactForm.jsx`, **add this import**:

```javascript
import emailjs from '@emailjs/browser';
```

---

### Step 8: Test Your Form! 🎉

1. Run your dev server:
   ```bash
   npm run dev
   ```

2. Go to your Contact section
3. Fill out the form with test data
4. Click "Send Message"
5. **Check your email** (`work@captainsolo.ca`)

You should receive an email with the form details!

---

## ✅ Final Code Reference

Here's what your updated `ContactForm.jsx` should look like (key parts):

```javascript
import emailjs from '@emailjs/browser'; // ← Add this import

// ... inside handleSubmit function ...

const serviceId = "service_abc123"; // ← Your actual Service ID
const templateId = "template_xyz789"; // ← Your actual Template ID  
const publicKey = "xYz123AbC..."; // ← Your actual Public Key

const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      service: formData.service,
      budget: formData.budget,
      message: formData.message,
      to_name: "Solomon Olufelo",
    },
  }),
});

if (!response.ok) throw new Error("Failed to send message");
```

---

## 📊 EmailJS Free Tier Limits

- **200 emails/month** (plenty for a portfolio site)
- If you get more than 200 inquiries/month, upgrade for $15/month
- Can track email delivery in EmailJS dashboard

---

## 🐛 Troubleshooting

### "Failed to send message" error:
- Check Service ID, Template ID, and Public Key are correct
- Make sure you uncommented the fetch code
- Check browser console for specific error messages
- Verify your email service is still connected in EmailJS dashboard

### Not receiving emails:
- Check spam/junk folder
- Verify "To Email" in template is correct
- Make sure you verified your EmailJS account email
- Test the template using "Test It" button in EmailJS dashboard

### CORS errors:
- EmailJS should work from `localhost` and deployed sites
- If issues, add your domain in EmailJS Account → Security settings

---

## 🚀 After Setup

1. **Test the form** multiple times with different data
2. **Deploy to Netlify** (it will work in production too)
3. **Monitor your EmailJS dashboard** to see form submissions
4. **Check email deliverability** after deployment

---

## 💡 Pro Tips

1. **Set up email auto-reply:** In EmailJS template, you can create a second template that sends a "Thank you for contacting me" email to clients automatically

2. **Track conversions:** Check EmailJS dashboard monthly to see how many inquiries you're getting

3. **Professional email:** If you don't have `work@captainsolo.ca` set up yet, use Gmail or Outlook for now, but get a professional domain email ASAP (makes you look way more legit)

4. **Backup plan:** Keep your email address visible on the site so clients can still reach you if the form has issues

---

## 📝 Need Help?

- EmailJS Docs: [https://www.emailjs.com/docs](https://www.emailjs.com/docs)
- Issues? DM me on Instagram [@caaptainsolo](https://instagram.com/caaptainsolo)

---

**Once you complete this setup, your contact form will be FULLY FUNCTIONAL! 🎉**

This is a real, production-ready contact form that clients can use to reach you.


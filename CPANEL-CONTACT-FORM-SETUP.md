# cPanel Contact Form Setup Guide
Complete setup guide for your Captain Solo portfolio contact form with cPanel hosting.

---

## 🎯 Overview

Your setup:
- **Frontend:** React app (deployed on Netlify or cPanel)
- **Backend:** PHP script on cPanel  
- **Hosting:** Namecheap Stellar plan - captainsolo.ca
- **Email:** PrivateEmail mailboxes

---

## ⚡ Quick Start (15 Minutes)

### Step 1: Create PHP Contact Script (5 mins)

1. Log into **cPanel** (via Namecheap)
2. Go to **File Manager**
3. Navigate to `public_html`
4. Create folder: `api` 
5. Inside `api`, create file: `contact.php`
6. Paste the PHP code (see below)
7. Save and set permissions to **644**

**PHP Code for `contact.php`:**
```php
<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['name']) || empty($data['email']) || empty($data['message'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$name = htmlspecialchars($data['name']);
$email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
$phone = isset($data['phone']) ? htmlspecialchars($data['phone']) : 'Not provided';
$service = isset($data['service']) ? htmlspecialchars($data['service']) : 'Not specified';
$budget = isset($data['budget']) ? htmlspecialchars($data['budget']) : 'Not specified';
$message = htmlspecialchars($data['message']);

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

$to = "work@captainsolo.ca";
$subject = "New Contact Form Submission from $name";
$from = "noreply@captainsolo.ca";

$email_body = "New contact form submission:\n\n";
$email_body .= "Name: $name\n";
$email_body .= "Email: $email\n";
$email_body .= "Phone: $phone\n";
$email_body .= "Service Interest: $service\n";
$email_body .= "Budget Range: $budget\n\n";
$email_body .= "Message:\n$message\n\n";
$email_body .= "---\n";
$email_body .= "Sent from Captain Solo Portfolio\n";
$email_body .= "Time: " . date('Y-m-d H:i:s');

$headers = "From: Captain Solo Website <$from>\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$success = mail($to, $subject, $email_body, $headers);

if ($success) {
    http_response_code(200);
    echo json_encode([
        'success' => true, 
        'message' => 'Thank you! Your message has been sent successfully.'
    ]);
} else {
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Sorry, there was an error. Please try again or email directly.'
    ]);
}
?>
```

---

### Step 2: Create Email Accounts (3 mins)

1. In cPanel, go to **Email Accounts**
2. Click **Create**
3. Create these mailboxes:
   - `noreply@captainsolo.ca` (for sending from forms)
   - `work@captainsolo.ca` (to receive inquiries)
4. Set strong passwords

---

### Step 3: Set Email Routing (2 mins)

1. In cPanel, go to **Email Routing**
2. Select domain: `captainsolo.ca`
3. Choose **Local Mail Exchanger**
4. Click **Change**

This tells cPanel to handle emails locally instead of routing to PrivateEmail.

---

### Step 4: Test the PHP Script (3 mins)

**Option A: Test with curl (if you have terminal access):**
```bash
curl -X POST https://captainsolo.ca/api/contact.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "123-456-7890",
    "service": "Test Service",
    "budget": "$1,000",
    "message": "This is a test message"
  }'
```

**Option B: Test with browser (easier):**
Create a test HTML file in cPanel:
```html
<!DOCTYPE html>
<html>
<body>
<h2>Test Contact Form</h2>
<button onclick="testForm()">Send Test Email</button>
<div id="result"></div>

<script>
async function testForm() {
  const result = document.getElementById('result');
  result.innerHTML = 'Sending...';
  
  try {
    const response = await fetch('https://captainsolo.ca/api/contact.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        message: 'Test message from browser'
      })
    });
    
    const data = await response.json();
    result.innerHTML = JSON.stringify(data, null, 2);
  } catch (error) {
    result.innerHTML = 'Error: ' + error.message;
  }
}
</script>
</body>
</html>
```

Save as `test-contact.html` in `public_html`, then visit:
`https://captainsolo.ca/test-contact.html`

---

### Step 5: Your React App is Already Updated! ✅

The ContactForm.jsx has been updated to use:
```javascript
const PHP_API_URL = "https://captainsolo.ca/api/contact.php";
```

Just deploy your React app and it will work!

---

## 🚀 Deployment Options

### Option A: Keep React on Netlify (Recommended)
- **Pros:** Fast CDN, automatic builds, free SSL
- **Setup:** Just push to GitHub, Netlify auto-deploys
- **Backend:** cPanel handles the contact form PHP
- **Cost:** $0 (Netlify free tier)

### Option B: Host Everything on cPanel
- **Pros:** Everything in one place
- **Setup:** Build React (`npm run build`), upload `dist/` folder
- **Cost:** Included in your Stellar plan

---

## 🐛 Troubleshooting

### Issue: "CORS error" in browser console
**Fix:** Make sure these lines are in your PHP file (top):
```php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
```

### Issue: Emails not arriving
**Fixes:**
1. Check spam/junk folder
2. Verify email routing is set to "Local" in cPanel
3. Check cPanel error logs: **Metrics** → **Errors**
4. Make sure `noreply@captainsolo.ca` mailbox exists

### Issue: "500 Internal Server Error"
**Fixes:**
1. Check file permissions (should be 644)
2. View PHP error logs in cPanel
3. Make sure PHP is enabled for your account

### Issue: "Failed to fetch"
**Fixes:**
1. Check the URL is correct: `https://captainsolo.ca/api/contact.php`
2. Make sure file exists in cPanel File Manager
3. Test directly: Visit the URL in browser (should show "Method not allowed" - that's OK!)

---

## ✅ Testing Checklist

- [ ] PHP file uploaded to `public_html/api/contact.php`
- [ ] File permissions set to 644
- [ ] Email accounts created (`work@`, `noreply@`)
- [ ] Email routing set to Local
- [ ] Test email sent successfully
- [ ] Email received in `work@captainsolo.ca`
- [ ] React app updated with correct URL
- [ ] Contact form tested on live site

---

## 📊 Monitoring & Maintenance

**Check your inbox regularly:**
- Set up email forwarding in cPanel to get notifications on your phone
- Or add `work@captainsolo.ca` to your phone's mail app

**Monthly checks:**
- Test contact form yourself
- Check spam folder for missed inquiries
- Review cPanel error logs

---

## 🔐 Security Best Practices

✅ **Already implemented:**
- Input sanitization
- Email validation
- CORS headers
- No sensitive data exposed

🔒 **Optional extras:**
- Add reCAPTCHA to prevent spam
- Rate limiting (block too many requests from same IP)
- Email notification for form submissions

---

## 🎯 Next Steps

1. ✅ **Create PHP script** → 5 mins
2. ✅ **Set up emails** → 3 mins
3. ✅ **Test everything** → 3 mins
4. 🚀 **Deploy and go live!**

---

## 💬 Need Help?

- **cPanel issues:** Contact Namecheap support
- **Code issues:** Check browser console for errors
- **Email issues:** Verify Email Routing in cPanel

**Your setup is now production-ready!** 🎉


# Debug Payment Issues

## Common Issues and Solutions

### "Unexpected end of JSON input"

This error occurs when the server response is empty or not valid JSON.

#### Possible Causes:

1. **Netlify Function Not Found (404)**
   - The function file might not be deployed
   - Check if `netlify/functions/create-checkout-session.js` exists
   - Verify the function is deployed to Netlify

2. **Stripe API Key Missing**
   - Check if `STRIPE_SECRET_KEY` is set in Netlify environment variables
   - Go to Netlify Dashboard → Site Settings → Environment Variables
   - Add `STRIPE_SECRET_KEY` with your Stripe secret key

3. **Network/CORS Issues**
   - Check browser console for CORS errors
   - Verify the function URL is correct
   - Check Netlify function logs

4. **Empty Response**
   - The function might be throwing an error before returning
   - Check Netlify function logs in the dashboard

### Debugging Steps

1. **Check Browser Console**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Look for error messages
   - Check Network tab for the request/response

2. **Check Netlify Function Logs**
   - Go to Netlify Dashboard → Functions
   - Click on `create-checkout-session`
   - View logs for errors

3. **Test the Function Locally**
   ```bash
   # Install Netlify CLI if not already installed
   npm install -g netlify-cli
   
   # Start local dev server
   netlify dev
   
   # The function will be available at http://localhost:8888/.netlify/functions/create-checkout-session
   ```

4. **Test with curl**
   ```bash
   curl -X POST http://localhost:8888/.netlify/functions/create-checkout-session \
     -H "Content-Type: application/json" \
     -d '{
       "amount": 20,
       "serviceType": "voice-tag",
       "packageType": "standard",
       "userId": "test-user-id",
       "orderId": "test-order-id",
       "orderData": {}
     }'
   ```

5. **Verify Environment Variables**
   - Check Netlify Dashboard → Site Settings → Environment Variables
   - Ensure `STRIPE_SECRET_KEY` is set
   - Ensure `STRIPE_PUBLISHABLE_KEY` is set in your `.env.local` (for local dev)

6. **Check Stripe Keys**
   - Verify you're using test keys in development
   - Test keys start with `sk_test_` and `pk_test_`
   - Live keys start with `sk_live_` and `pk_live_`

### Quick Fix Checklist

- [ ] Netlify function exists and is deployed
- [ ] `STRIPE_SECRET_KEY` is set in Netlify environment variables
- [ ] `VITE_STRIPE_PUBLISHABLE_KEY` is set in `.env.local` (for local dev)
- [ ] Stripe keys are valid (not expired)
- [ ] Function logs show no errors
- [ ] Browser console shows detailed error messages
- [ ] Network request returns 200 status code

### Common Error Messages

1. **"Payment processing is not configured"**
   - Solution: Set `STRIPE_SECRET_KEY` in Netlify environment variables

2. **"Missing required fields"**
   - Solution: Check that all required fields are passed to the function
   - Required: `amount`, `serviceType`, `packageType`, `userId`

3. **"Invalid JSON in request body"**
   - Solution: Check that the request body is properly formatted JSON

4. **"Failed to create checkout session"**
   - Solution: Check Stripe dashboard for API errors
   - Verify Stripe account is active
   - Check Stripe API logs

### Testing Payment Flow

1. **Local Testing:**
   - Use Stripe test keys
   - Use test card: `4242 4242 4242 4242`
   - Any future expiry date
   - Any 3-digit CVC

2. **Production Testing:**
   - Use Stripe live keys
   - Test with real card (will charge real money)
   - Or use Stripe test mode with test cards

### Getting Help

If the issue persists:
1. Check Netlify function logs for detailed error messages
2. Check Stripe dashboard for API errors
3. Check browser console for client-side errors
4. Verify all environment variables are set correctly
5. Test the function independently with curl or Postman


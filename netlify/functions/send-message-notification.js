/**
 * Netlify Function: Send Message Notification Email
 * Sends email notifications when a new message is received in chat or revision
 */

// For production, use Resend, SendGrid, or another email service
// This is a template that you'll need to configure with your email provider

exports.handler = async (event) => {
  // Set CORS headers
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const {
      orderId,
      recipientEmail,
      recipientName,
      senderName,
      messagePreview,
      isAdmin,
      orderUrl,
      revisionId, // Optional: for revision notifications
    } = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!recipientEmail || !senderName || !orderUrl) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: recipientEmail, senderName, and orderUrl are required',
        }),
      };
    }

    // TODO: Configure your email service here
    // Options: Resend, SendGrid, AWS SES, or Supabase Edge Functions
    
    // Example with Resend (uncomment and configure):
    /*
    const resend = require('resend');
    const resendClient = new resend.Resend(process.env.RESEND_API_KEY);

    const emailSubject = isAdmin 
      ? `New message from ${senderName} on your order`
      : `New message from ${senderName} on order #${orderId.slice(0, 8)}`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #CFA355; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .button { display: inline-block; padding: 12px 24px; background: #CFA355; color: white; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .message-preview { background: white; padding: 15px; border-left: 4px solid #CFA355; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>CaptainSolo - New Message</h1>
            </div>
            <div class="content">
              <h2>You have a new message!</h2>
              <p>Hi ${recipientName},</p>
              <p>${isAdmin ? 'A customer' : 'An admin'} has sent you a new message regarding your order.</p>
              
              ${messagePreview ? `
                <div class="message-preview">
                  <strong>Message Preview:</strong>
                  <p>${messagePreview}${messagePreview.length >= 100 ? '...' : ''}</p>
                </div>
              ` : ''}
              
              <p>Click the button below to view the full conversation and respond:</p>
              <a href="${orderUrl}" class="button">View Order & Respond</a>
              
              <p style="margin-top: 30px; font-size: 12px; color: #666;">
                This is an automated email from CaptainSolo. Please do not reply to this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resendClient.emails.send({
      from: 'CaptainSolo <notifications@captainsolo.ca>',
      to: recipientEmail,
      subject: emailSubject,
      html: emailHtml,
    });

    if (error) {
      throw error;
    }
    */

    // For now, log the email (replace with actual email sending)
    console.log('Email notification:', {
      to: recipientEmail,
      from: 'notifications@captainsolo.ca',
      subject: isAdmin 
        ? `New message from ${senderName} on your order`
        : `New message from ${senderName} on order #${orderId?.slice(0, 8)}`,
      orderUrl,
      messagePreview,
    });

    // Return success (replace with actual email service response)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email notification queued',
        // Uncomment when using actual email service:
        // emailId: data.id,
      }),
    };

  } catch (error) {
    console.error('Email notification error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to send email notification',
      }),
    };
  }
};


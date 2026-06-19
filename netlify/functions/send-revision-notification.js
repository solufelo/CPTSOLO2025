/**
 * Netlify Function: Send Revision Notification Email
 * Sends email notifications for revision requests and updates
 */

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
      revisionId,
      revisionNumber,
      requestDescription,
      status,
      recipientEmail,
      recipientName,
      customerName,
      isUpdate,
      orderUrl,
    } = JSON.parse(event.body || '{}');

    // Validate required fields
    if (!orderId || !orderUrl) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: orderId and orderUrl are required',
        }),
      };
    }

    // TODO: Configure your email service here
    // For now, log the email (replace with actual email sending)
    
    const emailSubject = isUpdate
      ? `Revision #${revisionNumber} status updated - ${status}`
      : `New revision request #${revisionNumber} from ${customerName || 'customer'}`;

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
            .revision-details { background: white; padding: 15px; border-left: 4px solid #CFA355; margin: 20px 0; }
            .status-badge { display: inline-block; padding: 5px 10px; border-radius: 3px; font-weight: bold; }
            .status-pending { background: #fbbf24; color: #78350f; }
            .status-in-progress { background: #3b82f6; color: white; }
            .status-completed { background: #10b981; color: white; }
            .status-rejected { background: #ef4444; color: white; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>CaptainSolo - Revision ${isUpdate ? 'Update' : 'Request'}</h1>
            </div>
            <div class="content">
              <h2>${isUpdate ? 'Revision Status Updated' : 'New Revision Request'}</h2>
              <p>Hi ${recipientName || 'there'},</p>
              
              ${isUpdate ? `
                <p>The status of revision #${revisionNumber} for your order has been updated.</p>
                <div class="revision-details">
                  <p><strong>Revision #${revisionNumber}</strong></p>
                  <p><strong>New Status:</strong> <span class="status-badge status-${status}">${status.toUpperCase()}</span></p>
                </div>
              ` : `
                <p><strong>${customerName || 'A customer'}</strong> has submitted a new revision request for order #${orderId?.slice(0, 8) || 'N/A'}.</p>
                <div class="revision-details">
                  <p><strong>Revision #${revisionNumber}</strong></p>
                  <p><strong>Customer:</strong> ${customerName || 'Unknown'}</p>
                  <p><strong>Request:</strong></p>
                  <p>${requestDescription || 'No description provided'}</p>
                </div>
              `}
              
              <p>Click the button below to view the order and ${isUpdate ? 'see the update' : 'respond to the request'}:</p>
              <a href="${orderUrl}" class="button">View Order</a>
              
              <p style="margin-top: 30px; font-size: 12px; color: #666;">
                This is an automated email from CaptainSolo. Please do not reply to this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    console.log('Revision email notification:', {
      to: recipientEmail || 'admin@captainsolo.ca',
      from: 'notifications@captainsolo.ca',
      subject: emailSubject,
      orderUrl,
      isUpdate,
    });

    // Return success (replace with actual email service response)
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Email notification queued',
      }),
    };

  } catch (error) {
    console.error('Revision email notification error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: error.message || 'Failed to send email notification',
      }),
    };
  }
};


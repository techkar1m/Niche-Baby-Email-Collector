import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { subscriberEmail, recipientEmail } = await request.json();

    // Validate inputs
    if (!subscriberEmail || !recipientEmail) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Generate a unique contact ID for tracking
    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    
    console.log('Subscriber notification prepared:', {
      contactId,
      email: subscriberEmail,
      timestamp: new Date().toISOString(),
    });

    // Prepare email notification
    const emailNotification = {
      to: [{ email: recipientEmail }],
      subject: `🎉 New Subscriber: ${subscriberEmail}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #FFFFE0 0%, #E0FFFF 100%); padding: 30px; border-radius: 12px; text-align: center;">
            <h2 style="color: #000; margin: 0 0 20px 0;">🎉 New Subscriber Alert!</h2>
            <p style="color: #333; font-size: 16px; margin: 10px 0;">A new subscriber has joined your Niche Baby community!</p>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; margin: 20px 0; border-radius: 8px;">
            <p style="color: #666; margin: 5px 0;"><strong>Subscriber Email:</strong></p>
            <p style="color: #000; font-size: 18px; margin: 5px 0; word-break: break-all;">${subscriberEmail}</p>
            
            <p style="color: #666; margin: 15px 0 5px 0;"><strong>Subscription Date:</strong></p>
            <p style="color: #000; margin: 5px 0;">${new Date().toLocaleString()}</p>
            
            ${contactId ? `<p style="color: #666; margin: 15px 0 5px 0;"><strong>Wix Contact ID:</strong></p>
            <p style="color: #000; margin: 5px 0; font-family: monospace;">${contactId}</p>` : ''}
          </div>
          
          <div style="text-align: center; color: #999; font-size: 12px; margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p>This is an automated notification from Niche Baby</p>
          </div>
        </div>
      `,
      text: `
New Subscriber Alert!

A new subscriber has joined your Niche Baby community!

Subscriber Email: ${subscriberEmail}
Subscription Date: ${new Date().toLocaleString()}
${contactId ? `Wix Contact ID: ${contactId}` : ''}

This is an automated notification from Niche Baby.
      `,
    };

    console.log('Email notification prepared:', emailNotification);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Subscriber notification prepared',
        subscriberEmail: subscriberEmail,
        contactId: contactId,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Email API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: String(error) }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

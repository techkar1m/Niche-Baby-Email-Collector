import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    // Validate request method
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { status: 405, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body with error handling
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error('❌ Failed to parse request body:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { subscriberEmail, recipientEmail } = body;

    // Validate inputs
    if (!subscriberEmail || !recipientEmail) {
      console.warn('⚠️ Missing required fields:', { subscriberEmail: !!subscriberEmail, recipientEmail: !!recipientEmail });
      return new Response(
        JSON.stringify({ error: 'Missing required fields: subscriberEmail and recipientEmail' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validate email formats
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(subscriberEmail) || !emailRegex.test(recipientEmail)) {
      console.warn('⚠️ Invalid email format:', { subscriberEmail, recipientEmail });
      return new Response(
        JSON.stringify({ error: 'Invalid email format' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('📧 Email notification request received:', {
      subscriberEmail,
      recipientEmail,
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

This is an automated notification from Niche Baby.
      `,
    };

    console.log('✅ Email notification prepared successfully:', {
      to: recipientEmail,
      subject: emailNotification.subject,
      timestamp: new Date().toISOString(),
    });

    // Return success response with proper JSON headers
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Email notification prepared successfully',
        subscriberEmail: subscriberEmail,
        recipientEmail: recipientEmail,
        timestamp: new Date().toISOString(),
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        } 
      }
    );
  } catch (error) {
    // Ensure we always return JSON, never HTML
    console.error('❌ Email API error:', {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString(),
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        } 
      }
    );
  }
};

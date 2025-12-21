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

    // Send email using Wix Contacts API or a third-party service
    // For this implementation, we'll use a simple approach with fetch to a mail service
    // You can integrate with SendGrid, Mailgun, or any other email service
    
    // Example using a hypothetical mail service endpoint
    const emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: recipientEmail }],
            subject: `New Subscriber: ${subscriberEmail}`,
          },
        ],
        from: {
          email: 'noreply@yoursite.com',
          name: 'Niche Baby Notifications',
        },
        content: [
          {
            type: 'text/html',
            value: `
              <h2>New Subscriber Alert</h2>
              <p>A new subscriber has signed up with the following email:</p>
              <p><strong>${subscriberEmail}</strong></p>
              <p>Subscription Date: ${new Date().toLocaleString()}</p>
            `,
          },
        ],
      }),
    });

    if (!emailResponse.ok) {
      console.error('Email service error:', await emailResponse.text());
      return new Response(
        JSON.stringify({ error: 'Failed to send email' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Email API error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

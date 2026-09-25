import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, intent, details } = body;

    const brevoApiKey = process.env.BREVO_API_KEY;

    if (!brevoApiKey) {
      return NextResponse.json({ error: 'Brevo API key missing' }, { status: 500 });
    }

    const brevoResponse = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey
      },
      body: JSON.stringify({
        // IMPORTANT: The sender email MUST be an email you have verified in your Brevo account dashboard.
        sender: { name: "Tapecut Studios System", email: "workplace4568@gmail.com" }, 
        to: [{ email: "workplace4568@gmail.com", name: "Tapecut Founders" }],
        replyTo: { email: email, name: name }, // This ensures when you hit "Reply" in Gmail, it goes to the client
        subject: `[${intent}] - Tapecut Inquiry from ${name}`,
        htmlContent: `
          <div style="font-family: sans-serif; max-width: 600px; padding: 20px; border: 1px solid #333; background: #050505; color: #fff;">
            <h2 style="color: #fff; text-transform: uppercase; letter-spacing: 2px;">New Transmission Received</h2>
            <hr style="border-color: #333; margin: 20px 0;" />
            <p style="color: #ccc;"><strong>INTENT:</strong> ${intent}</p>
            <p style="color: #ccc;"><strong>NAME:</strong> ${name}</p>
            <p style="color: #ccc;"><strong>EMAIL:</strong> ${email}</p>
            <br/>
            <h3 style="color: #fff; text-transform: uppercase; letter-spacing: 1px;">Project Details:</h3>
            <p style="color: #aaa; line-height: 1.6;">${details.replace(/\n/g, '<br/>')}</p>
          </div>
        `
      })
    });

    if (!brevoResponse.ok) {
      const errorData = await brevoResponse.json();
      console.error('Brevo API Error:', errorData);
      return NextResponse.json({ error: 'Failed to dispatch transmission' }, { status: brevoResponse.status });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
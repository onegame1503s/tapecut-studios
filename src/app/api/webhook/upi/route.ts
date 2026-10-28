import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { secret, client_email, client_name, amount } = body;

    // 1. Security Check: Prevent unauthorized pings
    if (secret !== process.env.WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Unauthorized Gateway' }, { status: 401 });
    }

    // 2. Tapecut Dark-Mode Receipt HTML
    const htmlContent = `
    <div style="background-color: #050505; color: #f8fafc; font-family: monospace; padding: 40px; max-width: 600px; margin: auto; border: 1px solid #262626;">
        <h2 style="color: #ffffff; font-family: Helvetica, Arial, sans-serif; letter-spacing: 2px;">TAPECUT STUDIOS</h2>
        <p style="color: #10b981; font-weight: bold; font-size: 12px; letter-spacing: 1px;">SETTLEMENT CONFIRMED</p>
        <hr style="border-color: #262626; margin: 20px 0;">
        <p style="color: #888888; font-size: 14px;">CLIENT: <span style="color: #ffffff;">${client_name.toUpperCase()}</span></p>
        <div style="background-color: #0f0f0f; border: 1px solid #262626; padding: 20px; margin: 30px 0;">
            <p style="color: #888888; margin: 0; font-size: 12px;">TOTAL SETTLED</p>
            <h1 style="color: #10b981; margin: 5px 0 0 0; font-family: Helvetica, sans-serif;">INR ${amount}.00</h1>
        </div>
        <p style="color: #888888; font-size: 12px; line-height: 1.6;">Your transaction has been successfully verified on our ledger. Development protocols will proceed immediately.</p>
        <br><p style="color: #888888; font-size: 10px;">// TAPECUT COMMAND • NEW DELHI, INDIA</p>
    </div>
    `;

    // 3. Dispatch via Brevo API
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY as string,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: { name: "Tapecut Studios", email: "billing@tapecut.info" },
        to: [{ email: client_email, name: client_name }],
        subject: `Payment Received: Tapecut Studios`,
        htmlContent: htmlContent
      })
    });

    if (!response.ok) throw new Error("Brevo Dispatch Failed");

    return NextResponse.json({ success: true, message: "Receipt Dispatched" }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal Webhook Error' }, { status: 500 });
  }
}
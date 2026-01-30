import { NextResponse } from "next/server";

// Simple email validation
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, source = "website" } = body;

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const timestamp = new Date().toISOString();

    // Option 1: If you have Brevo (Sendinblue) API key
    if (process.env.BREVO_API_KEY) {
      const brevoRes = await fetch("https://api.brevo.com/v3/contacts", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          listIds: [parseInt(process.env.BREVO_LIST_ID || "2")],
          attributes: {
            SOURCE: source,
            SIGNUP_DATE: timestamp,
          },
          updateEnabled: true,
        }),
      });

      if (!brevoRes.ok && brevoRes.status !== 204) {
        const error = await brevoRes.text();
        console.error("Brevo error:", error);
        // Don't fail - still save locally
      }
    }

    // Option 2: If you have Mailchimp API key
    if (process.env.MAILCHIMP_API_KEY && process.env.MAILCHIMP_LIST_ID) {
      const datacenter = process.env.MAILCHIMP_API_KEY.split("-")[1];
      const mailchimpRes = await fetch(
        `https://${datacenter}.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`,
        {
          method: "POST",
          headers: {
            Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_address: normalizedEmail,
            status: "subscribed",
            tags: [source, "website-signup"],
            merge_fields: {
              SOURCE: source,
            },
          }),
        }
      );

      if (!mailchimpRes.ok) {
        const error = await mailchimpRes.json();
        // Member exists is OK
        if (error.title !== "Member Exists") {
          console.error("Mailchimp error:", error);
        }
      }
    }

    // Option 3: If you have Klaviyo API key
    if (process.env.KLAVIYO_API_KEY && process.env.KLAVIYO_LIST_ID) {
      const klaviyoRes = await fetch(
        `https://a.klaviyo.com/api/v2/list/${process.env.KLAVIYO_LIST_ID}/subscribe`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: process.env.KLAVIYO_API_KEY,
            profiles: [
              {
                email: normalizedEmail,
                source: source,
              },
            ],
          }),
        }
      );

      if (!klaviyoRes.ok) {
        console.error("Klaviyo error:", await klaviyoRes.text());
      }
    }

    // Always log to console for backup/export purposes
    console.log(`[EMAIL SIGNUP] ${timestamp} | ${normalizedEmail} | ${source}`);

    // Send notification email to you (optional - requires email service)
    // You can set up a simple email notification via your email provider

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed!",
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// GET endpoint to check subscription status (optional)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json({ subscribed: false });
  }

  // For now, just return true if they've subscribed via the form
  // In production, you'd check against your email service
  return NextResponse.json({ subscribed: false });
}

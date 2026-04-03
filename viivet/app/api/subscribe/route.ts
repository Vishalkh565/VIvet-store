import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // MOCK: In a real production app, you would integrate Mailchimp, Klaviyo, or Shopify here:
    // e.g., await subscribeToKlaviyo(email);

    // Simulate backend processing time
    await new Promise((resolve) => setTimeout(resolve, 800));

    return NextResponse.json(
      { message: "Successfully subscribed to the VIVET newsletter." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

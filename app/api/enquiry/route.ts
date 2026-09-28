import { NextResponse } from "next/server";
import { Resend } from "resend";
import { enquirySchema, flattenEnquiryError } from "@/lib/enquiry";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot filled in → silently accept so bots learn nothing.
  if (
    body &&
    typeof body === "object" &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.length > 0
  ) {
    return NextResponse.json({ ok: true });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Validation failed",
        issues: flattenEnquiryError(parsed.error).fieldErrors,
      },
      { status: 422 },
    );
  }

  const { name, email, company, role, message } = parsed.data;
  const text = [
    `New enquiry from flipoteam.com`,
    ``,
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company}`,
    `Role: ${role || "-"}`,
    ``,
    `Message:`,
    message || "-",
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !to) {
    console.info("[enquiry] Email delivery not configured; logging submission instead.\n" + text);
    return NextResponse.json({ ok: true });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || "FLIPO Website <onboarding@resend.dev>",
      to: to.split(",").map((s) => s.trim()),
      replyTo: email,
      subject: `New enquiry: ${name} (${company})`,
      text,
    });
    if (error) throw new Error(error.message);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[enquiry] Failed to send email", err);
    return NextResponse.json({ ok: false, error: "Delivery failed" }, { status: 502 });
  }
}

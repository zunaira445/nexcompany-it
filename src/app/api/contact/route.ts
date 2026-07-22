import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import ContactMessage from "@/models/ContactMessage";
import { sendContactEmail } from "@/lib/mail";

// POST - Create contact message + notify admin via email
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, phone, subject, message } = await req.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Save message to database first
    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message,
    });

    // Attempt to notify admin by email — message is already saved even if this fails
    try {
      await sendContactEmail({ name, email, phone, subject, message });
    } catch (emailError) {
      console.error("Failed to send contact notification email:", emailError);
      return NextResponse.json(
        {
          success: true,
          message:
            "Your message was received, but we couldn't send the email notification. Our team will still follow up.",
          contactMessage,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Message sent successfully! We'll get back to you soon.", contactMessage },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// GET - Get all messages (Admin)
export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const messages = await ContactMessage.find().sort({ createdAt: -1 });

    return NextResponse.json(
      { success: true, messages },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
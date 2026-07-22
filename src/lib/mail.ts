import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOTP(email: string, otp: string, type: "register" | "forgot-password") {
  const subject = type === "register" 
    ? "Verify Your Email - NexGen IT Solutions" 
    : "Password Reset OTP - NexGen IT Solutions";

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', sans-serif; background: #0A0A0F; color: #fff; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px; }
        .logo { text-align: center; margin-bottom: 30px; }
        .otp-box { 
          background: linear-gradient(135deg, #3B82F6, #8B5CF6); 
          padding: 30px; 
          border-radius: 16px; 
          text-align: center;
          margin: 30px 0;
        }
        .otp-code { 
          font-size: 42px; 
          font-weight: 800; 
          letter-spacing: 8px;
          color: #fff;
        }
        .footer { text-align: center; color: #94A3B8; font-size: 14px; margin-top: 40px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <h1 style="color: #3B82F6; font-size: 28px;">NexGen IT</h1>
        </div>
        <h2 style="text-align: center;">${type === "register" ? "Welcome to NexGen IT Solutions!" : "Password Reset Request"}</h2>
        <p style="text-align: center; color: #94A3B8;">
          ${type === "register" 
            ? "Thank you for registering. Please use the OTP below to verify your email address." 
            : "You requested a password reset. Use the OTP below to proceed."}
        </p>
        <div class="otp-box">
          <div class="otp-code">${otp}</div>
        </div>
        <p style="text-align: center; color: #94A3B8;">
          This OTP will expire in <strong>10 minutes</strong>.<br>
          If you didn't request this, please ignore this email.
        </p>
        <div class="footer">
          <p>© 2024 NexGen IT Solutions. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"NexGen IT Solutions" <${process.env.SMTP_USER}>`,
    to: email,
    subject,
    html,
  });
}

export async function sendContactEmail({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', sans-serif; background: #0A0A0F; color: #fff; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px; }
        .field { margin-bottom: 16px; }
        .label { color: #94A3B8; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; }
        .value { font-size: 16px; margin-top: 4px; }
        .message-box { background: rgba(255,255,255,0.05); border-radius: 12px; padding: 20px; margin-top: 8px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 style="color: #3B82F6;">New Contact Form Submission</h1>
        <div class="field">
          <div class="label">Name</div>
          <div class="value">${name}</div>
        </div>
        <div class="field">
          <div class="label">Email</div>
          <div class="value">${email}</div>
        </div>
        ${phone ? `<div class="field"><div class="label">Phone</div><div class="value">${phone}</div></div>` : ""}
        <div class="field">
          <div class="label">Subject</div>
          <div class="value">${subject}</div>
        </div>
        <div class="field">
          <div class="label">Message</div>
          <div class="message-box">${message.replace(/\n/g, "<br/>")}</div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"NexGen IT Website" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    replyTo: email,
    subject: `New Inquiry: ${subject}`,
    html,
  });
}

export async function sendWelcomeEmail(email: string, name: string) {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Inter', sans-serif; background: #0A0A0F; color: #fff; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 style="color: #3B82F6;">Welcome to NexGen IT, ${name}!</h1>
        <p>Your account has been successfully verified. You can now explore our services and request custom solutions.</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/services" 
           style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #3B82F6, #8B5CF6); 
                  color: white; text-decoration: none; border-radius: 30px; margin-top: 20px;">
          Explore Services
        </a>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"NexGen IT Solutions" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Welcome to NexGen IT Solutions!",
    html,
  });
}
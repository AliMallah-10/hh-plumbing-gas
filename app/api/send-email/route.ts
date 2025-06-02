// app/api/send-email/route.ts
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

interface RequestBody {
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
  serviceName: string;
  typeName: string;
  brandName: string;
  modelName: string;
  startingPrice: number | null;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const {
      name,
      email,
      phone,
      address,
      postcode,
      serviceName,
      typeName,
      brandName,
      modelName,
      startingPrice,
    } = body;

    // ─── 1) Create a "login" transporter with App Password ──────────────────
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER, // e.g. "owner@gmail.com"
        pass: process.env.GMAIL_APP_PASSWORD, // the 16-char App Password
      },
    });

    // ─── 2) Compose the email HTML/text ───────────────────────────────────
    // ─── 2) Compose the email HTML/text ───────────────────────────────────
    const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      /* Reset & Base */
      body, html {
        margin: 0;
        padding: 0;
        width: 100%;
        background-color: #374151; /* slate-700 */
        color: #ffffff; /* white text */
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      }
      .wrapper {
        padding: 20px 0;
      }
      .email-container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #1f2937; /* slightly darker for inner card */
        border-radius: 8px;
        overflow: hidden;
      }
      /* Header */
      .header {
        background-color: #111827; /* even darker slate */
        padding: 20px;
        text-align: center;
      }
      .header h1 {
        margin: 0;
        font-size: 24px;
        letter-spacing: 1px;
        color: #fbbf24; /* amber-400 for a golden pop */
      }
      /* Body */
      .body {
        padding: 24px;
      }
      .section-title {
        font-size: 18px;
        margin-bottom: 12px;
        color: #fbbf24; /* amber-400 */
        border-bottom: 2px solid #4b5563; /* slate-600 */
        padding-bottom: 6px;
        display: inline-block;
      }
      .detail-row {
        display: flex;
        align-items: center;
        margin-bottom: 12px;
      }
      .icon {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        fill: #fbbf24; /* amber-400 for icons */
        flex-shrink: 0;
      }
      .detail-label {
        font-weight: 600;
        width: 120px;
        color: #d1d5db; /* slate-300 */
      }
      .detail-value {
        color: #ffffff;
        word-break: break-word;
      }
      .divider {
        border-top: 1px solid #4b5563; /* slate-600 */
        margin: 20px 0;
      }
      /* Footer */
      .footer {
        text-align: center;
        font-size: 12px;
        color: #9ca3af; /* slate-400 */
        padding: 16px;
      }
      .btn {
        display: inline-block;
        margin-top: 16px;
        padding: 12px 24px;
        background-color: #fbbf24; /* amber-400 */
        color: #111827; /* dark text for contrast */
        text-decoration: none;
        border-radius: 4px;
        font-weight: 600;
        font-size: 14px;
      }
      @media screen and (max-width: 600px) {
        .detail-row {
          flex-direction: column;
          align-items: flex-start;
        }
        .detail-label {
          margin-bottom: 4px;
        }
      }
    </style>
  </head>
  <body>
    <div class="wrapper">
      <div class="email-container">
        <!-- Header -->
        <div class="header">
          <h1>New Quote Request</h1>
        </div>

        <!-- Body -->
        <div class="body">
          <!-- Service Details Section -->
          <div class="section-title">Service Details</div>
          
          <div class="detail-row">
            <!-- Icon: Clipboard List -->
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M9 2H15V4H19C20.1046 4 21 4.8954 21 6V20C21 21.1046 20.1046 22 19 22H5C3.8954 22 3 21.1046 3 20V6C3 4.8954 3.8954 4 5 4H9V2ZM11 4H13V6H11V4ZM5 6V20H19V6H17V8H7V6H5ZM7 10H17V12H7V10ZM7 14H17V16H7V14ZM7 18H12V20H7V18Z" />
            </svg>
            <div class="detail-label">Service:</div>
            <div class="detail-value" style="margin-left: 8px;">${serviceName}</div>
          </div>

          <div class="detail-row">
            <!-- Icon: Categories -->
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M4 4H10V10H4V4Z M14 4H20V10H14V4Z M4 14H10V20H4V14Z M14 14H20V20H14V14Z" />
            </svg>
            <div class="detail-label">Type:</div>
            <div class="detail-value" style="margin-left: 8px;">${typeName}</div>
          </div>

          <div class="detail-row">
            <!-- Icon: Tag -->
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2 7.75V2H7.75L17.81 12.06C18.2 12.45 18.2 13.08 17.81 13.47L13.47 17.81C13.08 18.2 12.45 18.2 12.06 17.81L2 7.75ZM6 4H4V6L10.06 12.06L12 10.12L6 4Z M15 2H22V9L12.94 18.06L10 15.12L19.06 6H15V2Z" />
            </svg>
            <div class="detail-label">Brand:</div>
            <div class="detail-value" style="margin-left: 8px;">${brandName}</div>
          </div>

          <div class="detail-row">
            <!-- Icon: Box -->
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M3 9.4L12 14L21 9.4V5L12 9.6L3 5V9.4ZM5 7.81L12 11.13L19 7.81V6.19L12 9.5L5 6.19V7.81ZM21 10.27L12 14.87L3 10.27V18C3 19.1 3.9 20 5 20H19C20.1 20 21 19.1 21 18V10.27Z" />
            </svg>
            <div class="detail-label">Model:</div>
            <div class="detail-value" style="margin-left: 8px;">${modelName}</div>
          </div>

          ${
            startingPrice !== null
              ? `
            <div class="detail-row">
              <!-- Icon: Currency Pound -->
              <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M12 1C6.477 1 2 5.477 2 11C2 16.523 6.477 21 12 21S22 16.523 22 11C22 5.477 17.523 1 12 1ZM12 19C7.589 19 4 15.411 4 11C4 6.589 7.589 3 12 3C16.411 3 20 6.589 20 11C20 15.411 16.411 19 12 19ZM13 7H11V9H9V11H11V13H9V15H11V17H13V15H15V13H13V11H15V9H13V7Z" />
              </svg>
              <div class="detail-label">Starting Price:</div>
              <div class="detail-value" style="margin-left: 8px;">£${startingPrice}</div>
            </div>
          `
              : ``
          }

          <div class="divider"></div>

          <!-- Contact Details Section -->
          <div class="section-title">Contact Details</div>

          <div class="detail-row">
            <!-- Icon: User -->
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2C14.7614 2 17 4.2386 17 7C17 9.7614 14.7614 12 12 12C9.2386 12 7 9.7614 7 7C7 4.2386 9.2386 2 12 2ZM12 0C8.134 0 5 3.134 5 7C5 10.866 8.134 14 12 14C15.866 14 19 10.866 19 7C19 3.134 15.866 0 12 0ZM4 22C4 17.5817 7.5817 14 12 14C16.4183 14 20 17.5817 20 22H18C18 17.5817 14.4183 14 10 14C5.5817 14 2 17.5817 2 22H4Z" />
            </svg>
            <div class="detail-label">Name:</div>
            <div class="detail-value" style="margin-left: 8px;">${name}</div>
          </div>

          <div class="detail-row">
            <!-- Icon: Envelope -->
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M20 4H4C2.8954 4 2 4.8954 2 6V18C2 19.1046 2.8954 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.8954 21.1046 4 20 4ZM20 6L12 11L4 6V6.01L12 11.01L20 6.01V6ZM4 18V8L12 13L20 8V18H4Z" />
            </svg>
            <div class="detail-label">Email:</div>
            <div class="detail-value" style="margin-left: 8px;">${email}</div>
          </div>

          <div class="detail-row">
            <!-- Icon: Phone -->
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M6.62 10.79C8.06 13.75 10.25 15.94 13.21 17.38L15.27 15.32C15.51 15.08 15.84 14.98 16.17 15.02C17.21 15.14 18.29 15.21 19.4 15.21C19.78 15.21 20.08 15.51 20.08 15.89V20.08C20.08 20.46 19.78 20.76 19.4 20.76C9.55 20.76 1.24 12.45 1.24 2.6C1.24 2.22 1.54 1.92 1.92 1.92H6.11C6.49 1.92 6.79 2.22 6.79 2.6C6.79 3.71 6.86 4.79 6.98 5.83C7.02 6.16 6.92 6.49 6.68 6.73L4.62 8.79C4.46 8.95 4.43 9.2 4.53 9.43C5.02 10.45 5.66 11.4 6.43 12.3C6.54 12.42 6.66 12.49 6.79 12.49C6.83 12.49 6.88 12.48 6.92 12.47L6.62 10.79Z" />
            </svg>
            <div class="detail-label">Phone:</div>
            <div class="detail-value" style="margin-left: 8px;">${phone}</div>
          </div>

          <div class="detail-row">
            <!-- Icon: Map Pin -->
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" />
            </svg>
            <div class="detail-label">Address:</div>
            <div class="detail-value" style="margin-left: 8px;">${address}</div>
          </div>

          <div class="detail-row">
            <!-- Icon: Location Marker -->
            <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M17 3H7C5.8954 3 5 3.8954 5 5V19C5 20.1046 5.8954 21 7 21H17C18.1046 21 19 20.1046 19 19V5C19 3.8954 18.1046 3 17 3ZM17 19H7V5H17V19ZM12 17C14.7614 17 17 14.7614 17 12C17 9.2386 14.7614 7 12 7C9.2386 7 7 9.2386 7 12C7 14.7614 9.2386 17 12 17ZM12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9Z" />
            </svg>
            <div class="detail-label">Postcode:</div>
            <div class="detail-value" style="margin-left: 8px;">${postcode}</div>
          </div>

          <div class="divider"></div>

          <!-- Timestamp -->
          <div style="text-align: center; font-size: 12px; color: #9ca3af;">
            Sent on ${new Date().toLocaleString()}
          </div>
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>If you need to respond, simply hit “Reply” and your message will be sent directly to the requester.</p>
          <a href="mailto:${email}" class="btn">Reply to ${name}</a>
        </div>
      </div>
    </div>
  </body>
  </html>
`;

    // ─── 3) Actually send the email ────────────────────────────────────────
    const info = await transporter.sendMail({
      from: `"Website Quote" <${process.env.GMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL, // client’s chosen recipient
      replyTo: email, // so you can reply directly to the user
      subject: `Quote Request from ${name}`,
      html: htmlContent,
    });

    console.log("Request Submitted Successfully");
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("🚨 Error sending email:", err);
    return NextResponse.json(
      { success: false, error: err.message || String(err) },
      { status: 500 }
    );
  }
}

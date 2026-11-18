import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, service, details } = req.body;

  // Basic validation
  if (!name || !email || !service) {
    return res.status(400).json({ error: 'Missing required fields: name, email, service' });
  }

  // Create transporter using Gmail SMTP + App Password
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,       // mazhars.designs@gmail.com
      pass: process.env.SMTP_APP_PASSWORD, // 16-digit app password
    },
  });

  // Build the email
  const mailOptions = {
    from: `"Mazhar Creative Agency" <${process.env.SMTP_EMAIL}>`,
    to: process.env.SMTP_EMAIL, // Send to yourself
    replyTo: email,             // So you can reply directly to the client
    subject: `🟡 New Enquiry from ${name} — ${service}`,
    text: [
      `New enquiry received from your website`,
      ``,
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Service: ${service}`,
      `Message: ${details || 'N/A'}`,
      ``,
      `---`,
      `This email was sent from the contact form at mazharcreativeagency.com`,
    ].join('\n'),
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #faf6ee; border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #1c1a16, #2a2520); padding: 32px 28px;">
          <h1 style="color: #D4AF37; font-size: 22px; margin: 0 0 4px 0;">New Client Enquiry</h1>
          <p style="color: rgba(255,255,255,0.5); font-size: 13px; margin: 0;">From your website contact form</p>
        </div>
        <div style="padding: 28px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.15); color: #B8901F; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; width: 100px; vertical-align: top;">Name</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.15); color: #1c1a16; font-size: 15px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.15); color: #B8901F; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.15); color: #1c1a16; font-size: 15px;"><a href="mailto:${email}" style="color: #1c1a16;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.15); color: #B8901F; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Service</td>
              <td style="padding: 12px 0; border-bottom: 1px solid rgba(212,175,55,0.15); color: #1c1a16; font-size: 15px;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #B8901F; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; vertical-align: top;">Message</td>
              <td style="padding: 12px 0; color: #1c1a16; font-size: 15px; line-height: 1.6;">${details || '<span style="color: rgba(28,26,22,0.3);">No message provided</span>'}</td>
            </tr>
          </table>
          <div style="margin-top: 24px; padding: 16px; background: rgba(212,175,55,0.08); border-radius: 10px; border: 1px solid rgba(212,175,55,0.15);">
            <p style="margin: 0; font-size: 13px; color: rgba(28,26,22,0.5);">💡 <strong>Tip:</strong> Hit reply to respond directly to <strong>${name}</strong> at ${email}</p>
          </div>
        </div>
        <div style="padding: 16px 28px; background: rgba(28,26,22,0.03); border-top: 1px solid rgba(212,175,55,0.1);">
          <p style="margin: 0; font-size: 11px; color: rgba(28,26,22,0.3); text-align: center;">Mazhar Creative Agency • Contact Form Notification</p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({ error: 'Failed to send email. Please try again.' });
  }
}

const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

// @desc    Send email notification for contact form submission
const sendContactNotification = async (contactData) => {
  const message = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${contactData.name}</p>
    <p><strong>Email:</strong> ${contactData.email}</p>
    <p><strong>Phone:</strong> ${contactData.phone || 'N/A'}</p>
    <p><strong>Subject:</strong> ${contactData.subject || 'N/A'}</p>
    <p><strong>Message:</strong></p>
    <p>${contactData.message}</p>
    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
  `;

  const mailOptions = {
    from: `"${process.env.FROM_NAME}" <${process.env.SMTP_EMAIL}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission: ${contactData.subject || 'No Subject'}`,
    html: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact notification email sent');
  } catch (error) {
    console.error('Error sending contact notification:', error.message);
  }
};

// @desc    Send email notification for membership application
const sendMembershipNotification = async (membershipData) => {
  const message = `
    <h2>New Membership Application</h2>
    <p><strong>Name:</strong> ${membershipData.firstName} ${membershipData.lastName}</p>
    <p><strong>Email:</strong> ${membershipData.email}</p>
    <p><strong>Phone:</strong> ${membershipData.phone || 'N/A'}</p>
    <p><strong>Organization:</strong> ${membershipData.organization || 'N/A'}</p>
    <p><strong>Position:</strong> ${membershipData.position || 'N/A'}</p>
    <p><strong>Membership Category:</strong> ${membershipData.membershipCategory}</p>
    <p><strong>Motivation:</strong></p>
    <p>${membershipData.motivation}</p>
    <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
  `;

  const mailOptions = {
    from: `"${process.env.FROM_NAME}" <${process.env.SMTP_EMAIL}>`,
    to: process.env.ADMIN_EMAIL,
    subject: `New Membership Application: ${membershipData.firstName} ${membershipData.lastName}`,
    html: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Membership notification email sent');
  } catch (error) {
    console.error('Error sending membership notification:', error.message);
  }
};

// @desc    Send auto-reply to contact form submitter
const sendContactAutoReply = async (contactData) => {
  const message = `
    <h2>Thank You for Contacting NABW</h2>
    <p>Dear ${contactData.name},</p>
    <p>We have received your message and will respond to you as soon as possible.</p>
    <p><strong>Your Message:</strong></p>
    <p>${contactData.message}</p>
    <p>Thank you for reaching out to the National Association of Business Women.</p>
    <p>Best regards,<br>The NABW Team</p>
  `;

  const mailOptions = {
    from: `"${process.env.FROM_NAME}" <${process.env.SMTP_EMAIL}>`,
    to: contactData.email,
    subject: 'Thank You for Your Message - NABW',
    html: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Contact auto-reply sent');
  } catch (error) {
    console.error('Error sending auto-reply:', error.message);
  }
};

module.exports = {
  sendContactNotification,
  sendMembershipNotification,
  sendContactAutoReply,
};

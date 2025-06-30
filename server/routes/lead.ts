import { Router } from "express";
import { z } from "zod";
import SibApiV3Sdk from "sib-api-v3-sdk";

// Debug: Print all environment variables at startup
console.log("[ENV]", JSON.stringify(process.env, null, 2));

const router = Router();

const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  projectDescription: z.string().min(1),
});

// Debug: Print API key at startup
console.log("[Brevo] Using API Key:", process.env.BREVO_API_KEY ? process.env.BREVO_API_KEY.slice(0, 12) + '...' : 'NOT SET');

SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

router.post("/", async (req, res) => {
  try {
    const data = leadSchema.parse(req.body);

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "New Project Inquiry";
    sendSmtpEmail.htmlContent = `<b>Name:</b> ${data.name}<br/><b>Email:</b> ${data.email}<br/><b>Phone:</b> ${data.phone}<br/><br/><b>Project Description:</b><br/>${data.projectDescription}`;
    sendSmtpEmail.textContent = `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\n\nProject Description:\n${data.projectDescription}`;
    sendSmtpEmail.sender = { name: "Website Lead", email: process.env.LEAD_EMAIL_TO || "no-reply@example.com" };
    sendSmtpEmail.to = [{ email: process.env.LEAD_EMAIL_TO || "your@email.com" }];

    // Debug: Print email payload
    console.log("[Brevo] Sending email:", JSON.stringify(sendSmtpEmail, null, 2));

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.json({ success: true, message: "Lead email sent successfully" });
  } catch (error: any) {
    // Debug: Print full error
    console.error("[Brevo] Error sending email:", error, error?.response?.body);
    res.status(400).json({ success: false, message: error.message || "Failed to send email", details: error?.response?.body });
  }
});

// Contact form route
router.post("/contact", async (req, res) => {
  try {
    const { name, email, message, phone } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "Name, email, and message are required." });
    }

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "New Contact Message";
    sendSmtpEmail.htmlContent = `<b>Name:</b> ${name}<br/><b>Email:</b> ${email}<br/><b>Phone:</b> ${phone || ''}<br/><br/><b>Message:</b><br/>${message}`;
    sendSmtpEmail.textContent = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || ''}\n\nMessage:\n${message}`;
    sendSmtpEmail.sender = { name: "Website Contact", email: process.env.LEAD_EMAIL_TO || "no-reply@example.com" };
    sendSmtpEmail.to = [{ email: process.env.LEAD_EMAIL_TO || "your@email.com" }];

    // Debug: Print email payload
    console.log("[Brevo] Sending contact email:", JSON.stringify(sendSmtpEmail, null, 2));

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.json({ success: true, message: "Contact email sent successfully" });
  } catch (error: any) {
    // Debug: Print full error
    console.error("[Brevo] Error sending contact email:", error, error?.response?.body);
    res.status(400).json({ success: false, message: error.message || "Failed to send contact email", details: error?.response?.body });
  }
});

export default router; 
import { Router } from "express";
import { z } from "zod";
import SibApiV3Sdk from "sib-api-v3-sdk";

const router = Router();

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

SibApiV3Sdk.ApiClient.instance.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

router.post("/", async (req, res) => {
  try {
    const { name, email, message, phone, company, projectType, budget, timeline } = contactSchema.parse(req.body);
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "New Contact Message";
    sendSmtpEmail.htmlContent = `
      <b>Name:</b> ${name}<br/>
      <b>Email:</b> ${email}<br/>
      <b>Phone:</b> ${phone || ''}<br/>
      <b>Company:</b> ${company || ''}<br/>
      <b>Project Type:</b> ${projectType || ''}<br/>
      <b>Budget:</b> ${budget || ''}<br/>
      <b>Timeline:</b> ${timeline || ''}<br/>
      <br/><b>Message:</b><br/>${message}
    `;
    sendSmtpEmail.textContent = `
Name: ${name}
Email: ${email}
Phone: ${phone || ''}
Company: ${company || ''}
Project Type: ${projectType || ''}
Budget: ${budget || ''}
Timeline: ${timeline || ''}

Message:
${message}
    `;
    sendSmtpEmail.sender = { name: "Website Contact", email: process.env.LEAD_EMAIL_TO || "no-reply@example.com" };
    sendSmtpEmail.to = [{ email: process.env.LEAD_EMAIL_TO || "your@email.com" }];
    await apiInstance.sendTransacEmail(sendSmtpEmail);
    res.json({ success: true, message: "Contact email sent successfully" });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message || "Failed to send contact email", details: error?.response?.body });
  }
});

export default router; 
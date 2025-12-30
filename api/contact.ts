
import { z } from "zod";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ message: "Missing RESEND_API_KEY" });
    }

    if (!process.env.CONTACT_TO_EMAIL) {
      return res.status(500).json({ message: "Missing CONTACT_TO_EMAIL" });
    }

    await resend.emails.send({
      from: "Kalvan <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      subject: `New contact from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


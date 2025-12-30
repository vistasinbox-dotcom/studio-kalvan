import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { name, email, message } = req.body ?? {};

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY missing");
      return res.status(500).json({ message: "Server misconfigured" });
    }

    if (!process.env.CONTACT_TO_EMAIL) {
      console.error("CONTACT_TO_EMAIL missing");
      return res.status(500).json({ message: "Server misconfigured" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "Kalvan <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL],
      subject: `New inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if ((result as any)?.error) {
      console.error("Resend error:", (result as any).error);
      return res.status(500).json({ message: "Email failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact handler crash:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

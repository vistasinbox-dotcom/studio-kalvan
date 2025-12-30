import { Resend } from "resend";

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    const body = req.body || {};
    const name = body.name;
    const email = body.email;
    const message = body.message;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL;

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY missing");
      return res.status(500).json({ message: "Server misconfigured" });
    }

    if (!CONTACT_TO_EMAIL) {
      console.error("CONTACT_TO_EMAIL missing");
      return res.status(500).json({ message: "Server misconfigured" });
    }

    const resend = new Resend(RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "Kalvan <onboarding@resend.dev>",
      to: [CONTACT_TO_EMAIL],
      subject: `New contact from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if ((result as any)?.error) {
      console.error("Resend error:", (result as any).error);
      return res.status(500).json({ message: "Email failed" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Contact API crash:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

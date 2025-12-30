import { Resend } from "resend";

export default async function handler(req: any, res: any) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method Not Allowed" });
    }

    console.log("ENV_KEYS_SAMPLE", Object.keys(process.env || {}).slice(0, 25));
    console.log("HAS_RESEND_API_KEY", !!process.env.RESEND_API_KEY);
    console.log("CONTACT_TO_EMAIL_VALUE", process.env.CONTACT_TO_EMAIL);

    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (!process.env.CONTACT_TO_EMAIL) {
      console.error("CONTACT_TO_EMAIL missing");
      return res.status(500).json({ message: "CONTACT_TO_EMAIL missing" });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY missing");
      return res.status(500).json({ message: "RESEND_API_KEY missing" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const result = await resend.emails.send({
      from: "Kalvan <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL],
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

import { storage } from "../server/storage";
import { api } from "../shared/routes";
import { z } from "zod";
import { Resend } from "resend";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  await resend.emails.send({
    from: "Kalvan <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL!,
    subject: `New contact: ${name}`,
    replyTo: email,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  return res.status(200).json({ ok: true });
}


export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const input = api.contact.submit.input.parse(req.body);
    const submission = await storage.createContactSubmission(input);
    return res.status(201).json(submission);
  } catch (err: any) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err.errors[0]?.message ?? "Validation error",
        field: err.errors[0]?.path?.join(".") ?? "",
      });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


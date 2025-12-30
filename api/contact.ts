import { storage } from "../server/storage";
import { api } from "../shared/routes";
import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // 1) Validate input using your existing zod schema
    const input = api.contact.submit.input.parse(req.body);

    // 2) Save submission (since your project already supports this)
    const submission = await storage.createContactSubmission(input);

    // 3) Send email
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ message: "Missing RESEND_API_KEY" });
    }
    if (!process.env.CONTACT_TO_EMAIL) {
      return res.status(500).json({ message: "Missing CONTACT_TO_EMAIL" });
    }

    await resend.emails.send({
      from: "Kalvan <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL,
      subject: `New contact: ${input.name}`,
      replyTo: input.email,
      text: `Name: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
    });

    // 4) Respond OK
    return res.status(201).json({ ok: true, submission });
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

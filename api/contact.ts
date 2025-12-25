import { storage } from "../server/storage";
import { api } from "../shared/routes";
import { z } from "zod";

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

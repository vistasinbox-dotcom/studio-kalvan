import { contactSubmissions, type ContactSubmission, type InsertContact } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  createContactSubmission(contact: InsertContact): Promise<ContactSubmission>;
}

export class DatabaseStorage implements IStorage {
  async createContactSubmission(insertContact: InsertContact): Promise<ContactSubmission> {
    const [submission] = await db
      .insert(contactSubmissions)
      .values(insertContact)
      .returning();
    return submission;
  }
}

export const storage = new DatabaseStorage();

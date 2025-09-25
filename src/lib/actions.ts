"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { analyzeEntryTone } from "@/ai/flows/analyze-entry-tone";
import { saveEntry as saveEntryToDb } from "@/lib/data";

export const entrySchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters." }),
});

export type FormState = {
  message: string;
  errors?: {
    title?: string[];
    content?: string[];
  };
  fieldValues?: {
    title: string;
    content: string;
  };
};

export async function createEntry(prevState: FormState, formData: FormData) {
  const validatedFields = entrySchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed. Please check your input.",
      errors: validatedFields.error.flatten().fieldErrors,
      fieldValues: {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
      },
    };
  }

  const { title, content } = validatedFields.data;

  try {
    const { tone, reason } = await analyzeEntryTone({ entryText: content });

    await saveEntryToDb({
      title,
      content,
      tone,
      toneReason: reason,
    });
  } catch (error) {
    console.error("Error creating entry:", error);
    return {
      message: "An unexpected error occurred while saving the entry.",
      fieldValues: {
        title,
        content,
      },
    };
  }

  revalidatePath("/");
  redirect("/");
}

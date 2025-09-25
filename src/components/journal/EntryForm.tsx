"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { createEntry } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {pending ? "Saving..." : "Save Entry"}
    </Button>
  );
}

export default function EntryForm() {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(createEntry, initialState);
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.errors) {
      toast({
        variant: "destructive",
        title: "Could not save entry",
        description:
          state.errors.title?.[0] ||
          state.errors.content?.[0] ||
          state.message,
      });
    }
  }, [state, toast]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder="A new day, a new thought"
          required
          aria-describedby="title-error"
          defaultValue={state.fieldValues?.title}
        />
        {state.errors?.title && (
          <p id="title-error" className="text-sm font-medium text-destructive">
            {state.errors.title[0]}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          name="content"
          placeholder="Pour your thoughts out here..."
          rows={12}
          required
          aria-describedby="content-error"
          defaultValue={state.fieldValues?.content}
        />
        {state.errors?.content && (
          <p id="content-error" className="text-sm font-medium text-destructive">
            {state.errors.content[0]}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button variant="ghost" type="button" onClick={() => router.back()}>
          Cancel
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}

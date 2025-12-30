import { useMutation } from "@tanstack/react-query";
import { type InsertContact } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useContactSubmission() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertContact) => {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Contact submission failed:", text);
        throw new Error("Failed to submit inquiry. Please try again.");
      }

      return await res.json();
    },

    onSuccess: () => {
      toast({
        title: "Inquiry Received",
        description: "Thank you for contacting Kalvan Works. We will respond shortly.",
      });
    },

    onError: (error: Error) => {
      toast({
        title: "Submission Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

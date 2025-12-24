import { useMutation } from "@tanstack/react-query";
import { api, type InsertContact } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useContactSubmission() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertContact) => {
      const validated = api.contact.submit.input.parse(data);
      
      const res = await fetch(api.contact.submit.path, {
        method: api.contact.submit.method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400 || res.status === 500) {
          // In a real app we'd parse the specific error schema
          // const error = await res.json();
          throw new Error("Failed to submit inquiry. Please try again.");
        }
        throw new Error("An unexpected error occurred.");
      }

      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Received",
        description: "Thank you for contacting Kalvan Works. We will respond shortly.",
        variant: "default", 
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

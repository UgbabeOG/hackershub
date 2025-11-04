"use client";

import { useFormStatus } from "react-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitCase, type FormState } from "@/app/actions/submit-case";
import { useEffect, useRef, useState, useActionState } from "react";
import { Loader2 } from "lucide-react";
import { AIAnalysisResult } from "./ai-analysis-result";
import { useToast } from "@/hooks/use-toast";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Analyze Case
    </Button>
  );
}

const initialState: FormState = {
  message: "",
};

export function CaseSubmissionSheet({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formState, formAction] = useActionState(submitCase, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.message === "success") {
      // Form was successful, AI analysis is available
    } else if (formState.message === 'An unexpected error occurred.' || formState.message === "Validation failed") {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: formState.error,
      });
    }
  }, [formState, toast]);

  const handleReset = () => {
      formRef.current?.reset();
      // A bit of a hack to reset useFormState
      formAction(new FormData());
  }

  const handleOpenChange = (open: boolean) => {
    if(!open) {
        handleReset();
    }
    setIsOpen(open);
  }

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="sm:max-w-2xl w-full">
        <SheetHeader>
          <SheetTitle>Submit a New Fraud Case</SheetTitle>
          <SheetDescription>
            Provide as much detail as possible for our AI to analyze.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          {formState.message === "success" && formState.analysis ? (
            <AIAnalysisResult analysis={formState.analysis} onReset={handleReset} />
          ) : (
            <form ref={formRef} action={formAction} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="case-details">Case Details</Label>
                <Textarea
                  id="case-details"
                  name="caseDetails"
                  placeholder="Describe the incident, including dates, amounts, communication, and any other relevant information."
                  className="min-h-[200px]"
                />
                 {formState.fieldErrors?.caseDetails && (
                    <p className="text-sm font-medium text-destructive">
                        {formState.fieldErrors.caseDetails.join(", ")}
                    </p>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Note: For security reasons, please do not include sensitive personal information like passwords or full credit card numbers. You can upload documents separately via our secure portal after submission.
              </p>
              <SheetFooter>
                <SubmitButton />
              </SheetFooter>
            </form>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

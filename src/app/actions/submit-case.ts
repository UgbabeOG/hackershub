"use server";

import { z } from "zod";
import { analyzeFraudCase, type FraudAnalysisOutput } from "@/ai/flows/ai-aided-fraud-analysis";

const schema = z.object({
  caseDetails: z.string().min(50, { message: "Please provide a detailed description of at least 50 characters." }),
});

export type FormState = {
  message: string;
  analysis?: FraudAnalysisOutput | null;
  error?: string | null;
  fieldErrors?: {
    caseDetails?: string[];
  }
}

export async function submitCase(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = schema.safeParse({
    caseDetails: formData.get("caseDetails"),
  });

  if (!validatedFields.success) {
    return {
      message: "Validation failed",
      error: "Please check the form for errors.",
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const analysisResult = await analyzeFraudCase({
      caseDetails: validatedFields.data.caseDetails,
    });
    
    if (!analysisResult) {
        return {
            message: "AI analysis failed.",
            error: "The AI could not process the case details. Please try again later.",
        };
    }

    return { message: "success", analysis: analysisResult };
  } catch (e) {
    console.error(e);
    return {
      message: "An unexpected error occurred.",
      error: "Could not submit case. Please try again later.",
    };
  }
}

import type { FraudAnalysisOutput } from "@/ai/flows/ai-aided-fraud-analysis";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, Gavel, FilePlus } from "lucide-react";

type AIAnalysisResultProps = {
  analysis: FraudAnalysisOutput;
  onReset: () => void;
};

export function AIAnalysisResult({ analysis, onReset }: AIAnalysisResultProps) {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-900 rounded-lg text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-600 dark:text-green-400 mb-2" />
        <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">AI Analysis Complete</h3>
        <p className="text-sm text-green-700 dark:text-green-300">
          We've identified potential pathways to recover your funds.
        </p>
      </div>

      <Accordion type="single" collapsible defaultValue="pathways" className="w-full">
        <AccordionItem value="pathways">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary"/>
                Potential Recovery Pathways
            </div>
          </AccordionTrigger>
          <AccordionContent className="prose prose-sm dark:prose-invert">
            <p>{analysis.potentialRecoveryPathways}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="risks">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary"/>
                Risk Assessment
            </div>
          </AccordionTrigger>
          <AccordionContent className="prose prose-sm dark:prose-invert">
            <p>{analysis.riskAssessment}</p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="legal">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
                <Gavel className="h-5 w-5 text-primary"/>
                Legal Considerations
            </div>
          </AccordionTrigger>
          <AccordionContent className="prose prose-sm dark:prose-invert">
            <p>{analysis.legalConsiderations}</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="text-center pt-4">
        <p className="text-sm text-muted-foreground mb-4">
            Our specialists will now review this analysis and contact you through the Communication Portal.
        </p>
        <Button onClick={onReset} variant="outline">
            <FilePlus className="mr-2 h-4 w-4" /> Submit Another Case
        </Button>
      </div>
    </div>
  );
}

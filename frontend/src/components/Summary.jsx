import { useState } from "react";
import { Button } from "@/components/ui/button";

function Summary({ summary }) {
  return (
    <>
      <div className="flex flex-col m-8 gap-4 min-h-screen">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
          Summary
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          {summary}
        </p>
      </div>
      <Button size="lg" variant="default" className="fixed bottom-8 right-8">
          Generate Questions
      </Button>
    </>
  );
}

export default Summary;

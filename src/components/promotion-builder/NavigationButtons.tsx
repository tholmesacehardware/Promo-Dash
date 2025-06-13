// src/components/promotion-builder/NavigationButtons.tsx
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  promotionName: string;
  onPrevious: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
  onCreateHotsheet: () => void;
  onSubmitPromotion: () => void;
  onCompleteAndSubmit: () => void;
}

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  promotionName,
  onPrevious,
  onNext,
  onSaveDraft,
  onCreateHotsheet,
  onSubmitPromotion,
  onCompleteAndSubmit,
}) => {
  const renderNextButton = () => {
    if (currentStep < 5) {
      return (
        <Button
          onClick={onNext}
          className="bg-red-600 hover:bg-red-700"
          disabled={currentStep === 1 && !promotionName.trim()}
        >
          Next
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      );
    } else if (currentStep === 5) {
      return (
        <Button onClick={onNext} className="bg-red-600 hover:bg-red-700">
          Continue to Review
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      );
    } else {
      return (
        <Button
          onClick={onCompleteAndSubmit}
          className="bg-green-600 hover:bg-green-700"
        >
          Complete & Submit
        </Button>
      );
    }
  };

  return (
    <div className="flex justify-between pt-6 border-t border-gray-200">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={currentStep === 1}
      >
        <ChevronLeft className="w-4 h-4 mr-2" />
        Previous
      </Button>

      <div className="flex space-x-2">
        <Button variant="outline" onClick={onSaveDraft}>
          Save Draft
        </Button>
        {renderNextButton()}
      </div>
    </div>
  );
};
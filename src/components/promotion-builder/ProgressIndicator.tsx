
import React from 'react';
import { Button } from '@/components/ui/button';
import { RotateCcw } from 'lucide-react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  onReset: () => void;
}

export const ProgressIndicator = ({ currentStep, totalSteps, onReset }: ProgressIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-3">
        <p className="text-sm font-medium text-gray-900">
          Step {currentStep} of {totalSteps}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="text-gray-600 hover:text-gray-900"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    </div>
  );
};

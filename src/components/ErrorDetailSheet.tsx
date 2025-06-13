
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ErrorDetailSheetProps {
  isOpen: boolean;
  onClose: () => void;
  errorCount: number;
  errors: string[];
}

export const ErrorDetailSheet = ({ isOpen, onClose, errorCount, errors }: ErrorDetailSheetProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Promotion Errors
          </SheetTitle>
          <SheetDescription>
            {errorCount} error{errorCount !== 1 ? 's' : ''} found in this promotion
          </SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {errors.map((error, index) => (
            <div key={index} className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

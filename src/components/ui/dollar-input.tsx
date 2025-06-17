
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { useDollarAmountInput } from '@/hooks/useDollarAmountInput';
import { cn } from '@/lib/utils';

interface DollarInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const DollarInput = ({ 
  value, 
  onChange, 
  placeholder = "$0.00", 
  className,
  disabled = false 
}: DollarInputProps) => {
  const { displayValue, numericValue, handleInputChange, setValue } = useDollarAmountInput(value);

  // Sync external value changes
  useEffect(() => {
    setValue(value);
  }, [value, setValue]);

  // Notify parent of changes
  useEffect(() => {
    if (numericValue !== value) {
      onChange(numericValue);
    }
  }, [numericValue, onChange, value]);

  return (
    <Input
      type="text"
      value={displayValue}
      onChange={(e) => handleInputChange(e.target.value)}
      placeholder={placeholder}
      className={cn("font-mono", className)}
      disabled={disabled}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
        }
        // Only allow digits, backspace, delete, arrow keys, and tab
        if (!/[\d]/.test(e.key) && 
            !['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)) {
          e.preventDefault();
        }
      }}
    />
  );
};

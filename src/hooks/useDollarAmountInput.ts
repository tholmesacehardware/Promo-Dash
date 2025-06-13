
import { useState, useCallback } from 'react';

export const useDollarAmountInput = (initialValue: string = '') => {
  // Convert initial value to cents for internal state
  const parseValueToCents = (value: string): number => {
    if (!value) return 0;
    const numericValue = parseFloat(value);
    return isNaN(numericValue) ? 0 : Math.round(numericValue * 100);
  };

  const [cents, setCents] = useState(parseValueToCents(initialValue));

  // Format cents to dollar display ($0.00)
  const formatToDollar = (centsValue: number): string => {
    return `$${(centsValue / 100).toFixed(2)}`;
  };

  // Get the actual numeric value for storage
  const getValue = (): string => {
    return (cents / 100).toFixed(2);
  };

  // Get the display value with dollar sign
  const getDisplayValue = (): string => {
    return formatToDollar(cents);
  };

  // Handle input change - only allow digits
  const handleInputChange = useCallback((inputValue: string) => {
    // Remove all non-digit characters
    const digitsOnly = inputValue.replace(/\D/g, '');
    
    // Convert to number (this will be in cents)
    const newCents = parseInt(digitsOnly) || 0;
    
    setCents(newCents);
  }, []);

  // Handle external value updates (when form is updated from outside)
  const setValue = useCallback((value: string) => {
    setCents(parseValueToCents(value));
  }, []);

  return {
    displayValue: getDisplayValue(),
    numericValue: getValue(),
    handleInputChange,
    setValue
  };
};

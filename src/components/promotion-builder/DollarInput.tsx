// src/components/promotion-builder/DollarInput.tsx
import React, { useState, useEffect } from 'react';
import { TextField, TextFieldProps, InputAdornment } from '@mui/material';

interface DollarInputProps extends Omit<TextFieldProps, 'onChange' | 'value'> {
  value: string; // External value: "123.45" or ""
  onChange: (value: string) => void; // Returns: "123.45" or ""
}

export const DollarInput: React.FC<DollarInputProps> = ({ value, onChange, ...props }) => {
  // internalRawValue stores digits only, effectively representing cents (e.g., "12345" for $123.45)
  const [internalRawValue, setInternalRawValue] = useState<string>('');

  // Function to format the raw digits into a display currency string (e.g., "12345" -> "123.45")
  const formatToCurrencyDisplay = (rawDigits: string): string => {
    // If no digits, default to "0.00"
    if (rawDigits === '') {
      return '0.00';
    }

    // Pad with leading zeros to ensure at least two digits for cents (e.g., "5" -> "05")
    while (rawDigits.length < 2) {
      rawDigits = '0' + rawDigits;
    }

    // Insert decimal point two places from the right
    let dollarsPart = rawDigits.substring(0, rawDigits.length - 2);
    let centsPart = rawDigits.substring(rawDigits.length - 2);

    // Add commas to the dollar part (e.g., "12345" -> "12,345")
    dollarsPart = dollarsPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return `${dollarsPart}.${centsPart}`;
  };

  // useEffect to synchronize the external 'value' prop with the internal 'internalRawValue' state.
  // This ensures the component reflects changes from its parent or initial values.
  useEffect(() => {
    if (value) {
      // Convert external value (e.g., "123.45") to raw digits (e.g., "12345")
      const centsString = value.replace('.', '');
      setInternalRawValue(centsString);
    } else {
      setInternalRawValue(''); // Clear internal raw value if external value is empty
    }
  }, [value]); // Dependency array: re-run effect if 'value' prop changes

  // Handles user input changes in the TextField.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputRaw = event.target.value;
    // Filter the input to allow only digits. This prevents letters, symbols, etc.
    let digitsOnly = inputRaw.replace(/[^0-9]/g, '');

    // Handle special case for "0" input:
    // If user types '0' and then another digit, remove the leading '0' (e.g., "05" becomes "5")
    if (digitsOnly.length > 1 && digitsOnly.startsWith('0')) {
      digitsOnly = digitsOnly.substring(1);
    }

    // If all digits are removed (e.g., by backspace), clear internal and external values.
    if (digitsOnly === '') {
      setInternalRawValue('');
      onChange(''); // Notify parent component with an empty string
      return;
    }

    setInternalRawValue(digitsOnly); // Update internal state with the cleaned raw digits

    // Convert the raw digits to a numeric dollar value (e.g., "12345" -> 123.45)
    const numValue = parseFloat(digitsOnly) / 100;
    // Notify parent component with the formatted numeric string (e.g., "123.45")
    onChange(numValue.toFixed(2));
  };

  // Selects all text in the input field when it gains focus, allowing easy replacement.
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.target.select();
  };

  // Handles blur event: if the input is empty or effectively zero, ensure it's displayed and returned as "0.00".
  const handleBlur = () => {
    if (internalRawValue === '' || parseInt(internalRawValue, 10) === 0) {
      setInternalRawValue('00'); // Internally store "00" to represent zero cents
      onChange('0.00'); // Ensure parent gets "0.00"
    }
  };

  return (
    <TextField
      {...props} // Spreads any additional TextFieldProps passed from the parent
      // The displayed value in the TextField is always formatted as currency.
      value={formatToCurrencyDisplay(internalRawValue)}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      variant="outlined"
      InputProps={{
        // Add a dollar sign as a static adornment at the start of the input.
        startAdornment: <InputAdornment position="start">$</InputAdornment>,
        // Note: The 'placeholder' prop on TextField is not used here because the 'value'
        // prop is always set (even for empty input, it's '0.00'). The '0.00' itself
        // serves the function of a placeholder in this design.
      }}
      type="text" // Essential: forces text input to allow manual formatting control
      sx={{
        '& .MuiOutlinedInput-root': {
          borderRadius: '4px',
          backgroundColor: 'white',
          // Styles for the actual input element within the TextField
          '& input': {
            textAlign: 'right', // Align text to the right for currency values
            padding: '8px 12px', // Standard padding
          },
        },
      }}
    />
  );
};

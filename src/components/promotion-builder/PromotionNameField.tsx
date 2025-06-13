// src/components/PromotionNameField.tsx
import React from 'react';
import { TextField, Box, FormHelperText, Typography } from '@mui/material'; // Added Typography for label and helper text

interface PromotionNameFieldProps {
  promotionName: string;
  setPromotionName: (name: string) => void;
}

export const PromotionNameField = ({ promotionName, setPromotionName }: PromotionNameFieldProps) => {
  const MAX_PROMOTION_NAME_LENGTH = 100;

  return (
    <Box sx={{ mb: 3, fontFamily: 'Inter, sans-serif' }}> {/* Replaced mb-6 with mb-3 */}
      <TextField
        fullWidth
        required
        id="promotion-name"
        label="Promotion Name" // Label directly on TextField
        value={promotionName}
        onChange={(e) => setPromotionName(e.target.value)}
        placeholder="Enter promotion name"
        inputProps={{ maxLength: MAX_PROMOTION_NAME_LENGTH }}
        sx={{ mt: 1 }} // Replaced mt-1 for TextField
        helperText={
          <FormHelperText sx={{ textAlign: 'right', mx: 0, color: '#6b7280', fontSize: '0.75rem' }}> {/* Replaced text-xs text-gray-500 mt-1 */}
            This name will appear in reporting and hotsheets. ({promotionName.length}/{MAX_PROMOTION_NAME_LENGTH})
          </FormHelperText>
        }
        FormHelperTextProps={{
          sx: { ml: 'auto', textAlign: 'right', display: 'flex', justifyContent: 'flex-end' },
        }}
      />
    </Box>
  );
};

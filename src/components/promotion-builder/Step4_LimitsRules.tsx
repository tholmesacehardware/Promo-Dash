// src/components/promotion-builder/Step4_LimitsRules.tsx
import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';

interface Step4Props {
  limitPerCustomer: boolean;
  setLimitPerCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  limitPerTransaction: boolean;
  setLimitPerTransaction: React.Dispatch<React.SetStateAction<boolean>>;
  maxTotalRedemptions: boolean;
  setMaxTotalRedemptions: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Step4_LimitsRules: React.FC<Step4Props> = ({
  limitPerCustomer,
  setLimitPerCustomer,
  limitPerTransaction,
  setLimitPerTransaction,
  maxTotalRedemptions,
  setMaxTotalRedemptions,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Limits & Rules
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Set limits and rules to control how this promotion can be used.
        </Typography>
      </Box>

      <Card variant="outlined">
        <CardHeader
          title={<Typography sx={{ fontWeight: 600 }}>Customer Limits</Typography>}
          sx={{ borderBottom: '1px solid #e0e0e0', p: 2 }}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={limitPerCustomer}
                onChange={(e) => setLimitPerCustomer(e.target.checked)}
                size="small"
              />
            }
            label="Limit per customer"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={limitPerTransaction}
                onChange={(e) => setLimitPerTransaction(e.target.checked)}
                size="small"
              />
            }
            label="Limit per transaction"
          />
        </CardContent>
      </Card>

      <Card variant="outlined">
        <CardHeader
          title={<Typography sx={{ fontWeight: 600 }}>Total Redemption Limits</Typography>}
          sx={{ borderBottom: '1px solid #e0e0e0', p: 2 }}
        />
        <CardContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={maxTotalRedemptions}
                onChange={(e) => setMaxTotalRedemptions(e.target.checked)}
                size="small"
              />
            }
            label="Maximum total redemptions"
          />
        </CardContent>
      </Card>
    </Box>
  );
};
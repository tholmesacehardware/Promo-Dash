import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';

export interface CustomBadgeProps {
  color?: 'default' | 'error' | 'success';
  children: React.ReactNode;
  onClick?: () => void;
  sx?: SxProps<Theme>; // ✅ Add this line
}

export const Badge = React.forwardRef<HTMLDivElement, CustomBadgeProps>(
  ({ color = 'default', children, onClick, sx }, ref) => {
    const backgroundColor =
      color === 'error' ? '#f44336' : color === 'success' ? '#4caf50' : '#e0e0e0';
    const textColor = '#fff';

    return (
      <Box
        ref={ref}
        onClick={onClick}
        sx={{
          display: 'inline-block',
          borderRadius: '12px',
          padding: '4px 10px',
          fontSize: '0.75rem',
          fontWeight: 500,
          backgroundColor,
          color: textColor,
          cursor: onClick ? 'pointer' : 'default',
          ...sx, // ✅ Apply passed-in `sx` prop
        }}
      >
        {children}
      </Box>
    );
  }
);

Badge.displayName = 'Badge';
import * as React from 'react';
import { Button as MuiButton, ButtonProps } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

// Declare custom variants for Button
declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    ghost: true;
    outline: true;
  }
  interface ButtonPropsSizeOverrides {
    icon: true;
    sm: true;
  }
}

type CustomButtonProps = ButtonProps & {
  sx?: SxProps<Theme>;
};

export const Button = React.forwardRef<HTMLButtonElement, CustomButtonProps>(
  ({ sx, ...props }, ref) => {
    return <MuiButton ref={ref} sx={sx} {...props} />;
  }
);

Button.displayName = 'Button';
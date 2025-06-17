import * as React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { SxProps, Theme } from '@mui/system';

type CustomInputProps = TextFieldProps & {
  sx?: SxProps<Theme>;
};

export const Input = React.forwardRef<HTMLInputElement, CustomInputProps>(
  ({ sx, ...props }, ref) => {
    return <TextField inputRef={ref} sx={sx} {...props} />;
  }
);

Input.displayName = 'Input';
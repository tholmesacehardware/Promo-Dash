import * as React from 'react';
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps,
  SxProps,
  Theme,
} from '@mui/material';

type CustomSelectProps = SelectProps & {
  sx?: SxProps<Theme>;
  label?: string;
};

export const Select = React.forwardRef<HTMLDivElement, CustomSelectProps>(
  ({ sx, label, children, ...props }, ref) => (
    <FormControl fullWidth sx={sx} ref={ref}>
      {label && <InputLabel>{label}</InputLabel>}
      <MuiSelect label={label} {...props}>
        {children}
      </MuiSelect>
    </FormControl>
  )
);

Select.displayName = 'Select';

export const SelectTrigger = Select; // Alias for compatibility

export const SelectContent = ({ children }: { children: React.ReactNode }) => <>{children}</>;

export const SelectItem = ({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) => <MenuItem value={value}>{children}</MenuItem>;

export const SelectValue = ({ placeholder }: { placeholder: string }) => (
  <em style={{ opacity: 0.6 }}>{placeholder}</em>
);
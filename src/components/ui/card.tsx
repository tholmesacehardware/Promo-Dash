import React, { ReactNode, forwardRef } from 'react';
import { Paper, Box, Typography } from '@mui/material';

interface CardProps {
  children: ReactNode;
  className?: string;
  elevation?: number;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ children, className, elevation = 2 }, ref) => (
  <Paper ref={ref} className={className} elevation={elevation}>
    {children}
  </Paper>
));
Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <Box ref={ref} className={className} sx={{ p: 3, pb: 1.5 }}>
      {children}
    </Box>
  )
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, { children: ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <Typography
      ref={ref}
      variant="h5"
      component="h3"
      className={className}
      sx={{ fontWeight: 600 }}
    >
      {children}
    </Typography>
  )
);
CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<HTMLParagraphElement, { children: ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <Typography
      ref={ref}
      variant="body2"
      color="text.secondary"
      className={className}
    >
      {children}
    </Typography>
  )
);
CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <Box ref={ref} className={className} sx={{ px: 3, pt: 0, pb: 3 }}>
      {children}
    </Box>
  )
);
CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, { children: ReactNode; className?: string }>(
  ({ children, className }, ref) => (
    <Box
      ref={ref}
      className={className}
      sx={{ display: 'flex', alignItems: 'center', px: 3, pt: 0, pb: 3 }}
    >
      {children}
    </Box>
  )
);
CardFooter.displayName = 'CardFooter';
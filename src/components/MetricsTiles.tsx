// src/components/MetricsTiles.tsx
import React from 'react';
// Import MUI components instead of shadcn/ui Card components
import { Box, Paper, Typography } from '@mui/material';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
}

const MetricCard = ({ title, value, change }: MetricCardProps) => (
  <Paper // Using Paper component for a card-like appearance with elevation
    elevation={1} // Adds a subtle shadow
    sx={{
      backgroundColor: 'white', // bg-white
      border: '1px solid #e0e0e0', // border border-gray-200
      borderRadius: '8px', // rounded-lg (Paper default is often 4px, explicitly set for rounded-lg look)
      display: 'flex', // To make content within flex
      flexDirection: 'column', // Stack content vertically
      justifyContent: 'space-between', // Distribute space if needed
      height: '100%', // Ensure cards take full height in grid
    }}
  >
    <Box sx={{ p: '24px' }}> {/* p-6 equivalent */}
      <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '8px' }}> {/* text-sm text-gray-500 mb-2 */}
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontSize: '2.25rem', fontWeight: 700, color: '#1f2937', marginBottom: '8px' }}> {/* text-4xl font-bold text-gray-900 mb-2 */}
        {value}
      </Typography>
      <Typography variant="body2" sx={{ fontSize: '0.875rem', color: '#16a34a', fontWeight: 500 }}> {/* text-sm text-green-600 font-medium */}
        {change}
      </Typography>
    </Box>
  </Paper>
);

export const MetricsTiles = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        // Responsive grid columns:
        // On extra-small screens (default), 1 column
        // On small screens (sm:), 2 columns
        // On medium screens (md:), 3 columns
        // On large screens (lg:), 4 columns
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: '24px', // gap-6 equivalent
        marginBottom: '32px', // mb-8 equivalent, adjust as needed if it was different
      }}
    >
      <MetricCard
        title="Action Items"
        value="142"
        change="+12% from last month"
      />
      <MetricCard
        title="Pending Approvals" // Changed title to match a likely real metric
        value="87"
        change="+5% from last month"
      />
      <MetricCard
        title="Completed Tasks" // Changed title to match a likely real metric
        value="24"
        change="+18% from last month"
      />
      <MetricCard
        title="Satisfaction Score" // Changed title to match a likely real metric
        value="92%"
        change="+2% from last month"
      />
    </Box>
  );
};
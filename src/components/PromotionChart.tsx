// src/components/PromotionChart.tsx
import React from 'react';
import { Box, Typography } from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Sample data for the chart
const data = [
  { name: 'Jan', Sales: 4000, Revenue: 2400, Profit: 1000 },
  { name: 'Feb', Sales: 3000, Revenue: 1398, Profit: 800 },
  { name: 'Mar', Sales: 2000, Revenue: 9800, Profit: 1200 },
  { name: 'Apr', Sales: 2780, Revenue: 3908, Profit: 1500 },
  { name: 'May', Sales: 1890, Revenue: 4800, Profit: 900 },
  { name: 'Jun', Sales: 2390, Revenue: 3800, Profit: 1100 },
  { name: 'Jul', Sales: 3490, Revenue: 4300, Profit: 1300 },
];

export const PromotionChart: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb',
        p: 3,
        height: '350px', // Fixed height for demonstration
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter, sans-serif', // Apply Inter font family to the entire chart container
      }}
    >
      <Box sx={{ mb: 2 }}> {/* Wrapper for title and subtitle */}
        <Typography
          variant="h5"
          sx={{
            textAlign: 'left', // Left-justified
            color: '#1f2937', // Darker text color
            fontWeight: 700, // Bolder font weight
            textTransform: 'none', // Removed uppercase, allowing mixed case
            letterSpacing: '0.01em', // Adjusted letter spacing slightly
            fontFamily: 'inherit', // Inherit from parent Box
          }}
        >
          Promotion Performance
        </Typography>
        <Typography
          variant="body2" // Smaller variant for subtitle
          sx={{
            textAlign: 'left',
            color: '#6b7280', // Lighter color for subtitle
            mt: 0.5, // Small top margin
            fontFamily: 'inherit', // Inherit from parent Box
          }}
        >
          Monthly promotion metrics
        </Typography>
      </Box>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" /> {/* Lighter grid lines */}
          <XAxis dataKey="name" stroke="#6b7280" style={{ fontFamily: 'Inter, sans-serif' }} /> {/* Darker axis labels, explicitly set font */}
          <YAxis stroke="#6b7280" style={{ fontFamily: 'Inter, sans-serif' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255,255,255,0.9)',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontFamily: 'Inter, sans-serif', // Apply font to tooltip content
            }}
            labelStyle={{ color: '#1f2937', fontFamily: 'Inter, sans-serif' }} // Apply font to tooltip label
            itemStyle={{ color: '#1f2937', fontFamily: 'Inter, sans-serif' }} // Apply font to tooltip items
          />
          <Legend wrapperStyle={{ paddingTop: '10px', fontFamily: 'Inter, sans-serif' }} /> {/* Spacing for legend, explicitly set font */}
          <Line type="monotone" dataKey="Sales" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" dataKey="Revenue" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Profit" stroke="#ffc658" /> {/* Added a third line */}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PromotionChart;

// src/components/ActivitySidebar.tsx
import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export const ActivitySidebar = () => {
  const activities = [
    {
      id: 1,
      type: 'approval',
      message: 'Summer Tool Sale promotion approved',
      timestamp: '2 hours ago',
      icon: CheckCircle,
      color: '#16a34a' // Green-600 equivalent
    },
    {
      id: 2,
      type: 'pending',
      message: 'Paint & Supplies Discount pending review',
      timestamp: '4 hours ago',
      icon: Clock,
      color: '#eab308' // Yellow-600 equivalent
    },
    {
      id: 3,
      type: 'alert',
      message: 'Garden Center Special expires in 2 days',
      timestamp: '6 hours ago',
      icon: AlertTriangle,
      color: '#dc2626' // Red-600 equivalent
    },
    {
      id: 4,
      type: 'approval',
      message: 'Hardware Clearance promotion updated',
      timestamp: '1 day ago',
      icon: CheckCircle,
      color: '#16a34a'
    },
    {
      id: 5,
      type: 'pending',
      message: 'Seasonal Outdoor promotion submitted',
      timestamp: '1 day ago',
      icon: Clock,
      color: '#eab308'
    }
  ];

  return (
    <Box
      sx={{
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e5e7eb', // Border-gray-200 equivalent
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', // Subtle shadow
        fontFamily: 'Inter, sans-serif', // Apply Inter font family to the entire sidebar
        height: '100%', // Ensure it takes full height of its grid item
      }}
    >
      {/* CardHeader equivalent */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e5e7eb' }}>
        <Typography
          variant="h5" // Matching font size/weight from Promotion Performance title
          sx={{
            textAlign: 'left',
            color: '#1f2937', // Darker text color
            fontWeight: 700, // Bolder font weight
            textTransform: 'none', // First letter capitalized
            letterSpacing: '0.01em', // Adjusted letter spacing slightly
            fontFamily: 'inherit', // Inherit from parent Box
          }}
        >
          Recent Activities
        </Typography>
      </Box>

      {/* CardContent equivalent with List */}
      <List sx={{ p: 1 }}> {/* Reduced padding for list container */}
        {activities.map((activity) => {
          const IconComponent = activity.icon;
          return (
            <ListItem
              key={activity.id}
              sx={{
                display: 'flex',
                alignItems: 'flex-start', // Align items to the start for better icon alignment
                px: 2, // Horizontal padding for list item
                py: 1.5, // Vertical padding for list item
                borderRadius: '8px', // Rounded corners for list item hover
                '&:hover': {
                  backgroundColor: '#f9fafb', // Light gray on hover
                  transition: 'background-color 0.2s',
                },
                // Adjusting ListItem to behave more like the original flex div
                '&.MuiListItem-root': {
                  paddingTop: '0.75rem', // p-3 in Tailwind for ListItem is approx 12px vertical
                  paddingBottom: '0.75rem',
                  paddingLeft: '0.75rem', // p-3 also applies horizontal padding
                  paddingRight: '0.75rem',
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: '32px', mt: '2px' }}> {/* Space for icon */}
                <IconComponent style={{ width: 20, height: 20, color: activity.color, flexShrink: 0 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body2" // text-sm
                    sx={{
                      color: '#1f2937', // text-gray-900
                      fontWeight: 500, // font-medium
                      lineHeight: '1.25rem', // leading-5
                      fontFamily: 'inherit', // Inherit from parent Box
                    }}
                  >
                    {activity.message}
                  </Typography>
                }
                secondary={
                  <Typography
                    variant="caption" // text-xs
                    sx={{
                      color: '#6b7280', // text-gray-500
                      mt: 0.5, // mt-1
                      fontFamily: 'inherit', // Inherit from parent Box
                    }}
                  >
                    {activity.timestamp}
                  </Typography>
                }
                sx={{ ml: 1 }} // Space between icon and text
              />
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};

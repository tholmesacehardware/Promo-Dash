// src/components/ActionItemsSummary.tsx
import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

// Mock data for the Action Items cards
interface ActionItem {
  id: number;
  title: string;
  value: number | string; // Can be a number or percentage string
  change: string; // e.g., "+12% from last month"
  changeType: 'positive' | 'negative' | 'neutral'; // Used for styling the change text color
}

const mockActionItems: ActionItem[] = [
  { id: 1, title: 'Action Items', value: 142, change: '+12% from last month', changeType: 'positive' },
  { id: 2, title: 'Action Items', value: 87, change: '+5% from last month', changeType: 'positive' },
  { id: 3, title: 'Action Items', value: 24, change: '+18% from last month', changeType: 'positive' },
  { id: 4, title: 'Action Items', value: '92%', change: '+2% from last month', changeType: 'positive' },
];

const ActionItemsSummary: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1, mb: 4 }}> {/* flexGrow for responsiveness, mb for margin-bottom */}
      <Grid container spacing={3}> {/* Grid container for responsive layout with spacing */}
        {mockActionItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.id}> {/* Responsive grid items */}
            <Card
              sx={{
                borderRadius: '8px', // Rounded corners as per screenshot
                boxShadow: '0 2px 4px rgba(0,0,0,0.05)', // Subtle shadow
                height: '100%', // Ensure cards in a row have equal height
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <CardContent>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.title}
                </Typography>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600, mb: 1 }}>
                  {item.value}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: item.changeType === 'positive' ? 'success.main' : 'error.main', // Green for positive, red for negative
                  }}
                >
                  {item.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActionItemsSummary;
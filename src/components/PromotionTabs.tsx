// src/components/PromotionTabs.tsx
import React from 'react';
import { Tabs, Tab, Box, Typography } from '@mui/material'; // Added Typography to the import

interface TabItem {
  key: string;
  label: string;
  count?: number; // Optional count for tabs like "Pending Approvals (12)"
}

interface PromotionTabsProps {
  activeTab: string; // This will be the string key of the active tab
  onTabChange: (tabKey: string) => void; // Callback to update the parent's activeTab
}

export const PromotionTabs: React.FC<PromotionTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: TabItem[] = [
    { key: 'Current Promotions', label: 'Current Promotions' },
    { key: 'Pending Approvals', label: 'Pending Approvals', count: 12 }, // Example count
    { key: 'Hotsheets', label: 'Hotsheets', count: 8 }, // Changed Hotsheet to Hotsheets
  ];

  // Find the index of the active tab based on its key
  const currentTabIndex = tabs.findIndex(tab => tab.key === activeTab);
  // Default to 0 if activeTab doesn't match any key
  const value = currentTabIndex !== -1 ? currentTabIndex : 0;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    // Call onTabChange with the key of the selected tab
    onTabChange(tabs[newValue].key);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', pb: 1, fontFamily: 'Inter, sans-serif' }}>
      <Tabs
        value={value} // Use the numerical index for MUI Tabs value
        onChange={handleChange}
        aria-label="promotion tabs"
        sx={{
          minHeight: 'auto',
          '& .MuiTabs-flexContainer': {
            gap: '0px', // Reset gap to default MUI behavior
          },
          '& .MuiTabs-scroller': {
            padding: 0,
          },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={tab.key}
            value={index} // Use index as the value for individual tabs
            label={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ textTransform: 'none', fontFamily: 'inherit' }}>
                  {tab.label}
                </Typography>
                {tab.count !== undefined && (
                  <Box component="span" sx={{
                    ml: '8px',
                    px: '8px',
                    py: '2px',
                    backgroundColor: '#e0e0e0', // Light grey background for count
                    color: '#424242', // Darker text for count
                    borderRadius: '12px', // Rounded corners for count
                    fontSize: '0.75rem', // Smaller font size for count
                    fontWeight: 600,
                    fontFamily: 'inherit', // Inherit from parent Box
                  }}>
                    {tab.count}
                  </Box>
                )}
              </Box>
            }
            sx={{
              textTransform: 'none', // Keep initial case
              fontSize: '1rem',
              fontWeight: 500,
              minHeight: 'auto',
                            minWidth: 'auto',
              px: 2, // Standard horizontal padding for tabs
              py: 1, // Standard vertical padding for tabs
              color: '#6b7280', // Default text color for inactive tabs
              '&.Mui-selected': {
                color: '#1976d2', // MUI primary blue for selected tab text
                fontWeight: 600, // Slightly bolder for selected tab
                backgroundColor: 'transparent', // Ensure transparent background, indicator handles highlight
              },
              '&:hover': {
                backgroundColor: '#f5f5f5', // Subtle hover background
                opacity: 1,
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

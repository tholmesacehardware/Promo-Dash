// src/components/promotion-builder/store-selection/RegionsTab.tsx
import React from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

interface RegionsTabProps {
  selectedRegions: string[];
  setSelectedRegions: React.Dispatch<React.SetStateAction<string[]>>;
}

// Mock data for regions
const mockRegions = [
  { id: 'region-ne', name: 'Northeast', storesCount: 500 },
  { id: 'region-se', name: 'Southeast', storesCount: 700 },
  { id: 'region-mw', name: 'Midwest', storesCount: 600 },
  { id: 'region-sw', name: 'Southwest', storesCount: 450 },
  { id: 'region-w', name: 'West', storesCount: 800 },
];

export const RegionsTab: React.FC<RegionsTabProps> = ({ selectedRegions, setSelectedRegions }) => {
  const handleRegionChange = (regionId: string, checked: boolean) => {
    setSelectedRegions(prev =>
      checked ? [...prev, regionId] : prev.filter(id => id !== regionId)
    );
  };

  return (
    <Box sx={{ fontFamily: 'Inter, sans-serif' }}>
      <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Select Regions</Typography>
      <List sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', maxHeight: 250, overflowY: 'auto' }}>
        {mockRegions.map((region) => (
          <ListItem key={region.id}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedRegions.includes(region.id)}
                  onChange={(e) => handleRegionChange(region.id, e.target.checked)}
                  size="small"
                  sx={{ '& .MuiSvgIcon-root': { color: '#dc2626' } }} // Apply red color to checkbox
                />
              }
              label={
                <ListItemText
                  primary={region.name}
                  secondary={`(${region.storesCount} stores)`}
                />
              }
            />
          </ListItem>
        ))}
      </List>

      {selectedRegions.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Selected Regions ({selectedRegions.length})</Typography>
          <List sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', maxHeight: 150, overflowY: 'auto' }}>
            {selectedRegions.map((regionId) => {
              const region = mockRegions.find(r => r.id === regionId);
              return region ? (
                <ListItem key={region.id}>
                  <ListItemText primary={region.name} />
                </ListItem>
              ) : null;
            })}
          </List>
        </Box>
      )}
    </Box>
  );
};

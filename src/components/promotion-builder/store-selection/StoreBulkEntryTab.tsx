// src/components/promotion-builder/store-selection/StoreBulkEntryTab.tsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  List,      // Added import
  ListItem,  // Added import
  ListItemText, // Added import
} from '@mui/material';
import { Store } from '../Step5_StoreSelection'; // Import the Store interface

interface StoreBulkEntryTabProps {
  selectedStores: Store[];
  setSelectedStores: React.Dispatch<React.SetStateAction<Store[]>>;
}

// Mock data for stores (should match mockStores in StoreSelectTab or come from a central source)
const mockStoresData: Store[] = [
  { id: 'S001', storeNumber: '10001', storeName: 'Downtown Ace', city: 'Springfield', state: 'IL' },
  { id: 'S002', storeNumber: '10002', storeName: 'Uptown Ace', city: 'Springfield', state: 'IL' },
  { id: 'S003', storeNumber: '10003', storeName: 'Central Ace', city: 'Capital City', state: 'IL' },
  { id: 'S004', storeNumber: '20001', storeName: 'Riverside Hardware', city: 'Metropolis', state: 'NY' },
  { id: 'S005', storeNumber: '20002', storeName: 'Mountain View Supplies', city: 'Boulder', state: 'CO' },
];

export const StoreBulkEntryTab: React.FC<StoreBulkEntryTabProps> = ({ selectedStores, setSelectedStores }) => {
  const [bulkInput, setBulkInput] = useState('');

  const handleAddStores = () => {
    const enteredValues = bulkInput.split('\n').map(line => line.trim()).filter(line => line !== '');
    const newStores: Store[] = [];

    enteredValues.forEach(value => {
      // Simple lookup based on storeNumber for demonstration
      const foundStore = mockStoresData.find(store => store.storeNumber === value);
      if (foundStore && !selectedStores.some(s => s.id === foundStore.id)) {
        newStores.push(foundStore);
      }
    });

    if (newStores.length > 0) {
      setSelectedStores(prev => [...prev, ...newStores]);
      setBulkInput(''); // Clear input after adding
    }
  };

  return (
    <Box sx={{ fontFamily: 'Inter, sans-serif' }}>
      <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Paste Store Numbers (one per line)</Typography>
      <TextField
        fullWidth
        multiline
        rows={6}
        variant="outlined"
        placeholder="e.g.,
10001
10002
20001"
        value={bulkInput}
        onChange={(e) => setBulkInput(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        onClick={handleAddStores}
        sx={{
          backgroundColor: '#1f2937',
          color: 'white',
          '&:hover': { backgroundColor: '#374151' },
          px: 3,
        }}
      >
        Add Stores
      </Button>

      {selectedStores.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Selected Stores ({selectedStores.length})</Typography>
          <List sx={{ border: '1px solid #e0e0e0', borderRadius: '8px', maxHeight: 200, overflowY: 'auto' }}>
            {selectedStores.map((store) => (
              <ListItem key={store.id}>
                <ListItemText
                  primary={`${store.storeNumber} - ${store.storeName}`}
                  secondary={`${store.city}, ${store.state}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

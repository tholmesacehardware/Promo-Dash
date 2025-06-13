// src/components/promotion-builder/store-selection/StoreSelectTab.tsx
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Store, storeList } from './mockStores';

interface StoreSelectTabProps {
  selectedStores: Store[];
  setSelectedStores: React.Dispatch<React.SetStateAction<Store[]>>;
}

export const StoreSelectTab: React.FC<StoreSelectTabProps> = ({
  selectedStores,
  setSelectedStores,
}) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleAdd = (store: Store | null) => {
    if (store && !selectedStores.some((s) => s.id === store.id)) {
      setSelectedStores((prev) => [...prev, store]);
    }
    setInputValue('');
  };

  const handleRemove = (id: string) => {
    setSelectedStores((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <Box sx={{ fontFamily: 'Inter, sans-serif' }}>
      <Typography variant="body2" fontWeight={500} mb={1}>
        Search &amp; Select Stores
      </Typography>

      <Autocomplete<
        Store,
        /* multiple */ false,
        /* disableClearable */ false,
        /* freeSolo */ true
      >
        freeSolo
        openOnFocus
        inputValue={inputValue}
        onInputChange={(_, value) => setInputValue(value)}
        options={storeList}
        getOptionLabel={(option) =>
          typeof option === 'string'
            ? option
            : `${option.storeNumber} — ${option.storeName} (${option.city}, ${option.state})`
        }
        filterOptions={(options, { inputValue }) => {
          const term = inputValue.trim().toLowerCase();
          if (!term) return [];
          return options.filter((store) =>
            store.storeNumber.toLowerCase().includes(term) ||
            store.storeName.toLowerCase().includes(term) ||
            store.city.toLowerCase().includes(term) ||
            store.state.toLowerCase().includes(term)
          );
        }}
        onChange={(_, value) => {
          if (value && typeof value !== 'string') {
            handleAdd(value);
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Type store #, name, city or state"
          />
        )}
        sx={{ mb: 2 }}
      />

      {selectedStores.length > 0 && (
        <>
          <Typography variant="body2" fontWeight={500} mb={1}>
            Selected Stores ({selectedStores.length})
          </Typography>
          <List
            sx={{
              border: '1px solid #e0e0e0',
              borderRadius: 1,
              maxHeight: 200,
              overflowY: 'auto',
            }}
          >
            {selectedStores.map((store) => (
              <ListItem
                key={store.id}
                secondaryAction={
                  <IconButton edge="end" onClick={() => handleRemove(store.id)}>
                    <ClearIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={`${store.storeNumber} — ${store.storeName}`}
                  secondary={`${store.city}, ${store.state}`}
                />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Box>
  );
};
// src/components/promotion-builder/Step5_StoreSelection.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Tabs,
  Tab,
  Card,
  CardHeader,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { StoreSelectTab } from './store-selection/StoreSelectTab';
import { StoreBulkEntryTab } from './store-selection/StoreBulkEntryTab';
import { RegionsTab } from './store-selection/RegionsTab';

export interface Store {
  id: string;
  storeNumber: string;
  storeName: string;
  city: string;
  state: string;
}

interface Step5Props {
  promotionName: string;
  setPromotionName: (name: string) => void;
  onNext?: () => void;
}

const hotsheetTypes = [
  { value: 'new-promotion', label: 'New Promotion' },
  { value: 'existing-promotion-update', label: 'Existing Promotion Update' },
  { value: 'price-change', label: 'Price Change' },
  { value: 'other', label: 'Other' },
];

const departments = [
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' },
  { value: 'operations', label: 'Operations' },
  { value: 'e-commerce', label: 'E-commerce' },
];

export const Step5_StoreSelection: React.FC<Step5Props> = ({
  promotionName,
  setPromotionName,
  onNext,
}) => {
  const [currentTab, setCurrentTab] = useState<'select-stores' | 'bulk-entry' | 'regions'>(
    'select-stores'
  );
  const [selectedStores, setSelectedStores] = useState<Store[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [hotsheetType, setHotsheetType] = useState<string>('');
  const [requestorName, setRequestorName] = useState<string>('');
  const [department, setDepartment] = useState<string>('');
  const [emailAddress, setEmailAddress] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  useEffect(() => {
    setPromotionName(promotionName);
  }, [promotionName, setPromotionName]);

  const isFormValid =
    requestorName.trim() !== '' &&
    department.trim() !== '' &&
    emailAddress.trim() !== '' &&
    hotsheetType.trim() !== '';

  const handleSubmit = () => {
    if (!isFormValid) return;
    console.log('Hotsheet Request Submitted:', {
      promotionName,
      hotsheetType,
      selectedStores,
      selectedRegions,
      requestorName,
      department,
      emailAddress,
      notes,
    });
    onNext?.();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Hotsheet & Store Selection
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Configure hotsheet details and choose participating stores.
        </Typography>
      </Box>

      {/* Promotion Name */}
      <Card variant="outlined">
        <CardHeader
          title={<Typography sx={{ fontWeight: 600 }}>Promotion Name *</Typography>}
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        />
        <CardContent>
          <TextField
            fullWidth
            placeholder="Name this promotion for internal use"
            value={promotionName}
            onChange={(e) => setPromotionName(e.target.value)}
            inputProps={{ maxLength: 100 }}
            helperText={`${promotionName.length}/100`}
          />
        </CardContent>
      </Card>

      {/* Hotsheet Type */}
      <Card variant="outlined">
        <CardHeader
          title={<Typography sx={{ fontWeight: 600 }}>Hotsheet Type *</Typography>}
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        />
        <CardContent>
          <FormControl fullWidth>
            <InputLabel id="hotsheet-type-label">Select type</InputLabel>
            <Select
              labelId="hotsheet-type-label"
              value={hotsheetType}
              label="Select type"
              onChange={(e) => setHotsheetType(e.target.value)}
            >
              {hotsheetTypes.map((t) => (
                <MenuItem key={t.value} value={t.value}>
                  {t.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {/* Store Selection Tabs */}
      <Card variant="outlined">
        <CardHeader
          title={<Typography sx={{ fontWeight: 600 }}>Store Selection</Typography>}
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        />
        <CardContent>
          <Tabs
            value={currentTab}
            onChange={(_, v) => setCurrentTab(v)}
            sx={{
              mb: 3,
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTabs-indicator': { backgroundColor: '#dc2626' },
            }}
          >
            <Tab
              value="select-stores"
              label="Select Stores"
              sx={{ textTransform: 'none', color: currentTab === 'select-stores' ? '#dc2626' : '#6b7280' }}
            />
            <Tab
              value="bulk-entry"
              label="Bulk Entry"
              sx={{ textTransform: 'none', color: currentTab === 'bulk-entry' ? '#dc2626' : '#6b7280' }}
            />
            <Tab
              value="regions"
              label="Regions"
              sx={{ textTransform: 'none', color: currentTab === 'regions' ? '#dc2626' : '#6b7280' }}
            />
          </Tabs>
          {currentTab === 'select-stores' && (
            <StoreSelectTab selectedStores={selectedStores} setSelectedStores={setSelectedStores} />
          )}
          {currentTab === 'bulk-entry' && (
            <StoreBulkEntryTab selectedStores={selectedStores} setSelectedStores={setSelectedStores} />
          )}
          {currentTab === 'regions' && (
            <RegionsTab selectedRegions={selectedRegions} setSelectedRegions={setSelectedRegions} />
          )}
        </CardContent>
      </Card>

      {/* Requestor Information */}
      <Card variant="outlined">
        <CardHeader
          title={<Typography sx={{ fontWeight: 600 }}>Requestor Information</Typography>}
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        />
        <CardContent>
          <TextField
            fullWidth
            label="Full Name *"
            value={requestorName}
            onChange={(e) => setRequestorName(e.target.value)}
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="department-label">Department *</InputLabel>
            <Select
              labelId="department-label"
              value={department}
              label="Department *"
              onChange={(e) => setDepartment(e.target.value)}
            >
              {departments.map((d) => (
                <MenuItem key={d.value} value={d.value}>
                  {d.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Email Address *"
            type="email"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Description / Notes */}
      <Card variant="outlined">
        <CardHeader
          title={<Typography sx={{ fontWeight: 600 }}>Description / Notes</Typography>}
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        />
        <CardContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Internal notes…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Continue to Review Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 3 }}>
        <Button
          variant="contained"
          disabled={!isFormValid}
          onClick={handleSubmit}
          sx={{ textTransform: 'none', backgroundColor: '#dc2626', '&:hover': { backgroundColor: '#b91c1c' } }}
        >
          Continue to Review
        </Button>
      </Box>
    </Box>
  );
};
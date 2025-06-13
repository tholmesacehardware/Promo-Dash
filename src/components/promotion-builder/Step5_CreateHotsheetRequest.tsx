// src/components/promotion-builder/Step5_CreateHotsheetRequest.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
  InputAdornment,
  Chip,
  FormControlLabel,
  Button, // only if you still have file‐upload buttons here
} from '@mui/material';
import {
  Upload as UploadIcon,
  CalendarToday as CalendarIcon,
  Close as XIcon,
} from '@mui/icons-material';

interface Step5Props {
  promotionName: string;
  setPromotionName: (name: string) => void;
  onSubmit: () => void; // used by NavigationButtons
}

export const Step5_CreateHotsheetRequest: React.FC<Step5Props> = ({
  promotionName,
  setPromotionName,
  onSubmit,
}) => {
  const [hotsheetType, setHotsheetType] = useState('');
  const [promotionCode, setPromotionCode] = useState(promotionName || '');
  const [downloadDate, setDownloadDate] = useState('');
  const [allStores, setAllStores] = useState(true);
  const [storeList, setStoreList] = useState<string[]>([]);
  const [newStore, setNewStore] = useState('');
  const [notes, setNotes] = useState('');
  const [requestorName, setRequestorName] = useState('');
  const [department, setDepartment] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [additionalDocuments, setAdditionalDocuments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPromotionCode(promotionName);
  }, [promotionName]);

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

  const addStore = () => {
    const trimmed = newStore.trim();
    if (trimmed && !storeList.includes(trimmed)) {
      setStoreList([...storeList, trimmed]);
      setNewStore('');
    }
  };

  const removeStore = (storeToRemove: string) =>
    setStoreList(storeList.filter((s) => s !== storeToRemove));

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAdditionalDocuments((prev) => [...prev, ...Array.from(e.target.files)]);
    }
  };
  const removeFile = (idx: number) =>
    setAdditionalDocuments((prev) => prev.filter((_, i) => i !== idx));

  // this onSubmit will be called by your NavigationButtons → Continue to Review
  const isFormValid =
    promotionCode.trim() &&
    hotsheetType &&
    requestorName.trim() &&
    department &&
    emailAddress.trim();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Create Hotsheet Request
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Fill out the details for your hotsheet request.
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
            variant="outlined"
            placeholder="Name this promotion for internal use"
            value={promotionCode}
            onChange={(e) => setPromotionCode(e.target.value)}
            inputProps={{ maxLength: 100 }}
            helperText={`${promotionCode.length}/100`}
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

      {/* Download Date */}
      <Card variant="outlined">
        <CardHeader
          title={<Typography sx={{ fontWeight: 600 }}>Requested Download Date</Typography>}
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        />
        <CardContent>
          <TextField
            fullWidth
            type="date"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarIcon />
                </InputAdornment>
              ),
            }}
            value={downloadDate}
            onChange={(e) => setDownloadDate(e.target.value)}
          />
        </CardContent>
      </Card>

      {/* Store Selection */}
      <Card variant="outlined">
        <CardHeader
          title={<Typography sx={{ fontWeight: 600 }}>Store Selection</Typography>}
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        />
        <CardContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={allStores}
                onChange={(e) => setAllStores(e.target.checked)}
              />
            }
            label="All Stores"
          />
          {!allStores && (
            <>
              <TextField
                fullWidth
                multiline
                rows={3}
                placeholder="Enter store numbers, one per line"
                value={newStore}
                onChange={(e) => setNewStore(e.target.value)}
              />
              <Button onClick={addStore} sx={{ mt: 1 }}>
                Add Store
              </Button>
              {storeList.length > 0 && (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {storeList.map((s) => (
                    <Chip key={s} label={s} onDelete={() => removeStore(s)} />
                  ))}
                </Box>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Internal Notes */}
      <Card variant="outlined">
        <CardHeader
          title={<Typography sx={{ fontWeight: 600 }}>Hotsheet Description / Internal Notes</Typography>}
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        />
        <CardContent>
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="Add any internal notes, special instructions, or additional details..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            These notes are for internal use and will help clarify the hotsheet requirements.
          </Typography>
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
            <InputLabel id="dept-label">Department *</InputLabel>
            <Select
              labelId="dept-label"
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

      {/* Additional Documents */}
      <Card variant="outlined">
        <CardHeader
          title={<Typography sx={{ fontWeight: 600 }}>Additional Documents</Typography>}
          sx={{ borderBottom: '1px solid #e0e0e0' }}
        />
        <CardContent>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            multiple
            style={{ display: 'none' }}
          />
          <Button onClick={() => fileInputRef.current?.click()} startIcon={<UploadIcon />}>
            Upload .CSV
          </Button>
          {additionalDocuments.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {additionalDocuments.map((f, i) => (
                <Chip
                  key={i}
                  label={f.name}
                  onDelete={() => removeFile(i)}
                  deleteIcon={<XIcon />}
                />
              ))}
            </Box>
          )}
        </CardContent>
      </Card>

      {/* --- NO FOOTER HERE --- 
          Navigation (Previous / Save Draft / Continue to Review) 
          is handled by NavigationButtons */}
    </Box>
  );
};
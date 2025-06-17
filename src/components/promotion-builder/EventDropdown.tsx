// src/components/promotion-builder/EventDropdown.tsx
import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';

interface EventDropdownProps {
  selectedEvent: string;
  eventStartDate: string;
  eventEndDate: string;
  onEventChange: (eventId: string) => void;
}

export const events = [
  { id: 'back-to-school-2025', name: 'Back to School 2025', startDate: '2025-08-01', endDate: '2025-08-31' },
  { id: 'summer-sale-2025', name: 'Summer Sale 2025', startDate: '2025-06-01', endDate: '2025-08-31' },
  { id: 'spring-promo-2025', name: 'Spring Promotion 2025', startDate: '2025-03-01', endDate: '2025-05-31' }
];

export const EventDropdown = ({ selectedEvent, eventStartDate, eventEndDate, onEventChange }: EventDropdownProps) => {
  return (
    <Box sx={{ fontFamily: 'Inter, sans-serif' }}>
      <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: '#1f2937' }}>Select Event *</Typography> {/* Added title */}
      <FormControl fullWidth variant="outlined">
        <InputLabel id="event-select-label">Choose an Event</InputLabel> {/* Changed label */}
        <Select
          labelId="event-select-label"
          id="event-select"
          value={selectedEvent}
          onChange={(e) => onEventChange(e.target.value as string)}
          label="Choose an Event" // Updated label to match InputLabel
        >
          {events.map((event) => (
            <MenuItem key={event.id} value={event.id}>
              {event.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedEvent && (
        <Box sx={{ mt: 3, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: '#1f2937' }}>Start Date</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="date"
              value={eventStartDate}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: '#1f2937' }}>End Date</Typography>
            <TextField
              fullWidth
              variant="outlined"
              type="date"
              value={eventEndDate}
              InputLabelProps={{ shrink: true }}
              disabled
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

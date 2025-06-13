// src/components/promotion-builder/Step1_SelectEvent.tsx
import React from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
} from '@mui/material';
import { EventDropdown, events } from './EventDropdown'; // Assuming EventDropdown is already using MUI components

interface Step1Props {
  selectedEvent: string;
  eventStartDate: string;
  eventEndDate: string;
  promotionName: string;
  setSelectedEvent: (event: string) => void;
  setEventStartDate: (date: string) => void;
  setEventEndDate: (date: string) => void;
  setPromotionName: (name: string) => void;
}

export const Step1_SelectEvent = ({
  selectedEvent,
  eventStartDate,
  eventEndDate,
  promotionName,
  setSelectedEvent,
  setEventStartDate,
  setEventEndDate,
  setPromotionName
}: Step1Props) => {
  const handleEventChange = (eventId: string) => {
    setSelectedEvent(eventId);
    const event = events.find(e => e.id === eventId);
    if (event) {
      setEventStartDate(event.startDate);
      setEventEndDate(event.endDate);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Inter, sans-serif' }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
          Select Event & Name Promotion
        </Typography>
        <Typography variant="body2" sx={{ color: '#4b5563', mt: 0.5 }}>
          Choose an event and provide a name for your promotion.
        </Typography>
      </Box>

      <Grid container spacing={3} alignItems="flex-start"> {/* Use Grid for horizontal alignment */}
        {/* Event Selection - Left Side */}
        <Grid item xs={12} md={6}> {/* Takes full width on small screens, half on medium and up */}
          <EventDropdown
            selectedEvent={selectedEvent}
            eventStartDate={eventStartDate}
            eventEndDate={eventEndDate}
            onEventChange={handleEventChange}
          />
        </Grid>

        {/* Promotion Name - Right Side */}
        <Grid item xs={12} md={6}> {/* Takes full width on small screens, half on medium and up */}
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1, color: '#1f2937' }}>Promotion Name *</Typography>
          <TextField
            fullWidth
            id="promotion-name"
            value={promotionName}
            onChange={(e) => setPromotionName(e.target.value)}
            placeholder="Name this promotion for internal use"
            inputProps={{ maxLength: 100 }} // Use inputProps for maxLength
            variant="outlined"
          />
          <Typography variant="caption" sx={{ color: '#6b7280', mt: 0.5, display: 'block' }}>
            This will appear in hotsheets and reports. ({promotionName.length}/100)
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

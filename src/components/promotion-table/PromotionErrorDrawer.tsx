// src/components/promotion-table/PromotionErrorDrawer.tsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// These imports are kept if you eventually decide to use them within the drawer's content
// but their usage is commented out for now to ensure basic functionality.
import { ProgressIndicator } from '../promotion-builder/ProgressIndicator';
import { StepContent } from '../promotion-builder/StepContent';
import { NavigationButtons } from '../promotion-builder/NavigationButtons';

interface PromotionErrorDrawerProps {
  open: boolean;
  onClose: () => void;
  errorDetails?: {
    message?: string;
    code?: string;
    // Add other relevant error properties as needed
    // For instance, if you get structured errors from an API, define them here.
    // e.g., validationErrors?: string[];
  };
}

const PromotionErrorDrawer = ({ open, onClose, errorDetails }: PromotionErrorDrawerProps) => {

  // Default / placeholder steps array.
  // If ProgressIndicator is used here, ensure this array is meaningful for the error context.
  const steps = [
    { id: 1, title: 'Select Event' },
    { id: 2, title: 'Buy Conditions' },
    { id: 3, title: 'Get Outcomes' },
    // ... add more steps if needed, or make this empty if not showing progress
  ];
  // Placeholder values if ProgressIndicator/StepContent are used for error context
  const currentStep = 1;
  const promotionName = "N/A"; // Or retrieve from errorDetails if relevant

  const handleRetry = () => {
    console.log('Retrying operation...');
    // Add retry logic here based on the error context
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: { xs: '100%', sm: '80%', md: '60%', lg: '500px' },
          p: 0, // Control padding internally
          boxSizing: 'border-box',
        },
      }}
    >
      {/* Drawer Header */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 3,
        borderBottom: 1,
        borderColor: 'divider',
        minHeight: '64px' // Consistent height with MUI AppBars
      }}>
        <Typography variant="h5" component="h2" color="error">
          Promotion Error
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Drawer Content */}
      <Box sx={{ p: 3, overflowY: 'auto', height: 'calc(100% - 64px)' }}> {/* Adjust height for header */}
        <Typography variant="body1" sx={{ mb: 2 }}>
          An unexpected error occurred. Please review the details below.
        </Typography>

        {/* Display Error Details */}
        {(errorDetails && (errorDetails.message || errorDetails.code)) ? (
          <Box sx={{
            backgroundColor: 'error.light', // Use theme palette for error background
            color: 'error.contrastText', // Use theme palette for text color on error background
            p: 2,
            mb: 2,
            borderRadius: 1,
            wordBreak: 'break-word', // Prevent overflow for long messages
          }}>
            {errorDetails.message && (
              <Typography variant="body2" component="p" gutterBottom>
                **Message:** {errorDetails.message}
              </Typography>
            )}
            {errorDetails.code && (
              <Typography variant="body2" component="p">
                **Error Code:** {errorDetails.code}
              </Typography>
            )}
            {/* Add more error detail rendering here if your `errorDetails` object contains more */}
          </Box>
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            No specific error details available.
          </Typography>
        )}

        {/*
          // Uncomment the following section ONLY if you intend for the Error Drawer
          // to display parts of the Promotion Builder process in case of an error.
          // Remember to pass ALL required props to ProgressIndicator, StepContent, and NavigationButtons,
          // which might necessitate importing and using `usePromotionBuilder` hook here.
          // This typically means the `PromotionErrorDrawer` is more than just an error display.
          <Box sx={{ mt: 2 }}>
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={steps.length}
              onReset={() => console.log("Resetting progress in error drawer")}
            />

            <Box sx={{ my: 3 }}>
              <StepContent
                currentStep={currentStep}
                // You MUST pass all props required by StepContent here
                // Example placeholders (replace with actual logic if needed):
                selectedEvent={undefined}
                eventStartDate={null}
                eventEndDate={null}
                setSelectedEvent={() => {}}
                setEventStartDate={() => {}}
                setEventEndDate={() => {}}
                buyConditions={[]}
                setBuyConditions={() => {}}
                addBuyCondition={() => {}}
                removeBuyCondition={() => {}}
                getConditions={[]}
                setGetConditions={() => {}}
                addGetCondition={() => {}}
                removeGetCondition={() => {}}
                limitRedemptionsPerTransaction={false}
                setLimitRedemptionsPerTransaction={() => {}}
                limitRedemptionsPerCustomer={false}
                setLimitRedemptionsPerCustomer={() => {}}
                requireCoupon={false}
                setRequireCoupon={() => {}}
                promotionName={promotionName}
                setPromotionName={() => {}}
                onCreateHotsheet={() => {}}
                onSubmitPromotion={() => {}}
                onCompleteAndSubmit={onClose}
              />
            </Box>

            <NavigationButtons
              currentStep={currentStep}
              totalSteps={steps.length}
              promotionName={promotionName}
              onPrevious={() => {}}
              onNext={() => {}}
              onSaveDraft={() => {}}
              onCreateHotsheet={() => {}}
              onSubmitPromotion={() => {}}
              onCompleteAndSubmit={onClose}
            />
          </Box>
        */}

        {/* Action Buttons */}
        <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            color="primary" // Or 'error' if it's an error-specific action
            onClick={handleRetry}
          >
            Retry Operation
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={onClose}
          >
            Dismiss
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default PromotionErrorDrawer;
// src/components/PromotionBuilder.tsx
import React, { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Button,
  LinearProgress,
} from '@mui/material';
import {
  X as CloseIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  RefreshCcw as RefreshCcwIcon,
} from 'lucide-react';

import { StepContent } from './promotion-builder/StepContent';

interface PromotionBuilderProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromotionBuilder: React.FC<PromotionBuilderProps> = ({ isOpen, onClose }) => {
  const totalSteps = 6;
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Step 1: Event selection
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [eventStartDate, setEventStartDate] = useState<string>('');
  const [eventEndDate, setEventEndDate] = useState<string>('');
  const [promotionName, setPromotionName] = useState<string>('');

  // Step 2: Buy Conditions
  const [buyConditions, setBuyConditions] = useState<any[]>([
    { id: 'buy-1', type: 'any', value: '', skus: [], categories: [], minQuantity: '', minSpend: '' },
  ]);
  const addBuyCondition = () =>
    setBuyConditions(prev => [
      { id: `buy-${prev.length + 1}`, type: 'any', value: '', skus: [], categories: [], minQuantity: '', minSpend: '' },
      ...prev,
    ]);
  const removeBuyCondition = (id: string) =>
    setBuyConditions(prev => prev.filter(c => c.id !== id));

  // Step 3: Get Outcomes
  const [getConditions, setGetConditions] = useState<any[]>([
    { id: 'get-1', type: 'percentage', value: '', skus: [], categories: [], globalFixedPrice: '', useBuyConditionSkus: false },
  ]);
  const addGetCondition = () => {
    const next = {
      id: `get-${getConditions.length + 1}`,
      type: 'percentage',
      value: '',
      skus: [],
      categories: [],
      globalFixedPrice: '',
      useBuyConditionSkus: false,
    };
    setGetConditions(prev => [...prev, next]);
  };
  const removeGetCondition = (id: string) =>
    setGetConditions(prev => prev.filter(c => c.id !== id));

  // Step 4: Limits & Rules
  const [limitRedemptionsPerTransaction, setLimitRedemptionsPerTransaction] = useState<boolean>(false);
  const [limitRedemptionsPerCustomer, setLimitRedemptionsPerCustomer] = useState<boolean>(false);
  const [requireCoupon, setRequireCoupon] = useState<boolean>(false);

  // Navigation handlers
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(s => s + 1);
    } else {
      handleCompleteAndSubmit();
    }
  };
  const handlePreviousStep = () => {
    if (currentStep > 1) setCurrentStep(s => s - 1);
  };
  const handleSaveDraft = () => {
    console.log('Saving draft at step', currentStep);
  };
  const handleReset = () => {
    setCurrentStep(1);
    setSelectedEvent('');
    setEventStartDate('');
    setEventEndDate('');
    setPromotionName('');
    setBuyConditions([
      { id: 'buy-1', type: 'any', value: '', skus: [], categories: [], minQuantity: '', minSpend: '' },
    ]);
    setGetConditions([
      { id: 'get-1', type: 'percentage', value: '', skus: [], categories: [], globalFixedPrice: '', useBuyConditionSkus: false },
    ]);
    setLimitRedemptionsPerTransaction(false);
    setLimitRedemptionsPerCustomer(false);
    setRequireCoupon(false);
  };
  const handleCompleteAndSubmit = () => {
    console.log('Final submission:', {
      selectedEvent,
      eventStartDate,
      eventEndDate,
      promotionName,
      buyConditions,
      getConditions,
      limitRedemptionsPerTransaction,
      limitRedemptionsPerCustomer,
      requireCoupon,
    });
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 600,
          maxWidth: '90vw',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 3,
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h6">Create New Promotion</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Progress */}
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography>Step {currentStep} of {totalSteps}</Typography>
          <Button onClick={handleReset} startIcon={<RefreshCcwIcon />} sx={{ textTransform: 'none' }}>
            Reset
          </Button>
        </Box>
        <LinearProgress variant="determinate" value={(currentStep / totalSteps) * 100} />
      </Box>

      {/* Step Content */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 3 }}>
        <StepContent
          currentStep={currentStep}

          // Step 1 props
          selectedEvent={selectedEvent}
          eventStartDate={eventStartDate}
          eventEndDate={eventEndDate}
          setSelectedEvent={setSelectedEvent}
          setEventStartDate={setEventStartDate}
          setEventEndDate={setEventEndDate}
          promotionName={promotionName}
          setPromotionName={setPromotionName}

          // Step 2 callbacks
          addBuyCondition={addBuyCondition}
          removeBuyCondition={removeBuyCondition}
          buyConditions={buyConditions}
          setBuyConditions={setBuyConditions}

          // Step 3 callbacks
          addGetCondition={addGetCondition}
          removeGetCondition={removeGetCondition}
          getConditions={getConditions}
          setGetConditions={setGetConditions}

          // Step 4 props
          limitRedemptionsPerTransaction={limitRedemptionsPerTransaction}
          setLimitRedemptionsPerTransaction={setLimitRedemptionsPerTransaction}
          limitRedemptionsPerCustomer={limitRedemptionsPerCustomer}
          setLimitRedemptionsPerCustomer={setLimitRedemptionsPerCustomer}
          requireCoupon={requireCoupon}
          setRequireCoupon={setRequireCoupon}

          // Step 5 callback
          onCreateHotsheet={handleNextStep}

          // Step 6 callbacks
          onSubmitPromotion={handleCompleteAndSubmit}
          onCompleteAndSubmit={handleCompleteAndSubmit}
        />
      </Box>

      {/* Navigation Footer */}
      <Box
        sx={{
          p: 3,
          borderTop: '1px solid #e0e0e0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white',
        }}
      >
        <Button
          variant="text"
          startIcon={<ChevronLeftIcon />}
          onClick={handlePreviousStep}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <Box>
          <Button variant="outlined" onClick={handleSaveDraft} sx={{ mr: 2 }}>
            Save Draft
          </Button>
          <Button variant="contained" onClick={handleNextStep} endIcon={<ChevronRightIcon />}>
            {currentStep === 5
              ? 'Continue to Review'
              : currentStep === totalSteps
                ? 'Submit Promotion'
                : 'Next'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default PromotionBuilder;
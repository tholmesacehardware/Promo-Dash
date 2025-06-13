// src/components/promotion-builder/StepContent.tsx
import React from 'react';
import { Step1_SelectEvent } from './Step1_SelectEvent'; // Corrected to named import
import { Step2_BuyConditions } from './Step2_BuyConditions';
import { Step3_GetOutcomes } from './Step3_GetOutcomes';
import { Step4_LimitsRules } from './Step4_LimitsRules';
import { Step5_StoreSelection } from './Step5_StoreSelection';
import { Step6_ReviewSubmit } from './Step6_ReviewSubmit';
import { BuyCondition } from './Step2_BuyConditions'; // Import BuyCondition interface
import { GetCondition } from './Step3_GetOutcomes'; // Import GetCondition interface

interface StepContentProps {
  currentStep: number;
  selectedEvent: string;
  eventStartDate: string;
  eventEndDate: string;
  setSelectedEvent: (event: string) => void;
  setEventStartDate: (date: string) => void;
  setEventEndDate: (date: string) => void;
  promotionName: string;
  setPromotionName: (name: string) => void;
  buyConditions: BuyCondition[]; // Use imported interface
  setBuyConditions: React.Dispatch<React.SetStateAction<BuyCondition[]>>; // Corrected type for functional updates
  addBuyCondition: () => void;
  removeBuyCondition: (id: string) => void;
  getConditions: GetCondition[]; // Use imported interface
  setGetConditions: React.Dispatch<React.SetStateAction<GetCondition[]>>; // Corrected type for functional updates
  addGetCondition: () => void;
  removeGetCondition: (id: string) => void;
  limitRedemptionsPerTransaction: boolean;
  setLimitRedemptionsPerTransaction: (value: boolean) => void;
  limitRedemptionsPerCustomer: boolean;
  setLimitRedemptionsPerCustomer: (value: boolean) => void;
  requireCoupon: boolean;
  setRequireCoupon: (value: boolean) => void;
  onCompleteAndSubmit: () => void;
  onCreateHotsheet: () => void;
  onSubmitPromotion: () => void;
}

export const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  selectedEvent,
  eventStartDate,
  eventEndDate,
  setSelectedEvent,
  setEventStartDate,
  setEventEndDate,
  promotionName,
  setPromotionName,
  buyConditions,
  setBuyConditions,
  addBuyCondition,
  removeBuyCondition,
  getConditions,
  setGetConditions,
  addGetCondition,
  removeGetCondition,
  limitRedemptionsPerTransaction,
  setLimitRedemptionsPerTransaction,
  limitRedemptionsPerCustomer,
  setLimitRedemptionsPerCustomer,
  requireCoupon,
  setRequireCoupon,
  onCompleteAndSubmit,
  onCreateHotsheet,
  onSubmitPromotion,
}) => {
  switch (currentStep) {
    case 1:
      return (
        <Step1_SelectEvent
          selectedEvent={selectedEvent}
          eventStartDate={eventStartDate}
          eventEndDate={eventEndDate}
          promotionName={promotionName}
          setSelectedEvent={setSelectedEvent}
          setEventStartDate={setEventStartDate}
          setEventEndDate={setEventEndDate}
          setPromotionName={setPromotionName}
        />
      );

    case 2:
      return (
        <Step2_BuyConditions
          buyConditions={buyConditions}
          setBuyConditions={setBuyConditions}
          onAddCondition={addBuyCondition}
          onRemoveCondition={removeBuyCondition}
        />
      );

    case 3:
      return (
        <Step3_GetOutcomes
          buyConditions={buyConditions} // Pass buy conditions for SKU import
          getConditions={getConditions}
          setGetConditions={setGetConditions}
          onAddCondition={addGetCondition}
          onRemoveCondition={removeGetCondition}
        />
      );

    case 4:
      return (
        <Step4_LimitsRules
          limitRedemptionsPerTransaction={limitRedemptionsPerTransaction}
          setLimitRedemptionsPerTransaction={setLimitRedemptionsPerTransaction}
          limitRedemptionsPerCustomer={limitRedemptionsPerCustomer}
          setLimitRedemptionsPerCustomer={setLimitRedemptionsPerCustomer}
          requireCoupon={requireCoupon}
          setRequireCoupon={setRequireCoupon}
          onCreateHotsheet={onCreateHotsheet}
        />
      );

    case 5:
      return (
        <Step5_StoreSelection
          promotionName={promotionName}
          setPromotionName={setPromotionName}
        />
      );

    case 6:
      return (
        <Step6_ReviewSubmit
          selectedEvent={selectedEvent}
          eventStartDate={eventStartDate}
          eventEndDate={eventEndDate}
          promotionName={promotionName} // Pass promotionName
          buyConditions={buyConditions}
          getConditions={getConditions}
          // Removed these props as they are no longer expected by Step6_ReviewSubmit
          // selectedCommodityGroups={[]}
          // selectedMerchandiseClasses={[]}
          // selectedProductGroups={[]}
          onSubmit={onCompleteAndSubmit}
        />
      );

    default:
      return null;
  }
};

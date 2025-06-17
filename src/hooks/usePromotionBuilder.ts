
import { useState, useEffect } from 'react';

interface SkuWithPrice {
  sku: string;
  promoPrice?: string;
  productName?: string;
  image?: string;
  usePromoRetailPrice?: boolean;
}

interface BuyCondition {
  id: string;
  type: 'quantity' | 'amount' | 'any' | 'everyday';
  value: string;
  skus: SkuWithPrice[];
  categories: any[];
  minQuantity: string;
  minSpend: string;
}

interface GetCondition {
  id: string;
  type: 'percentage' | 'fixed' | 'fixedPrice' | 'free' | 'giftCard' | 'points';
  value: string;
  skus: SkuWithPrice[];
  categories: any[];
  globalFixedPrice: string;
  useBuyConditionSkus: boolean;
  buyConditionId?: string;
}

export const usePromotionBuilder = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [promotionName, setPromotionName] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [eventStartDate, setEventStartDate] = useState('');
  const [eventEndDate, setEventEndDate] = useState('');
  const [buyConditions, setBuyConditions] = useState<BuyCondition[]>([
    { id: '1', type: 'quantity', value: '', skus: [], categories: [], minQuantity: '', minSpend: '' }
  ]);
  const [getConditions, setGetConditions] = useState<GetCondition[]>([
    { id: '1', type: 'percentage', value: '', skus: [], categories: [], globalFixedPrice: '', useBuyConditionSkus: false }
  ]);
  const [limitRedemptionsPerTransaction, setLimitRedemptionsPerTransaction] = useState(false);
  const [limitRedemptionsPerCustomer, setLimitRedemptionsPerCustomer] = useState(false);
  const [requireCoupon, setRequireCoupon] = useState(false);

  // Auto-sync get conditions with buy conditions when moving to step 3
  useEffect(() => {
    if (currentStep === 3) {
      const updatedGetConditions = buyConditions.map((buyCondition, index) => {
        const existingGetCondition = getConditions.find(gc => gc.buyConditionId === buyCondition.id);
        
        if (existingGetCondition) {
          return existingGetCondition;
        } else {
          return {
            id: `get-${buyCondition.id}`,
            type: 'percentage' as const,
            value: '',
            skus: [],
            categories: [],
            globalFixedPrice: '',
            useBuyConditionSkus: false,
            buyConditionId: buyCondition.id
          };
        }
      });

      const validGetConditions = updatedGetConditions.filter(gc => 
        buyConditions.some(bc => bc.id === gc.buyConditionId)
      );

      setGetConditions(validGetConditions);
    }
  }, [currentStep, buyConditions]);

  const addBuyCondition = () => {
    const newCondition: BuyCondition = {
      id: Date.now().toString(),
      type: 'quantity',
      value: '',
      skus: [],
      categories: [],
      minQuantity: '',
      minSpend: ''
    };
    // Insert new condition at the beginning of the array
    setBuyConditions([newCondition, ...buyConditions]);
  };

  const addGetCondition = () => {
    const newCondition: GetCondition = {
      id: Date.now().toString(),
      type: 'percentage',
      value: '',
      skus: [],
      categories: [],
      globalFixedPrice: '',
      useBuyConditionSkus: false
    };
    setGetConditions([newCondition, ...getConditions]);
  };

  const removeBuyCondition = (id: string) => {
    setBuyConditions(buyConditions.filter(condition => condition.id !== id));
  };

  const removeGetCondition = (id: string) => {
    setGetConditions(getConditions.filter(condition => condition.id !== id));
  };

  const goToStep = (step: number) => {
    setCurrentStep(step);
  };

  const resetBuilder = () => {
    setCurrentStep(1);
    setPromotionName('');
    setSelectedEvent('');
    setEventStartDate('');
    setEventEndDate('');
    setBuyConditions([
      { id: '1', type: 'quantity', value: '', skus: [], categories: [], minQuantity: '', minSpend: '' }
    ]);
    setGetConditions([
      { id: '1', type: 'percentage', value: '', skus: [], categories: [], globalFixedPrice: '', useBuyConditionSkus: false }
    ]);
    setLimitRedemptionsPerTransaction(false);
    setLimitRedemptionsPerCustomer(false);
    setRequireCoupon(false);
  };

  return {
    currentStep,
    setCurrentStep,
    promotionName,
    setPromotionName,
    selectedEvent,
    setSelectedEvent,
    eventStartDate,
    setEventStartDate,
    eventEndDate,
    setEventEndDate,
    buyConditions,
    setBuyConditions,
    getConditions,
    setGetConditions,
    limitRedemptionsPerTransaction,
    setLimitRedemptionsPerTransaction,
    limitRedemptionsPerCustomer,
    setLimitRedemptionsPerCustomer,
    requireCoupon,
    setRequireCoupon,
    addBuyCondition,
    addGetCondition,
    removeBuyCondition,
    removeGetCondition,
    goToStep,
    resetBuilder
  };
};

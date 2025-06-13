import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Chip, // Using Chip for the badges
} from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material'; // Icon for summary title

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

interface Step6Props {
  selectedEvent: string;
  eventStartDate: string;
  eventEndDate: string;
  promotionName: string; // Added promotionName to props
  buyConditions: BuyCondition[];
  getConditions: GetCondition[];
  // Removed unused props from previous version as per screenshot
  // selectedCommodityGroups: any[];
  // selectedMerchandiseClasses: any[];
  // selectedProductGroups: any[];
  onSubmit: () => void; // This would typically be triggered by the "Complete & Submit" button in the parent
}

export const Step6_ReviewSubmit: React.FC<Step6Props> = ({
  selectedEvent,
  eventStartDate,
  eventEndDate,
  promotionName, // Destructure promotionName
  buyConditions,
  getConditions,
  onSubmit
}) => {

  // Map of event IDs to display names (mocked, should align with EventDropdown)
  const eventDisplayNames: Record<string, string> = {
    'back-to-school-2025': 'Back to School 2025',
    'summer-sale-2025': 'Summer Sale 2025',
    'spring-promo-2025': 'Spring Promotion 2025',
    // Add other event names as needed
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return dateString; // Return original if formatting fails
    }
  };

  // Helper to get display string for buy condition type
  const getBuyConditionTypeDisplay = (type: BuyCondition['type']) => {
    switch (type) {
      case 'quantity': return 'Buy quantity';
      case 'amount': return 'Spend amount';
      case 'any': return 'Any products'; // Assuming 'any' means any product
      case 'everyday': return 'Everyday deal'; // Assuming 'everyday' is a general type
      default: return type;
    }
  };

  // Helper to get display string for get outcome type
  const getGetOutcomeTypeDisplay = (type: GetCondition['type']) => {
    switch (type) {
      case 'percentage': return 'Percentage off';
      case 'fixed': return 'Fixed discount';
      case 'fixedPrice': return 'Fixed price';
      case 'free': return 'Free item';
      case 'giftCard': return 'Gift card';
      case 'points': return 'Bonus points';
      default: return type;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, fontFamily: 'Inter, sans-serif' }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, color: '#1f2937' }}>
          Review & Submit
        </Typography>
        <Typography variant="body2" sx={{ color: '#4b5563', mt: 0.5 }}>
          Review all promotion details before final submission.
        </Typography>
      </Box>

      <Card variant="outlined" sx={{ borderRadius: '8px', boxShadow: 0 }}>
        <CardHeader
          title={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CheckCircleIcon sx={{ color: '#22c55e', mr: 1 }} /> {/* Green checkmark icon */}
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#1f2937' }}>
                Promotion Summary
              </Typography>
            </Box>
          }
          sx={{ borderBottom: '1px solid #e0e0e0', p: 2 }}
        />
        <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Promotion Name */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#1f2937', mb: 1 }}>
              Promotion Name
            </Typography>
            <Typography variant="body2" sx={{ color: '#4b5563' }}>
              {promotionName || '-'}
            </Typography>
          </Box>

          {/* Event Details */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#1f2937', mb: 1 }}>
              Event Details
            </Typography>
            <Typography variant="body2" sx={{ color: '#4b5563' }}>
              {selectedEvent ? eventDisplayNames[selectedEvent] || selectedEvent : '-'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#4b5563', mt: 0.5 }}>
              Dates: {formatDate(eventStartDate)} to {formatDate(eventEndDate)}
            </Typography>
          </Box>

          {/* Buy Conditions */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#1f2937', mb: 1 }}>
              Buy Conditions ({buyConditions.length})
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {buyConditions.length > 0 ? (
                buyConditions.map((condition, index) => (
                  <Box key={condition.id} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label={`Condition ${index + 1}`}
                      size="small"
                      sx={{
                        backgroundColor: '#e0e7ff', // Light blue
                        color: '#3f51b5', // Dark blue
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2" sx={{ color: '#4b5563' }}>
                      {getBuyConditionTypeDisplay(condition.type)} - {condition.value || 'N/A'}
                      {condition.minQuantity && ` (Min Qty: ${condition.minQuantity})`}
                      {condition.minSpend && ` (Min Spend: $${condition.minSpend})`}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: '#6b7280' }}>No buy conditions defined.</Typography>
              )}
            </Box>
          </Box>

          {/* Get Outcomes */}
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, color: '#1f2937', mb: 1 }}>
              Get Outcomes ({getConditions.length})
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {getConditions.length > 0 ? (
                getConditions.map((condition, index) => (
                  <Box key={condition.id} sx={{ display: 'flex', alignItems: 'center' }}>
                    <Chip
                      label={`Outcome ${index + 1}`}
                      size="small"
                      sx={{
                        backgroundColor: '#ffe0e6', // Light red
                        color: '#b53f51', // Dark red
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2" sx={{ color: '#4b5563' }}>
                      {getGetOutcomeTypeDisplay(condition.type)} -
                      {condition.type === 'fixedPrice' ? ` $${condition.globalFixedPrice}` :
                       condition.type === 'percentage' ? ` ${condition.value}%` :
                       condition.type === 'fixed' || condition.type === 'giftCard' ? ` $${condition.value}` :
                       condition.type === 'points' ? ` ${condition.value} points` : ''}
                       {condition.useBuyConditionSkus && ' (Uses SKUs from Buy Conditions)'}
                    </Typography>
                  </Box>
                ))
              ) : (
                <Typography variant="body2" sx={{ color: '#6b7280' }}>No get outcomes defined.</Typography>
              )}
            </Box>
          </Box>

          {/* Additional sections for Limits & Rules, Hotsheet details etc. can be added here
              by passing relevant state from the parent PromotionBuilder */}
        </CardContent>
      </Card>

      {/* The "Complete & Submit" button and navigation controls are handled in PromotionBuilder.tsx */}
    </Box>
  );
};

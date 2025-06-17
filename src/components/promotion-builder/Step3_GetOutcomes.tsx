// src/components/promotion-builder/Step3_GetOutcomes.tsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Card,
  CardHeader,
  CardContent,
  InputAdornment,
  Checkbox,
  IconButton,
} from '@mui/material';
import { Edit2 } from 'lucide-react';
import { DollarInput } from './DollarInput';
import { ProductSelector } from './ProductSelector';
import { BuyCondition as BaseBuyCondition } from './Step2_BuyConditions';

// Extend BuyCondition with the optional fields from Step 2
type BuyCondition = BaseBuyCondition & {
  bulkSkus?: string[];
  futureSkus?: string[];
};

interface SkuWithPrice {
  sku: string;
  promoPrice?: string;
  productName: string;
  retailPrice: string;
  image: string;
  usePromoRetailPrice?: boolean;
}

export interface GetCondition {
  id: string;
  type: 'fixedPrice' | 'fixed' | 'percentage' | 'free' | 'giftCard' | 'points';
  value: string;
  globalFixedPrice: string;
  skus: SkuWithPrice[];
  useBuyConditionSkus: boolean;
}

interface Step3Props {
  buyConditions: BuyCondition[];
  setBuyConditions: React.Dispatch<React.SetStateAction<BuyCondition[]>>;
}

const outcomeOptions = [
  {
    value: 'fixedPrice' as const,
    title: 'Fixed Price',
    subtitle: 'Let customers buy specific items for a set price.',
    example: 'Get a grill for $199 when you buy 3 propane tanks',
  },
  {
    value: 'fixed' as const,
    title: 'Get $ Off',
    subtitle: 'Apply a discount amount to selected items.',
    example: 'Get $20 off any fire pit',
  },
  {
    value: 'percentage' as const,
    title: 'Get % Off',
    subtitle: 'Apply a percentage discount to selected items.',
    example: 'Get 25% off patio furniture',
  },
  {
    value: 'free' as const,
    title: 'Free Item',
    subtitle: 'Automatically add a free item when conditions are met.',
    example: 'Get a free paintbrush with any paint purchase',
  },
  {
    value: 'giftCard' as const,
    title: 'Gift Card',
    subtitle: 'Provide a gift card when customers meet purchase conditions.',
    example: 'Spend $100 on tools and get a $10 gift card',
  },
  {
    value: 'points' as const,
    title: 'Bonus Points',
    subtitle: 'Reward customers with loyalty points when purchase conditions are met.',
    example: 'Earn 500 Ace Rewards points when you buy 3 cleaning products',
  },
];

export const Step3_GetOutcomes: React.FC<Step3Props> = ({
  buyConditions,
  setBuyConditions,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [local, setLocal] = useState<Record<string, GetCondition>>({});

  // Initialize local state when the number of buy conditions changes
  useEffect(() => {
    const init: Record<string, GetCondition> = {};
    buyConditions.forEach((bc) => {
      init[bc.id] = {
        id: `${bc.id}-default`,
        type: 'fixedPrice',
        value: '',
        globalFixedPrice: '',
        skus: [],
        useBuyConditionSkus: false,
      };
    });
    setLocal(init);
  }, [buyConditions.length]);

  const beginEdit = (id: string, current: string) => {
    setEditingId(id);
    setEditText(current);
  };
  const commitLabel = (id: string, idx: number) => {
    setBuyConditions((conds) =>
      conds.map((c, i) =>
        c.id === id
          ? { ...c, customLabel: editText.trim() || `Condition ${i + 1}` }
          : c
      )
    );
    setEditingId(null);
  };

  const updateLocal = (buyId: string, updates: Partial<GetCondition>) => {
    setLocal((prev) => ({
      ...prev,
      [buyId]: { ...prev[buyId], ...updates },
    }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Get Outcomes
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Define the reward the customer will receive.
        </Typography>
      </Box>

      {buyConditions.map((bc, bi) => {
        const sel = local[bc.id];
        if (!sel) return null;

        const showLabel = buyConditions.length > 1;

        // Handle toggling of inherited SKUs
        const handleToggle = (checked: boolean) => {
          if (checked) {
            updateLocal(bc.id, {
              useBuyConditionSkus: true,
              skus: bc.skus.map((s) => ({ ...s })),
            });
          } else {
            updateLocal(bc.id, {
              useBuyConditionSkus: false,
              skus: [],
            });
          }
        };

        return (
          <Card key={bc.id} variant="outlined" sx={{ mb: 4 }}>
            <CardHeader
              title={
                showLabel ? (
                  editingId === bc.id ? (
                    <TextField
                      variant="standard"
                      fullWidth
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onBlur={() => commitLabel(bc.id, bi)}
                      onKeyDown={(e) => {
                        if (['Enter', 'Tab'].includes(e.key)) {
                          commitLabel(bc.id, bi);
                          e.preventDefault();
                        }
                      }}
                      autoFocus
                    />
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {bc.customLabel || `Condition ${bi + 1}`}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() =>
                          beginEdit(bc.id, bc.customLabel || `Condition ${bi + 1}`)
                        }
                      >
                        <Edit2 size={16} />
                      </IconButton>
                    </Box>
                  )
                ) : null
              }
              sx={{ borderBottom: '1px solid', borderColor: 'divider', p: 2 }}
            />

            <CardContent>
              <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>
                Customer Gets
              </Typography>

              <RadioGroup
                value={sel.type}
                onChange={(e) =>
                  updateLocal(bc.id, {
                    type: e.target.value as GetCondition['type'],
                    value: '',
                    globalFixedPrice: '',
                  })
                }
                sx={{ mb: 2 }}
              >
                {outcomeOptions.map((opt) => (
                  <Card
                    key={opt.value}
                    variant="outlined"
                    sx={{
                      mb: 1,
                      p: 2,
                      borderColor:
                        sel.type === opt.value ? 'primary.main' : 'divider',
                    }}
                  >
                    <FormControlLabel
                      value={opt.value}
                      control={<Radio />}
                      label={
                        <Box>
                          <Typography sx={{ fontWeight: 500 }}>{opt.title}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {opt.subtitle}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {opt.example}
                          </Typography>
                        </Box>
                      }
                      sx={{ alignItems: 'flex-start', m: 0 }}
                    />
                    {opt.value === 'fixedPrice' && sel.type === 'fixedPrice' && (
                      <Box sx={{ ml: 4, mt: 2, width: 160 }}>
                        <DollarInput
                          value={sel.globalFixedPrice}
                          onChange={(val) =>
                            updateLocal(bc.id, { globalFixedPrice: val })
                          }
                          size="small"
                        />
                      </Box>
                    )}
                    {opt.value === 'fixed' && sel.type === 'fixed' && (
                      <Box sx={{ ml: 4, mt: 2, width: 160 }}>
                        <TextField
                          type="number"
                          value={sel.value}
                          onChange={(e) =>
                            updateLocal(bc.id, { value: e.target.value })
                          }
                          size="small"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">$</InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    )}
                    {opt.value === 'percentage' && sel.type === 'percentage' && (
                      <Box sx={{ ml: 4, mt: 2, width: 120 }}>
                        <TextField
                          type="number"
                          value={sel.value}
                          onChange={(e) =>
                            updateLocal(bc.id, { value: e.target.value })
                          }
                          size="small"
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">%</InputAdornment>
                            ),
                          }}
                        />
                      </Box>
                    )}
                  </Card>
                ))}
              </RadioGroup>

              <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={sel.useBuyConditionSkus}
                      onChange={(_, checked) => handleToggle(checked)}
                    />
                  }
                  label="Use SKUs from Buy Conditions"
                />

                {sel.useBuyConditionSkus && (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected SKUs:{' '}
                    {bc.categories && bc.categories.length > 0
                      ? bc.categories.map((c) => c.name).join(', ')
                      : bc.bulkSkus && bc.bulkSkus.length > 0
                      ? `${bc.bulkSkus.length} SKUs bulk entered`
                      : bc.futureSkus && bc.futureSkus.length > 0
                      ? bc.futureSkus.join('; ')
                      : 'None'}
                  </Typography>
                )}

                <Box sx={{ mt: sel.useBuyConditionSkus ? 1 : 2 }}>
                  <ProductSelector
                    skus={sel.skus}
                    onAddSku={(sku) =>
                      updateLocal(bc.id, { skus: [...sel.skus, sku] })
                    }
                    onRemoveSku={(idx) =>
                      updateLocal(bc.id, {
                        skus: sel.skus.filter((_, i) => i !== idx),
                      })
                    }
                    onUpdateSkuPrice={(idx, price) =>
                      updateLocal(bc.id, {
                        skus: sel.skus.map((s, i) =>
                          i === idx ? { ...s, promoPrice: price } : s
                        ),
                      })
                    }
                    onUpdateSkuPromoRetailPrice={(idx, usePromo) =>
                      updateLocal(bc.id, {
                        skus: sel.skus.map((s, i) =>
                          i === idx ? { ...s, usePromoRetailPrice: usePromo } : s
                        ),
                      })
                    }
                    showPriceInput
                    showPromoRetailCheckbox
                    type="get"
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
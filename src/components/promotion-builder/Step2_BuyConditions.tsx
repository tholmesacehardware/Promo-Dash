// src/components/promotion-builder/Step2_BuyConditions.tsx

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Switch,
  Checkbox,
} from '@mui/material';
import { Plus, X as RemoveIcon, Edit2 } from 'lucide-react';
import { DollarInput } from './DollarInput';
import { ProductSelector } from './ProductSelector';

export interface SkuWithPrice {
  sku: string;
  promoPrice?: string;
  productName: string;
  retailPrice: string;
  image: string;
  usePromoRetailPrice?: boolean;
}

export interface BuyCondition {
  id: string;
  customLabel: string;
  type: 'quantity' | 'amount' | 'any' | 'everyday';
  minQuantity: string;
  minSpend: string;
  requireAceRewards?: boolean;
  couponRequired?: boolean;
  couponCode?: string;
  skus: SkuWithPrice[];
  categories: any[];
  getOutcomes: any[];
}

interface Step2Props {
  buyConditions: BuyCondition[];
  setBuyConditions: React.Dispatch<React.SetStateAction<BuyCondition[]>>;
  onAddCondition: () => void;
  onRemoveCondition: (id: string) => void;
}

const buyOptions = [
  {
    value: 'quantity' as const,
    title: 'Buy X quantity of items',
    description: 'Customer must purchase a minimum quantity of items.',
  },
  {
    value: 'amount' as const,
    title: 'Spend $X amount on items',
    description: 'Customer must spend a minimum amount on items.',
  },
  {
    value: 'any' as const,
    title: 'Buy any products (No minimum)',
    description: 'Customer can purchase any item without restrictions.',
  },
  {
    value: 'everyday' as const,
    title: 'Everyday deal',
    description: 'Promotion applies without specific buy conditions.',
  },
];

export const Step2_BuyConditions: React.FC<Step2Props> = ({
  buyConditions,
  setBuyConditions,
  onAddCondition,
  onRemoveCondition,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>('');

  const beginEdit = (id: string, current: string) => {
    setEditingId(id);
    setEditText(current);
  };
  const commitLabel = (id: string, idx: number) => {
    setBuyConditions(conds =>
      conds.map((c, i) =>
        c.id === id
          ? { ...c, customLabel: editText.trim() || `Condition ${i + 1}` }
          : c
      )
    );
    setEditingId(null);
  };
  const cancelEdit = () => setEditingId(null);

  const updateBuyCondition = (id: string, updates: Partial<BuyCondition>) => {
    setBuyConditions(conds =>
      conds.map(c => (c.id === id ? { ...c, ...updates } : c))
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h6">Buy Conditions</Typography>
          <Typography variant="body2" color="text.secondary">
            Define what the customer must do to qualify for the promotion.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Plus size={16} />}
          onClick={onAddCondition}
          sx={{ textTransform: 'none' }}
        >
          Add Condition
        </Button>
      </Box>

      {buyConditions.map((c, idx) => {
        const showLabel = buyConditions.length > 1;

        return (
          <Card key={c.id} variant="outlined" sx={{ mb: 4, overflow: 'visible' }}>
            <CardHeader
              title={
                showLabel ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {editingId === c.id ? (
                      <TextField
                        variant="standard"
                        fullWidth
                        value={editText}
                        onChange={e => setEditText(e.target.value)}
                        onBlur={() => commitLabel(c.id, idx)}
                        onKeyDown={e => {
                          if (['Enter', 'Tab'].includes(e.key)) {
                            e.preventDefault();
                            commitLabel(c.id, idx);
                          }
                          if (e.key === 'Escape') cancelEdit();
                        }}
                        autoFocus
                      />
                    ) : (
                      <>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {c.customLabel || `Condition ${idx + 1}`}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={() =>
                            beginEdit(c.id, c.customLabel || `Condition ${idx + 1}`)
                          }
                        >
                          <Edit2 size={16} />
                        </IconButton>
                      </>
                    )}
                  </Box>
                ) : null
              }
              action={
                showLabel ? (
                  <IconButton onClick={() => onRemoveCondition(c.id)} size="small">
                    <RemoveIcon size={16} />
                  </IconButton>
                ) : undefined
              }
              sx={{ borderBottom: '1px solid', borderColor: 'divider', p: 2 }}
            />

            <CardContent sx={{ p: 3 }}>
              {/* Customer Must */}
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 2 }}>
                Customer Must:
              </Typography>
              <RadioGroup
                value={c.type}
                onChange={e =>
                  updateBuyCondition(c.id, {
                    type: e.target.value as BuyCondition['type'],
                    minQuantity: '',
                    minSpend: '',
                  })
                }
                sx={{ mb: 2 }}
              >
                {buyOptions.map(opt => (
                  <Card
                    key={opt.value}
                    variant="outlined"
                    sx={{
                      mb: 1,
                      p: 2,
                      borderColor: c.type === opt.value ? 'primary.main' : 'divider',
                    }}
                  >
                    <FormControlLabel
                      value={opt.value}
                      control={
                        <Radio
                          sx={{
                            color: 'primary.main',
                            '&.Mui-checked': { color: 'primary.main' },
                          }}
                        />
                      }
                      label={
                        <Box>
                          <Typography sx={{ fontWeight: 500 }}>
                            {opt.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {opt.description}
                          </Typography>
                        </Box>
                      }
                      sx={{ alignItems: 'flex-start', m: 0 }}
                    />
                    {opt.value === 'quantity' && c.type === 'quantity' && (
                      <Box sx={{ ml: 4, mt: 2, width: 120 }}>
                        <TextField
                          fullWidth
                          type="number"
                          value={c.minQuantity}
                          onChange={e =>
                            updateBuyCondition(c.id, { minQuantity: e.target.value })
                          }
                          placeholder="0"
                          size="small"
                        />
                      </Box>
                    )}
                    {opt.value === 'amount' && c.type === 'amount' && (
                      <Box sx={{ ml: 4, mt: 2, width: 160 }}>
                        <DollarInput
                          value={c.minSpend}
                          onChange={val => updateBuyCondition(c.id, { minSpend: val })}
                          placeholder="0.00"
                          size="small"
                        />
                      </Box>
                    )}
                  </Card>
                ))}
              </RadioGroup>

              {/* Require Ace Rewards */}
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={c.requireAceRewards || false}
                      onChange={(_, checked) =>
                        updateBuyCondition(c.id, { requireAceRewards: checked })
                      }
                      size="small"
                    />
                  }
                  label="Require Ace Rewards"
                />
              </Box>

              {/* Coupon Required */}
              <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={c.couponRequired || false}
                      onChange={(_, checked) =>
                        updateBuyCondition(c.id, { couponRequired: checked })
                      }
                      size="small"
                    />
                  }
                  label="Coupon Required"
                />
              </Box>

              {/* Coupon ID Code */}
              {c.couponRequired && (
                <Box sx={{ mb: 3, width: 240 }}>
                  <TextField
                    fullWidth
                    label="Coupon ID Code"
                    value={c.couponCode || ''}
                    onChange={e =>
                      updateBuyCondition(c.id, { couponCode: e.target.value })
                    }
                    size="small"
                  />
                </Box>
              )}

              {/* Product Selector */}
              <Box>
                <ProductSelector
                  skus={c.skus}
                  onAddSku={sku =>
                    updateBuyCondition(c.id, { skus: [...c.skus, sku] })
                  }
                  onRemoveSku={i =>
                    updateBuyCondition(c.id, {
                      skus: c.skus.filter((_, index) => index !== i),
                    })
                  }
                  onUpdateSkuPrice={(i, price) =>
                    updateBuyCondition(c.id, {
                      skus: c.skus.map((s, index) =>
                        index === i ? { ...s, promoPrice: price } : s
                      ),
                    })
                  }
                  onUpdateSkuPromoRetailPrice={(i, usePromo) =>
                    updateBuyCondition(c.id, {
                      skus: c.skus.map((s, index) =>
                        index === i
                          ? { ...s, usePromoRetailPrice: usePromo }
                          : s
                      ),
                    })
                  }
                  showPriceInput
                  showPromoRetailCheckbox
                  type="buy"
                />
              </Box>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
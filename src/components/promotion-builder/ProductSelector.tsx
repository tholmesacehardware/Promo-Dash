// src/components/promotion-builder/ProductSelector.tsx
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Tabs,
  Tab,
  Typography,
  Checkbox,
  FormControlLabel,
  Paper,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { X as CloseIcon } from 'lucide-react'; // For removing SKUs
import { DollarInput } from './DollarInput'; // Reusing DollarInput
import { mockProducts, MockProduct } from '../../mockData/mockProducts'; // Corrected import path based on user feedback

interface SkuWithPrice {
  sku: string;
  promoPrice?: string;
  productName: string; // Will always be populated
  retailPrice: string; // Will always be populated
  image: string;       // Will always be populated
  usePromoRetailPrice?: boolean;
}

interface ProductSelectorProps {
  skus: SkuWithPrice[];
  onAddSku: (skuDetails: SkuWithPrice) => void; // Updated: now accepts a full SkuWithPrice object
  onRemoveSku: (index: number) => void;
  onUpdateSkuPrice: (index: number, price: string) => void;
  onUpdateSkuPromoRetailPrice: (index: number, usePromoRetailPrice: boolean) => void;
  showPriceInput?: boolean; // This prop's influence will be reduced for DollarInput visibility
  showPromoRetailCheckbox?: boolean;
  type: 'buy' | 'get'; // 'buy' or 'get'
}

// Fallback images (if mock product not found or image fails to load)
const fallbackImages = [
  'https://placehold.co/50x50/A0B2C8/FFFFFF?text=Product1',
  'https://placehold.co/50x50/C8A0B2/FFFFFF?text=Product2',
  'https://placehold.co/50x50/B2C8A0/FFFFFF?text=Product3',
  'https://placehold.co/50x50/808080/FFFFFF?text=Product4'
];

// Mock category data (kept for completeness as it's not directly related to this specific request)
const commodityGroups = [
  { id: 'cg-10', name: '10 - Cleaning Supplies', count: 4526 },
  { id: 'cg-14', name: '14 - Paint And Paint Supplies', count: 18217 },
  { id: 'cg-20', name: '20 - Hand Tools And Tool Accessories', count: 3456 },
  { id: 'cg-25', name: '25 - Power Tools', count: 7890 },
];

const merchandiseClasses = [
  { id: 'mc-101', name: '101 - Cleaning Chemicals', count: 1200, parent_cg: 'cg-10' },
  { id: 'mc-102', name: '102 - Brooms & Mops', count: 800, parent_cg: 'cg-10' },
  { id: 'mc-141', name: '141 - Interior Paint', count: 5000, parent_cg: 'cg-14' },
  { id: 'mc-142', name: '142 - Exterior Paint', count: 4000, parent_cg: 'cg-14' },
  { id: 'mc-201', name: '201 - Hammers', count: 1500, parent_cg: 'cg-20' },
  { id: 'mc-251', name: '251 - Drills', count: 3000, parent_cg: 'cg-25' },
  { id: 'mc-252', name: '252 - Saws', count: 2500, parent_cg: 'cg-25' },
];

const productGroups = [
  { id: 'pg-101a', name: '101a - All-Purpose Cleaners', count: 500, parent_mc: 'mc-101' },
  { id: 'pg-101b', name: '101b - Floor Cleaners', count: 400, parent_mc: 'mc-101' },
  { id: 'pg-251a', name: '251a - Cordless Drills', count: 1800, parent_mc: 'mc-251' },
  { id: 'pg-251b', name: '251b - Corded Drills', count: 1200, parent_mc: 'mc-251' },
  { id: 'pg-252a', name: '252a - Circular Saws', count: 1000, parent_mc: 'mc-252' },
];


export const ProductSelector: React.FC<ProductSelectorProps> = ({
  skus,
  onAddSku,
  onRemoveSku,
  onUpdateSkuPrice,
  onUpdateSkuPromoRetailPrice,
  showPriceInput = false, // Kept for other potential uses, but not for DollarInput visibility in this change
  showPromoRetailCheckbox = false,
  type
}) => {
  const [skuInput, setSkuInput] = useState('');
  const [bulkSkuInput, setBulkSkuInput] = useState('');
  const [futureSkuInput, setFutureSkuInput] = useState('');
  const [selectedCommodityGroups, setSelectedCommodityGroups] = useState<string[]>([]);
  const [selectedMerchandiseClasses, setSelectedMerchandiseClasses] = useState<string[]>([]);
  const [selectedProductGroups, setSelectedProductGroups] = useState<string[]>([]);
  const [currentTab, setCurrentTab] = useState<'sku-lookup' | 'categories' | 'bulk-entry' | 'future-skus'>('sku-lookup');

  // Get all available SKU keys from mockProducts
  const mockProductSKUs = Object.keys(mockProducts);

  const handleAddSkuFromInput = () => {
    if (skuInput.trim()) {
      const skuString = skuInput.trim();
      let productDetail: MockProduct | undefined;

      // Check if the input contains any digits
      const containsDigit = /\d/.test(skuString);

      if (containsDigit) {
        // If it contains a digit, randomly pick a product from mockProducts
        const randomIndex = Math.floor(Math.random() * mockProductSKUs.length);
        const randomSKU = mockProductSKUs[randomIndex];
        productDetail = mockProducts[randomSKU];
      } else {
        // Otherwise, try to find an exact match from mockProducts
        productDetail = mockProducts[skuString];
      }

      const newSkuItem: SkuWithPrice = {
        sku: skuString, // Keep the actual input SKU for the item
        productName: productDetail ? productDetail.name : `Custom Product for ${skuString}`,
        retailPrice: productDetail ? productDetail.retailPrice : '0.00', // Default retail price if not found
        image: productDetail ? productDetail.image : fallbackImages[0], // Fallback image
        usePromoRetailPrice: false, // Default value
        promoPrice: '', // Default value
      };

      onAddSku(newSkuItem); // Pass the full SkuWithPrice object
      setSkuInput('');
    }
  };

  const handleAddBulkSkus = () => {
    const skusToAdd = bulkSkuInput.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    skusToAdd.forEach(skuString => {
      let productDetail: MockProduct | undefined;
      const containsDigit = /\d/.test(skuString);

      if (containsDigit) {
        // If it contains a digit, randomly pick a product from mockProducts
        const randomIndex = Math.floor(Math.random() * mockProductSKUs.length);
        const randomSKU = mockProductSKUs[randomIndex];
        productDetail = mockProducts[randomSKU];
      } else {
        productDetail = mockProducts[skuString];
      }

      const newSkuItem: SkuWithPrice = {
        sku: skuString,
        productName: productDetail ? productDetail.name : `Custom Product for ${skuString}`,
        retailPrice: productDetail ? productDetail.retailPrice : '0.00',
        image: productDetail ? productDetail.image : fallbackImages[0],
        usePromoRetailPrice: false,
        promoPrice: '',
      };
      onAddSku(newSkuItem); // Pass the full SkuWithPrice object for each SKU
    });
    setBulkSkuInput('');
  };

  const handleCategorySelection = (categoryId: string, categoryType: 'cg' | 'mc' | 'pg', checked: boolean) => {
    if (categoryType === 'cg') {
      const newSelection = checked ? [categoryId, ...selectedCommodityGroups] : selectedCommodityGroups.filter(id => id !== categoryId);
      setSelectedCommodityGroups(newSelection);
      // Reset child selections if parent is deselected
      if (!checked && newSelection.length === 0) {
        setSelectedMerchandiseClasses([]);
        setSelectedProductGroups([]);
      }
    } else if (categoryType === 'mc') {
      const newSelection = checked ? [categoryId, ...selectedMerchandiseClasses] : selectedMerchandiseClasses.filter(id => id !== categoryId);
      setSelectedMerchandiseClasses(newSelection);
      if (!checked && newSelection.length === 0) {
        setSelectedProductGroups([]);
      }
    } else if (categoryType === 'pg') {
      setSelectedProductGroups(prev =>
        checked ? [categoryId, ...prev] : prev.filter(id => id !== categoryId)
      );
    }
  };

  const renderCategoryDropdowns = () => {
    const showMerchandiseClasses = selectedCommodityGroups.length > 0;
    const showProductGroups = selectedMerchandiseClasses.length > 0;

    return (
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr', xl: '1fr 1fr 1fr' }, gap: 3 }}>
        {/* Commodity Groups */}
        <Box sx={{ width: '100%' }}>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Commodity Groups (CG)</Typography>
          <Paper variant="outlined" sx={{ borderRadius: '8px', p: 2, maxHeight: 256, overflowY: 'auto' }}>
            {commodityGroups.map((category) => (
              <FormControlLabel
                key={category.id}
                control={
                  <Checkbox
                    checked={selectedCommodityGroups.includes(category.id)}
                    onChange={(e) => handleCategorySelection(category.id, 'cg', e.target.checked)}
                    size="small"
                  />
                }
                label={`${category.name} (${category.count})`}
                sx={{ display: 'flex', alignItems: 'center', py: 0.5, '&:hover': { backgroundColor: '#f9f9f9' } }}
              />
            ))}
          </Paper>
        </Box>

        {/* Merchandise Classes - Only show if CG selected */}
        {showMerchandiseClasses && (
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Merchandise Classes (MC)</Typography>
            <Paper variant="outlined" sx={{ borderRadius: '8px', p: 2, maxHeight: 256, overflowY: 'auto' }}>
              {merchandiseClasses
                .filter(mc => selectedCommodityGroups.includes(mc.parent_cg))
                .map((category) => (
                  <FormControlLabel
                    key={category.id}
                    control={
                      <Checkbox
                        checked={selectedMerchandiseClasses.includes(category.id)}
                        onChange={(e) => handleCategorySelection(category.id, 'mc', e.target.checked)}
                        size="small"
                      />
                    }
                    label={`${category.name} (${category.count})`}
                    sx={{ display: 'flex', alignItems: 'center', py: 0.5, '&:hover': { backgroundColor: '#f9f9f9' } }}
                  />
                ))}
            </Paper>
          </Box>
        )}

        {/* Product Groups - Only show if MC selected */}
        {showProductGroups && (
          <Box sx={{ width: '100%' }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Product Groups (PG)</Typography>
            <Paper variant="outlined" sx={{ borderRadius: '8px', p: 2, maxHeight: 256, overflowY: 'auto' }}>
              {productGroups
                .filter(pg => selectedMerchandiseClasses.includes(pg.parent_mc))
                .map((category) => (
                  <FormControlLabel
                    key={category.id}
                    control={
                      <Checkbox
                        checked={selectedProductGroups.includes(category.id)}
                        onChange={(e) => handleCategorySelection(category.id, 'pg', e.target.checked)}
                        size="small"
                      />
                    }
                    label={`${category.name} (${category.count})`}
                    sx={{ display: 'flex', alignItems: 'center', py: 0.5, '&:hover': { backgroundColor: '#f9f9f9' } }}
                  />
                ))}
            </Paper>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ fontFamily: 'Inter, sans-serif' }}>
      <Typography variant="body1" sx={{ fontWeight: 600, mb: 2, color: '#1f2937' }}>
        Product Selection
      </Typography>

      <Tabs
        value={currentTab}
        onChange={(e, newValue) => setCurrentTab(newValue)}
        sx={{
          mb: 3,
          borderBottom: 1,
          borderColor: 'divider',
          '& .MuiTabs-indicator': { backgroundColor: '#dc2626' }, // Red indicator
        }}
      >
        <Tab
          value="sku-lookup"
          label="SKU Lookup"
          sx={{ textTransform: 'none', color: currentTab === 'sku-lookup' ? '#dc2626' : '#6b7280' }}
        />
        <Tab
          value="categories"
          label="Categories"
          sx={{ textTransform: 'none', color: currentTab === 'categories' ? '#dc2626' : '#6b7280' }}
        />
        <Tab
          value="bulk-entry"
          label="Bulk Entry"
          sx={{ textTransform: 'none', color: currentTab === 'bulk-entry' ? '#dc2626' : '#6b7280' }}
        />
        <Tab
          value="future-skus"
          label="Future SKUs"
          sx={{ textTransform: 'none', color: currentTab === 'future-skus' ? '#dc2626' : '#6b7280' }}
        />
      </Tabs>

      {/* Tab Contents */}
      {currentTab === 'sku-lookup' && (
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Enter SKU number"
            value={skuInput}
            onChange={(e) => setSkuInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddSkuFromInput()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    variant="contained"
                    onClick={handleAddSkuFromInput}
                    sx={{
                      backgroundColor: '#1f2937', // Dark grey/black button
                      color: 'white',
                      '&:hover': { backgroundColor: '#374151' },
                      px: 3,
                    }}
                  >
                    Add
                  </Button>
                </InputAdornment>
              ),
            }}
          />
          {skus.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Selected SKUs:</Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}> {/* Changed to column for full width cards */}
                {skus.map((skuItem, index) => {
                  // Find detailed product info using the SKU, or use a default if not found in mockProducts
                  // Note: productDetails are now guaranteed to have name, retailPrice, image due to how
                  // SkuWithPrice is constructed in handleAddSkuFromInput/handleAddBulkSkus.
                  const productDetails = mockProducts[skuItem.sku] || {
                    name: skuItem.productName, // Use what's already in skuItem
                    retailPrice: skuItem.retailPrice, // Use what's already in skuItem
                    image: skuItem.image, // Use what's already in skuItem
                  };

                  // Truncate product name if it exceeds 30 characters
                  const displayedProductName = productDetails.name
                    ? productDetails.name.length > 30
                      ? `${productDetails.name.substring(0, 30)}...`
                      : productDetails.name
                    : 'No description available';

                  return (
                    <Paper
                      key={skuItem.sku + index} // Unique key for each SKU item
                      variant="outlined"
                      sx={{
                        display: 'flex',
                        alignItems: 'center', // Align items to center
                        p: 1,
                        borderRadius: '8px', // More rounded corners for the card
                        backgroundColor: '#f3f4f6',
                        borderColor: '#e5e7eb',
                        width: '100%', // Set to full width
                      }}
                    >
                      <img
                        src={productDetails.image} // Use image from productDetails
                        alt={productDetails.name || 'Product'}
                        style={{ width: 50, height: 50, borderRadius: '4px', objectFit: 'cover', marginRight: 16, flexShrink: 0 }} // Image size 50x50px, prevent shrinking, increased right margin
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          (e.target as HTMLImageElement).src = fallbackImages[0]; // Fallback if image fails
                        }}
                      />
                      <Box sx={{ flexGrow: 1, minWidth: 0, mr: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}> {/* For SKU and Retail Price on same line */}
                          <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.2 }}>
                            SKU: {skuItem.sku} {/* Display SKU */}
                          </Typography>
                          <Typography variant="body2" sx={{ color: '#1f2937', fontWeight: 500, lineHeight: 1.2 }}> {/* Right-aligned Retail Price */}
                            ${productDetails.retailPrice}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: '#1f2937', lineHeight: 1.2, mb: 1 }}> {/* Product name */}
                          {displayedProductName}
                        </Typography>

                        {showPromoRetailCheckbox && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0 }}>
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={skuItem.usePromoRetailPrice || false}
                                  onChange={(e) => onUpdateSkuPromoRetailPrice(index, e.target.checked)}
                                  size="small"
                                  sx={{ '& .MuiSvgIcon-root': { color: '#dc2626' } }}
                                />
                              }
                              label={
                                <Typography variant="body2" sx={{ whiteSpace: 'nowrap', color: '#1f2937' }}>
                                  Use Promo Price
                                </Typography>
                              }
                              sx={{ mr: 1, ml: -1 }}
                            />

                            {/* DollarInput now only depends on skuItem.usePromoRetailPrice */}
                            {skuItem.usePromoRetailPrice && (
                              <DollarInput
                                value={skuItem.promoPrice || ''}
                                onChange={(price) => onUpdateSkuPrice(index, price)}
                                placeholder="0.00"
                                size="small"
                                sx={{ width: '60px', minWidth: '60px' }} // Adjusted width here
                              />
                            )}
                          </Box>
                        )}
                      </Box>

                      <IconButton
                        size="small"
                        onClick={() => onRemoveSku(index)}
                        sx={{ color: '#ef4444', flexShrink: 0, ml: 'auto' }}
                      >
                        <CloseIcon size={18} />
                      </IconButton>
                    </Paper>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
      )}

      {currentTab === 'categories' && (
        <Box sx={{ mb: 4 }}>
          {renderCategoryDropdowns()}
        </Box>
      )}

      {currentTab === 'bulk-entry' && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
            Paste up to 999 SKUs (one per line)
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={bulkSkuInput}
            onChange={(e) => setBulkSkuInput(e.target.value)}
            placeholder="e.g.,
8108719
8108721
8096682"
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={handleAddBulkSkus}
            sx={{
              backgroundColor: '#1f2937',
              color: 'white',
              '&:hover': { backgroundColor: '#374151' },
            }}
          >
            Add SKUs
          </Button>
        </Box>
      )}

      {currentTab === 'future-skus' && (
        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>
            Describe SKUs not yet released
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={futureSkuInput}
            onChange={(e) => setFutureSkuInput(e.target.value)}
            placeholder="Describe future SKUs or product lines"
          />
        </Box>
      )}
    </Box>
  );
};

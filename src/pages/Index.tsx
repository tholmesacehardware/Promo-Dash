// src/pages/Index.tsx
import React, { useState, useMemo } from 'react'
import { Navigation } from '@/components/Navigation'
import { MetricsTiles } from '@/components/MetricsTiles'
import { PromotionTabs } from '@/components/PromotionTabs'
import { PromotionTable, Promotion } from '@/components/PromotionTable'
import { PromotionChart } from '@/components/PromotionChart'
import { ActivitySidebar } from '@/components/ActivitySidebar'
import PromotionBuilder from '@/components/PromotionBuilder'
import { ErrorDetailSheet } from '@/components/ErrorDetailSheet'

import { Button, Box, Grid } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const Index: React.FC = () => {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)
  const [isErrorSheetOpen, setIsErrorSheetOpen] = useState(false)
  const [currentErrors, setCurrentErrors] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<
    'Current Promotions' | 'Pending Approvals' | 'Hotsheets'
  >('Current Promotions')

  // map of promoId → error messages
  const errorMap: Record<number, string[]> = {
    2: ['Missing buy condition', 'Invalid discount rate'],
    7: ['Date overlap with another promo'],
    12: ['Incomplete bundle configuration'],
  }

  const openErrorSheet = (promoId: number) => {
    setCurrentErrors(errorMap[promoId] || [])
    setIsErrorSheetOpen(true)
  }

  // ─── 1) All 17 mock promotions ─────────────────────────────────────────
  const allPromos: Promotion[] = [
    { id: 1, name: 'YETI Drinkware Discount', status: 'Active', startDate: '2024-06-01', endDate: '2024-08-31', totalBudget: '$50,000', hasErrors: false, eventName: 'Summer Sale 2025', promoType: 'Percentage Off', offerSummary: '20% off YETI drinkware', buyCondition: 'Any YETI drinkware item', getOutcome: '20% discount', storeCount: 150, hotsheetType: 'Standard', promoId: 'PROMO-2025-001' },
    { id: 2, name: 'Tool Bundle Deal', status: 'Draft', startDate: '2024-07-15', endDate: '2024-09-30', totalBudget: '$30,000', hasErrors: true, eventName: 'Back to School 2025', promoType: 'Bundle Discount', offerSummary: 'Buy 2 tools, get 1 free', buyCondition: 'Purchase 2 qualifying tools', getOutcome: 'Get lowest priced tool free', storeCount: 200, hotsheetType: 'Express', promoId: 'PROMO-2025-002' },
    { id: 3, name: 'Paint Savings Event', status: 'Active', startDate: '2024-09-01', endDate: '2024-10-15', totalBudget: '$40,000', hasErrors: false, eventName: 'Autumn Paint Fest', promoType: 'Fixed Amount Off', offerSummary: '$5 off per gallon', buyCondition: 'Any paint purchase', getOutcome: '$5 discount', storeCount: 120, hotsheetType: 'Standard', promoId: 'PROMO-2025-003' },
    { id: 4, name: 'Garden Gear Giveaway', status: 'Ended', startDate: '2024-03-01', endDate: '2024-05-01', totalBudget: '$25,000', hasErrors: false, eventName: 'Spring Bloom 2025', promoType: 'Free Item', offerSummary: 'Free gloves with shovel', buyCondition: 'Buy any shovel', getOutcome: 'Free pair of gloves', storeCount: 80, hotsheetType: 'Seasonal', promoId: 'PROMO-2025-004' },
    { id: 5, name: 'Winter Tool Clearance', status: 'Draft', startDate: '2024-11-15', endDate: '2025-01-31', totalBudget: '$60,000', hasErrors: false, eventName: 'Year-End Clearance', promoType: 'Percentage Off', offerSummary: '30% off select tools', buyCondition: 'Select tool category', getOutcome: '30% discount', storeCount: 95, hotsheetType: 'Express', promoId: 'PROMO-2025-005' },
    { id: 6, name: 'Holiday Lighting Sale', status: 'Active', startDate: '2024-12-01', endDate: '2024-12-31', totalBudget: '$22,000', hasErrors: false, eventName: 'Holiday Cheer 2025', promoType: 'Fixed Price', offerSummary: 'String lights for $19.99', buyCondition: 'Any string lights pack', getOutcome: 'Pack at $19.99', storeCount: 140, hotsheetType: 'Standard', promoId: 'PROMO-2025-006' },
    { id: 7, name: 'Black Friday Tool Blitz', status: 'Ended', startDate: '2024-11-23', endDate: '2024-11-24', totalBudget: '$100,000', hasErrors: true, eventName: 'Black Friday 2025', promoType: 'Percentage Off', offerSummary: '50% off power tools', buyCondition: 'Any power tool', getOutcome: '50% discount', storeCount: 250, hotsheetType: 'Express', promoId: 'PROMO-2025-007' },
    { id: 8, name: 'Spring Lawn Essentials', status: 'Active', startDate: '2024-04-01', endDate: '2024-06-30', totalBudget: '$35,000', hasErrors: false, eventName: 'Green Thumb 2025', promoType: 'Buy X Get Y', offerSummary: 'Buy 2 fertilizer get 1 free', buyCondition: 'Two bags of fertilizer', getOutcome: 'Third bag free', storeCount: 110, hotsheetType: 'Seasonal', promoId: 'PROMO-2025-008' },
    { id: 9, name: 'Masonry Material Markdown', status: 'Draft', startDate: '2024-08-01', endDate: '2024-09-15', totalBudget: '$28,000', hasErrors: false, eventName: 'Hardscape 2025', promoType: 'Fixed Amount Off', offerSummary: '$10 off bags of mortar', buyCondition: 'Any mortar purchase', getOutcome: '$10 discount', storeCount: 65, hotsheetType: 'Standard', promoId: 'PROMO-2025-009' },
    { id: 10, name: 'Decking Discount Days', status: 'Active', startDate: '2024-07-01', endDate: '2024-08-15', totalBudget: '$45,000', hasErrors: false, eventName: 'Summer Decking Promo', promoType: 'Percentage Off', offerSummary: '15% off decking boards', buyCondition: 'Minimum 10 boards', getOutcome: '15% discount', storeCount: 90, hotsheetType: 'Express', promoId: 'PROMO-2025-010' },
    { id: 11, name: 'Roofing Ready Sale', status: 'Active', startDate: '2024-05-01', endDate: '2024-06-30', totalBudget: '$55,000', hasErrors: false, eventName: 'Roof Ready 2025', promoType: 'Fixed Price', offerSummary: 'Roof sealant for $24.99', buyCondition: 'Any 1-gallon sealant', getOutcome: 'Fixed $24.99', storeCount: 130, hotsheetType: 'Standard', promoId: 'PROMO-2025-011' },
    { id: 12, name: 'Brick & Mortar Bundle', status: 'Draft', startDate: '2024-02-01', endDate: '2024-03-15', totalBudget: '$18,000', hasErrors: true, eventName: 'Early Spring Build', promoType: 'Bundle Discount', offerSummary: 'Buy brick & mortar together', buyCondition: '1 pallet bricks + 5 bags mortar', getOutcome: '$50 off total', storeCount: 70, hotsheetType: 'Seasonal', promoId: 'PROMO-2025-012' },
    { id: 13, name: 'Tool Rental Special', status: 'Active', startDate: '2024-10-01', endDate: '2024-12-31', totalBudget: '$12,000', hasErrors: false, eventName: 'Rental Rewards 2025', promoType: 'Gift Card', offerSummary: 'Get $10 GC with any rental', buyCondition: 'Any tool rental day', getOutcome: '$10 gift card', storeCount: 100, hotsheetType: 'Express', promoId: 'PROMO-2025-013' },
    { id: 14, name: 'Lighting & Decor Duo', status: 'Active', startDate: '2024-11-01', endDate: '2025-01-31', totalBudget: '$16,000', hasErrors: false, eventName: 'Holiday Home 2025', promoType: 'Buy X Get Y', offerSummary: 'Buy lights, get wreath free', buyCondition: 'Any holiday lights', getOutcome: 'Free wreath', storeCount: 85, hotsheetType: 'Seasonal', promoId: 'PROMO-2025-014' },
    { id: 15, name: 'Cabinet Hardware Clearance', status: 'Ended', startDate: '2024-01-01', endDate: '2024-01-31', totalBudget: '$8,000', hasErrors: false, eventName: 'Kitchen Refresh 2025', promoType: 'Percentage Off', offerSummary: '25% off knobs & pulls', buyCondition: 'Minimum $20 purchase', getOutcome: '25% discount', storeCount: 60, hotsheetType: 'Standard', promoId: 'PROMO-2025-015' },
    { id: 16, name: 'Power Tool Promo', status: 'Active', startDate: '2024-03-01', endDate: '2024-05-31', totalBudget: '$75,000', hasErrors: false, eventName: 'Power Up 2025', promoType: 'Percentage Off', offerSummary: '10% off all power tools', buyCondition: 'Any power tool', getOutcome: '10% discount', storeCount: 210, hotsheetType: 'Express', promoId: 'PROMO-2025-016' },
    { id: 17, name: 'Seasonal Decor Savings', status: 'Draft', startDate: '2024-08-15', endDate: '2024-10-15', totalBudget: '$20,000', hasErrors: false, eventName: 'Fall Décor 2025', promoType: 'Fixed Amount Off', offerSummary: '$5 off wreaths', buyCondition: 'Any wreath purchase', getOutcome: '$5 discount', storeCount: 95, hotsheetType: 'Seasonal', promoId: 'PROMO-2025-017' },
  ]

  // ─── 2) Build our three slices ─────────────────────────────────────────────
  const currentPromos = useMemo(
    () => allPromos.filter(p => ['Active', 'Draft'].includes(p.status)),
    [allPromos]
  )
  const pendingPromos = useMemo(
    () => allPromos.filter(p => p.status === 'Draft'),
    [allPromos]
  )
  const hotsheetPromos = useMemo(
    () => allPromos.filter(p => p.hotsheetType === 'Express'),
    [allPromos]
  )

  // ─── 3) Decide which one to show ───────────────────────────────────────────
  const promotionsToDisplay = useMemo(() => {
    switch (activeTab) {
      case 'Current Promotions': return currentPromos
      case 'Pending Approvals': return pendingPromos
      case 'Hotsheets': return hotsheetPromos
      default: return currentPromos
    }
  }, [activeTab, currentPromos, pendingPromos, hotsheetPromos])

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f8f8' }}>
      <Navigation />

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MetricsTiles />
          </Grid>

          <Grid item xs={12} container justifyContent="space-between" alignItems="center">
            <PromotionTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
              counts={{
                'Current Promotions': currentPromos.length,
                'Pending Approvals': pendingPromos.length,
                'Hotsheets': hotsheetPromos.length,
              }}
            />

            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsBuilderOpen(true)} sx={{ textTransform: 'none' }}>
              Create New Promotion
            </Button>
          </Grid>

          <Grid item xs={12}>
            <PromotionTable
              activeTab={activeTab}
              promotions={promotionsToDisplay}
              onOpenBuilder={() => setIsBuilderOpen(true)}
              onOpenErrorDetailSheet={openErrorSheet}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <PromotionChart />
          </Grid>

          <Grid item xs={12} md={4}>
            <ActivitySidebar />
          </Grid>
        </Grid>
      </Box>

      <PromotionBuilder isOpen={isBuilderOpen} onClose={() => setIsBuilderOpen(false)} />

      <ErrorDetailSheet
        isOpen={isErrorSheetOpen}
        onClose={() => setIsErrorSheetOpen(false)}
        errorCount={currentErrors.length}
        errors={currentErrors}
      />
    </Box>
  )
}

export default Index
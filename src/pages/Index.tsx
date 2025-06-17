import React, { useState } from 'react'
import { Navigation } from '@/components/Navigation'
import { MetricsTiles } from '@/components/MetricsTiles'
import { PromotionTabs } from '@/components/PromotionTabs'
import { PromotionTable } from '@/components/PromotionTable'
import { PromotionChart } from '@/components/PromotionChart'
import { ActivitySidebar } from '@/components/ActivitySidebar'
import PromotionBuilder from '@/components/PromotionBuilder'
import { ErrorDetailSheet } from '@/components/ErrorDetailSheet'

import { Button, Box, Grid } from '@mui/material'
import { Plus } from 'lucide-react'

const Index: React.FC = () => {
  const [isBuilderOpen, setIsBuilderOpen] = useState(false)
  const [isErrorSheetOpen, setIsErrorSheetOpen] = useState(false)
  const [currentErrors, setCurrentErrors] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState('Current Promotions')

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

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f8f8' }}>
      <Navigation />

      <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 3, py: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MetricsTiles />
          </Grid>

          <Grid item xs={12} container justifyContent="space-between" alignItems="center">
            <PromotionTabs activeTab={activeTab} onTabChange={setActiveTab} />
            <Button
              variant="contained"
              color="error"
              onClick={() => setIsBuilderOpen(true)}
            >
              <Plus size={16} style={{ marginRight: 8 }} />
              Create New Promotion
            </Button>
          </Grid>

          <Grid item xs={12}>
            <PromotionTable
              activeTab={activeTab}
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

      <PromotionBuilder
        isOpen={isBuilderOpen}
        onClose={() => setIsBuilderOpen(false)}
      />

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
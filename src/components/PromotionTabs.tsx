// src/components/PromotionTabs.tsx
import React from 'react'
import { Tabs, Tab, Box, Typography } from '@mui/material'

export type TabKey = 'Current Promotions' | 'Pending Approvals' | 'Hotsheets'

interface PromotionTabsProps {
  activeTab: TabKey
  onTabChange: (tab: TabKey) => void
  counts: Record<TabKey, number>
}

export const PromotionTabs: React.FC<PromotionTabsProps> = ({
  activeTab,
  onTabChange,
  counts,
}) => {
  const tabs: TabKey[] = [
    'Current Promotions',
    'Pending Approvals',
    'Hotsheets',
  ]
  const value = tabs.indexOf(activeTab)

  return (
    <Tabs
      value={value}
      onChange={(_, idx) => onTabChange(tabs[idx])}
      aria-label="promotion tabs"
      sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
    >
      {tabs.map(key => (
        <Tab
          key={key}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ textTransform: 'none' }}>{key}</Typography>
              <Box
                component="span"
                sx={{
                  ml: 1,
                  px: 1,
                  py: 0.5,
                  borderRadius: '12px',
                  bgcolor: 'grey.200',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                }}
              >
                {counts[key]}
              </Box>
            </Box>
          }
          sx={{
            textTransform: 'none',
            '&.Mui-selected': { color: 'primary.main', fontWeight: 600 },
          }}
        />
      ))}
    </Tabs>
  )
}
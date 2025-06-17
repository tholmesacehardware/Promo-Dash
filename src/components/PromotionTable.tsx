import React, { useMemo } from 'react'
import { DataGrid, GridColDef, GridRowClassNameParams } from '@mui/x-data-grid'
import { Box, Button, Typography } from '@mui/material'
import { AlertTriangle } from 'lucide-react'

export interface Promotion {
  id: number
  name: string
  status: string
  startDate: string
  endDate: string
  totalBudget: string
  hasErrors: boolean
  eventName: string
  promoType: string
  offerSummary: string
  buyCondition: string
  getOutcome: string
  storeCount: number
  hotsheetType: string
  promoId: string
}

export interface PromotionTableProps {
  activeTab?: string
  onOpenBuilder: () => void
  onOpenErrorDetailSheet: (promotionId: number) => void
}

export const PromotionTable: React.FC<PromotionTableProps> = ({
  activeTab,
  onOpenBuilder,
  onOpenErrorDetailSheet,
}) => {
  // 1) All 17 mock rows
  const allPromotions: Promotion[] = [
    { id: 1,  name: 'YETI Drinkware Discount', status: 'Active',  startDate: '2024-06-01', endDate: '2024-08-31', totalBudget: '$50,000', hasErrors: false, eventName: 'Summer Sale 2025',  promoType: 'Percentage Off',  offerSummary: '20% off YETI drinkware', buyCondition: 'Any YETI drinkware item', getOutcome: '20% discount', storeCount: 150, hotsheetType: 'Standard', promoId: 'PROMO-2025-001' },
    { id: 2,  name: 'Tool Bundle Deal',        status: 'Draft',   startDate: '2024-07-15', endDate: '2024-09-30', totalBudget: '$30,000', hasErrors: true,  eventName: 'Back to School 2025', promoType: 'Bundle Discount', offerSummary: 'Buy 2 tools, get 1 free', buyCondition: 'Purchase 2 qualifying tools', getOutcome: 'Get lowest priced tool free', storeCount: 200, hotsheetType: 'Express', promoId: 'PROMO-2025-002' },
    { id: 3,  name: 'Paint Savings Event',     status: 'Active',  startDate: '2024-09-01', endDate: '2024-10-15', totalBudget: '$40,000', hasErrors: false, eventName: 'Autumn Paint Fest',   promoType: 'Fixed Amount Off', offerSummary: '$5 off per gallon', buyCondition: 'Any paint purchase', getOutcome: '$5 discount', storeCount: 120, hotsheetType: 'Standard', promoId: 'PROMO-2025-003' },
    { id: 4,  name: 'Garden Gear Giveaway',    status: 'Ended',   startDate: '2024-03-01', endDate: '2024-05-01', totalBudget: '$25,000', hasErrors: false, eventName: 'Spring Bloom 2025',  promoType: 'Free Item',         offerSummary: 'Free gloves with shovel', buyCondition: 'Buy any shovel', getOutcome: 'Free pair of gloves', storeCount: 80,  hotsheetType: 'Seasonal', promoId: 'PROMO-2025-004' },
    { id: 5,  name: 'Winter Tool Clearance',   status: 'Draft',   startDate: '2024-11-15', endDate: '2025-01-31', totalBudget: '$60,000', hasErrors: false, eventName: 'Year-End Clearance',  promoType: 'Percentage Off', offerSummary: '30% off select tools', buyCondition: 'Select tool category', getOutcome: '30% discount', storeCount: 95,  hotsheetType: 'Express', promoId: 'PROMO-2025-005' },
    { id: 6,  name: 'Holiday Lighting Sale',   status: 'Active',  startDate: '2024-12-01', endDate: '2024-12-31', totalBudget: '$22,000', hasErrors: false, eventName: 'Holiday Cheer 2025',   promoType: 'Fixed Price',      offerSummary: 'String lights for $19.99', buyCondition: 'Any string lights pack', getOutcome: 'Pack at $19.99', storeCount: 140, hotsheetType: 'Standard', promoId: 'PROMO-2025-006' },
    { id: 7,  name: 'Black Friday Tool Blitz', status: 'Ended',   startDate: '2024-11-23', endDate: '2024-11-24', totalBudget: '$100,000',hasErrors: true,  eventName: 'Black Friday 2025',  promoType: 'Percentage Off', offerSummary: '50% off power tools', buyCondition: 'Any power tool', getOutcome: '50% discount', storeCount: 250, hotsheetType: 'Express', promoId: 'PROMO-2025-007' },
    { id: 8,  name: 'Spring Lawn Essentials',  status: 'Active',  startDate: '2024-04-01', endDate: '2024-06-30', totalBudget: '$35,000', hasErrors: false, eventName: 'Green Thumb 2025',    promoType: 'Buy X Get Y',     offerSummary: 'Buy 2 fertilizer get 1 free', buyCondition: 'Two bags of fertilizer', getOutcome: 'Third bag free', storeCount: 110, hotsheetType: 'Seasonal', promoId: 'PROMO-2025-008' },
    { id: 9,  name: 'Masonry Material Markdown',status: 'Draft',   startDate: '2024-08-01', endDate: '2024-09-15', totalBudget: '$28,000', hasErrors: false, eventName: 'Hardscape 2025',     promoType: 'Fixed Amount Off', offerSummary: '$10 off bags of mortar', buyCondition: 'Any mortar purchase', getOutcome: '$10 discount', storeCount: 65,  hotsheetType: 'Standard', promoId: 'PROMO-2025-009' },
    { id: 10, name: 'Decking Discount Days',  status: 'Active',  startDate: '2024-07-01', endDate: '2024-08-15', totalBudget: '$45,000', hasErrors: false, eventName: 'Summer Decking Promo', promoType: 'Percentage Off', offerSummary: '15% off decking boards', buyCondition: 'Minimum 10 boards', getOutcome: '15% discount', storeCount: 90,  hotsheetType: 'Express', promoId: 'PROMO-2025-010' },
    { id: 11, name: 'Roofing Ready Sale',     status: 'Active',  startDate: '2024-05-01', endDate: '2024-06-30', totalBudget: '$55,000', hasErrors: false, eventName: 'Roof Ready 2025',     promoType: 'Fixed Price',      offerSummary: 'Roof sealant for $24.99', buyCondition: 'Any 1-gallon sealant', getOutcome: 'Fixed $24.99', storeCount: 130, hotsheetType: 'Standard', promoId: 'PROMO-2025-011' },
    { id: 12, name: 'Brick & Mortar Bundle',  status: 'Draft',   startDate: '2024-02-01', endDate: '2024-03-15', totalBudget: '$18,000', hasErrors: true,  eventName: 'Early Spring Build',  promoType: 'Bundle Discount', offerSummary: 'Buy brick & mortar together', buyCondition: '1 pallet bricks + 5 bags mortar', getOutcome: '$50 off total', storeCount: 70,  hotsheetType: 'Seasonal', promoId: 'PROMO-2025-012' },
    { id: 13, name: 'Tool Rental Special',    status: 'Active',  startDate: '2024-10-01', endDate: '2024-12-31', totalBudget: '$12,000', hasErrors: false, eventName: 'Rental Rewards 2025',  promoType: 'Gift Card',       offerSummary: 'Get $10 GC with any rental', buyCondition: 'Any tool rental day', getOutcome: '$10 gift card', storeCount: 100, hotsheetType: 'Express', promoId: 'PROMO-2025-013' },
    { id: 14, name: 'Lighting & Decor Duo',   status: 'Active',  startDate: '2024-11-01', endDate: '2025-01-31', totalBudget: '$16,000', hasErrors: false, eventName: 'Holiday Home 2025',    promoType: 'Buy X Get Y',     offerSummary: 'Buy lights, get wreath free', buyCondition: 'Any holiday lights', getOutcome: 'Free wreath', storeCount: 85,  hotsheetType: 'Seasonal', promoId: 'PROMO-2025-014' },
    { id: 15, name: 'Cabinet Hardware Clearance', status: 'Ended', startDate: '2024-01-01', endDate: '2024-01-31', totalBudget: '$8,000', hasErrors: false,  eventName: 'Kitchen Refresh 2025', promoType: 'Percentage Off', offerSummary: '25% off knobs & pulls', buyCondition: 'Minimum $20 purchase', getOutcome: '25% discount', storeCount: 60,  hotsheetType: 'Standard', promoId: 'PROMO-2025-015' },
    { id: 16, name: 'Power Tool Promo',      status: 'Active',  startDate: '2024-03-01', endDate: '2024-05-31', totalBudget: '$75,000', hasErrors: false, eventName: 'Power Up 2025',       promoType: 'Percentage Off', offerSummary: '10% off all power tools', buyCondition: 'Any power tool', getOutcome: '10% discount', storeCount: 210, hotsheetType: 'Express', promoId: 'PROMO-2025-016' },
    { id: 17, name: 'Seasonal Decor Savings', status: 'Draft',   startDate: '2024-08-15', endDate: '2024-10-15', totalBudget: '$20,000', hasErrors: false, eventName: 'Fall Décor 2025',    promoType: 'Fixed Amount Off', offerSummary: '$5 off wreaths', buyCondition: 'Any wreath purchase', getOutcome: '$5 discount', storeCount: 95,  hotsheetType: 'Seasonal', promoId: 'PROMO-2025-017' },
  ]

  // 2) Filter by activeTab
  const promotionsToDisplay = useMemo(() => {
    switch (activeTab) {
      case 'Current Promotions':
        return allPromotions.filter(p => ['Active', 'Draft'].includes(p.status))
      case 'Past Promotions':
        return allPromotions.filter(p => p.status === 'Ended')
      case 'Draft Promotions':
        return allPromotions.filter(p => p.status === 'Draft')
      case 'Pending Approvals':
        return allPromotions.filter(p => p.status === 'Draft')
      case 'Hotsheets':
        return allPromotions
      default:
        return allPromotions
    }
  }, [activeTab])

  // 3) Count errors
  const errorCount = promotionsToDisplay.filter(p => p.hasErrors).length

  // 4) Column definitions
  const columns: GridColDef<Promotion>[] = [
    {
      field: 'error',
      headerName: '',
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          {errorCount > 0 && (
            <Typography variant="caption" sx={{ color: '#d32f2f', fontWeight: 'bold', mb: 0.5 }}>
              {errorCount}
            </Typography>
          )}
          <AlertTriangle size={16} color="#d32f2f" />
        </Box>
      ),
      renderCell: (params) =>
        params.row.hasErrors ? (
          <Typography
            variant="body2"
            onClick={() => onOpenErrorDetailSheet(params.row.id)}
            sx={{ color: '#d32f2f', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Error
          </Typography>
        ) : null,
    },
    { field: 'eventName', headerName: 'Event Name', flex: 1, minWidth: 150 },
    {
      field: 'name',
      headerName: 'Promo Name',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Typography
          variant="body2"
          onClick={onOpenBuilder}
          sx={{ color: '#1976d2', textDecoration: 'underline', cursor: 'pointer' }}
        >
          {params.value}
        </Typography>
      ),
    },
    { field: 'promoType', headerName: 'Promo Type', width: 120 },
    {
      field: 'startDate',
      headerName: 'Start Date',
      width: 110,
      renderCell: (params) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }).toUpperCase()}
        </Typography>
      ),
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 110,
      renderCell: (params) => (
        <Typography variant="body2">
          {new Date(params.value).toLocaleDateString('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
          }).toUpperCase()}
        </Typography>
      ),
    },
    { field: 'offerSummary', headerName: 'Offer Summary', flex: 1, minWidth: 180 },
    { field: 'buyCondition', headerName: 'Buy Condition', flex: 1, minWidth: 180 },
    { field: 'getOutcome', headerName: 'Get Outcome', flex: 1, minWidth: 150 },
    { field: 'storeCount', headerName: 'Store Count', width: 100 },
    {
      field: 'hotsheetType',
      headerName: 'Hotsheet Type',
      width: 120,
      renderCell: (params) => (
        <Box
          component="span"
          sx={{
            px: 1.5,
            py: 0.5,
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 600,
            backgroundColor:
              params.value === 'Standard'
                ? '#e0e0e0'
                : params.value === 'Express'
                ? '#dbeafe'
                : '#dcfce7',
            color:
              params.value === 'Standard'
                ? '#424242'
                : params.value === 'Express'
                ? '#1e40af'
                : '#166534',
          }}
        >
          {params.value}
        </Box>
      ),
    },
    { field: 'promoId', headerName: 'Promo ID', width: 120 },
    {
      field: 'actions',
      headerName: '',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <Button
          variant="text"
          size="small"
          onClick={onOpenBuilder}
          sx={{ textTransform: 'uppercase', fontSize: '0.75rem' }}
        >
          Edit
        </Button>
      ),
    },
  ]

  return (
    <Box
      sx={{
        height: 600,
        width: '100%',
        backgroundColor: 'white',
        border: 1,
        borderColor: 'grey.200',
        borderRadius: 1,
      }}
    >
      <DataGrid<Promotion>
        rows={promotionsToDisplay}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        getRowClassName={(params: GridRowClassNameParams<any>) =>
          params.row.hasErrors ? 'Mui-error-row' : ''
        }
        rowsPerPageOptions={[5, 10, 15, 25]}
        initialState={{
          pagination: { page: 0, pageSize: 15 }
        }}
        sx={{
          border: 0,
          '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5' },
          '& .MuiDataGrid-cell': { borderBottom: '1px dashed #e0e0e0' },
          '& .Mui-error-row': { backgroundColor: '#fee2e2', '&:hover': { backgroundColor: '#fecaca' } },
          '& .MuiDataGrid-row:not(.Mui-error-row):hover': { backgroundColor: '#fafafa' },
          '& .MuiDataGrid-footerContainer': { borderTop: '1px solid #e0e0e0' },
        }}
      />
    </Box>
  )
}
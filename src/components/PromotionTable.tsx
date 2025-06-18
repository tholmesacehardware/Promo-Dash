// src/components/PromotionTable.tsx
import React, { useState, useMemo } from 'react'
import {
  DataGrid,
  GridColDef,
  GridRowClassNameParams,
  GridSelectionModel
} from '@mui/x-data-grid'
import {
  Box,
  Button,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  IconButton
} from '@mui/material'
import { AlertTriangle } from 'lucide-react'
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'

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

interface PromotionTableProps {
  activeTab: 'Current Promotions' | 'Pending Approvals' | 'Hotsheets'
  promotions: Promotion[]
  onOpenBuilder: () => void
  onOpenErrorDetailSheet: (promotionId: number) => void
}

export const PromotionTable: React.FC<PromotionTableProps> = ({
  activeTab,
  promotions,
  onOpenBuilder,
  onOpenErrorDetailSheet,
}) => {
  const [selectionModel, setSelectionModel] = useState<GridSelectionModel>([])
  const [searchText, setSearchText] = useState('')
  const [viewBy, setViewBy] = useState<string>('All Types')

  const filteredPromotions = useMemo(
    () =>
      promotions.filter(p => {
        const s = searchText.trim().toLowerCase()
        if (!s) return true
        return (
          p.name.toLowerCase().includes(s) ||
          p.eventName.toLowerCase().includes(s)
        )
      }),
    [promotions, searchText]
  )

  const showErrors = activeTab === 'Current Promotions'
  const errorCount = showErrors
    ? filteredPromotions.filter(p => p.hasErrors).length
    : 0

  const columns: GridColDef<Promotion>[] = []

  if (showErrors) {
    columns.push({
      field: 'error',
      headerName: '',
      headerAlign: 'center',
      align: 'center',
      width: 60,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderHeader: () => (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {errorCount > 0 && (
            <Typography
              variant="caption"
              sx={{ color: '#d32f2f', fontWeight: 'bold', lineHeight: 1 }}
            >
              {errorCount}
            </Typography>
          )}
          <AlertTriangle size={16} color="#d32f2f" />
        </Box>
      ),
      renderCell: params =>
        params.row.hasErrors ? (
          <Typography
            variant="body2"
            onClick={() => onOpenErrorDetailSheet(params.row.id)}
            sx={{ color: '#d32f2f', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Error
          </Typography>
        ) : null,
    })
  }

  columns.push(
    { field: 'eventName', headerName: 'Event Name', flex: 1, minWidth: 150 },
    {
      field: 'name',
      headerName: 'Promo Name',
      flex: 1,
      minWidth: 150,
      renderCell: params => (
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
      renderCell: params => (
        <Typography variant="body2">
          {new Date(params.value as string)
            .toLocaleDateString('en-US', {
              month: 'short', day: '2-digit', year: 'numeric',
            })
            .toUpperCase()}
        </Typography>
      ),
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      width: 110,
      renderCell: params => (
        <Typography variant="body2">
          {new Date(params.value as string)
            .toLocaleDateString('en-US', {
              month: 'short', day: '2-digit', year: 'numeric',
            })
            .toUpperCase()}
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
      renderCell: params => (
        <Box
          component="span"
          sx={{
            px: 1.5, py: 0.5, borderRadius: '9999px',
            fontSize: '0.75rem', fontWeight: 600,
            backgroundColor:
              params.value === 'Standard' ? '#e0e0e0'
                : params.value === 'Express' ? '#dbeafe'
                  : '#dcfce7',
            color:
              params.value === 'Standard' ? '#424242'
                : params.value === 'Express' ? '#1e40af'
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
    }
  )

  const getRowClassName = (params: GridRowClassNameParams<any>) =>
    showErrors && params.row.hasErrors ? 'Mui-error-row' : ''

  return (
    <Box sx={{ backgroundColor: 'white', border: 1, borderColor: 'grey.200', borderRadius: 1 }}>
      {/* header with Delete, Search centered, then Dropdown+Print/Download on right */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          borderBottom: 1,
          borderColor: 'grey.200',
        }}
      >
        {/* Left controls */}
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            disabled={selectionModel.length === 0}
            onClick={() => {/* delete logic */ }}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            disabled={selectionModel.length === 0}
            onClick={() => {/* duplicate logic */ }}
          >
            Duplicate
          </Button>
        </Box>

        {/* Centered search */}
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <TextField
            sx={{ width: 300 }}
            size="small"
            placeholder="Search…"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </Box>

        {/* Right controls: dropdown then icons */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FormControl size="small">
            <Select
              value={viewBy}
              onChange={e => setViewBy(e.target.value)}
              displayEmpty
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="All Types">All Types</MenuItem>
              <MenuItem value="Retail">Retail</MenuItem>
              <MenuItem value="Wholesale">Wholesale</MenuItem>
              <MenuItem value="Special Order">Special Order</MenuItem>
            </Select>
          </FormControl>
          <IconButton aria-label="Print">
            <PrintOutlinedIcon />
          </IconButton>
          <IconButton aria-label="Download">
            <FileDownloadOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      <DataGrid<Promotion>
        rows={filteredPromotions}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        getRowClassName={getRowClassName}
        selectionModel={selectionModel}
        onSelectionModelChange={newSel => setSelectionModel(newSel)}
        rowsPerPageOptions={[5, 10, 15, 25, filteredPromotions.length]}
        initialState={{
          pagination: {
            page: 0,
            pageSize: filteredPromotions.length,
          },
        }}
        componentsProps={{
          pagination: { labelRowsPerPage: '' },
        }}
        sx={{
          height: 600,
          '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f5f5f5' },
          '& .MuiDataGrid-cell': { borderBottom: '1px dashed #e0e0e0' },
          '& .Mui-error-row': {
            backgroundColor: '#fee2e2',
            '&:hover': { backgroundColor: '#fecaca' },
          },
          '& .MuiDataGrid-row:not(.Mui-error-row):hover': { backgroundColor: '#fafafa' },
          '& .MuiDataGrid-footerContainer': { borderTop: '1px solid #e0e0e0' },
        }}
      />
    </Box>
  )
}
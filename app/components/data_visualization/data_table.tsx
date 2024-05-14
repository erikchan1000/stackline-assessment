'use client'

import React from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { DataTableInterface } from './interface'
import { addCommas } from './add_commas'

export const DataTable = ({sales}: DataTableInterface) => {
  const columns = [
    { field: 'weekEnding', headerName: 'Week Ending', sortable: true, flex: 1},
    { field: 'retailSales', headerName: 'Retail Sales', sortable: true, valueFormatter: (value: any) => `${addCommas(value)}`, flex: 1},
    { field: 'wholesaleSales', headerName: 'Wholesale Sales', sortable: true, valueFormatter: (value: any) => `${addCommas(value)}`, flex: 1 },
    { field: 'unitsSold', headerName: 'Units Sold', sortable: true, valueFormatter: (value: any) => `${addCommas(value)}`, flex: 1},
    { field: 'retailerMargin', headerName: 'Retailer Margin', sortable: true, valueFormatter: (value: any) => `$${addCommas(value)}`, flex: 1}
  ]

  return (
      <DataGrid rows={sales} columns={columns} getRowId={
        (row) => row.weekEnding
      }
        autosizeOnMount={true}
        autosizeOptions={{
          columns: ['weekEnding', 'retailSales', 'wholesaleSales', 'unitsSold', 'retailerMargin'],
          includeHeaders: true,
        }}
      />
  )
}

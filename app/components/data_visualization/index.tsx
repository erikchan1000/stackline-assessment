'use client'

import React from 'react';
import './styles.scss';
import { DataVisualizationInterface } from './interface';
import { LineChart } from '@mui/x-charts'
import { DataTable } from './data_table';

export const DataVisualization = ({sales}: DataVisualizationInterface) => {
  const formattedDate = sales.map(item => {
      return {
        ...item,
        date: new Date(item.weekEnding),
        retailSales: Number(item.retailSales),
        month: new Date(item.weekEnding).getMonth(),
        year: new Date(item.weekEnding).getFullYear()
      }
    }
  )

  const years = [...new Set(formattedDate.map(item => item.year))]
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format;

  return (
    <div className="data-visualization">
      <div className='title'>
        Retail Sales
      </div>
      <LineChart
        dataset={formattedDate}
        series={
          years.map(year => {
            return {
              type: 'line',
              label: year.toString(),
              name: year.toString(),
              showMark: false,
              connectNulls: false,
              valueFormatter: (value: any) => {
                console.log(value)
                return `$${value}`
              },
              data: formattedDate.map(item => {
                if(item.year === year) {
                  return item.retailSales
                }
                else {
                  return null
                }
              })
            }
          })
        }
        height={300}
        yAxis={[
          {
            dataKey: 'retailSales',
            scaleType: 'linear',
            valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
          }
        ]}
        xAxis={[
          {
            dataKey: 'date',
            scaleType: 'time',
            valueFormatter: (date: Date) => {
              return `${months[date.getMonth()]}`
            },
            tickNumber: 9,
          }
        ]}
        tooltip={{
        }}
      />
      <DataTable sales={formattedDate} />
    </div>
  )

}

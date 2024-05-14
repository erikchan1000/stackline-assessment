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
  console.log(years)
  console.log("Series", years.map(year => {
    return {
      type: 'line',
      dataKey: 'retailSales',
      name: year.toString(),
    }
  }))

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  return (
    <div className="data-visualization">
      <LineChart
        title="Retail Sales"
        dataset={formattedDate}
        series={
          years.map(year => {
            return {
              type: 'line',
              label: year.toString(),
              dataKey: 'retailSales',
              name: year.toString(),
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
            valueFormatter: (value: number) => `$${value/1000}`,
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
      />
      <DataTable sales={formattedDate} />
    </div>
  )

}

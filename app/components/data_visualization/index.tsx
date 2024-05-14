'use client'

import React from 'react';
import './styles.scss';
import { DataVisualizationInterface } from './interface';
import { LineChart } from '@mui/x-charts'
import { DataTable } from './data_table';
import { addCommas } from './add_commas';

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
                return value === null ? 'No Data' : `$${addCommas(value)}`
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
            valueFormatter: (v) => (v === null ? '' : `$${addCommas(v/1000)}`),
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
            tickMinStep: new Date(2020, 1, 1).getTime() - new Date(2020, 0, 1).getTime(),
            min: new Date(2017, 0, 1).getTime(),
          }
        ]}
        tooltip={{
        }}
      />
      <DataTable sales={formattedDate} />
    </div>
  )

}

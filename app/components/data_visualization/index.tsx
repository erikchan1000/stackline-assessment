import React from 'react';
import './styles.scss';
import { DataVisualizationInterface } from './interface';
import { LineChart } from '@mui/x-charts'
import { DataGrid } from '@mui/x-data-grid'

export const DataVisualization = ({sales}: DataVisualizationInterface) => {
  const formattedDate = sales.map(item => {
      return {
        ...item,
        date: new Date(item.weekEnding),
        retailSales: Number(item.retailSales),
      }
    }
  )

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return (
    <div className="data-visualization">
      <LineChart
        dataset={formattedDate}
        series={[{
          type: 'line',
          dataKey: 'retailSales',
        }]}
        height={300}
        yAxis={[
          {
            dataKey: 'retailSales',
            scaleType: 'linear',
            label: 'Retail Sales',
            valueFormatter: (value: number) => `$${value/1000}`,
          }
        ]}
        xAxis={[
          {
            dataKey: 'date',
            scaleType: 'time',
            valueFormatter: (date: Date) => {
              console.log(date.getMonth().toString())
              return `${months[date.getMonth()]} ${date.getFullYear()}`
            },
          }
        ]}
        
      />
    </div>
  )

}

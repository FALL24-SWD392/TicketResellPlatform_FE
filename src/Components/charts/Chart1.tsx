import React from 'react'
import Chart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts' 

const Chart1: React.FC = () => {
  
  const options: ApexOptions = {
    chart: {
      height: '100%',
      type: 'area', 
      toolbar: {
        show: false
      }
    },
    stroke: {
      width: 2
    },
    tooltip: {
      x: {
        format: 'dd MMM'
      }
    },
    legend: {
      show: true
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `$${value}`
      }
    }
  }

  const series = [
    {
      name: 'Total Spent',
      data: [150, 200, 100, 200, 300, 150, 200, 100, 250, 300, 100, 200]
    },
    {
      name: 'New Clients',
      data: [321, 420, 230, 450, 300, 480, 550, 600, 400, 520, 350, 300]
    }
  ]

  return (
    <div className='h-64 '>
      <Chart options={options} series={series} type='area' height='100%' />
    </div>
  )
}

export default Chart1

import React from 'react'

const Chart3: React.FC = () => {
  const data = [
    { year: '2020', value: 2000 },
    { year: '2021', value: 4500 },
    { year: '2022', value: 5000 },
    { year: '2023', value: 6500 },
    { year: '2024', value: 7000 }
  ]

  const maxValue = Math.max(...data.map((item) => item.value))
  const chartHeight = 300
  const chartWidth = 400
  const padding = 20

  return (
    <div className='flex flex-col items-center'>
      <svg width={chartWidth} height={chartHeight} className='border rounded-lg shadow-md'>
        <g transform={`translate(${padding}, ${chartHeight - padding})`}>
          <line x1={0} y1={0} x2={chartWidth - 2 * padding} y2={0} stroke='gray' />
          <line x1={0} y1={0} x2={0} y2={-chartHeight + 2 * padding} stroke='gray' />
          {data.map((item, index) => {
            const x = ((chartWidth - 2 * padding) / (data.length - 1)) * index
            const y = -((item.value / maxValue) * (chartHeight - 2 * padding))

            return (
              <React.Fragment key={item.year}>
                {index > 0 && (
                  <line
                    x1={((chartWidth - 2 * padding) / (data.length - 1)) * (index - 1)}
                    y1={-((data[index - 1].value / maxValue) * (chartHeight - 2 * padding))}
                    x2={x}
                    y2={y}
                    stroke='purple'
                    strokeWidth={2}
                  />
                )}
                <circle cx={x} cy={y} r={4} fill='purple' />
                <text x={x} y={15} textAnchor='middle' className='text-xs text-gray-600'>
                  {item.year}
                </text>
              </React.Fragment>
            )
          })}
        </g>
      </svg>
      <div className='text-sm text-green-500 mt-2'>+15% from last year</div>
      <div className='text-sm text-green-500 mt-1'>On track for growth</div>
    </div>
  )
}

export default Chart3

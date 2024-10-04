import React from 'react'

const Chart2: React.FC = () => {
  const data = [
    { month: 'Jan', value: 40 },
    { month: 'Feb', value: 60 },
    { month: 'Mar', value: 80 },
    { month: 'Apr', value: 50 },
    { month: 'May', value: 90 },
    { month: 'Jun', value: 70 },
    { month: 'Jul', value: 100 },
    { month: 'Aug', value: 30 },
    { month: 'Sep', value: 85 },
    { month: 'Oct', value: 60 },
    { month: 'Nov', value: 40 },
    { month: 'Dec', value: 70 }
  ]

  return (
    <div className='flex flex-col items-center'>
      <div className='flex items-end justify-between w-full h-64 bg-white rounded-lg p-4'>
        {data.map((item) => (
          <div
            key={item.month}
            className='flex-1 mx-1 relative group'
            style={{ height: `${item.value}%`, backgroundColor: 'rgba(128, 0, 128, 0.6)' }}
          >
            <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 text-xs text-center text-gray-600'>{item.month}</div>
            <div className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 text-xs text-center text-white bg-purple-600 rounded px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              {item.value}%
            </div>
          </div>
        ))}
      </div>
      <div className='text-sm text-green-500 mt-2'>+2.45%</div>
      <div className='text-sm text-green-500 mt-1'>On track</div>
    </div>
  )
}

export default Chart2

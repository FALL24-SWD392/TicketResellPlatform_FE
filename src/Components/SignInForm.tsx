import React from 'react'

const SignInForm = () => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-lg scale-100'>
      <div className='mb-4'>
        <div className='relative'>
          <input type='text' placeholder='Username' className='w-full px-4 py-2 border rounded-md' />
        </div>
      </div>
      <div className='mb-4'>
        <div className='relative'>
          <input type='password' placeholder='Password' className='w-full px-4 py-2 border rounded-md' />
        </div>
      </div>
      <button className='w-full py-2 bg-green-500 text-white rounded-md mb-4'>Sign in</button>
      <p className='text-sm text-gray-600 mb-4'>Forgot password?</p>
      <p>
        <span>Don't have an account?</span>{' '}
        
      </p>
    </div>
  )
}
export default SignInForm

import React from 'react'
const SignUpForm: React.FC<{ toggleForm: () => void }> = ({ toggleForm }) => {
  return (
    <div className='bg-white p-6 rounded-lg shadow-lg scale-100'>
      <div className='mb-4'>
        <div className='relative'>
          <input type='text' placeholder='Username' className='w-full px-4 py-2 border rounded-md' />
        </div>
      </div>
      <div className='mb-4'>
        <div className='relative'>
          <input type='email' placeholder='Email' className='w-full px-4 py-2 border rounded-md' />
        </div>
      </div>
      <div className='mb-4'>
        <div className='relative'>
          <input type='password' placeholder='Password' className='w-full px-4 py-2 border rounded-md' />
        </div>
      </div>
      <div className='mb-4'>
        <div className='relative'>
          <input type='password' placeholder='Confirm password' className='w-full px-4 py-2 border rounded-md' />
        </div>
      </div>
      <button className='w-full py-2 bg-green-500 text-white rounded-md mb-4'>Sign up</button>
      <p>
        <span>Already have an account?</span>{' '}
        <b className='cursor-pointer' onClick={toggleForm}>
          Sign in here
        </b>
      </p>
    </div>
  )
}

export default SignUpForm

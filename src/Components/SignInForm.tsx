import { Button, Input, Link } from '@nextui-org/react'
import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import path from 'src/constants/path'
import banner from 'src/assets/images/banner.svg'
import facebookIcon from 'src/assets/images/facebook.svg'
import googleIcon from 'src/assets/images/google.svg'
import IconButton from './IconButton'

const SignInForm = ({
  onSubmit,
  register,
  loginError
}: {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  register: UseFormRegister<any>
  loginError?: string
}) => {
  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-cover bg-center'
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className='p-10 shadow-lg flex-col items-center justify-center max-w-md w-full'
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          backdropFilter: 'blur(5px)'
        }}
      >
        <div className='flex flex-col items-center mt-5'>
          <h1 className='text-4xl font-bold mb-5' style={{ color: '#FFFFFF' }}>
            ĐĂNG NHẬP
          </h1>
          <hr className='border-white flex-1 my-2' />
        </div>
        <form noValidate onSubmit={onSubmit} className='mt-5'>
          <div className='w-full flex flex-col items-center gap-5'>
            <Input
              isRequired
              type='email'
              className='max-w-xs'
              placeholder='Email của bạn'
              {...register('username', { required: true })}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                backdropFilter: 'blur(15px)'
              }}
            />
            <Input
              isRequired
              type='password'
              className='max-w-xs'
              placeholder='Mật khẩu'
              {...register('password', { required: true })}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                backdropFilter: 'blur(15px)'
              }}
            />
            <Button
              type='submit'
              style={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: '9999px'
              }}
              className='px-10 py-3 font-semibold'
            >
              ĐĂNG NHẬP
            </Button>

            <div className='flex items-center justify-between w-full mt-2'>
              <label className='text-sm' style={{ color: '#FFFFFF' }}>
                <input type='checkbox' className='mr-2' />
                Ghi nhớ mật khẩu
              </label>
              <Link href={path.forgotPassword} className='text-sm' style={{ color: '#FFFFFF' }}>
                Quên mật khẩu?
              </Link>
            </div>
            <div className='flex items-center w-full my-4'>
              <hr className='flex-1' style={{ borderColor: '#FFFFFF', borderWidth: '1px' }} />
              <span className='mx-3' style={{ color: '#FFFFFF' }}>
                HOẶC
              </span>
              <hr className='flex-1' style={{ borderColor: '#FFFFFF', borderWidth: '1px' }} />
            </div>

            <div className='flex gap-5'>
              <IconButton width={10} height={10} src={facebookIcon} alt='Facebook'></IconButton>
              <IconButton width={10} height={10} src={googleIcon} alt='Google'></IconButton>
            </div>
          </div>
        </form>
        <div className='mt-5 text-center' style={{ color: '#FFFFFF' }}>
          Bạn chưa có tài khoản?{' '}
          <Link href={path.register} className='font-bold' style={{ color: '#FFFFFF' }}>
            Đăng ký
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignInForm

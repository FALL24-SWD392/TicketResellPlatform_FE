import { Input, Link } from '@nextui-org/react'
import { UseFormRegister } from 'react-hook-form'
import banner from 'src/assets/images/banner.svg'
import path from 'src/constants/path'

type ForgotPasswordFormProps = {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  register: UseFormRegister<any>
  forgotError?: string
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onSubmit,
  register,
  forgotError
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className="p-10 shadow-lg flex flex-col items-center justify-center max-w-lg w-full"
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '20px',
          backdropFilter: 'blur(5px)'
        }}
      >
        <div className="p-2 flex-col items-start text-white">
        <h1 className='text-4xl text-center font-bold mb-5' style={{ color: '#FFFFFF' }}>
            QUÊN MẬT KHẨU
          </h1>
          <div className="text-lg font-serif" style={{ color: '#FFFFFF' }}>
            Bạn quên mật khẩu? Hãy Nhập địa chỉ email để lấy lại mật khẩu qua email.
          </div>
          <form noValidate onSubmit={onSubmit} className="mt-5 flex items-start flex-col">
            <div className="w-full flex flex-col gap-5 ">
              <Input
              isRequired
              type='email'
              className='w-100 text-lg py-3 px-4 text-white '
              placeholder='Email của bạn'
              {...register('email', { required: true })}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '10px',
                backdropFilter: 'blur(15px)'
              }}
            />
              {forgotError && <p className="text-red-500">{forgotError}</p>}
              <Link
                href={path.login}
                className="w-full text-center py-3 px-6 font-bold"
                style={{
                  display: 'block',
                  backgroundColor: '#000000',
                  color: '#FFFFFF',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  transition: 'background-color 0.3s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#333')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000')}
              >
                Lấy lại mật khẩu
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordForm

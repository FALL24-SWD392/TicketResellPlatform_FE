import { Button, Input } from "@nextui-org/react"
import authAPI from 'src/apis/auth.api'
import { getAccessTokenFromLS } from 'src/utils/auth'
import { ChangePasswordSchema, ChangePasswordSchemaYup } from 'src/utils/rules'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { ErrorResponse } from 'src/@types/utils.type'
import { yupResolver } from "@hookform/resolvers/yup"

export type FormResetPassword = ChangePasswordSchema

const ResetPassword = () => {

    const nagivate = useNavigate()
  const {
    register,
    handleSubmit,
    // setError,
    formState: {}
  } = useForm<FormResetPassword>({
    resolver: yupResolver(ChangePasswordSchemaYup)
  })
  const changePasswordMutation = useMutation({
    mutationFn: (body: FormResetPassword) => {
      return authAPI.changePassword(body)
    }
  })
  const onSubmit = handleSubmit((data) => {
    changePasswordMutation.mutate(data, {
      onSuccess: (data) => {
        nagivate('/login')
        toast.success(data.data.message)
        authAPI.logout(getAccessTokenFromLS())
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FormResetPassword>>(error)) {
          const errors = error.response?.data.errors
          console.log(errors)
        }
      }
    })
  })
    return (
        <div>
          <h1>Reset Password</h1>
          <form noValidate onSubmit={onSubmit} className='mt-5'>
            <div className='w-full flex flex-col items-center gap-5'>
              <Input isRequired type='password' label='Old Password' className='max-w-xs' {...register('oldPassword', { required: true })} />
              <Input isRequired type='password' label='New Password' className='max-w-xs' {...register('newPassword', { required: true })} />
              <Input isRequired type='password' label='Confirm Password' className='max-w-xs' {...register('confirmPassword', { required: true })} />
              <Button type='submit'>Submit</Button>
            </div>
          </form>
        </div>
      )
}
export default ResetPassword
import { Button, DatePicker, DatePickerProps, Input, TimeInputProps } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { CreateTicket } from 'src/@types/ticket.type'
import ticketAPI from 'src/apis/ticket.api'

import { AppContext } from 'src/context/app.context'
import { v4 } from 'uuid'
import demo from 'src/assets/images/demoImage.jpg'
import { imageDB } from 'src/firebase'
const initForm = {
  title: '',
  exp_date: dayjs(new Date(), 'DD/MM/YYYY'),
  time: dayjs('15:00', 'HH:mm'),
  unit_price: '',
  typeTicket: '',
  quantity: '',
  description: '',
  image: ''
}

const CreateTicketPage = () => {
  const { profile } = useContext(AppContext)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [form, setForm] = useState<typeof initForm>(initForm)
  const createTicketMutation = useMutation({
    mutationFn: (body: CreateTicket) => ticketAPI.createTicket(body)
  })
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imgRef = ref(imageDB, `images/${v4()}`)
      await uploadBytes(imgRef, event.target.files[0]).then((value) => {
        getDownloadURL(value.ref).then((url) => setPreviewImage(url))
      })
    }
  }
  //handlechange time
  const handleChangeTime: (name: 'timeExp') => TimeInputProps['onChange'] = (name: 'timeExp') => {
    return (timeString) => {
      if (name === 'timeExp') {
        setForm((prevForm) => ({
          ...prevForm,
          timeExpire: timeString as unknown as dayjs.Dayjs
        }))
      }
    }
  }
  const onChangeDate: DatePickerProps['onChange'] = (date) => {
    setForm((prevForm) => ({
      ...prevForm,
      dateExpire: date as any
    }))
    console.log(date)
  }
  const handleDescriptionChange = (content: string) => {
    setForm((prevForm) => ({ ...prevForm, description: content }))
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const bodyCreateTicket = {
      ...form,
      exp_date: form.exp_date.format('DD/MM/YYYY'),
      type: form.typeTicket,
      price: form.unit_price ? form.unit_price : 0,
      image: previewImage
    }
    createTicketMutation.mutate(bodyCreateTicket as any, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        console.log(data)
        // window.location.href = `http://localhost:3000/event-operator/manage/${data.data.data.event._id}/overview`
      }
      //   onError: (error) => {
      //     if (isAxiosUnprocessableEntityError<ErrorResponse<typeof errorForm>>(error)) {
      //       if (error.response?.data.errors?.time_end || error.response?.data.errors?.time_start || error.response?.data.errors?.date_event) {
      //         toast.error('Time is duplicate with another different event')
      //       } else {
      //         const err = omit(error.response?.data.errors, ['date_event', 'time_end', 'time_end'])
      //         setFormError((prev) => ({ ...prev, ...(err as typeof errorForm) }))
      //         toast.error('Please check your input')
      //       }
      //     }
      //   }
    })
  }
  return (
    <div className='flex justify-center mt-[100px]'>
      <h1>Create Ticket</h1>
      <form className='flex flex-col justify-center' onSubmit={handleSubmit} noValidate>
        <div className='relative flex h-[300px] w-[300px] rounded-[30px] items-center justify-center border border-solid'>
          {previewImage ? (
            <img src={previewImage} alt='Name Image' className='h-[280px] w-[350px] rounded-[20px] object-cover mb-[40px]' />
          ) : (
            <img src={demo} alt='thumnal_event' className='h-[286px] w-[375px] rounded-[30px] object-cover mb-[40px]' />
          )}
          <input type='file' className='absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer' onChange={handleChange} />
        </div>
        <Input
          size='lg'
          type='text'
          label='Title Ticket'
          placeholder='Enter your ticket'
          onChange={(e) => {
            setForm((prevForm) => ({ ...prevForm, title: e.target.value }))
          }}
        />
        <Input
          type='text'
          className=' outline-none border-none text-end  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          placeholder='Free'
          value={form.unit_price}
          onChange={(event) => {
            setForm((prev) => ({
              ...prev,
              unit_price: event.target.value
            }))
          }}
        />
         <Input
          type='text'
          className=' outline-none border-none text-end  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          placeholder='Quantity'
          value={form.quantity}
          onChange={(event) => {
            setForm((prev) => ({
              ...prev,
              quantity: event.target.value
            }))
          }}
        />
        <Input
          type='text'
          className=' outline-none border-none text-end  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          placeholder='Description'
          value={form.description}
          onChange={(event) => {
            setForm((prev) => ({
              ...prev,
              description: event.target.value
            }))
          }}
        />
        <DatePicker label={'Birth date'} className='max-w-[284px]' labelPlacement='outside' onChange={onChangeDate} />

        <Button type='submit' > Create Ticket</Button>
      </form>
    </div>
  )
}
export default CreateTicketPage

import { Button, DateInputProps, DatePicker, DatePickerProps, Input } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { CreateTicket } from 'src/@types/ticket.type'
import ticketAPI from 'src/apis/ticket.api'
import { parseZonedDateTime, ZonedDateTime } from '@internationalized/date'
import { AppContext } from 'src/context/app.context'
import { v4 } from 'uuid'
import demo from 'src/assets/images/demoImage.jpg'
import chatapp from 'src/utils/chatapp.config'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'

const initForm = {
  sellerId: '',
  title: '',
  expDate: '',
  type: 'VOUCHER',
  unitPrice: 0,
  quantity: 0,
  description: '',
  image: ''
}

const CreateTicketPage = () => {
  const navigate = useNavigate()
  const imageDB = chatapp.imageDB
  const { profile } = useContext(AppContext)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [form, setForm] = useState<typeof initForm>(initForm)
  const [selectedDate, setSelectedDate] = useState(parseZonedDateTime('2024-11-09T00:45[Asia/Saigon]'))
  const createTicketMutation = useMutation({
    mutationFn: (body: CreateTicket) => ticketAPI.createTicket(body)
  })
  const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imgRef = ref(imageDB, `images/${v4()}`)
      await uploadBytes(imgRef, event.target.files[0]).then((value) => {
        getDownloadURL(value.ref).then((url) => setPreviewImage(url))
      })
    }
  }
  // const today = dayjs(new Date()).format('YYYY-MM-DDTHH:mm:ss[Asia/Saigon]')
  // console.log(selectedDate)
  // const handleDateChange = (date: ZonedDateTime) => {
  //  const dates =  parseZonedDateTime(date.toString())
  //  const dateChange = date.toString()
  //  console.log('time',dates)
  //   const today = dayjs(new Date()).format('YYYY-MM-DDTHH:mm[Asia/Saigon]')
  //   if (date < parseZonedDateTime(today)) {
  //     toast.error('Please select a future date')
  //     setSelectedDate(parseZonedDateTime(today)) // Reset to today's date if a past date is chosen
  //   } else {
  //     setSelectedDate(parseZonedDateTime(dateChange))
  //   }
  // }

  const handleDescriptionChange = (content: string) => {
    setForm((prevForm) => ({ ...prevForm, description: content }))
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const bodyCreateTicket = {
      ...form,
      sellerId: profile?.id,
      type: form.type ? form.type : 'VOUCHER',
      image: previewImage,
      expDate: selectedDate.toString().split('[')[0]
    }
    createTicketMutation.mutate(bodyCreateTicket as any, {
      onSuccess: (data) => {
        toast.success('Create ticket successfully')
        console.log(data)
        // navigate('/')
        window.location.href = `http://localhost:3000/manage-my-ticket/${data.data.data.id}`
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
    <div className='container mx-auto max-w-2xl px-4 py-8'>
      <h1 className='text-3xl font-bold text-center mb-8'>Create Ticket</h1>
      <form className='space-y-6 bg-white p-8 rounded-lg shadow-lg' onSubmit={handleSubmit} noValidate>
        {/* Image upload section */}
        <div className='relative flex h-[300px] w-full rounded-lg items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors'>
          {previewImage ? (
            <img src={previewImage} alt='Ticket Image' className='h-full w-full rounded-lg object-cover' />
          ) : (
            <div className='text-center'>
              <img src={demo} alt='Upload preview' className='h-[200px] w-[200px] mx-auto object-cover opacity-50' />
              <p className='mt-2 text-sm text-gray-500'>Click or drag image to upload</p>
            </div>
          )}
          <input type='file' className='absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer' onChange={handleChangeImage} />
        </div>

        {/* Form inputs with consistent spacing */}
        <div className='space-y-4'>
          <Input
            size='lg'
            type='text'
            label='Title Ticket'
            placeholder='Enter your ticket title'
            className='w-full'
            onChange={(e) => {
              setForm((prevForm) => ({ ...prevForm, title: e.target.value }))
            }}
          />

          <div className='grid grid-cols-2 gap-4'>
            <Input
              type='text'
              label='Price'
              placeholder='Enter price'
              className='w-full'
              value={form.unitPrice.toString()}
              onChange={(event) => {
                const value = parseInt(event.target.value, 10) || 1
                if (value < 0) {
                  toast.error('Invalid unit price')
                }
                setForm((prev) => ({
                  ...prev,
                  unitPrice: value
                }))
              }}
            />

            <Input
              type='text'
              label='Quantity'
              placeholder='Enter quantity'
              className='w-full'
              value={form.quantity.toString()}
              onChange={(event) => {
                const value = parseInt(event.target.value, 10) || 1
                if (value < 0) {
                  toast.error('Invalid quantity')
                }
                setForm((prev) => ({
                  ...prev,
                  quantity: value
                }))
              }}
            />
            <Input
              type='text'
              label='Type Ticket'
              placeholder='Enter type ticket'
              className='w-full'
              value={form.type}
              onChange={(e) => {
                setForm((prevForm) => ({ ...prevForm, type: e.target.value }))
              }}
            />
          </div>

          <Input
            type='text'
            label='Description'
            placeholder='Enter ticket description'
            className='w-full'
            value={form.description}
            onChange={(event) => {
              setForm((prev) => ({
                ...prev,
                description: event.target.value
              }))
            }}
          />

          <DatePicker
            label='Expiration Date'
            variant='bordered'
            className='w-full'
            showMonthAndYearPickers
            value={selectedDate}
            onChange={setSelectedDate}
          />

          <Button type='submit' className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors'>
            Create Ticket
          </Button>
        </div>
      </form>
    </div>
  )
}
export default CreateTicketPage

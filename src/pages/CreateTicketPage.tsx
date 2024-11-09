import { Button, DatePicker, Input } from '@nextui-org/react'
import { useMutation } from '@tanstack/react-query'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { CreateTicket } from 'src/@types/ticket.type'
import ticketAPI from 'src/apis/ticket.api'
import {parseZonedDateTime} from "@internationalized/date";
import { AppContext } from 'src/context/app.context'
import { v4 } from 'uuid'
import demo from 'src/assets/images/demoImage.jpg'
import chatapp from 'src/utils/chatapp.config'

const initForm = {
  sellerId: '',
  title: '',
  expDate: '',
  type: 'VOUCHER',
  unitPrice: "",
  quantity: "",
  description: '',
  image: ''
}

const CreateTicketPage = () => {
  const imageDB = chatapp.imageDB
  const { profile } = useContext(AppContext)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [form, setForm] = useState<typeof initForm>(initForm)
  const [selectedDate, setSelectedDate] = useState(parseZonedDateTime("2024-11-07T00:45[Asia/Saigon]"))
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
          <Input  type='file' className='absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer' onChange={handleChangeImage} />
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
              value={form.unitPrice}
              onChange={(event) => {
                setForm((prev) => ({
                  ...prev,
                  unitPrice: event.target.value
                }))
              }}
            />
            
            <Input
              type='text'
              label='Quantity'
              placeholder='Enter quantity'
              className='w-full'
              value={form.quantity}
              onChange={(event) => {
                setForm((prev) => ({
                  ...prev,
                  quantity: event.target.value
                }))
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
            label="Expiration Date"
            variant="bordered"
            className='w-full'
            showMonthAndYearPickers
            value={selectedDate}
            onChange={setSelectedDate}
          />

          <Button 
            type='submit'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors'
          > 
            Create Ticket
          </Button>
        </div>
      </form>
    </div>
  )
}
export default CreateTicketPage

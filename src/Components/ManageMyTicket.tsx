import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import dayjs from 'dayjs'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { ReactNode, useContext, useState } from 'react'
import { Ticket, UpdateTicket } from 'src/@types/ticket.type'
import chatapp from 'src/utils/chatapp.config'
import { v4 } from 'uuid'
import demo from 'src/assets/images/demoImage.jpg'
import { parseZonedDateTime } from '@internationalized/date'
import { AppContext } from 'src/context/app.context'
import userAPI from 'src/apis/user.api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
interface Props {
  ticket: Ticket
  rederProps?: ReactNode
}
const initForm = {
  sellerId: '',
  title: '',
  expDate: '',
  type: '',
  unitPrice: '',
  quantity: '',
  description: '',
  image: ''
}

const ManageMyTicket = ({ ticket }: Props) => {
  const imageDB = chatapp.imageDB
  const { profile } = useContext(AppContext)
  const date = dayjs(ticket.expDate).format('DD MMM YYYY')
  const time = dayjs(ticket.updatedAt).format('h:mm A')
  const [form, setForm] = useState<typeof initForm>({
    sellerId: ticket.sellerId,
    title: ticket.title || '',
    expDate: ticket.expDate,
    type: ticket.type,
    unitPrice: ticket.unitPrice.toString(),
    quantity: ticket.quantity.toString(),
    description: ticket.description || '',
    image: ticket.image || ''
  })
  const [previewImage, setPreviewImage] = useState<string | null>(`${ticket.image}`)
  const datetime = ticket.expDate.split('+')[0]

  const [selectedDate, setSelectedDate] = useState(parseZonedDateTime(`${datetime}[Asia/Saigon]`))
  const deleteMyTicket = useMutation({
    mutationFn: (ticketId: string) => userAPI.deleteMyTicket(ticketId)
  })
  const UpdateMyTicketMutation = useMutation({
    mutationFn: ({ ticketId, body }: { ticketId: string; body: UpdateTicket }) => userAPI.updateMyTicket(ticketId, body)
  })
  const handleDeleteTicket = () => {
    deleteMyTicket.mutate(ticket.id, {
      onSuccess: (data) => {
        toast.success(data.data.message)
        // window.location.href = 'http://localhost:3000/event-operator/manage'
      }
    })
  }
  const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imgRef = ref(imageDB, `images/${v4()}`)
      await uploadBytes(imgRef, event.target.files[0]).then((value) => {
        getDownloadURL(value.ref).then((url) => setPreviewImage(url))
      })
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const bodyUpdateTicket = {
      title: form.title || '',
      sellerId: profile?.id || '',
      type: form.type ? form.type : 'VOUCHER',
      image: previewImage || '',
      expDate: selectedDate.toString().split('[')[0],
      quantity: Number(form.quantity) || 0,
      unitPrice: Number(form.unitPrice) || 0,
      description: form.description || ''
    }
    UpdateMyTicketMutation.mutate(
      { ticketId: ticket.id, body: bodyUpdateTicket },
      {
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
      }
    )
  }
  return (
    <div className='container-2xl  max-w-2xl px-4 mb-4'>
      <h1 className='text-3xl font-bold text-center mb-8'>Update Ticket</h1>
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
          <Input type='file' className='absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer' onChange={handleChangeImage} />
        </div>

        {/* Form inputs with consistent spacing */}
        <div className='space-y-4'>
          <Input
            size='lg'
            type='text'
            label='Title Ticket'
            placeholder='Enter your ticket title'
            className='w-full'
            value={form.title}
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
            label='Expiration Date'
            variant='bordered'
            className='w-full'
            showMonthAndYearPickers
            value={selectedDate}
            onChange={setSelectedDate}
          />

          {ticket.status === 'REMOVED' ? (
            <>
              <p className='text-center text-red-normal'> TICKET HAD REMOVED</p>
            </>
          ) : (
            <>
              <div className='flex justify-between'>
                <Button className='bg-green-dark' type='submit'>Upate Ticket</Button>
                <Button className='bg-red-normalHover' onClick={handleDeleteTicket}>Delete Ticket</Button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  )
}
export default ManageMyTicket

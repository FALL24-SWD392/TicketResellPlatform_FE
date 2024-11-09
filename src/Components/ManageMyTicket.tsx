import { Button, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from '@nextui-org/react'
import dayjs from 'dayjs'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React, { ReactNode, useState } from 'react'
import { Ticket } from 'src/@types/ticket.type'
import chatapp from 'src/utils/chatapp.config'
import { v4 } from 'uuid'

interface Props {
  ticket: Ticket
  rederProps?: ReactNode
}
const ManageMyTicket = ({ ticket }: Props) => {
  const imageDB = chatapp.imageDB
  const date = dayjs(ticket.expDate).format('DD MMM YYYY')
  const time = dayjs(ticket.updatedAt).format('h:mm A')
  const [editedTicket, setEditedTicket] = useState<Ticket>(ticket)
  const [previewImage, setPreviewImage] = useState<string | null>(`${ticket.image}`)
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  const handleChangeImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const imgRef = ref(imageDB, `images/${v4()}`)
      await uploadBytes(imgRef, event.target.files[0]).then((value) => {
        getDownloadURL(value.ref).then((url) => setPreviewImage(url))
      })
    }
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value
    }))
  }
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here, such as updating the ticket in the backend
    console.log('Updated Ticket:', editedTicket)
  }
  return (
    <div className='max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 my-8'>
      <div className='flex flex-col lg:flex-row gap-8'>
        {/* Left Column - Images */}
        <div className='w-full lg:w-3/5'>
          <div className='relative h-[400px] mb-4'>
            <img
              src={ticket.image}
              alt='Main Product'
              className='rounded-xl w-full h-full object-cover shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] hover:shadow-[rgba(17,_17,_26,_0.1)_0px_8px_24px,_rgba(17,_17,_26,_0.1)_0px_16px_56px] transition-shadow duration-300'
            />
          </div>
        </div>

        {/* Right Column - Info */}
        <div className='w-full lg:w-2/5'>
          <h1 className='text-3xl font-bold text-gray-800 mb-4'>{ticket.title}</h1>

          <div className='space-y-3 mb-6'>
            <p className='flex items-center text-gray-600'>
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                ></path>
              </svg>
              {date}
            </p>
            <p className='flex items-center text-gray-600'>
              <svg className='w-5 h-5 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'></path>
              </svg>
              {time}
            </p>
          </div>

          <div className='mb-6'>
            <p className='text-3xl font-bold text-green-darkHover'> {ticket.unitPrice?.toLocaleString('vi-VN')} VNĐ</p>
            <p className='text-sm text-gray-500 mt-1'>Last updated: {dayjs(ticket.updatedAt).format('DD MMM YYYY, h:mm A')}</p>
          </div>

          <div className='flex gap-4 mb-6'>
            <Button
              className='flex-1 px-6 py-3 bg-green-600 text-white rounded-lg 
    shadow-lg hover:shadow-green-500/50 hover:translate-y-[-2px] 
    hover:bg-green-700 transition-all duration-300 font-semibold'
              onPress={onOpen}
            >
              Edit
            </Button>
            <button
              className='flex-1 px-6 py-3 bg-gray-100 text-gray-800 rounded-lg 
    shadow-lg hover:shadow-gray-400/50 hover:translate-y-[-2px] 
    hover:bg-gray-200 transition-all duration-300 font-semibold'
            >
              Delete
            </button>
          </div>

          <div className='p-4 bg-gray-50 rounded-lg'>
            <div className='flex items-center gap-3 mb-2 shadow-2xl'>
              <img src={ticket.avatar} alt='Seller' className='w-8 h-8 rounded-full shadow-2xl' />
              <span className='font-semibold text-gray-800'>{ticket.username}</span>
            </div>
            <div className='flex items-center gap-2'>
              <div className='flex text-yellow-400'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className='w-5 h-5 text-yellow-400 ' fill='currentColor' viewBox='0 0 20 20'>
                    <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
                  </svg>
                ))}
              </div>
              <span className='text-gray-600'>{ticket.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className='mt-12'>
        <h2 className='text-2xl font-bold text-gray-800 mb-4'>Mô tả chi tiết</h2>
        <div className='prose max-w-none'>
          <p className='text-gray-600 leading-relaxed'>{ticket.description}</p>
        </div>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onclose) => (
            <>
              <ModalHeader>
                <h2>Edit Ticket</h2>
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleFormSubmit}>
                  <div className='relative flex h-[300px] w-[300px] rounded-[30px] items-center justify-center border border-solid'>
                    {previewImage ? (
                      <img src={previewImage} alt='Name Image' className='h-[280px] w-[350px] rounded-[20px] object-cover mb-[40px]' />
                    ) : (
                      <img src="" alt='thumnal_event' className='h-[286px] w-[375px] rounded-[30px] object-cover mb-[40px]' />
                    )}
                    <input type='file' className='absolute opacity-0 top-0 left-0 w-full h-full cursor-pointer' onChange={handleChangeImage} />
                  </div>
                  <Input fullWidth label='Title' name='title' value={editedTicket.title} onChange={handleInputChange} />
                  <Input fullWidth label='Description' name='description' value={editedTicket.description} onChange={handleInputChange} />
                  <Input fullWidth label='Unit Price' name='unitPrice' value={editedTicket.unitPrice.toString()} onChange={handleInputChange} />
                  <Input fullWidth label='Quantity' name='quantity' value={editedTicket.quantity.toString()} onChange={handleInputChange} />
                  <Input fullWidth label='Expiration Date' name='expDate' value={editedTicket.expDate} onChange={handleInputChange} />
                  <Input fullWidth label='Image URL' name='image' value={editedTicket.image} onChange={handleInputChange} />
                  <Button type='submit'>Save Changes</Button>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  )
}
export default ManageMyTicket

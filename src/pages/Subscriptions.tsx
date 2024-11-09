import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Modal, Spinner } from '@nextui-org/react'
import authAPI from 'src/apis/auth.api'
import { toast } from 'react-toastify'
import { ListBaseResponse } from 'src/@types/response'
import { SubList } from 'src/@types/users.type'
import { useMutation } from '@tanstack/react-query'

function Subscriptions() {
  const [subscriptionList, setSubscriptionList] = useState<ListBaseResponse<SubList>>({
    status: 100,
    message: '',
    size: 10,
    page: 1,
    totalSize: 0,
    totalPage: 0,
    data: []
  })
  const [isLoading, setIsLoading] = useState(true)
  const [purchasedSubscriptions, setPurchasedSubscriptions] = useState<{ [key: string]: boolean }>({})
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null)

  const getSubscriptionsMutation = useMutation({
    mutationKey: ['getSubscriptions'],
    mutationFn: () => authAPI.GetAllSubscription(),
    onSuccess: (data) => {
      setSubscriptionList(data.data)
      setIsLoading(false)
    },
    onError: (error) => {
      console.error('Failed to fetch subscriptions:', error)
      toast.error('Failed to load subscriptions. Please try again later.')
      setIsLoading(false)
    }
  })

  const PaySubscriptionMutation = useMutation({
    mutationKey: ['paySubscription'],
    mutationFn: ({ subscriptionId }: { subscriptionId: string }) => authAPI.PaySubscription({ subscriptionId }),
    onSuccess: (data) => {
      toast.success('Subscription purchased successfully!')
      // Update purchased status
      setPurchasedSubscriptions((prev) => ({
        ...prev,
        [data.data.name]: true
      }))
      // Redirect to the payment callback or confirmation page
      window.location.href = data.data.data as string
    },
    onError: (error) => {
      toast.error('Failed to purchase subscription. Please try again.')
    }
  })

  const handlePaySubcription = (subscriptionId: string) => {
    PaySubscriptionMutation.mutate({ subscriptionId })
  }

  useEffect(() => {
    getSubscriptionsMutation.mutate()
  }, [])

  if (isLoading) {
    return (
      <div className='flex min-h-screen bg-gray-100 items-center justify-center'>
        <Spinner size='lg' />
      </div>
    )
  }
  console.log(subscriptionList)
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8'>
      {/* Header Section */}
      <div className='max-w-7xl mx-auto text-center mb-12'>
        <h1 className='text-4xl font-bold text-gray-900 mb-4'>Choose Your Plan</h1>
        <p className='text-xl text-gray-600'>Select the perfect subscription that suits your needs</p>
      </div>

      {/* Subscription Cards Container */}
      <div className='max-w-7xl mx-auto'>
        {subscriptionList.data.length === 0 ? (
          <div className='text-center py-12 bg-white rounded-xl shadow-md'>
            <div className='text-gray-500 text-lg'>No subscriptions available at the moment</div>
          </div>
        ) : (
          <div className='flex justify-center'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl'>
              {subscriptionList.data.map((subscription) => (
                <Card
                  key={subscription.name}
                  className='border border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-300'
                  isPressable
                >
                  {/* Card Header */}
                  <CardHeader className='flex flex-col space-y-4 p-6'>
                    <div className='flex items-center gap-4 w-full'>
                      <Avatar isBordered radius='full' size='lg' alt={subscription.name} className='w-16 h-16' />
                      <div className='flex flex-col flex-grow'>
                        <h4 className='text-xl font-bold text-gray-900'>{subscription.name}</h4>
                        <div className='flex items-center gap-2'>
                        <span className='text-2xl font-bold text-primary'>
  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subscription.price)}
</span>
                          <span className='text-gray-500'>/month</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {/* Card Body */}
                  <CardBody className='px-6 py-4'>
                    <div className='space-y-4'>
                      <div className='flex items-center gap-2'>
                        <div className='p-1 rounded-full bg-primary/10'>
                          <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                          </svg>
                        </div>
                        <p className='text-gray-600'>Points Required: {subscription.pointRequired}</p>
                      </div>
                      <div className='flex items-center gap-2'>
                        <div className='p-1 rounded-full bg-primary/10'>
                          <svg className='w-5 h-5 text-primary' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                          </svg>
                        </div>
                        <p className='text-gray-600'>Sale Limit: {subscription.saleLimit}</p>
                      </div>
                      <p className='text-gray-600 mt-4'>{subscription.description}</p>
                    </div>
                  </CardBody>

                  {/* Card Footer */}
                  <CardFooter className='px-6 py-4 border-t border-gray-100'>
                    {subscription.name === 'Premium' && (
                      <>
                        {subscription.canPurchase == false ? (
                          <>
                            <Button
                              className='w-full'
                              color='primary'
                              size='lg'
                              isDisabled
                              variant={purchasedSubscriptions[subscription.name] ? 'flat' : 'solid'}
                            >
                              <span className='flex items-center gap-2'>
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                </svg>
                                Not Available
                              </span>
                            </Button>
                          </>
                        ) : (
                          <Button
                              className='w-full'
                              color='primary'
                              size='lg'
                              variant={purchasedSubscriptions[subscription.name] ? 'flat' : 'solid'}
                              onClick={() => handlePaySubcription(subscription.id as string)}
                              disabled={purchasedSubscriptions[subscription.name]}
                            >
                              <span className='flex items-center gap-2'>
                                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                                </svg>
                                Subscribe Now
                              </span>
                            </Button>
                        )}
                      </>
                    )}
                    {subscription.name === 'Free' && (
                      <Button className='w-full' color='success' variant='flat' size='lg' disabled>
                        Free Plan
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} className='bg-white rounded-2xl shadow-xl'>
        <div className='p-6'>
          <h2 className='text-2xl font-bold text-gray-900 mb-4'>Confirm Purchase</h2>
          <p className='text-gray-600 mb-6'>Are you sure you want to purchase the {selectedSubscription} subscription?</p>
          <div className='flex justify-end gap-3'>
            <Button color='danger' variant='flat' onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button
              color='primary'
              onClick={() => {
                if (selectedSubscription) {
                  handlePaySubcription(selectedSubscription)
                  setIsModalOpen(false)
                }
              }}
            >
              Confirm Purchase
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Subscriptions

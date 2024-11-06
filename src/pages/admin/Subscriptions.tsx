import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button, Modal, Spinner } from '@nextui-org/react';
import SidebarAdmin from 'src/layouts/admin/SidebarAdmin';
import authAPI from 'src/apis/auth.api';
import { toast } from 'react-toastify';
import { ListBaseResponse } from 'src/@types/response';
import { SubList } from 'src/@types/users.type';
import { useMutation } from '@tanstack/react-query';

function Subscriptions() {
  const [subscriptionList, setSubscriptionList] = useState<ListBaseResponse<SubList>>({
    status: 100,
    message: '',
    size: 10,
    page: 1,
    totalSize: 0,
    totalPage: 0,
    data: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [purchasedSubscriptions, setPurchasedSubscriptions] = useState<{ [key: string]: boolean }>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null);

  // Sử dụng useMutation để fetch subscriptions
  const getSubscriptionsMutation = useMutation({
    mutationKey: ['getSubscriptions'],
    mutationFn: () => authAPI.GetAllSubscription(),
    onSuccess: (data) => {
      setSubscriptionList(data.data);
      console.log(data)
      setIsLoading(false);
    },
    onError: (error) => {
      console.error('Failed to fetch subscriptions:', error);
      toast.error('Failed to load subscriptions. Please try again later.');
      setIsLoading(false);
    }
  });
  const PaySubscriptionMutation = useMutation({
    mutationKey: ['paySubscription'],
    mutationFn : ({subscriptionId}:{subscriptionId: string}) => authAPI.PaySubscription({subscriptionId})
  })

  const handlePaySubcription = (subscriptionId: string)=>{
      PaySubscriptionMutation.mutate({subscriptionId},{
        onSuccess(data) {
            console.log(data)
        },
      })
      
  }
  useEffect(() => {
    getSubscriptionsMutation.mutate();
  }, []);

  const handlePurchaseClick = (subscriptionId: string) => {
    setSelectedSubscription(subscriptionId);
    setIsModalOpen(true);
  };

  const confirmPurchase = () => {
    if (selectedSubscription) {
      setPurchasedSubscriptions((prev) => ({
        ...prev,
        [selectedSubscription]: true,
      }));
      setIsModalOpen(false);
      setSelectedSubscription(null);
      toast.success(`Successfully purchased ${selectedSubscription}`);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSubscription(null);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <SidebarAdmin />
        <div className="flex flex-col w-full items-center justify-center">
          <Spinner size="lg" />
          <p className="mt-2">Loading subscriptions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <SidebarAdmin />
      <div className="flex flex-col w-full p-8 gap-4">
        <h1 className="text-2xl font-bold mb-4">Subscriptions</h1>
        {subscriptionList.data.length === 0 ? (
          <p className="text-center text-gray-500">No subscriptions available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionList.data.map((subscription) => (
              <Card key={subscription.name} className="max-w-[500px] p-4">
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <Avatar
                      isBordered
                      radius="full"
                      size="lg"
                      alt={subscription.name}
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                      <h4 className="text-lg font-semibold leading-none text-default-600">
                        {subscription.name}
                      </h4>
                      <h5 className="text-md tracking-tight text-default-400">
                        Points Required: {subscription.pointRequired}
                      </h5>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    radius="full"
                    size="md"
                    variant="solid"
                    onClick={() => handlePaySubcription(subscription.id)}
                    disabled={purchasedSubscriptions[subscription.name]}
                  >
                    {purchasedSubscriptions[subscription.name] ? "Purchased" : "BUY"}
                  </Button>
                </CardHeader>
                <CardBody className="px-3 py-2 text-md text-default-400">
                  <p>{subscription.description}</p>
                  <p>Sale Limit: {subscription.saleLimit}</p>
                </CardBody>
                <CardFooter className="flex justify-between items-center">
                  <p className="text-lg text-default-600 font-semibold">
                    ${Number(subscription.price).toFixed(2)}
                  </p>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-4">
          <h2 id="modal-title" className="text-lg font-semibold">Confirm Purchase</h2>
          <p>Are you sure you want to purchase the {selectedSubscription}?</p>
          <div className="flex justify-end gap-4 mt-4">
            <Button color="danger" onClick={closeModal}>
              Cancel
            </Button>
            <Button color="primary" onClick={confirmPurchase}>
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Subscriptions;
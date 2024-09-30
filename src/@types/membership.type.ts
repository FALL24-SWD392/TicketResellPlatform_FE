export interface Membership {
  id: string;
  userId: string;
  subscriptionId: string;
  startDate: Date;
  endDate: Date;
  saleRemaining: number;
}

export interface Subscription {
  id: string;
  name: string;
  description: string;
  price: number;
  saleLimit: number;
}

export interface WebhookPayload {
  id: number;
  amount: number;
  status: string;
  paymentMethod: string;
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
    document: {
      number: string;
      type: string;
    };
    address: {
      street: string;
      streetNumber: string;
      complement: string | null;
      zipCode: string;
      neighborhood: string;
      city: string;
      state: string;
      country: string;
    };
  };
  card?: {
    brand: string;
    holderName: string;
    lastDigits: string;
    expirationMonth: number;
    expirationYear: number;
  };
  items: Array<{
    title: string;
    unitPrice: number;
    quantity: number;
  }>;
  paidAt: string;
} 
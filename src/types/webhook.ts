export interface WebhookPayload {
  id: number;
  amount: number;
  paidAmount: number;
  refundedAmount: number;
  tenantId: string;
  companyId: number;
  installments: number;
  paymentMethod: string;
  status: string;
  postbackUrl: string | null;
  metadata: any | null;
  traceable: boolean;
  secureId: string;
  secureUrl: string;
  createdAt: string;
  updatedAt: string;
  paidAt: string | null;
  refundedAt: string | null;
  ip: string | null;
  externalRef: string | null;
  authorizationCode: string | null;
  basePrice: number | null;
  interestRate: number | null;
  customer: {
    id: number;
    name: string;
    email: string;
    phone: string;
    birthdate: string | null;
    createdAt: string;
    externalRef: string | null;
    document: {
      type: string;
      number: string;
    };
    address: {
      street: string | null;
      streetNumber: string | null;
      complement: string | null;
      zipCode: string | null;
      neighborhood: string | null;
      city: string | null;
      state: string | null;
      country: string | null;
    };
  };
  fee: {
    netAmount: number;
    estimatedFee: number;
    fixedAmount: number;
    spreadPercent: number;
  };
  pix?: {
    qrcode: string;
    end2EndId: string | null;
    receiptUrl: string | null;
    expirationDate: string;
  };
  boleto?: {
    barCode: string;
    ourNumber: string;
    digitable: string;
    expirationDate: string;
  };
  card?: {
    brand: string;
    holderName: string;
    lastDigits: string;
    expirationMonth: number;
    expirationYear: number;
  };
  shipping: {
    fee: number | null;
    address: {
      street: string | null;
      streetNumber: string | null;
      complement: string | null;
      neighborhood: string | null;
      zipCode: string | null;
      city: string | null;
      state: string | null;
      country: string | null;
    };
  };
  refusedReason: string | null;
  items: Array<{
    title: string;
    quantity: number;
    tangible: boolean;
    unitPrice: number;
    externalRef: string | null;
  }>;
  splits: Array<{
    amount: number;
    netAmount: number;
    recipientId: number;
    chargeProcessingFee: boolean;
  }>;
  refunds: any[];
  delivery: {
    status: string;
    trackingCode: string | null;
    createdAt: string;
    updatedAt: string;
  };
  payer: any | null;
} 
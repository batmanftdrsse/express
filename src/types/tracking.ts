export interface TrackingUpdate {
  status: string
  date: string
  location?: string
}

export interface TrackingData {
  trackingCode: string
  status: string
  updatedAt: string
  history: TrackingUpdate[]
  deliveryAddress?: {
    recipient: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
    zipCode: string
  }
  estimatedDelivery?: string
  currentStatus?: string
} 
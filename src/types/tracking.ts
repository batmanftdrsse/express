export interface TrackingUpdate {
  status: string
  date: string
  location?: string
  description?: string
}

export interface Destination {
  recipient: string
  street: string
  number: string
  neighborhood: string
  city: string
  state: string
  zipCode: string
}

export interface TrackingData {
  id: string
  trackingCode: string
  status: 'pending' | 'in_transit'
  currentStep: number
  updatedAt: string
  estimatedDelivery: string
  destination: Destination
  trackingUpdates: TrackingUpdate[]
}

export interface ApiResponse extends TrackingData {
  pendingReason?: string
} 
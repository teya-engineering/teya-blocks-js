export interface ElementReadyEvent {
  elementType: string;
}

export interface ElementChangeEvent {
  elementType: string;
  complete: boolean;
  empty: boolean;
  error?: {
    type: 'validation_error' | 'invalid_number' | 'invalid_expiry' | 'invalid_cvc' | 'incomplete';
    message: string;
    code?: string;
  };
  brand?: string;
}

export interface ElementErrorEvent {
  message: string;
  code?: string;
  details?: string;
}

export interface PaymentCompletedEvent {
  paymentId: string;
  transactionId?: string;
  status: 'SUCCESS' | 'FAILURE' | 'PENDING';
  statusReason?: string;
}

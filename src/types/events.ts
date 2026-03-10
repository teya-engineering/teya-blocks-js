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

// ============================================================================
// DCC (Dynamic Currency Conversion) Events
// ============================================================================

export interface DccOfferedEventData {
  cardCurrency: string;
  merchantCurrency: string;
  cardAmount: { value: number; currency: string };
  merchantAmount: { value: number; currency: string };
  exchangeRate: string;
  markup: string;
}

export interface DccSelectedEventData {
  selectedCurrency: 'CARD_CURRENCY' | 'MERCHANT_CURRENCY';
  amount: { value: number; currency: string };
}

export interface DccSkippedEventData {
  reason: 'card_not_eligible' | 'same_currency' | 'dcc_disabled' | 'check_failed';
}

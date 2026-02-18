export interface PaymentSubmitResponse {
  payment_id: string;
  checkout_payment_response?: {
    online_transaction?: {
      transaction_id: string;
      status: 'SUCCESS' | 'FAILURE' | 'PENDING';
      status_reason?: string;
    };
  };
}

export interface PaymentSubmitError {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
}

import type { ElementChangeEvent } from './events';
import type { PaymentSubmitResponse, PaymentSubmitError } from './responses';
import type { Appearance } from './teya-blocks';

export type CheckoutPaymentMethod = 'CARD' | 'APPLE_PAY';

export interface BaseElement {
  mount(container: string | HTMLElement): void;
  unmount(): void;
  destroy(): void;
  update(options: Record<string, unknown>): void;
}

export interface CardElementOptions {
  appearance?: Appearance;
  disabled?: boolean;
  iconStyle?: 'default' | 'solid';
  hideIcon?: boolean;
  showInlineErrors?: boolean;
  showAcceptedBrands?: boolean;
  onReady?: () => void;
  onChange?: (event: ElementChangeEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSuccess?: (response: PaymentSubmitResponse) => void;
  onError?: (error: PaymentSubmitError) => void;
  onTokenRefresh?: () => Promise<string>;
}

export interface CardElement extends BaseElement {
  submitPayment(): Promise<PaymentSubmitResponse>;
}

export interface CardElementRef {
  submitPayment(): Promise<PaymentSubmitResponse>;
}

export interface CheckoutElementOptions {
  appearance?: Appearance;
  disabled?: boolean;
  hideSubmitButton?: boolean;
  submitButtonProps?: SubmitButtonProps;
  cardOptions?: CardElementOptions;
  applePayOptions?: ApplePayElementOptions;
  cardContainerStyle?: Record<string, string>;
  applePayContainerStyle?: Record<string, string>;
  onReady?: () => void;
  onChange?: (event: ElementChangeEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onSuccess?: (response: PaymentSubmitResponse, paymentMethod: CheckoutPaymentMethod) => void;
  onError?: (error: PaymentSubmitError, paymentMethod: CheckoutPaymentMethod) => void;
  onTokenRefresh?: () => Promise<string>;
}

export interface SubmitButtonProps {
  isCustomButton?: boolean;
  customButton?: string;
  buttonText?: string;
  buttonAmount?: string | { value: number; currency: string };
  style?: Record<string, string>;
  className?: string;
}

export interface CheckoutElement extends BaseElement {
  submitPayment(): Promise<PaymentSubmitResponse>;
}

export interface CheckoutElementRef {
  submitPayment(): Promise<PaymentSubmitResponse>;
}

export interface ApplePayElementOptions {
  paymentRequest?: ApplePayPaymentRequest;
  buttonType?: 'plain' | 'buy' | 'donate' | 'checkout' | 'book' | 'subscribe' | 'reload' | 'add-money' | 'top-up' | 'order' | 'rent' | 'support' | 'contribute' | 'tip' | 'pay';
  buttonStyle?: 'black' | 'white' | 'white-outline';
  buttonLocale?: string;
  onReady?: () => void;
  onChange?: (event: ApplePayChangeEvent) => void;
  onClick?: () => void;
  onPaymentCompleted?: (result: ApplePayPaymentResult) => void;
  onCancel?: () => void;
  onSessionStarted?: () => void;
  onSessionEnded?: () => void;
  onError?: (error: { message: string; code?: string }) => void;
}

export interface ApplePayPaymentRequest {
  countryCode: string;
  currencyCode: string;
  total: { label: string; amount: string; type?: 'final' | 'pending' };
  supportedNetworks?: string[];
  merchantCapabilities?: string[];
  lineItems?: Array<{ label: string; amount: string; type?: 'final' | 'pending' }>;
  requiredBillingContactFields?: ('postalAddress' | 'name' | 'email' | 'phone')[];
  requiredShippingContactFields?: ('postalAddress' | 'name' | 'email' | 'phone')[];
  shippingMethods?: Array<{ label: string; amount: string; identifier: string; detail?: string }>;
  applicationData?: string;
}

export interface ApplePayElement extends BaseElement {
  canMakePayments(): Promise<boolean>;
  createPaymentMethod(request?: ApplePayPaymentRequest): Promise<ApplePayPaymentResult>;
}

export interface ApplePayPaymentResult {
  paymentId: string;
  transactionId: string;
  status: 'SUCCESS' | 'FAILURE' | 'PENDING';
  statusReason?: string;
}

export interface ApplePayChangeEvent {
  available: boolean;
}

export interface CardNumberElementOptions {
  appearance?: Appearance;
  disabled?: boolean;
  showIcon?: boolean;
  onReady?: () => void;
  onChange?: (event: ElementChangeEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface CardExpiryElementOptions {
  appearance?: Appearance;
  disabled?: boolean;
  onReady?: () => void;
  onChange?: (event: ElementChangeEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface CardCvcElementOptions {
  appearance?: Appearance;
  disabled?: boolean;
  onReady?: () => void;
  onChange?: (event: ElementChangeEvent) => void;
  onFocus?: () => void;
  onBlur?: () => void;
}

export type CardNumberElement = BaseElement;
export type CardExpiryElement = BaseElement;
export type CardCvcElement = BaseElement;

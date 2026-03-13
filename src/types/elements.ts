import type { ElementChangeEvent, DccOfferedEventData, DccSelectedEventData, DccSkippedEventData } from './events';
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
  onDccOffered?: (data: DccOfferedEventData) => void;
  onDccSelectionRequired?: () => void;
  onDccSelected?: (data: DccSelectedEventData) => void;
  onDccCancelled?: () => void;
  onDccSkipped?: (data: DccSkippedEventData) => void;
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

// ============================================================================
// Apple Pay Types
// ============================================================================

export type ApplePayContactField = 'postalAddress' | 'name' | 'email' | 'phone' | 'phoneticName';

export type ApplePayMerchantCapability = 'supports3DS' | 'supportsEMV' | 'supportsCredit' | 'supportsDebit';

export type ApplePayShippingType = 'shipping' | 'delivery' | 'storePickup' | 'servicePickup';

export type ApplePayShippingContactEditingMode = 'available' | 'storePickup' | 'enabled';

export interface ApplePayPaymentContact {
  phoneNumber?: string;
  emailAddress?: string;
  givenName?: string;
  familyName?: string;
  phoneticGivenName?: string;
  phoneticFamilyName?: string;
  addressLines?: string[];
  subLocality?: string;
  locality?: string;
  postalCode?: string;
  subAdministrativeArea?: string;
  administrativeArea?: string;
  country?: string;
  countryCode?: string;
}

export interface ApplePayLineItem {
  label: string;
  amount: string;
  type?: 'final' | 'pending';
  paymentTiming?: 'immediate' | 'recurring';
  recurringPaymentStartDate?: Date;
  recurringPaymentEndDate?: Date;
  recurringPaymentIntervalUnit?: 'year' | 'month' | 'day' | 'hour' | 'minute';
  recurringPaymentIntervalCount?: number;
}

export interface ApplePayRecurringPaymentRequest {
  paymentDescription: string;
  regularBilling: ApplePayLineItem;
  trialBilling?: ApplePayLineItem;
  billingAgreement?: string;
  managementURL: string;
  tokenNotificationURL?: string;
}

// ============================================================================
// Apple Pay Element
// ============================================================================

export interface ApplePayElementOptions {
  paymentRequest?: ApplePayPaymentRequest;
  buttonType?: 'plain' | 'buy' | 'donate' | 'checkout' | 'book' | 'subscribe' | 'reload' | 'add-money' | 'top-up' | 'order' | 'rent' | 'support' | 'contribute' | 'tip' | 'pay';
  buttonStyle?: 'black' | 'white' | 'white-outline';
  buttonLocale?: string;
  onReady?: () => void;
  onChange?: (event: ApplePayChangeEvent) => void;
  onClick?: () => void;
  onSuccess?: (response: PaymentSubmitResponse) => void;
  onError?: (error: PaymentSubmitError) => void;
  onCancel?: () => void;
  onSessionStarted?: () => void;
  onSessionEnded?: () => void;
}

export interface ApplePayPaymentRequest {
  countryCode: string;
  currencyCode: string;
  total: { label: string; amount: string; type?: 'final' | 'pending' };
  supportedNetworks?: string[];
  merchantCapabilities?: ApplePayMerchantCapability[];
  lineItems?: ApplePayLineItem[];
  requiredBillingContactFields?: ApplePayContactField[];
  requiredShippingContactFields?: ApplePayContactField[];
  shippingMethods?: Array<{ label: string; amount: string; identifier: string; detail?: string }>;
  applicationData?: string;
  billingContact?: ApplePayPaymentContact;
  shippingContact?: ApplePayPaymentContact;
  shippingType?: ApplePayShippingType;
  shippingContactEditingMode?: ApplePayShippingContactEditingMode;
  supportedCountries?: string[];
  recurringPaymentRequest?: ApplePayRecurringPaymentRequest;
}

export interface ApplePayElement extends BaseElement {
  canMakePayments(): Promise<boolean>;
  createPaymentMethod(request?: ApplePayPaymentRequest): Promise<PaymentSubmitResponse>;
}

export interface ApplePayPaymentResult {
  paymentId: string;
  transactionId: string;
  status: 'SUCCESS' | 'FAILURE' | 'PENDING';
  statusReason?: string;
  paymentResponse?: PaymentSubmitResponse;
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

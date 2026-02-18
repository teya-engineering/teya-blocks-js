import type {
  BaseElement,
  CardElement,
  CardElementOptions,
  CardNumberElement,
  CardNumberElementOptions,
  CardExpiryElement,
  CardExpiryElementOptions,
  CardCvcElement,
  CardCvcElementOptions,
  CheckoutElement,
  CheckoutElementOptions,
  ApplePayElement,
  ApplePayElementOptions,
} from './elements';

import type { PaymentSubmitResponse, PaymentSubmitError } from './responses';

export type FontFamily =
  | 'system'
  | 'inter'
  | 'roboto'
  | 'open-sans'
  | 'lato'
  | 'poppins'
  | 'source-sans-pro'
  | 'nunito'
  | 'montserrat'
  | 'raleway';

/**
 * Supported locales for SDK labels and error messages.
 * @default 'en-GB'
 */
export type Locale =
  | 'en-GB'
  | 'en-US'
  | 'de-DE'
  | 'es-ES'
  | 'fr-FR'
  | 'it-IT'
  | 'pt-PT'
  | 'da-DK'
  | 'fi-FI'
  | 'pl-PL'
  | 'hr-HR'
  | 'hu-HU'
  | 'cs-CZ'
  | 'is-IS'
  | 'sk-SK';

export type ThemePresetName = 'default' | 'dark' | 'minimal' | 'rounded' | 'compact' | 'bold';

export type CSSProperties = {
  [key: string]: string | number | undefined;
};

export interface ThemeVariables {
  colorPrimary?: string;
  colorBackground?: string;
  colorText?: string;
  colorDanger?: string;
  colorSuccess?: string;
  colorWarning?: string;
  fontFamily?: string;
  fontSizeBase?: string;
  fontWeightNormal?: string;
  fontWeightMedium?: string;
  fontWeightBold?: string;
  spacingUnit?: string;
  borderRadius?: string;
  borderWidth?: string;
  borderColor?: string;
  focusRingColor?: string;
  focusRingWidth?: string;
  [key: string]: string | undefined;
}

export type AppearanceRules = {
  [selector: string]: CSSProperties;
};

export interface Appearance {
  /** @default 'system' */
  fontFamily?: FontFamily;
  /** @default 'default' */
  theme?: ThemePresetName;
  variables?: Partial<ThemeVariables>;
  rules?: AppearanceRules;
}

export interface TeyaBlocksOptions {
  developmentMode?: boolean;
  /** @default 'en-GB' */
  locale?: Locale;
  appearance?: Appearance;
  /** CSP nonce for inline styles */
  cspNonce?: string;
}

export type ElementType = 'card' | 'cardNumber' | 'cardExpiry' | 'cardCvc' | 'applePay' | 'checkout';

export interface SubmitPaymentOptions {
  cardholderName?: string;
  onSuccess?: (response: PaymentSubmitResponse) => void;
  onError?: (error: PaymentSubmitError) => void;
}

export interface ElementsFactory {
  create(type: 'card', options?: CardElementOptions): CardElement;
  create(type: 'cardNumber', options?: CardNumberElementOptions): CardNumberElement;
  create(type: 'cardExpiry', options?: CardExpiryElementOptions): CardExpiryElement;
  create(type: 'cardCvc', options?: CardCvcElementOptions): CardCvcElement;
  create(type: 'applePay', options?: ApplePayElementOptions): ApplePayElement;
  create(type: 'checkout', options?: CheckoutElementOptions): CheckoutElement;
  create(type: string, options?: Record<string, unknown>): BaseElement;

  createCheckout(options?: CheckoutElementOptions): CheckoutElement;
  getElement(type: ElementType): BaseElement | undefined;
  submitPayment(options?: SubmitPaymentOptions): Promise<PaymentSubmitResponse>;
}

export interface TeyaBlocks {
  readonly elements: ElementsFactory;
  updateSessionToken(newToken: string): void;
  destroy(): void;
}

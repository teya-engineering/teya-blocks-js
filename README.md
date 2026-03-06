# @teyaproduct/teya-blocks-js

Lightweight JavaScript loader for the Teya Blocks payment SDK. Loads the full SDK from CDN and provides TypeScript types.

## Installation

```bash
npm install @teyaproduct/teya-blocks-js
```
or 
```bash
<script src="https://cdn.teya.com/web-sdk/teya-blocks-js.js"></script>
```

## Usage

### ES Modules

```typescript
import { initTeyaBlocks } from '@teyaproduct/teya-blocks-js';

const teya = await initTeyaBlocks('your-session-token');

if (teya) {
  const card = teya.elements.create('card', {
    onReady: () => console.log('Card element ready'),
    onChange: (event) => console.log('Card changed:', event),
  });

  card.mount('#card-container');
}
```

### Script Tag (CDN)

```html
<script src="https://cdn.teya.com/web-sdk/teya-blocks-js.js"></script>
<script>
  TeyaBlocksLoader.initTeyaBlocks('your-session-token').then(function (teya) {
    if (teya) {
      var checkout = teya.elements.create('checkout', {
        onSuccess: function (response, method) {
          console.log('Payment successful:', method);
        },
        onError: function (error, method) {
          console.error('Payment failed:', error);
        },
      });
      checkout.mount('#checkout-container');
    }
  });
</script>
```

## API

### initTeyaBlocks(sessionToken, options?)

Initializes the SDK by loading it from CDN.

```typescript
const teya = await initTeyaBlocks(sessionToken, {
  developmentMode: false,
  locale: 'en-GB',
  appearance: {
    theme: 'default',
    fontFamily: 'inter',
  },
});
```

**Parameters:**

| Parameter      | Type                | Required | Description          |
| -------------- | ------------------- | -------- | -------------------- |
| `sessionToken` | `string`            | Yes      | Your session token   |
| `options`      | `TeyaBlocksOptions` | No       | Configuration options|

**Options:**

| Option            | Type         | Default   | Description                          |
| ----------------- | ------------ | --------- | ------------------------------------ |
| `developmentMode` | `boolean`    | `false`   | Use development CDN                  |
| `locale`          | `Locale`     | `'en-GB'` | Locale for labels and error messages |
| `appearance`      | `Appearance` | -         | Theme and styling customization      |
| `cspNonce`        | `string`     | -         | CSP nonce for inline styles          |

**Returns:** `Promise<TeyaBlocks | null>` - Returns `null` on failure.

### Elements

Create payment elements using `teya.elements.create()`:

```typescript
// Card element - single input for card details
const card = teya.elements.create('card', options);

// Checkout element - complete payment form with multiple methods
const checkout = teya.elements.create('checkout', options);

// Apple Pay element
const applePay = teya.elements.create('applePay', options);
```

**Element Methods:**

| Method                | Description                    |
| --------------------- | ------------------------------ |
| `mount(selector)`     | Mount element to DOM container |
| `unmount()`           | Remove element from DOM        |
| `destroy()`           | Destroy element instance       |
| `update(options)`     | Update element options         |
| `submitPayment()`     | Submit payment (card/checkout) |

## TypeScript

Full TypeScript support with exported types:

```typescript
import type {
  TeyaBlocks,
  TeyaBlocksOptions,
  CardElement,
  CardElementOptions,
  CheckoutElement,
  CheckoutElementOptions,
  ApplePayElement,
  PaymentSubmitResponse,
  PaymentSubmitError,
} from '@teyaproduct/teya-blocks-js';
```

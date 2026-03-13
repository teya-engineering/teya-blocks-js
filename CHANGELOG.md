# @teyaproduct/teya-blocks-js

## 0.2.0

### Minor Changes

- **Apple Pay callback alignment**: Replaced `onPaymentCompleted` with `onSuccess` and `onError` callbacks on `ApplePayElementOptions` to provide a consistent callback pattern across card, checkout, and Apple Pay elements
- **Apple Pay return type update**: `ApplePayElement.createPaymentMethod()` now returns `PaymentSubmitResponse` instead of `ApplePayPaymentResult` for consistency
- **Apple Pay result enhancement**: Added optional `paymentResponse` field to `ApplePayPaymentResult`

## 0.1.0

### Minor Changes

- **DCC event support**: Added Dynamic Currency Conversion (DCC) callback types to `CardElementOptions`: `onDccOffered`, `onDccSelectionRequired`, `onDccSelected`, `onDccCancelled`, `onDccSkipped`
- **DCC event data types**: Added `DccOfferedEventData`, `DccSelectedEventData`, and `DccSkippedEventData` types for handling DCC flow events

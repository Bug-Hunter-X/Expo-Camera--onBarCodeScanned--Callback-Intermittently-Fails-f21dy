# Expo Camera `onBarCodeScanned` Callback Intermittently Fails

This repository demonstrates a bug in the Expo Camera API where the `onBarCodeScanned` callback function is not always triggered, resulting in missed barcode scans. The issue is intermittent and seems to be related to the camera's internal processing or race conditions. 

## Bug Reproduction

1. Clone this repository.
2. Install dependencies: `npm install`
3. Run the app: `expo start`
4. Scan barcodes. You'll notice that some barcodes are scanned and processed correctly, while others are missed despite the camera successfully detecting the barcode.

## Solution

A potential solution is to debounce the `onBarCodeScanned` callback. This prevents multiple consecutive calls if the barcode is read quickly. The solution file demonstrates this approach, which seems to mitigate the issue.
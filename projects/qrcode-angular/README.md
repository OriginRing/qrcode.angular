# qrcode-angular

A Angular component to generate QR codes for rendering to the DOM.

## Introduction

Support canvas and svg two formats
Support adding QR code logo

## Installation

```shell
npm i qrcode-angular
```

## Usage

```typescript
import { QrcodeModule } from 'qrcode-angular';

<qrcode value="https://angular.io/"></qrcode>
<qrcode mode='svg' value="https://angular.io/"></qrcode>
<qrcode value="https://angular.io/" icon="imgUrl"></qrcode>
<qrcode value="https://angular.io/" errorLevel="H"></qrcode>
```

## API

| prop         | type                              | default value                     | note                      |
| ------------ | --------------------------------- | --------------------------------- |---------------------------|
| `mode`       | `'canvas'｜'svg'`                 | `'canvas'`                        | output mode               |
| `value`      | `string`                          | -                                 | scanned link              |
| `color`      | `{ dark: string, light: string }` | `{ dark: '#000', light: '#fff' }` | QR code Color             |
| `size`       | `number`                          | `160`                             | QR code Size              |
| `icon`       | `string`                          | -                                 | QR code include logo url  |
| `iconSize`   | `number`                          | `40`                              | QR code include logo size |
| `errorLevel` | `'L'｜'M'｜'Q'｜'H'`              | `H`                               | Error Code Level          |

## Notice

qrcode-angular bundles the [qrcodegen](https://github.com/nayuki/QR-Code-generator/blob/942f4319a6ba913dbc6775d8e665ccf18f401d83/typescript-javascript/qrcodegen.ts), which is available under the [MIT license](https://github.com/nayuki/QR-Code-generator/blob/942f4319a6ba913dbc6775d8e665ccf18f401d83/typescript-javascript/qrcodegen.ts).

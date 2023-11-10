# qrcode-angular

A angular component to generate QR codes for rendering to the DOM.

## Introduction

> angular 17 changed to standalone component

Support canvas and svg two formats

Support adding QR code logo

Angular version >= 17 [![npm package](https://img.shields.io/badge/npm-latest%20version-%231890ff)](https://www.npmjs.com/package/qrcode-angular)

17 > Angular version >= 14 (npm 1.2.0)

## Installation

```shell
npm i qrcode-angular
```

## Usage

```typescript
import { QrcodeComponent } from 'qrcode-angular';

<qrcode value="https://angular.io/"></qrcode>
<qrcode mode='svg' value="https://angular.io/"></qrcode>
<qrcode value="https://angular.io/" icon="imgUrl"></qrcode>
<qrcode value="https://angular.io/" errorLevel="H"></qrcode>
```

- basic

  <img src="https://github.com/OriginRing/qrcode.angular/blob/master/src/assets/image/originring.png" alt="basic" width="100" height="100">

- icon

  <img src="https://github.com/OriginRing/qrcode.angular/blob/master/src/assets/image/originring-logo.png" alt="basic" width="100" height="100">

- color

  <img src="https://github.com/OriginRing/qrcode.angular/blob/master/src/assets/image/originring-color.png" alt="basic" width="100" height="100">

- errorLevel(H)

  <img src="https://github.com/OriginRing/qrcode.angular/blob/master/src/assets/image/originring-level.png" alt="basic" width="100" height="100">

## API

| prop         | type                              | default value                     | note                      |
| ------------ | --------------------------------- |-----------------------------------|---------------------------|
| `mode`       | `'canvas'｜'svg'`                 | `'canvas'`                        | output mode               |
| `value`      | `string`                          | -                                 | scanned link              |
| `color`      | `{ dark: string, light: string }` | `{ dark: '#000', light: '#fff' }` | QR code Color             |
| `size`       | `number`                          | `160`                             | QR code Size              |
| `icon`       | `string`                          | -                                 | QR code include logo url  |
| `iconSize`   | `number`                          | `40`                              | QR code include logo size |
| `errorLevel` | `'L'｜'M'｜'Q'｜'H'`              | `M`                               | Error Code Level          |

## Notice

### Invalid QR Code

`value` has a conservative upper limit of 738 or fewer strings. If error correction levels are used, the `value` upper limit will be lowered.

### QR Code error correction level

The ErrorLevel means that the QR code can be scanned normally after being blocked, and the maximum area that can be blocked is the error correction rate.

Generally, the QR code is divided into 4 error correction levels: Level `L` can correct about `7%` errors, Level `M` can correct about `15%` errors, Level `Q` can correct about `25%` errors, and Level `H` can correct about `30%` errors. 

> qrcode-angular bundles the [qrcodegen](https://github.com/nayuki/QR-Code-generator/blob/942f4319a6ba913dbc6775d8e665ccf18f401d83/typescript-javascript/qrcodegen.ts), which is available under the [MIT license](https://github.com/nayuki/QR-Code-generator/blob/942f4319a6ba913dbc6775d8e665ccf18f401d83/typescript-javascript/qrcodegen.ts).

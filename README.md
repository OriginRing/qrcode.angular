# qrcode-angular

A Angular component to generate QR codes for rendering to the DOM.

## Installation

```shell
##
```
## Usage

```javascript
<qrcode-angular value="https://angular.io/"></qrcode-angular>
```

## API
|  prop   | type                           | default value                     | note |
|  ----  |--------------------------------|-----------------------------------| ---- |
| `value`  | `string`                       | -                                 | scanned link   |
| `color`  | `{ dark: string, light: string }` | `{ dark: '#000', light: '#fff' }` | QR code Color  |
| `size`  | `number`                       | `160`                             | QR code Size  |
| `icon`  | `string`                       | -                                 | QR code include logo url  |
| `iconSize`  | `number`                       | `40`                              | QR code include logo size     |
| `iconColor`  | `string`                       | `#fff`                            | QR code include logo background color  |
| `errorLevel`  | `'L'｜'M'｜'Q'｜'H'`              | `H`                               | Error Code Level   |

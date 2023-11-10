import { Component, ElementRef, ViewChild } from '@angular/core';

import { QrcodeComponent } from 'qrcode-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  imports: [QrcodeComponent]
})
export class AppComponent {
  @ViewChild('download', { static: false }) download!: ElementRef;
  value = 'https://github.com/OriginRing/qrcode.angular';
  icon = './../assets/image/patrick.jpg';
  color = { dark: '#ff6600', light: '#f6f6f6' };
  color1 = { dark: '#1677ff', light: '#f6f6f6' };
  level: Array<'L' | 'M' | 'Q' | 'H'> = ['L', 'M', 'Q', 'H'];
  errorLevel: 'L' | 'M' | 'Q' | 'H' = 'L';

  constructor() {}

  downloadQRCode(val: boolean = true): void {
    let canvas: HTMLCanvasElement | null | undefined;
    if (val) {
      canvas = document.getElementById('download')?.querySelector<HTMLCanvasElement>('canvas');
    } else {
      canvas = document.getElementById('download')?.querySelector<HTMLCanvasElement>('canvas');
    }
    if (canvas) {
      this.download.nativeElement.href = canvas.toDataURL('image/png');
      this.download.nativeElement.download = `angular-${val}`;
      const event = new MouseEvent('click');
      this.download.nativeElement.dispatchEvent(event);
    }
  }

  changeLevel(lev: 'L' | 'M' | 'Q' | 'H'): void {
    this.errorLevel = lev;
  }
}

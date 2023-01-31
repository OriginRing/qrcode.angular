import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { drawCanvas, qrCode } from './qrcode';
@Component({
  selector: 'qrcode',
  template: `
      <canvas #canvas [width]="size" [height]="size"></canvas>
      <img
        *ngIf="!!icon"
        [src]="icon"
        [attr.key]="icon"
        crossOrigin="anonymous"
        [alt]="icon"
      />
  `,
  styles: [`
    :host {
      display: inline-block;
    }
    img {
      display: none;
    }
  `]
})
export class QrcodeAngularComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef;
  @Input() value: string = '';
  @Input() color: { dark: string, light: string } = { dark: '#000', light: '#fff' };
  @Input() size: number = 160;
  @Input() icon: string = '';
  @Input() iconSize: number = 40;
  @Input() iconColor: string = '#fff';
  @Input() errorLevel: 'L' | 'M' | 'Q' | 'H' = 'M';

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { value, nzIcon, nzErrorLevel } = changes;
    if ((value || nzIcon || nzErrorLevel) && this.canvas) {
      this.drawQRCode();
    }
  }

  ngAfterViewInit(): void {
    this.drawQRCode();
  }

  drawQRCode(): void {
    if (!this.value) {
      return;
    }

    drawCanvas(
      this.canvas,
      qrCode(this.value, this.errorLevel),
      this.size,
      10,
      this.color.light,
      this.color.dark,
      this.iconSize,
      this.iconColor,
      this.icon
    );
  }
}

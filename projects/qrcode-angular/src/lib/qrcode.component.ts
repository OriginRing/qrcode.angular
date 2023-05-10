import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
  ViewChild
} from '@angular/core';

import { drawCanvas, ERROR_LEVEL_MAP, plotQrCodeData, toSvgString } from './qrcode';
@Component({
  selector: 'qrcode',
  template: `
    <ng-container [ngSwitch]="mode">
      <ng-container *ngSwitchCase="'svg'">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          [attr.viewBox]="viewBox"
          stroke="none"
          preserveAspectRatio="none"
          [style]="'width: ' + size + 'px; height: ' + size + 'px'"
        >
          <path [attr.fill]="color.light" [attr.d]="d" shape-rendering="crispEdges" />
          <path [attr.d]="path" [attr.fill]="color.dark" shape-rendering="crispEdges" />
          <svg
            *ngIf="!!icon && svgImg"
            [attr.viewBox]="iconViewBox"
            [attr.x]="iconX"
            [attr.y]="iconX"
            stroke="none"
            preserveAspectRatio="none"
            [style]="'width: ' + iconSize + 'px; height: ' + iconSize + 'px'"
          >
            <path [attr.fill]="color.light" [attr.d]="iconD" shape-rendering="crispEdges" />
            <image [attr.xlink:href]="icon" [attr.width]="iconSize" [attr.height]="iconSize" />
          </svg>
        </svg>
      </ng-container>
      <ng-container *ngSwitchDefault>
        <ng-container *ngIf="isBrowser">
          <canvas #canvas></canvas>
        </ng-container>
      </ng-container>
    </ng-container>
  `,
  styles: [
    `
      :host {
        display: inline-block;
      }
      canvas {
        display: block;
      }
    `
  ]
})
export class QrcodeComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  @Input() mode: 'canvas' | 'svg' = 'canvas';
  @Input() value: string = '';
  @Input() color: { dark: string; light: string } = { dark: '#000', light: '#fff' };
  @Input() size: number = 160;
  @Input() icon: string = '';
  @Input() iconSize: number = 40;
  @Input() errorLevel: keyof typeof ERROR_LEVEL_MAP = 'M';

  svgImg: boolean = true;

  path: string | null = null;
  viewBox: string | null = null;
  iconViewBox: string | null = null;
  d: string | null = null;
  iconD: string | null = null;
  iconX: string = '0px';

  // https://github.com/angular/universal-starter/issues/538#issuecomment-365518693
  // canvas is not supported by the SSR DOM
  isBrowser = true;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private cdr: ChangeDetectorRef) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const { mode, value, color, icon, errorLevel } = changes;
    if (mode || value || color || icon || errorLevel) {
      switch (this.mode) {
        case 'canvas':
          if (this.canvas) this.drawCanvasQRCode();
          break;
        case 'svg':
          this.drawSvgQrCode();
          break;
      }
    }
  }

  ngAfterViewInit(): void {
    switch (this.mode) {
      case 'canvas':
        this.drawCanvasQRCode();
        break;
      case 'svg':
        this.drawSvgQrCode();
        break;
    }
  }

  drawSvgQrCode(): void {
    if (!this.icon) {
      this.drawSvgQrCodeFilling();
    } else {
      const iconImg = new Image();
      iconImg.src = this.icon;
      iconImg.crossOrigin = 'anonymous';
      iconImg.onload = () => this.drawSvgQrCodeFilling();
      iconImg.onerror = () => {
        this.svgImg = false;
        this.drawSvgQrCodeFilling();
        this.cdr.markForCheck();
      };
    }
  }

  drawSvgQrCodeFilling(): void {
    const svg = toSvgString(plotQrCodeData(this.value, this.errorLevel));
    this.path = svg.parts.join(' ');
    this.viewBox = `0 0 ${svg.size} ${svg.size}`;
    this.iconViewBox = `0 0 ${this.size} ${this.size}`;
    this.d = `M0,0 h${svg.size}v${svg.size}H0z`;
    this.iconD = `M0,0 h${this.iconSize}v${this.iconSize}H0z`;
    this.iconX = `${(this.size - this.iconSize) / 2 / (this.size / svg.size)}px`;
    this.cdr.markForCheck();
  }

  drawCanvasQRCode(): void {
    if (this.canvas) {
      drawCanvas(
        this.canvas.nativeElement,
        plotQrCodeData(this.value, this.errorLevel),
        this.size,
        20,
        this.color.light,
        this.color.dark,
        this.iconSize,
        this.icon
      );
    }
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { QrcodeModule } from 'qrcode-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, QrcodeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

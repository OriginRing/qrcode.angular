import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { QrcodeAngularModule } from 'qrcode-angular';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, QrcodeAngularModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

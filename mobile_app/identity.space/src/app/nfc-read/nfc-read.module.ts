import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NfcReadPageRoutingModule } from './nfc-read-routing.module';

import { NfcReadPage } from './nfc-read.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NfcReadPageRoutingModule
  ],
  declarations: [NfcReadPage]
})
export class NfcReadPageModule {}

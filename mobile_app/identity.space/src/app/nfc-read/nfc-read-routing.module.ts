import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NfcReadPage } from './nfc-read.page';

const routes: Routes = [
  {
    path: '',
    component: NfcReadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NfcReadPageRoutingModule {}

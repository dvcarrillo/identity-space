import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'modal-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage {
  constructor(public helpPage: ModalController) {

  }

  dismiss() {
    this.helpPage.dismiss();
  }
}

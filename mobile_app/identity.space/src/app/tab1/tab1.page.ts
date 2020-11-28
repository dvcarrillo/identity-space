import { HelpPage } from './../help/help.page';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public modalController: ModalController) { }


  async helpButtonClicked() {
    console.log('hej');

    const modal = await this.modalController.create({
      component: HelpPage
    });
    modal.present();
  }
}

import { ConnectionService } from './../connection.service';
import { HelpPage } from './../help/help.page';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private nfc: NFC, 
    private ndef: Ndef,
    private connectionService : ConnectionService,
    public modalController: ModalController
  ) { }

  ionViewDidEnter() {
    // this.readNFC();
  }

  async readNFC() {
    try {
      let tag = await this.nfc.scanNdef();
      console.log(JSON.stringify(tag));
    } catch (err) {
      console.log('Error reading tag', err);
    }
  }

  async helpButtonClicked() {
    const modal = await this.modalController.create({
      component: HelpPage
    });
    modal.present();
  }
}

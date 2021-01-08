import { ConnectionService } from './../connection.service';
import { NfcReadPage } from './../nfc-read/nfc-read.page';
import { HelpPage } from './../help/help.page';
import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NFC, Ndef } from '@ionic-native/nfc/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private nfc: NFC,
    private ndef: Ndef,
    private connectionService: ConnectionService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) { }

  ionViewDidEnter() {
    // this.readNFC();
  }

  async showLoading(length: number) {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Processing card...',
      duration: length
    });
    await loading.present();
  }

  async showNFCReadModal(isConnected: boolean, address: string) {
    const modal = await this.modalController.create({
      component: NfcReadPage,
      componentProps: {
        'connectionStatus': isConnected,
        'address': address
      }
    });
    modal.present();
  }

  async readNFC() {
    try {
      let tag = await this.nfc.scanNdef();
      console.log(JSON.stringify(tag));
    } catch (err) {
      console.log('Error reading tag', err);
    }
  }

  async simulateNFCScan() {
    this.showLoading(1800);

    let isConnected = false;
    let address = `${this.connectionService.serverAddress}:${this.connectionService.serverPort}`;
    this.connectionService.connect();

    setTimeout(() => {
      if (this.connectionService.isSocketConnected()) {
        this.connectionService.sendNfcString("1212121");
        isConnected = true;
        this.showNFCReadModal(isConnected, address);
      }
      else {
        isConnected = false;
        this.showNFCReadModal(isConnected, address);
      }
    }, 2000);
  }

  async helpButtonClicked() {
    const modal = await this.modalController.create({
      component: HelpPage
    });
    modal.present();
  }
}

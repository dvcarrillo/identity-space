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

  async showNFCReadModal(isConnected: boolean, address: string, nfcString: string) {
    const modal = await this.modalController.create({
      component: NfcReadPage,
      componentProps: {
        'connectionStatus': isConnected,
        'address': address,
        'nfcString': nfcString
      }
    });
    modal.present();
  }

  async simulateNFCScan() {
    this.showLoading(1800);

    let isConnected = false;
    let address = `${this.connectionService.serverAddress}:${this.connectionService.serverPort}`;
    let nfcString = this.generateExampleNFCID();
    this.connectionService.connect();

    setTimeout(() => {
      if (this.connectionService.isSocketConnected()) {
        this.connectionService.sendNfcString(nfcString);
        isConnected = true;
        this.showNFCReadModal(isConnected, address, nfcString);
      }
      else {
        isConnected = false;
        this.showNFCReadModal(isConnected, address, nfcString);
      }
    }, 2000);
  }

  async helpButtonClicked() {
    const modal = await this.modalController.create({
      component: HelpPage
    });
    modal.present();
  }

  // Unused due to Apple Developer Program restrictions
  // async readNFC() {
  //   try {
  //     let tag = await this.nfc.scanNdef();
  //   } catch (err) {
  //     console.log('Error reading tag', err);
  //   }
  // }

  generateExampleNFCID():string {
    return "XX:XX:XX:XX".replace(/X/g, function() {
      return "0123456789ABCDEF".charAt(Math.floor(Math.random() * 16))
    });
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ConnectionService } from './../connection.service';

@Component({
  selector: 'app-nfc-read',
  templateUrl: './nfc-read.page.html',
  styleUrls: ['./nfc-read.page.scss'],
})
export class NfcReadPage implements OnInit {

  // Data passed in by componentProps
  @Input() connectionStatus: boolean;
  @Input() address: string;
  @Input() nfcString: string;

  // Interface variables
  toolbarTitle = 'Connection error';
  toolbarButtonText = 'Close';

  constructor(
    public nfcReadPage: ModalController,
    private connectionService: ConnectionService
  ) {}

  ngOnInit() {
    this.toolbarTitle = this.connectionStatus ? 'Connected' : 'Connection error';
    this.toolbarButtonText = this.connectionStatus ? 'Log out' : 'Close';
  }

  dismiss() {
    this.connectionService.disconnect();
    this.nfcReadPage.dismiss();
  }

  sendActiveSignalToRing() {
    this.connectionService.setActiveNfcID(this.nfcString);
  }

  sendInactiveSignalToRing() {
    this.connectionService.setInactiveNfcID(this.nfcString);
  }

}

import { ConnectionService } from './../connection.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private serverAddress: string;
  private serverPort: string;

  // For testing web app connection
  private testSendingString: string = '';
  private testSent: boolean = false;
  private testResponse: String = 'Loading...';
  private testType: string = 'check';

  constructor(private connectionService: ConnectionService) { }

  ionViewWillEnter() {
    this.serverAddress = this.connectionService.serverAddress;
    this.serverPort = this.connectionService.serverPort;
  }

  ionViewWillLeave() {
    this.connectionService.serverAddress = this.serverAddress;
    this.connectionService.serverPort = this.serverPort;
    this.testSent = false;
  }

  sendButtonClicked() {
    this.connectionService.serverAddress = this.serverAddress;
    this.connectionService.serverPort = this.serverPort;

    this.testResponse = `Sending "${this.testSendingString}" to http://${this.serverAddress}:${this.serverPort}...`;
    this.connectionService.connect();
    this.testSent = true;

    setTimeout(() => {
      if (this.connectionService.isSocketConnected()) {
        this.testResponse = `Connected to socket on http://${this.serverAddress}:${this.serverPort}`;

        if (this.testType === 'nfc') {
          this.connectionService.sendNfcString(this.testSendingString);
          this.testResponse = 'The NFC ID has been received by the socket.';
        }
        else if (this.testType === 'check') {
          this.connectionService.sendTestString(this.testSendingString);
          this.testResponse = 'Response from socket received. Web server is on.';
        }
      }
      else {
        this.testResponse = 'Socket is disconnected.';
      }
    }, 2000);
  }

}

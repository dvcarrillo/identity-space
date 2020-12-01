import { ConnectionService } from './../connection.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private serverAddress : string;
  private serverPort : string;

  // For testing web app connection
  private testSendingString : string = "";
  private testSent : boolean = false;
  private testResponse : String = "Loading..."

  constructor(private connectionService : ConnectionService) {}

  ionViewWillEnter() {
    this.serverAddress = this.connectionService.serverAddress;
    this.serverPort = this.connectionService.serverPort;
  }

  ionViewWillLeave() {
    this.connectionService.serverAddress = this.serverAddress;
    this.connectionService.serverPort = this.serverPort;
  }

  sendButtonClicked() {
    this.testResponse = `Sending "${this.testSendingString}" to ${this.serverAddress}:${this.serverPort}...`;
    this.testSent = true;
  }

}

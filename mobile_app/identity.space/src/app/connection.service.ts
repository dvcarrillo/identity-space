import { Injectable, OnInit } from '@angular/core';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService implements OnInit {
  private socket: any;
  public serverAddress = '192.168.1.1';
  public serverPort = '8080';
  public data: any;

  constructor() { }

  public ngOnInit() {
    this.socket.on('notification', data => {
      this.data = data;
    });
  }

  public connect() {
    this.socket = io(`http://${this.serverAddress}:${this.serverPort}`);
    this.socket.on('connect', () => { console.info('Connected to socket') });
    // socket.on('event', function (data) { });
    this.socket.on('disconnect', () => { console.info('Disconnected from socket') });
  }

  public sendTestString(testString: string) {
    this.socket.emit('appTest', testString, () => {});
  }

  public sendNfcString(nfcString: string) {
    this.socket.emit('nfcID', nfcString, () => {});
  }

  public setActiveNfcID(nfcString: string) {
    this.socket.emit('setActive nfcID', nfcString, () => {});
  }

  public setInactiveNfcID(nfcString: string) {
    this.socket.emit('setInactive nfcID', nfcString, () => {});
  }

  public isSocketConnected(): boolean {
    if ((this.socket != undefined) && (this.socket.connected == true)) {
      return true;
    }
    else {
      return false;
    }
  }

  public disconnect() {
    this.socket.disconnect();
  }
}

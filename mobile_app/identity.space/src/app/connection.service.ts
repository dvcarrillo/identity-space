import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  serverAddress : string = '192.168.1.1';
  serverPort : string = '8080';

  constructor() { }
}

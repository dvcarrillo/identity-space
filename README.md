# identity.**space**
*Collaborative generation of unique audiovisual experiences using NFC identity cards*

## 🖥 Web Application
The web application is divided into a backend server that handles the NFC IDs using [Socket.io](https://socket.io/docs/v3/) and more specifically its [TypeScript example](https://github.com/socketio/socket.io/tree/master/examples/typescript) and a frontend client that displays a generative art piece based on the NFC cards (i.e. sockets) that are currently connected.

### Launching the Server
After installing the necessary dependencies, you can start the server using:

```zsh
npm run start:server

```

If you want to test the server, you can additionally use the following command to send example NFC IDs to the server:

```zsh
npm run start:client

```

## 📱 Mobile Client
The mobile application is built in Ionic 6 for iOS 12 or above. Please follow [the Ionic Docs on iOS Development](https://ionicframework.com/docs/developing/ios) to set up your environment and learn about the workflow. See more information about Ionic on their [official documentation](https://ionicframework.com/docs).
### Launching Xcode to build the app for iOS
Xcode is necessary to build the application for iOS. To **open the project in Xcode** run: 
```
$ ionic capacitor open ios
```
If you make any changes do not forget to **sync them with Xcode first**:
```
& ionic capacitor copy ios
```

##
This repository is part of the KTH DT2140 HT20-1 Multimodal Interaction and Interfaces.

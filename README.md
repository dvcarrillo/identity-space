# identity.**space**
*Generation of unique multimodal scapes from your own identity*

## 🖥 Web Application
The web application is divided into a backend server that handles the NFC IDs using [Socket.io](https://socket.io/docs/v3/) and more specifically its [TypeScript example](https://github.com/socketio/socket.io/tree/master/examples/typescript) and a frontend client that displays a generative art piece based on the NFC cards (i.e. sockets) that are currently connected.

## 📱 Mobile Client
The mobile application is built in Ionic 6 for iOS 12 or above. Please follow [the Ionic Docs on iOS Development](https://ionicframework.com/docs/developing/ios) to set up your environment and learn about the workflow. See more information about Ionic on their [official documentation](https://ionicframework.com/docs).
### Launching Xcode to build the app for iOS
App coding should be carried out on the editor of your choice, but Xcode is necessary to build the application and run it on an iPhone. To **open the project in Xcode** run: 
```
$ ionic capacitor open ios
```
If you make any changes do not forget to **sync them with Xcode first**:
```
& ionic capacitor copy ios
```
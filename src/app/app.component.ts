import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage  } from "firebase/messaging";
import { environment } from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'af-notification';
    message:any = null;
mitoken:any =null;

    constructor() {}
    ngOnInit(): void {
      this.requestPermission();
      this.listen();
    }
    requestPermission() {
      const messaging = getMessaging();
      getToken(messaging, 
       { vapidKey: environment.firebase.vapidKey}).then(
         (currentToken) => {
           if (currentToken) {
             console.log("Hurraaa!!! we got the token.....");
             console.log(currentToken);
           } else {
             console.log('No registration token available. Request permission to generate one.');
           }
       }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
      });
    }

    listen() {
      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        this.message=payload;
        this.showNotification(payload.notification);
      });
    }

  showNotification(notification: any) {
    
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          registration.showNotification(notification.title, {
            body: notification.body,
            icon: 'favicon.ico' // Ruta al icono de la notificación
          });
        } else {
          console.error('Service worker is not registered.');
        }
      }).catch(error => {
        console.error('Error getting service worker registration:', error);
      });
    } else {
      console.error('Notification permission is not granted.');
    }
        }


  }
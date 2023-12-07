import { Component, OnInit } from '@angular/core';
import { getMessaging, getToken, onMessage  } from "firebase/messaging";
import { environment } from "../environments/environment";
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'af-notification';
    message:any = null;
    mitoken:any =null;
    titulo: string = '';
    cuerpo: string = '';

    constructor(private http: HttpClient) {}
    ngOnInit(): void {
     this.requestPermission();
      //this.listen();
    }
    requestPermission() {
      const messaging = getMessaging();
      getToken(messaging, 
       { vapidKey: environment.firebase.vapidKey}).then(
         (currentToken) => {
           if (currentToken) {
             console.log("Token recibido de usuario desde firebase");
             console.log(currentToken);
           } else {
             console.log('No registration token available. Request permission to generate one.');
           }
       }).catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
      });
    }



    enviarNotificacion() {

      console.log('Título:', this.titulo);
     console.log('Cuerpo:', this.cuerpo);
      // Validar si se proporcionan título y cuerpo
      if (!this.titulo || !this.cuerpo) {
        alert('Por favor, complete tanto el título como el cuerpo.');
        return;
      }
    
      // Obtener el token actual
      const messaging = getMessaging();
      getToken(messaging, { vapidKey: environment.firebase.vapidKey })
        .then((currentToken) => {
          if (currentToken) {
            console.log('Token recibido de usuario desde firebase:', currentToken);
    
            // Realizar la llamada al servidor Node con el token actual
            const url = 'http://localhost:3000/enviar-notificacion';
            const payload = {
              title: this.titulo,
              body: this.cuerpo,
              token: currentToken, // Incluir el token en el cuerpo de la solicitud
            };
    
            this.http.post(url, payload).subscribe(
              (response) => {
                console.log('Notificación enviada con éxito:', response);
                alert('Notificación enviada con éxito');
              },
              (error) => {
                console.error('Error al enviar la notificación:', error);
               // alert('Error al enviar la notificación');
              }
            );
          } else {
            console.log('No registration token available. Request permission to generate one.');
          }
        })
        .catch((err) => {
          console.log('An error occurred while retrieving token. ', err);
        });
    }


    // Esta parte no es necesaria
    listen() {
      const messaging = getMessaging();
      onMessage(messaging, (payload) => {
        console.log('Message received. ', payload);
        this.message=payload;
        this.showNotification(payload);
      });
    }



    

  showNotification(notification: any) {
    
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then(registration => {
        if (registration) {
          registration.showNotification(notification.data.title, {
            body: notification.data.body,
            icon: 'favicon.ico' // Ruta al icono de la notificación
          });

         // navigator.serviceWorker.showNotification(notificationTitle, notificationOptions);

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
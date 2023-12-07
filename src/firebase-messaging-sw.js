
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "xxx",
    authDomain: "xxxx",
    projectId: "xxx",
    storageBucket: "xxx",
    messagingSenderId: "xxxx",
    appId: "xxxx",
    vapidKey:"xxxxx",
    
   });
   
   const messaging = firebase.messaging();
   self.addEventListener('push', (event) => {
    const payload = event.data.json();
    console.log('Notificacion recibida');
    console.log(payload);
    const options = {
      body: payload.data.body,
      icon: 'icon.png', // Ruta a la imagen del icono de la notificación
    };
  
    event.waitUntil(
        self.registration.showNotification(payload.data.title, options)
          .then(() => {
            console.log('Notificación mostrada con éxito');
          })
          .catch(error => {
            console.error('Error al mostrar la notificación:', error);
          })
      );


      self.addEventListener('notificationclick', (event) => {
        event.notification.close();
        event.waitUntil(
          clients.openWindow('http://localhost:4200/')
        );
      });

  });
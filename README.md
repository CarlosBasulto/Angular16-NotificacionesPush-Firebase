

## Requisistos

Debes crear una cuenta o registrarte en firebase: https://firebase.google.com/

Trabajamos con angular 16

1º Una vez creada la cuenta en Firebase, debes crear un nuevo proyecto: Ingresa el nombre de proyecto

2º Comienza por agregar Firebase a tu app, seleccionas la 3, Web </> y la registras

3º Copia los datos que aparecen, no te preocupes, luego puedes acceder a ellos. Vas a consola

4º Buscas la app Cloud Mensagging y haces clic, esto te servira para crear una primera campaña de pruebas, de momento no hagas nada

5º Vuelves a descripción general y pulsas en la ruedita y seleccionas configuración de proyecto, aquí tienes los datos que debes usar en dos archivos del proyecto: firebase-messagin.js y /enviroments/envioroment.ts , sustituye los datos de firebase con las XXXXX


6º En la cosola de firebase, selecciona Cloudmessagin (recuerda accedes desde descripción general, la ruedita> Configuración del proyecto)

7º Le das a generar par de claves (esta un poco más abajo), esto genera la clave pública (vapiKey) y la clave privada

8º ¿Te preguntarás, donde saco la vapidKey?, muy fácil, en la consola de firebase, lee el punto 7º

9º Ya te olvidas de firebase, ya lo tienes todo, firebase te permitirá mandar una notificación de pruebas, pero ojo, antes revisa otras cosas  [Proxima actualización, añadir un servidor en node.j para crear un backend para el envío de notificaciones]

10º Lanza el proyecto y ojo, abre la consola de chrome del navegador, deberás asegurate, que se registra el Service Worker y que te aparece el mensaje de aceptar notificaciones, ojoooo, sigue mirando la consola, te deberá llegar tu toke de firebase. Si lo has conseguido, enhorabuena, ya te llegan notificaciones

11º Lanza una campaña desde la consola de firebase, tarda un poco, pero en 30-60 segundos, debes ver la notificiación. Si no te llega, revisa el log de angular, seguro que te llega en ese punto.

Y poco más!!!! Comparte código siempre!!!!



+++++++++++++++++++++++++++++++++++

Recuerda, necesitas una cuenta en firebase, necesitas meter los datos en el firebase-messagin.js y /enviroments/envioroment.ts , si lo habres lo veras como xxxxxxxxxxxx, debes meter tus datos

Recuerda, revisar al inspector de código fuente y revisa que se registra el service worker y recibes el token de firebase



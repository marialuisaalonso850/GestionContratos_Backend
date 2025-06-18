PLAT-EPA
--------------------------------------------------------------------------------------------
Plataforma de apoyo TIC-EPA veutral y versatil para todo lo que la dirección TIC pueda crear 
---------------------------------------------------------------------------------------------
PRE-REQUISITOS  
-  Node.js ( se recomienda v22.14.0)
-  MongoDB Atlas
-  Nodemailer y variables de entorno para envío de correos
-  Visual Studio code
------------------------------------------------------------------------------------------
Instalación: 

Instrucciones para ejecutar el entorno de desarrollo:

Ingresar en el terminal ya sea : npm install o npm i express dotenv mongoose nodemon uuid

variables de entorno:
- EMAIL_PASS
- EMAIL_USER
- BD_CONNECTION_STRING
- PORT
----------------------------------------------------------------------------------------
Ejecución:

node server.js o npm run dev 
---------------------------------------------------------------------------------------
Construido con :
- Lenguaje de Programación: JavaScript
- Herramientas :
   - Node.js: Entorno de ejecución para JavaScript en el servidor
   - Express.js: Framework minimalista para construir APIs REST
   - MongoDB Atlas: Base de datos NoSQL en la nube
   - Mongoose : ODM para modelar objetos de MongoDB en Node.js
   - Nodemailer :  Librería para envío de correos electrónicos
   - dotenv :  Manejo seguro de variables de entorno
   - Thunder Client : Extensión de VS Code para probar y documentar APIs fácilmente
---------------------------------------------------------------------------------------
Roles  y permisos dentro del sistema : 
- Administrador  : Eliminar contratos y todo lo que el moderador hace.
- Moderador : crear, actualizar y consultar contratos.
- Usuario : Visualizar contratos con filtros(fecha, dependencia o tipo de contrato)
---------------------------------------------------------------------------------------
Impacto Esperado en la Empresa: 
- Mejora en la trazabilidad y acceso a la información contractual.
- Reducción del uso de herramientas externas o archivos físicos.
- Automatización de alertas para vencimientos críticos.
- Mayor transparencia en la gestión de contratos.
- Facilita auditorías internas y externas.

 

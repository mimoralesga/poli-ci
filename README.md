# poli-ci


***Aplicación en Node.Js***
***3 Servicios (Front - Back - Base de Datos PostgreSQL)***

| Integrantes de Equipo |
|-|
| DANIEL FABIAN NOVOA PINEDA|
| Morales Miguel |
|Suarez Martinez Andrea Lisbeth |
|JHON FREDDY MAHECHA ORTIZ|

### Integración con Jenkins
- Se añade una nueva imagen al `docker-compose.yml` correspondiente al servicio de Jenkins.
- Se crea el archivo `Jenkinsfile` con la configuración necesaria para realizar el despligue del proyecto.
- Se crean cuatro diferentes etapas: prepare, build, test y deploy.
- Se crea un pipeline llamado `poli-ci` que clonara el repo del proyecto y utilizara el archivo de configuiración del pipeline.
- Se crea un webhook en el repo de github para que cada vez que se cree un evento en el repo se notifique a jenkins para que ejecute el pipeline.
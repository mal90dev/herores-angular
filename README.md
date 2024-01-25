# Heroes App
Es una aplicación de mantenimiento de super héroes. Muestra un listado de ellos con todos sus detalles. Se pueden añadir nuevos, editar los ya existentes y eliminarlos.

## Tecnologías

Este proyecto está desarrollado en la versión LTS de Angular 16.2.12 y 4.9.4 de typescript.

## Servidor desarrollo

Para ejecutar el servidor hay que lanzar el comando `ng serve` o el script `npm run start`, esto lanzará un servidor de desarrollo en http://localhost:4200/.

Para obtener los datos se ha hecho uso de la librería *json-server* que simula un API REST, este contiene todos los datos de los heroes. Para lanzar este servidor hay que lanzar el script `npm run json-server`. Esto ejecuta un servidor en http://localhost:3000 necesario para la obtención de datos de la aplicación.

Es necesario tener ambos servidores en marcha para el correcto funcionamiento de la aplicación.


## Test unitarios

Para la ejecución de los test se ha añadido el comando `npm run test-coverage`, este además de ejecutar todas las pruebas unitarias definidas en la aplicación, genera en el directorio *coverage/heroes* unos ficheros mediante los cuales podemos ver el estado de cobertura que hay en la aplicación. El fichero *index.html* muestra un estado detallado de ello.

## Docker

Para dockerizar la aplicación, en la raíz del directorio hay un fichero *dockerfile* que contiene todos los comandos necesarios para montar el contenedor. Para montar este, hay que lanzar el script `npm run docker`. Esto hace un *build* de la aplicación y la lanza en un servidor nginx, además también ejecuta un API REST mediante *json-server* para poder obtener los datos necesarios.

Una vez montado el contenedor en la dirección http://localhost:8080/ tenemos la aplicación y en http://localhost:3000/ el API REST.

## Lint

Se ha añadido la librería de ESLint que es una herramienta de linting para ayuda a mantener un código limpio y consistente. Para comprobar el estado de la aplicación se lanza el script `npm run lint`. Esto genera un informe e indica los posibles errores que hay que corregir. 

Esta herramienta contiene un fichero de configuración que es *.eslintrc.json* en el que puedes personalizarlo según tus necesidades.

## Autor

Aplicación realizada por Mario Aguilar Luque
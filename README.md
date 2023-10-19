# Introducción

[React SAP tools](https://react-sap-tools-vite.vercel.app/) es un conjunto de herramientas para SAP, que como su nombre indica, creadas en React. Actualmente tanto las herramientas, solo hay una, como en su funcionalidad son muy básicas pero la idea es ir dandoles más funcionalidad e ir añadiendo nuevas herramientas.

La herramienta actualmente disponible es la siguiente:

- Transporte de ordenes

En la Wiki del repositorio iré explicando el funcionamiento de la herramienta en general.

## Prerequistos

### Instalación de las herramientas en SAP

Para que la aplicación en React pueda utilizar las herramientas hay que instalar la siguiente [aplicación](https://github.com/irodrigob/abap-sap-tools) en tu servidor de SAP.

### Cuenta en Gmail

Los sistemas que se van configurando se guardan en una base de datos asociado a tu cuenta de correo de Google, por ello lo primero que va hacer la aplicación es pedirte que hagas login con tu cuenta de Gmail.

**NOTA IMPORTANTE:La primera vez el navegador seguramente bloquee la ventana que se abre para pedirte el usuario al que te quieres conectar. Hay que permitir las ventanas emergentes para poder usar la aplicación.**

# Inicio de la aplicación

La primera vez que entremos a la aplicación nos saldrá el botón para conectarnos con nuestra cuenta de google:

![alt login](https://github.com/irodrigob/react-sap-tools-vite/blob/master/public/instrucciones/pantalla_login.png)

Una vez conectados no saldrá la pantalla inicial:

![alt pantalla inicial](https://github.com/irodrigob/react-sap-tools-vite/blob/master/public/instrucciones/pantalla_inicial.png)

Siempre nos aperecera una tile inicial, la de _Configuración_, donde podremos añadir un nuevo sistema y cambiar la configuración general de conexión a sistemas. En la imagen se ve dos sistemas ya con configurados.

El siguiente paso es añadir un sistema.

## Añadir un nuevo sistema.

Para añadir un nuevo sistema hay que pulsar sobre el siguiente icono ![alt icono anyadir sistema](https://github.com/irodrigob/react-sap-tools-vite/blob/master/public/instrucciones/icono_anyadir_sistema.png) en la tile de _Configuración_. Y nos aparecerá una ventana donde se introducirá los datos del sistema

![alt añadir sistema](https://github.com/irodrigob/react-sap-tools-vite/blob/master/public/instrucciones/anyadir_sistema.png)

En el `Host Servidor` tendremos que introducir la URL de conexión a nuestro servidor. Si no la conocemos podemos utilizar el [programa](https://github.com/irodrigob/abap-sap-tools-core/wiki#saber-la-url-del-servidor-de-sap) de utilidades en el core de las herramientas de SAP para saberlo.

El checkbox `Usar tunel para conexión` le indicaremos que nos conectaremos al servidor a través de un tunel, más adelante se comenta su funcionamiento.

Una vez introducido todos los datos hay que pulsar sobre el botón de `Grabar`.

La contraseña se cifra, usando AES, en base de datos y solo se descrifra en el momento de hacer la conexión a SAP. Con lo cual cualquier que inspeccione las llamadas no se verá nunca la contraseña legible.

## Modificando un sistema

Para modificar un sistema tenemos que ir a la tile del sistema y pulsar sobre el siguiennte icono: ![alt icono editar sistema](https://github.com/irodrigob/react-sap-tools-vite/blob/master/public/instrucciones/icono_editar_sistema.png) y se nos abrirá la edición del sistema.

Una vez modificado pulsaremos sobre el botón de `Grabar`.

## Borrar un sistema

Para borrar un sistema tenemos que pulsar sobre el icono de borrar: ![alt icono borrar sistema](https://github.com/irodrigob/react-sap-tools-vite/blob/master/public/instrucciones/icono_borrar_sistema.png) y nos preguntará si estamos seguro de borrarlo, y en caso de responder afirmativamente se borrará el sistema.

## Conectado con un sistema

Para seleccionar un sistema tenemos que pulsar sobre el área donde esta el nombre del sistema

![alt seleccionar sistema](https://github.com/irodrigob/react-sap-tools-vite/blob/master/public/instrucciones/seleccion_sistema.png)

Una vez seleccionado nos aparecera el listado de aplicaciones configurados para dicho sistema:

![alt listado aplicaciones](https://github.com/irodrigob/react-sap-tools-vite/blob/master/public/instrucciones/listado_aplicaciones.png)

Y además en la barra superior nos aparecerá el sistema seleccionado y una navegación donde se podrá volver
a seleccionar otro sistema:

![alt toolbar sistema seleccionado.](https://github.com/irodrigob/react-sap-tools-vite/blob/master/public/instrucciones/toolbar_sistema_seleccionado.png)

# Tunneling

Esta es la parte más delicada del aplicativo. Si tu servidor de SAP es accesible desde internet lo que viene a continuación lo puedes obviar.

Normalmente nos conectamos a servidor de SAP que están en una red local por lo tanto no son visibles desde internet. Para ello, para que desde la herramienta se pueda conectar al servidor de SAP es necesario establecer un tunnel seguro entre la herramienta y el servidor local.
Para los que estéis familiarizados con desarrollos con el Cloud de SAP, sabrá que SAP tiene una producto llamado `Cloud Connector` que permite conectar el cloud de SAP con los sistema de clientes.

Para imitar esa funcionalidad hay una herramienta llamada [Ngrok](https://ngrok.com/), que encima es gratuita, que permite generar ese tunnel. Para poderla utilizar la herramienta hay que registrarse con nuestra cuenta de Gmail, Github o poniendo usuario y contraseña.

A destacar que en la versión gratuita solo es posible crear un tunel y la url cambia cada vez que nos conectemos. Esto es importante a la hora de decidir como vamos a conectarnos.

## Configuración

Antes de poderlo utilizarlo hay que hacer dos pasos para obtener las credenciales para poder crear y consulta los tuneles.

El primero paso es generar el token de autentificación desde el [dashboard](https://dashboard.ngrok.com/get-started/your-authtoken) este token permite conectarnos con a los servidores de Ngrok.

Por último hay que generar la [API Token](https://dashboard.ngrok.com/api) necesaria para poder consultar los tuneles establecidos por el usuario. Hay que tener en cuenta que en la versión gratuita la url de los tuneles son dinámicas.

Para crearla hay que darle al botón _+ New API Key_, ponerle el nombre y nos generará una clave que tendremos que copiarnos en un lugar seguro ya que no será posible consultarla a posteriore.

Con los dos token generados hay que informarlos en la configuración de la aplicación: ![icono de configuración](https://github.com/irodrigob/react-sap-tools-vite/blob/master/public/instrucciones/icono_configuracion.png) que esta en la tile de `Configuración`:

![configuracion tunel](https://github.com/irodrigob/react-sap-tools-vite/blob/master/public/instrucciones/configuracion_tunel.png)

### Como conectarse

Para conectarse se puede hacer de dos maneras: Usando docker o el instalable. Ambas son opciones que ofrece el propio Ngrok. La versión más simple que he visto y la que esta preparado la aplicación es la versión del docker.

#### Usando docker

Para usar Docker, si no se tiene instalado, hay que descargarlo de su [página oficial](https://docs.docker.com/get-docker/). La instalación es muy sencilla, y cualquier problema es sencillo solucionarlo.

Si hemos configurado el sistema para que use tunel ngrok en la tile de sistema nos aparecerá el siguiente icono: ![alt icono descarga tunel docker](https://github.com/irodrigob/react-sap-tools-vite/blob/master/public/instrucciones/icono_descarga_tunel_docker.png). Este icono lo que hará es descargarnos un autoejecutable donde arrancará de manera automática el ngrok con los datos de conexión al sistema. Este fichero no es necesario volver a descargarlo salvo que se cambie alguno de los token de autentificación a Ngrok.

#### Usando instalable

Desde la [página inicial](https://dashboard.ngrok.com/get-started/setup) nos descargamos el programa para hacer un tunel. Es un fichero zip que solo tenemos que descomprimirlo en la ubicación que queramos. Lo siguiente es añadir el token tal como se indica en las instrucciones:

```bash
./ngrok config add-authtoken <token que se indica en la página>
```

Para hacer el tunel yo recomiendo descarga el fichero mediante el siguiente icono ![alt icono descarga tunel ejecutable](https://github.com/irodrigob/react-sap-tools-vite/blob/master/public/instrucciones/icono_descarga_tunel_exe.png) que nos descargará un fichero por lotes que se conectará al sistema donde esta el icono. Salvo que hayamos puesto el ejecutable del ngrok en un path global, hay que guardar el fichero en el mismo directorio donde esta el ejecutable.

La opción más tediosa es hacerlo todo manualmente. Es decir, usar powershell de Windows, quien use Windows, porque permite copiar la URL que genera al hacer el tunel. Si nuestro servidor es `http://vhcalnplci.dummy.nodomain:8000` el tunel se crearía así:

```bash
 .\ngrok.exe http http://vhcalnplci.dummy.nodomain:8000
```

Ahora si tenemos configurado la _API Token_ en la configuración no tendremos que hacer nada más, ya que al seleccionar el sistema se leerá la URL del tunnel generado y se conectará al sistema con dicha URL. Si no hay API Token tendremos que copiar la URL generada y configurarla en el host del servidor.

# Herramientas

Las herramientas las explicaré en la [Wiki](https://github.com/irodrigob/react-sap-tools-vite/wiki) para tenerlo mejor organizado.

# Arquitectura

La aplicación la he tenido que dividir en dos partes: Frontend y Backend. El motivo ha sido que cuando empece a usar los componentes [UI5 Web Components]([https://github.com/SAP/ui5-webcomponents-react]) estos no se podían usar en framework SSR como NextJS. Esto ya ha cambiado desde junio/julio 2023 ya es compatible pero voy a seguir manteniendo las dos aplicaciones por separado.

Por ello la parte Frontend esta desarrollado en React y como librerías destacadas uso:

- `Material-ui`. No quería utilizarla pero para algunos temas como la barra de herramientas superior y construir un layout vía Grid me ha parecido mucho más sencillo y practico usarla.
- `UI5 Web components`. Había hecho alguna cosa en UI5 anteriormente y quería probar la versión para React. En general muy contento de utilizarla.
- `Cliente GraphQL`. El backend es un servidor de GraphQL por ello toda la comunicación se hace a través de un cliente GraphQL.

El backend esta creado en NextJS. El motivo de usarlo es porque tiene un ejemplos autoexplicativos de como usarlo como middleware para Graphql.

Para más detalle de las liberías tan solo tenéis que mirar el `package.json` de los dos proyectos.

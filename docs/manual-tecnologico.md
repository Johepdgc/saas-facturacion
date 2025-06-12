## Manual Tecnológico para

## la Integración del Sistema

## de Transmisión

# Ministerio de Hacienda

Control de Versiones

```
Versión Fecha
1.0 02/
```

Control de Cambios

```
Detalle Versión Detalle de Cambios
Versión 1.0 Versión Inicial
```

Glosario

```
Termino Descripción
DTE Documento Tributario Electrónico
```

### JSON

```
JSON, cuyo nombre corresponde a las siglas JavaScript Object Notation
o Notación de Objetos de JavaScript, es un formato ligero de intercambio
de datos, que resulta sencillo de leer y escribir para los programadores y
simple de interpretar y generar para las máquinas.
```

### JWS

```
JSON Web Signature (abreviado JWS) es un estándar propuesto por IETF
para la firma de JSON arbitrario.1 Se utiliza como base para una variedad
de tecnologías basadas en la web, incluyendo JSON Web Token.
```

### JWT

```
JSON Web Token (abreviado JWT) es el estándar abierto basado en JSON
propuesto por IETF (RFC 7519) para la creación de tokens de acceso que
permiten la propagación de identidad y privilegios o claims en inglés,
utilizado para la parte de seguridad de los DTE
```

### API

```
Una API es una interfaz de programación de aplicaciones (del inglés API:
Application Programming Interface). Es un conjunto de rutinas que provee
acceso a funciones de un determinado software. Básico en el entorno de
microservicios.
```

## Contenido

- Control de Versiones
- Control de Cambios
- Glosario
- Contenido
- 1. Flujo de Autenticación
  - 1.1 Autenticación para API (Sistema de Transmisión DTE)
- 2. Solución de Firma Electrónica
  - 2.1 Opciones para Instalación
  - 2.2 Consumo de Servicio de la Solución de Firma Electrónica
- 3. Flujo para Recepción de Documentos
  - 3.1 Holguras en la transmisión
  - 3.2 Proceso de Contingencia
    - 3.2.1 Funcionamiento Operativo Evento de Contingencia
  - 3.3 Política de Reintentos
  - 3.4 Servicio de Recepción por Lotes
- 4. APIS - Sistema Transmisión de DTE
  - 4.1 Servicio de Autenticación
  - 4.2 Servicio de Recepción
    - 4.2.1 Modelo Uno a uno
    - 4.2.2 Modelo en Lote
  - 4.3 Servicio de Consulta
    - 4.3.1 Consulta de DTE
    - 4.3.2 Consulta de Lote DTE
  - 4.4 Servicio de envío para Evento Contingencia.....................................................................
  - 4.5 Servicio de envío para Evento de Invalidación
- 5. Código QR

## 1. Flujo de Autenticación

1.1 Autenticación para API (Sistema de Transmisión DTE)

El contribuyente que utilice los servicios del API de Recepción para el envío de los DTE, deberá
autenticarse contra la API de Seguridad, para ello deberá enviar el usuario y contraseña a la URI
contenido en la sección Servicio de Autenticación de este Manual.

Las credenciales serán verificadas con los datos almacenados en la base de datos del módulo de
seguridad.

Estas credenciales serán del tipo de aplicación. Esta contraseña no tiene vencimiento, pero puede
ser modificada a demanda desde la Consola de Administración de Facturación Electrónica.

Al respecto del formato, la contraseña deberá contener letras, números, un carácter especial y debe
estar entre el rango de 13 a 25 caracteres.

En el caso de que las credenciales sean correctas y el usuario exista, se generará un Token, que
brindará el acceso para el consumo del resto de servicios del sistema de Documentos Tributarios
Electrónicos.

A continuación, se especifica el proceso de autenticación para API.

La vigencia del token generado mediante el Servicio de Autenticación será configurable en la
plataforma de servicio, de tal forma que no será necesario realizar por cada envío de documento
electrónico el proceso de autenticación, sino sólo una autenticación cada 24 horas.

## 2. Solución de Firma Electrónica

La Administración Tributaria comparte un proyecto de firma de documentos, basado en JAVA, que
permitirá al contribuyente firmar los documentos acordes al estándar dictado por el Ministerio de
Hacienda. La aplicación es Standalone y no necesita conectividad hacia afuera de la infraestructura
del contribuyente. Las opciones son las siguientes:

```
 Proyecto Java Spring Boot.
 Contenedor Docker (con SSL y sin SSL).
 Servicio de Windows.
```

2.1 Opciones para Instalación

Proyecto Java Spring Boot
El proyecto Java svfe-api-firmador.zip brinda a los contribuyentes la posibilidad de personalizar a
su gusto la solución provista, para agregar cualquier posible control adicional. Este proyecto se
pondrá a disposición de los contribuyentes mediante los canales que esta Administración Tributaria
estime convenientes.

Contenedor Docker Sin SSL
La segunda opción es la instalación y configuración de una imagen de Docker, lista para ejecutar,
una vez instalado el software base de Docker, debe procederse con los siguientes pasos para
habilitar el servicio de firmado:

Lo primero que se necesita es tener instalado Docker Desktop en Windows, o en Linux, las guías
de instalación oficiales las pueden encontrar en el siguiente link:

https://docs.docker.com/engine/install/

Posteriormente esta Administración Tributaria le proporcionará el archivo dte-firmador.zip,
mediante los canales que estime convenientes. Leer las indicaciones en la carpeta temp. Se
recomienda descomprimir el archivo en una ruta accesible ya sea en Windows y/o Linux.

Luego seguir los pasos a continuación:

1. Ingresar a la carpeta docker
2. Dentro de la carpeta temp se debe agregar el certificado que fue descargado del sitio, y
   renombrarlo solo con el número de NIT del contribuyente.
3. Una vez que se tenga el certificado en la carpeta temp, regresar a la carpeta Docker
4. Si:
   a. Se usa Windows, abrir una consola de PowerShell, e ir a la carpeta de docker y
   ejecutar el comando siguiente: docker-compose up -d
   b. Si se usa Linux, debe ubicar en la ruta donde está la carpeta y ejecutar el comando
   siguiente: docker-compose up -d.

5. Confirmar que el contenedor se está ejecutando con el siguiente comando: docker ps. Se
   mostrará una respuesta como la siguiente:

Contenedor Docker con SSL
 Es requerido que esté instalado la herramienta Docker y ejecutándose en el servidor o
computadora desde el cual se generará la firma, si no está instalado se puede descargar e
instalar desde el siguiente link: https://www.docker.com/products/docker-desktop

Extraer la carpeta descargada (recomendación C:\)

Copiar el certificado proporcionado por la Administración Tributaria en la carpeta
RUTA_EXTRACCION_CARPETA\docker\temp, y renombrarlo sólo con el número de NIT:

Luego regresar a la carpeta RUTA_EXTRACCION_CARPETA\docker

Configuración de SSL

Dirigirse a la sección: Ejecución del servicio con docker-compose, si no se utilizará SSL.

Para utilizar SSL, debe agregar su certificado en la carpeta ssl, como se muestra a continuación:

En el archivo docker-compose.yml, puede cambiar el puerto que se encuentra por defecto (443),
por otro que desee utilizar.

En el archivo svfe-api.env, se debe actualizar la variable SVFE_ARCHIVO, con el nombre del archivo
correspondiente al certificado que se ubicó en la carpeta ssl.

De igual forma, se debe ingresar en el valor de la variable SVFE_PASSWORD, la contraseña que
corresponde al certificado anterior.

Ejecución del servicio con docker-compose

```
 Si no desea utilizar SSL, remueva la variable SPRING_PROFILES_ACTIVE del archivo svfe-
api.env
```

A continuación, abra una consola de PowerShell y diríjase a la carpeta de docker y ejecute el
siguiente comando:

docker> docker-compose up -d

La primera vez que se descargue la imagen se verá de la forma siguiente:

Para confirmar que la imagen está arriba, utilice el siguiente comando:

docker> docker ps

Servicio de Windows
Dada las diferentes arquitecturas que pueden poseer los contribuyentes, es conveniente poder
proveer una solución aplicable para entornos Windows. A continuación, el detalle para instalar el
servicio de firmado, como un servicio más dentro del entorno de Windows. El certificado SSL debe
ser el provisto por su organización:

Paso 1.

Parametrizar variable de sistema “CERTIFICATE_HOME” con la ruta en la que se ubicará el
certificado del contribuyente.

Además, agregar la variable CERTIFICATE_PROFILE con el valor de ssl o nonssl según sea lo
requerido.

Paso 2.
Colocar el certificado del contribuyente con el NIT respectivo.

Paso 3.
Descomprimir la carpeta FIRMADOR

Paso 4.
Mover la carpeta FIRMADOR a la ubicación deseada y ubicarse ahí mismo (para este ejemplo se
usará C:\FIRMADOR)

Paso 5.
Ejecutar: WinSW.exe install WinSW.xml
WinSW.exe start WinSW.xml

Paso 6:

Corroborar instalación y ejecutar: WinSW.exe status WinSW.xml.

Abrir la aplicación de servicio (modo gráfico)

Corroborar en ruta: [http://IP:8113/firmardocumento/status](http://IP:8113/firmardocumento/status)

Flujo Alterno:

Paso A.
En caso necesitar detener el servicio, ejecutar: sc stop FIRMADOR-SERVICE

Paso B.
En caso de necesitar eliminar el servicio, ejecutar: sc delete FIRMADOR-SERVICE

En caso de necesitar cambiar el servicio por otra versión:
Ejecutar:

Paso A -> Paso B -> Cambiar el JAR que se encuentra en la carpeta FIRMADOR -> Paso 5 -> Paso 6

2.2 Consumo de Servicio de la Solución de Firma Electrónica

Posteriormente al proceso de instalación/configuración del servicio de firmado, se detallan los
datos para poder hacer uso del servicio de firmado de DTE:

URL
URL [http://localhost:8113/firmardocumento/](http://localhost:8113/firmardocumento/)
Método POST

Parámetros:
Parámetro Descripción Tipo Tipo Dato Ejemplo
content-
Type
Tipo de Contenido Headers String
application/JSON

```
nit
```

```
Nit del contribuyente
que realizada el proceso
de Firmado
```

```
String String “11111111111114”
```

```
activo
```

```
Indicador si
contribuyente está
activo
```

```
Boolean Boolean True
```

```
passwordPri
```

```
Contraseña de la llave
privada del certificado
de firma simple
```

```
String String “123456”
```

```
dteJson
Documento JSON del
DTE que se desea firmar
String JSON [JSON DTE]
```

Respuesta Exitosa:
Campo Descripción Tipo Dato
status Estado resultante de la transacción String
body Documento firmado String

Ejemplos respuesta

Éxito
Código: HTTP/1.1 200 OK
{
"status": "OK",
"body": "eyJhbGciOiJSUzUxMiJ9.ew0KICAiaWRlbnRpZmljYWNpb24iIDogew0KICAgICJ2ZXJz
aW9uIiA6IDIsDQogICAgImFtYmllbnRlIiA6ICIwMSIsDQogICAgImNvZGlnb0dlbmVyYWNpb24iID
ogImQ2Y2ZmZDcxLWUxZGUtNGUyNi05MzU1LTgzOWI1Y2QxMzUyMiIsDQogICAgImZUcmFuc
21pc2lvbiIgOiAiMjAyMS0wMy0yNyIsDQogICAgImhUcmFuc21pc2lvbiIgOiAiMTA6NTE6MDMiDQ
ogIH0sDQogICJlbWlzb3IiIDogew0KICAgICJuaXQiIDogIjEzMTYxNzEwOTMxMDE0IiwNCiAgICA
ibmZhY3R1cmFkb3IiIDogIjEzMzAwMDQ1MCIsDQogICAgIm5vbWJyZSIgOiAiSm9zdWUgQ2hpY
2FzIiwNCiAgICAibm9tYnJlUmVzcG9uc2FibGUiIDogIkpvc3VlIENoaWNhcyIsDQogICAgInRpcG
Eb2NSZXNwb25zYWJsZSIgOiAxLA0KICAgICJub1RlbGVmb25vIiA6ICIyMjk5ODg3NyIsDQogICAg
ImNvcnJlb0VsZWN0cm9uaWNvIiA6ICJkYXZpZEBkYXZpZC5jb20iDQogIH0sDQogICJkZXRhbGx
lRFRFIiA6IFsgew0KICAgICJub0l0ZW0iIDogMSwNCiAgICAiY29kaWdvR2VuZXJhY2lvbiIgOiAiNmI
3MjcyNGMtYzg1Yi00MmQwLWI3YWMtZjk3YmVjYjRlNDlhIiwNCiAgICAidGlwb0RvYyIgOiAiMDEi
DQogIH0sIHsNCiAgICAibm9JdGVtIiA6IDIsDQogICAgImNvZGlnb0dlbmVyYWNpb24iIDogIjYyN

```
TgzNWJkLTFjMzItNDU1ZS1iZWVmLWJlMTkxMjg3YzhjMCIsDQogICAgInRpcG9Eb2MiIDogIjAxIg
0KICB9IF0sDQogICJtb3Rpdm8iIDogew0KICAgICJmSW5pY2lvIiA6ICIyMDIxLTAzLTI3IiwNCiAgI
CAiZkZpbiIgOiAiMjAyMS0wMy0yNyINCiAgfQ0KfQ.mXEP-
a2x9KMFgWnfnsq97GUYUzFmJVsDaEvXTNqDl7H4lAKgThLYrlSMxw7dFD2aHGKrokc65eyL3hly
UazDJaPh6_SB9z7XU8VoTDtpDS3XJ_rh_R1o6YN30_HcPWI-
4sgeM8FoiCuyBYAWkYPupUNLa1uE27ZRfQYGxdX3nU1_E1lu47j4RamkOs_b6A9TVClz9E0KNb
tk_8UQE_-em6qOrgdDUjwB3qgmFQlgqJDgC_JGe_P289iMnxLK_CN-
qfkHOgehi2XYtHRPkQZC7Xic9wRIawyvfnI7N4yELHBk-
WH_aWvp0yc8Xv3OolgDfzk0vqH9qGtY6upqB-w-g"
}
```

Error

{
"status": "ERROR",
"body": {
"codigo": "809",
"mensaje": [
"Formato de NIT no valido - (00000000000000)"
]
}
}

## 3. Flujo para Recepción de Documentos

El proceso de envío de los documentos se describe a continuación:

Del diagrama anterior es importante mencionar:
 La generación del token de seguridad es una vez cada N minutos. Para el caso, en ambiente
de pruebas será de 48 hrs y para producción será de 24 hrs.
 Posteriormente, el emisor deberá enviar la solicitud de recepción al WS de Recepción y
desde el mismo se realizará la primera verificación de firma electrónica, si todo está
correcto, se continuará con el proceso.
 Una vez verificada la firma se procede con el envío del documento para su revisión de
estructura y datos.
 Si el documento cumple con todos los requisitos, la administración emite un sello de
recepción para el documento, que es la confirmación para el contribuyente emisor que el
documento ha sido recibido con éxito.

3.1 Holguras en la transmisión

Se recibirán documentos con un día posterior a la fecha de transmisión, exceptuando el último día
del período tributario, donde solo se permitirá 30 min. de diferencia hacia adelante en referencia a
la fecha y hora del servicio de recepción del Ministerio de Hacienda.

3.2 Proceso de Contingencia

La Administración Tributaria ha definido 3 pasos que conforman el proceso para envió de los DTE
emitidos en contingencia, los cuáles se detallan a continuación:

Es importante explicar cómo operará la contingencia:

1. Sí el emisor entra en contingencia por alguna razón, al reestablecer la conexión, deberá
   hacer lo siguiente:

```
a. Generar el evento de contingencia informando los DTE emitidos en el periodo de
la contingencia.
b. Enviar el lote con los DTE informados en el literal anterior.
```

```
3.2.1 Funcionamiento Operativo Evento de Contingencia
```

El envío de los DTE emitidos en contingencia e informados mediante el evento respectivo se realiza
mediante un servicio de lotes donde las respuestas NO son inmediatas, dependiendo de la carga
de la plataforma, un lote de 100 DTE (que es el máximo permitido) se procesa en un promedio de

2 a 3 minutos. Cuando el contribuyente envíe el lote, la plataforma de Documentos Tributarios
Electrónicos dará una respuesta de lote recibido y un código de lote asociado:

{
"versionApp" : 1,
"estado" : "RECIBIDO",
"fhProcesamiento" : "19/10/2021 08:39:47",
"descripcionMsg" : "LOTE RECIBIDO",
"ambiente" : "00",
"clasificaMsg" : "10",
"codigoLote" : "43308218-7CEE-4C66-9BC0-F7A6DAE61ABD",
"idEnvio" : "91512B3D-2534-4009-817B-2522B8154993",
"codigoMsg" : "001",
"version" : 1
}

Luego, con ese código de lote el contribuyente consulta el estado del lote (puede enviar cada N
minutos la consulta para verificar el estado), y cuando estén procesados los Documentos
Tributarios Electrónicos, regresará un JSON conteniendo el resultado del procesamiento del lote
con el detalle para cada DTE y su correspondiente Sello de recepción. En este Manual se especifica
la URL y forma de invocación del servicio de consulta de lote.

3.3 Política de Reintentos

Los contribuyentes emisores implementarán una política de reintentos en cada proceso de envío
de DTE, respetando las siguientes reglas:

1. Si al momento de enviar un DTE, el servicio de Documentos Tributarios Electrónicos no
   responde después de 8 segundos.
   a. Enviar consulta de estado sobre el documento transmitido, para verificar si no ha
   sido recibido.
   b. Si no ha sido recibido, enviar una nueva solicitud para recepción. Repetir hasta
   obtener la respuesta exitosa, un máximo de 2 veces.
2. Si al momento de enviar un DTE, el servicio del emisor falla y no procesa la respuesta del
   servicio de recepción.
   a. Enviar consulta de estado sobre el documento transmitido, para verificar si no ha
   sido recibido.
   b. Si no ha sido recibido, enviar una nueva solicitud para recepción. Repetir hasta
   obtener la respuesta exitosa, un máximo de 2 veces.

El umbral de espera está configurando inicialmente en 8 segundos, previo a las optimizaciones de
infraestructura.

Si después de aplicar la política de reintentos los documentos no pueden ser recibidos por el
Ministerio de Hacienda, y/o procesadas las respuestas por el sistema del emisor, se inicia
operaciones en modalidad de contingencia.

3.4 Servicio de Recepción por Lotes

```
i. Ambiente de pruebas
```

Para el procesamiento de la información de lotes en ambiente de pruebas, el máximo de DTE por
lote será de 100 documentos, en un máximo de hasta 300 lotes.

Los que serán procesados, cada lote de 100 DTE en un promedio de 2 a 3 minutos cada uno. El
horario de recepción de lotes será de 08:00 am a 05:00 pm.

```
ii. Ambiente productivo
```

Para el procesamiento de lotes de documentos en ambiente productivo, el máximo de DTE por
lote será de 100 documentos, en un máximo de 400 lotes.

Los que serán procesados, cada lote de 100 DTE en un promedio de 1 a 3 minutos cada uno. El
horario de recepción será de 10:00 pm a 05:00 am.

```
iii. Diferencia para emisión de DTE en Contingencia
```

El evento de contingencia hace uso del servicio de lotes y el servicio de consulta de lotes para la
transmisión y recepción de los DTE, los horarios para el envío de lotes de DTE por contingencia
están abiertos 24 horas del día 365 días del año.

La restricción de horarios para la transmisión de lotes de documentos está establecida para los
contribuyentes que posean facturación cíclica.

## 4. APIS - Sistema Transmisión de DTE

A continuación, se detallan los aspectos necesarios para integración y consumo de los servicios de
documentos tributarios electrónicos. Los servicios de documentos tributarios electrónicos son del
tipo REST.

4.1 Servicio de Autenticación

El servicio de autenticación es el componente que habilitará al contribuyente emisor a obtener, con
sus credenciales de acceso, un token de seguridad que le habilitará para el consumo del resto de
servicios dentro del módulo de recepción de la plataforma de documentos tributarios electrónicos.
Sin la generación de dicho token, es imposible consumir los servicios de recepción.

URL
URL TEST https://apitest.dtes.mh.gob.sv/seguridad/auth
URL PROD https://api.dtes.mh.gob.sv/seguridad/auth
Método POST

Parámetros
Parámetro Descripción Tipo Tipo Dato Comentarios
content-
Type

```
Tipo de
```

## Contenido

```
Headers String application/x-www-form-urlencoded
```

```
User-Agent
```

```
Agente de
usuario desde
donde se origina
la petición
```

```
Headers String
```

```
user Usuario Body String facturador
pwd Contraseña Body String Password del usuario asignado
```

Respuesta:
Campo Descripción Tipo Dato
status estado de la petición String
body.user usuario que solicita acceso String

```
body.token token/clave de acceso para consumo de servicio de
recepción
```

```
String
```

```
body.rol.nombre nombre del rol asignado String
body.rol.codigo código del rol asignado String
body.rol.descripcion descripción del rol asignado String
body.rol.rolSuperior Rol padre del rol asignado al usuario Object
body.rol.nivel nivel de rol asignado String
body.rol.activo Estado del rol devuelto para el usuario Boolean
body.rol.permisos permisos asignados al rol Array
tokenType Tipo de token utilizado String
roles listado de roles asignado al usuario Array
```

Ejemplos respuesta

Éxito
Código: HTTP/1.1 200 OK
{
"status": "OK",
"body": {
"user": "10101010101010",
"token": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDEwMTAxMDEwMTAxMCIsImF1dG
hvcml0aWVzIjoiVXN1YXJpbyIsImlhdCI6MTYxMDQ2NTM1NSwiZXhwIjoxNjEwNTUxNzU1fQ.AV
U-5e7Jw0NjEZPJ5pbpgchP8YB3u5SakAoyidbXyjShiFKurXzMgw6pon6-
lQRbhcWQZ4Srs6hy0p0mLsNpg",
"rol": {
"nombre": "Usuario",
"codigo": "ROLE_USER",
"descripcion": null,
"rolSuperior": null,
"nivel": null,
"activo": null,
"permisos": null
},
"roles": [
"ROLE_USER"
],
"tokenType": "Bearer"
}
}

Error
{
"status": "ERROR",
"error": "Unauthorized",
"message": "Usuario no valido"
}

El servicio de autorización se deberá ejecutar una vez en el día o según sea el modelo de facturación
del contribuyente.

El token es necesario en el uso de cada servicio pues es la llave que permite la ejecución de
los servicios de documentos tributarios electrónicos.

Código de Respuesta
Código de
respuesta
Respuesta

(^200) Status: ok
Body: Se recupera el JSON Web Token
(^200) Status: Error
Body: Se presenta un mensaje describiendo el posible fallo.
(^100) ERROR USUARIO INCORRECTO
(^101) ERROR CONTACTAR CON SOPORTE TÉCNICO
(^102) ERROR NO SE PUDO AUTENTICAR EL USUARIO
(^103) CONTRASEÑA EXPIRADA, POR FAVOR ACTUALIZAR
(^104) ERROR EN ACTUALIZACIÓN DE CONTRASEÑA
105

### LA NUEVA CONTRASEÑA Y LA CONFIRMACIÓN DEBE SER LA

### MISMA

(^106) CREDENCIALES INVÁLIDAS
(^107) ERROR TOKEN INVÁLIDO
(^108) ERROR TOKEN ES REQUERIDO
(^109) ERROR EN GENERACION DE TOKEN
(^110) ERROR EN TIPO REQUERIDO
(^111) ERROR EN PARÁMETRO SOLICITADO
4.2 Servicio de Recepción
La recepción de documentos puede ser procesada uno a uno o en lote:
4.2.1 Modelo Uno a uno

### URL

```
URL TEST https://apitest.dtes.mh.gob.sv/fesv/recepciondte
URL PROD https://api.dtes.mh.gob.sv/fesv/recepciondte
Método POST
```

Parámetros
Parámetro Descripción Tipo Tipo Dato Comentarios
Authorization
Token de
autorización
Headers String
Token obtenido por el
servicio de autenticación.

```
User-Agent Agente de usuario. Headers String
Agente de usuario desde
donde se origina la petición.
content-Type Tipo de Contenido Headers String
application/JSON
```

```
ambiente
Código de
ambiente.
Body String
Ambiente: “00” Prueba; “01”
Producción.
```

```
idEnvio
```

```
Identificador de
envío de la
transmisión.
```

```
Body Integer
Campo correlativo a
discreción.
```

```
version
Versión del JSON
del DTE.
Body Integer
```

```
Debe coincidir con la versión
del de la sección de
Identificación del DTE.
```

```
tipoDte Tipo de DTE. Body String
```

```
Debe coincidir con el tipo de
DTE de la sección de
Identificación del DTE.
```

```
documento DTE. Body String
```

```
Documento Tributario
Electrónico firmado a
transmitir.
codigoGenera
cion
```

```
Código de
Generación
Body String
Código de Generación del
documento a transmitir.
```

Respuesta
Campo Descripción Tipo Dato
version Versión de Respuesta Integer
ambiente Ambiente de Ejecución String
versionApp Versión de aplicación Integer
estado Estado resultando del procesamiento String
codigoGeneracion Código de generación de DTE String
selloRecibido Sello de Recepción del DTE Aceptado String
fhProcesamiento Fecha-Hora de procesamiento (dd/MM/yyyy HH:mm:ss String
clasificaMsg Código de clasificación de mensaje
codigoMsg Código de Mensaje String
descripcionMsg Descripción del Mensaje String
Observaciones Detalle de observaciones de validación del DTE Array [String]

..........
..........
..........
..........

Ejemplos de Respuesta

Éxito
Código: HTTP/1.1 200 OK – Sin Observaciones

{
"version": 2,
"ambiente" : "00",
"versionApp" : 2,
"estado" : "PROCESADO",
"codigoGeneracion" : "FF84E5DB-79C5-42CE-B415-EC510C53EFB5",
"selloRecibido" : "20219E9D4DC0292F4681AD759B0B0F5CA99DC23G",
"fhProcesamiento" : "12/04/2021 13:29:04",
"clasificaMsg" : "10",
"codigoMsg": "001",
"descripcionMsg": "RECIBIDO",
"observaciones": ["",""]
}

NOTA: El servicio de recepción tendrá como parte de su respuesta el campo observaciones, donde
para algunos campos, detallará los inconvenientes con los datos enviados, lo que no afecta
directamente a la recepción del DTE.
Código: HTTP/1.1 200 OK – Con Observaciones

### {

"version" : 2,
"ambiente" : "00",
"versionApp" : 2,
"estado" : "PROCESADO",
"codigoGeneracion" : "FF84E5DB-79C5-42CE-B415-EC510C53EFB5",
"selloRecibido" : "20219E9D4DC0292F4681AD759B0B0F5CA99DC23G",
"fhProcesamiento" : "12/04/2021 13:29:04",
"clasificaMsg" : "10",
"codigoMsg" : "002",
"descripcionMsg" : "RECIBIDO CON OBSERVACIONES",
"observaciones" : [
"[resumen.totalVentaGra] CALCULO INCORRECTO" ]
}

Error
Código: HTTP/1.1 400 Bad Request

{
"version": 2,
"ambiente": "00",
"versionApp": 2,
"estado": "RECHAZADO",
"codigoGeneracion": "CF89B21E-4268-4711-832D-8A54866B1763",
"selloRecibido": null,
"fhProcesamiento": null,
"clasificaMsg" : null,
"codigoMsg": "ERROR_CODIGO",
"descripcionMsg": "ERROR_DESCRIPCION",
"observaciones": null
}

4.2.2 Modelo en Lote

### URL

```
URL TEST https://apitest.dtes.mh.gob.sv/fesv/recepcionlote/
URL PROD https://api.dtes.mh.gob.sv/fesv/recepcionlote/
Método POST
```

Parámetros:
Parámetro Descripción Tipo Tipo Dato Comentarios

```
Authorization
Token de
autorización
```

```
Header
s
String
Token obtenido por el servicio de
autenticación.
User-Agent
Agente de
usuario.
```

```
Header
s
String
Agente de usuario desde donde se
origina la petición.
```

```
content-type
Tipo de
contenido
```

```
Header
s
String application/JSON
```

```
ambiente
Código de
ambiente.
Body String
Ambiente: “00” Prueba; “01”
Producción.
idEnvio
Identificador de
control de envió
Body String
Debe cumplir con estándar UUID v4,
todo en MAYUSCULA.
```

```
version
```

```
Versión del
JSON Schema
de Lotes.
```

```
Body Integer
```

```
nitEmisor NIT del emisor. Body String NIT del emisor, sin guiones
```

```
documentos Lista de DTE Body
Array[Strin
g]
```

```
Lista de Documentos Tributarios
Electrónicos Firmados a procesar
```

Respuesta:
Campo Descripción Tipo Dato
version Versión de Respuesta Integer
ambiente Ambiente de Ejecución String
versionApp Versión de aplicación Integer
estado Estado de la respuesta String
idEnvio ID específico del envió de solicitud String
fhProcesamiento Fecha/Hora de procesamiento dd/MM/yyyy HH:mm:ss String
codigoLote Código de generación del lote String
codigoMsg Código de Mensaje String
descripcionMsg Descripción del Mensaje String

Éxito
Código: HTTP/1.1 200 OK
JSON devuelto ej.:
{
"version": 2,
"ambiente": "00",
"versionApp": 2,
"idEnvio": "CF89B21E-4268-4711-832D-8A54866B1763",
"fhProcesamiento": "11/08/2020 09:50.52",
"codigoLote": "CF89B21E-4268-4711-832D-8A54866B1763",
"codigoMsg": "001",
"descripcionMsg": "LOTE RECIBIDO, VALIDADO Y PROCESADO"
}

Códigos de Respuesta Servicio de Recepción

4.3 Servicio de Consulta

4.3.1 Consulta de DTE

### URL

```
URL TEST https://apitest.dtes.mh.gob.sv/fesv/recepcion/consultadte/
URL PROD https://api.dtes.mh.gob.sv/fesv/recepcion/consultadte/
Método POST
```

Parámetros

```
Parámetro
Descripció
n
Tipo
Tipo
Dato
Comentarios
```

```
Authorization
```

```
Token de
autorizació
n
```

```
Headers String
Token obtenido por el servicio de
autenticación.
```

```
User-Agent
Agente de
usuario.
Headers String
Agente de usuario desde donde se
origina la petición.
content-type
Tipo de
contenido
Headers String application/JSON
```

```
nitEmisor
NIT del
emisor.
Body String NIT del emisor, sin guiones
```

```
tdte
Tipo de
DTE.
Body String Tipo de DTE a buscar
```

```
codigoGeneracion
Código de
Generación
Body String
Código de Generación de
documento a buscar
```

Respuesta
Campo Descripción Tipo Dato
version Versión de Respuesta Integer
ambiente Ambiente de Ejecución String
versionApp Versión de aplicación Integer
estado Estado resultando del procesamiento String
codigoGeneracion Código de generación de DTE String
selloRecibido Sello de Recepción del DTE Aceptado String
fhProcesamiento
Fecha-Hora de procesamiento (dd/MM/yyyy
HH:mm:ss
String

```
clasificaMsg Código de clasificación de mensaje
codigoMsg Código de Mensaje String
descripcionMsg Descripción del Mensaje String
observaciones
Detalle de observaciones en campos que no
afectan el proceso de recepción del DTE
Array [String]
```

Ejemplos respuesta
Éxito
Código: HTTP/1.1 200 OK
{
"version": 2,
"ambiente" : "00",
"versionApp" : 2,
"estado" : "PROCESADO",
"codigoGeneracion" : "FF84E5DB-79C5-42CE-B415-EC510C53EFB5",
"selloRecibido" : "20219E9D4DC0292F4681AD759B0B0F5CA99DC23G",
"fhProcesamiento" : "12/04/2021 13:29:04",
"clasificaMsg" : "10",
"codigoMsg": "001",
"descripcionMsg": "RECIBIDO",
"observaciones": ["",""]
}

Error
Código: HTTP/1.1 400 Bad Request

{
"version": 2,
"ambiente": "00",
"versionApp": 2,
"estado": "RECHAZADO",
"codigoGeneracion": "CF89B21E-4268-4711-832D-8A54866B1763",
"selloRecibido": null,
"fhProcesamiento": "12/04/2021 13:29:04",
"clasificaMsg" : null,
"codigoMsg": "ERROR_CODIGO",
"descripcionMsg": "ERROR_DESCRIPCION",
"observaciones": null
}

4.3.2 Consulta de Lote DTE

URL
URL TEST https://apitest.dtes.mh.gob.sv/fesv/recepcion/consultadtelote/{codigoLote}
URL PROD https://api.dtes.mh.gob.sv/fesv/recepcion/consultadtelote/{codigoLote}
Método GET

Parámetros
Parámetro Descripción Tipo Tipo
Dato

```
Comentarios
```

```
Authorizatio
n
```

```
Token de
autorización
Headers String
Token obtenido por el servicio de
autenticación.
```

```
User-Agent Agente de usuario. Headers String
Agente de usuario desde donde se
origina la petición.
content-type Tipo de contenido Headers String application/JSON
codigoLote Código de Lote Path String Código de lote asignado durante el
proceso de transmisión
```

Respuesta:
Campo Descripción Tipo Dato
procesados Resultado de DTE procesados exitosamente. JSON Array
rechazados Resultado de DTE rechazados JSON Array

Éxito

{
"procesados": [
{
"version": 2,
"ambiente": "00",
"versionApp": 2,
"estado": "PROCESADO",
"codigoGeneracion": "C3AF84A7-8BB8-4867-ABE4-F40BB3AE3052",
"selloRecibido": "2021606AB37149A642B3921AD9D9A4A4F934QDHB",
"fhProcesamiento": "14/10/2021 10:36:15",
"clasificaMsg": "10",
"codigoMsg": "001",
"descripcionMsg": "RECIBIDO Y PROCESADO",
"observaciones": []
},
{
"version": 2,
"ambiente": "00",
"versionApp": 2,
"estado": "PROCESADO",
"codigoGeneracion": "53DC5B96-FBF9-4F86-BB15-0B6808188758",
"selloRecibido": "20211F7FE700F5E74FDCB3AEB12C769A2AFFAA8A",
"fhProcesamiento": "14/10/2021 10:36:15",
"clasificaMsg": "10",
"codigoMsg": "001",
"descripcionMsg": "RECIBIDO Y PROCESADO",
"observaciones": []
},
{
"version": 2,
"ambiente": "00",
"versionApp": 2,
"estado": "PROCESADO",
"codigoGeneracion": "3EB5A0FC-4562-4C1D-A61B-B1FC17F30678",
"selloRecibido": "2021092253A849CB43678D5806D92FABAD97F68F",
"fhProcesamiento": "14/10/2021 10:36:16",
"clasificaMsg": "10",
"codigoMsg": "001",
"descripcionMsg": "RECIBIDO Y PROCESADO",
"observaciones": []
}
],
"rechazados": [
{
"version": 2,
"ambiente": "00",
"versionApp": 2,
"estado": "RECHAZADO",
"codigoGeneracion": "3EB5A0FC-4562-4C1D-A61B-B1FC17F30A30",

"selloRecibido": null,
"fhProcesamiento": "14/10/2021 10:36:16",
"clasificaMsg": "20",
"codigoMsg": "802",
"descripcionMsg": "No valido",
"observaciones": []
},
{
"version": 2,
"ambiente": "00",
"versionApp": 2,
"estado": "RECHAZADO",
"codigoGeneracion": "3EB5A0FC-4562-4C1D-A61B-B1FC17F30D25",
"selloRecibido": null,
"fhProcesamiento": "14/10/2021 10:36:16",
"clasificaMsg": "20",
"codigoMsg": "802",
"descripcionMsg": "No valido",
"observaciones": []
}
]
}

4.4 Servicio de envío para Evento Contingencia

El servicio de contingencia es el componente que habilitará al contribuyente emisor poder
transmitir DTE que hayan sido generados durante un evento de fuerza mayor que imposibilite la
transmisión de dichos documentos para su verificación; después de haber transmitido el Evento de
Contingencia deberá hacer uso de los servicios uno a uno o por lote para transmitir los documentos
generados en contingencia.

URL
URL TEST https://apitest.dtes.mh.gob.sv/fesv/contingencia
URL PROD https://api.dtes.mh.gob.sv/fesv/contingencia
Método POST

Parámetros:
Parámetro Descripción Tipo Tipo Dato Comentarios
Authorization Token de autorización Headers String
Token obtenido por el
servicio de autenticación.

```
User-Agent Agente de usuario. Headers String
```

```
Agente de usuario desde
donde se origina la
petición.
content-Type Tipo de Contenido Headers String Application/JSON
```

```
nit NIT del emisor. Body String
NIT del emisor, sin
guiones
```

```
documento Evento. Body String
```

```
JSON de Evento de
Contingencia firmado a
transmitir.
```

Respuesta:
Campo Descripción Tipo Dato
estado
Campo descriptivo, que indica si recibió o se rechazó
solicitud
String

```
fechaHora Fecha y hora en que se efectuó el proceso String
mensaje Mensaje con detalle del resultado de la operación String
```

```
selloRecibido
En caso es recibido, se indica un código alfanumérico
indicando su respectivo número de registro
String
```

```
observaciones
Si existieran observaciones se presenta un objeto con un
arreglo del detalle de estas.
Array[String]
```

Ejemplos respuesta

Éxito
Código: HTTP/1.1 200 OK
{
"estado": "RECIBIDO",
"fechaHora": "23/03/2021 10:09:18",
"mensaje": "Documento recibido",
"selloRecibido": "202197AF602319654B9C95A5ECA40DAE13AEFB5N",
"observaciones": []
}

Error
{
"estado": "RECHAZADO",
"fechaHora": "23/03/2021 09:59:12",
"mensaje": "Validaciones no superadas",
"selloRecibido": null,
"observaciones": [
"OBSERVACION 1",
"OBSERVACION N"
]
}

4.5 Servicio de envío para Evento de Invalidación

El servicio de invalidación es el componente que habilitará al contribuyente emisor para trasmitir la
inactivación de un DTE recibido previamente.

URL
URL TEST https://apitest.dtes.mh.gob.sv/fesv/anulardte
URL PROD https://api.dtes.mh.gob.sv/fesv/anulardte
Método POST

Parámetros:
Parámetro Descripción Tipo Tipo Dato Comentarios
Authorization Token de autorización Headers String
Token obtenido por el
servicio de autenticación.

```
User-Agent Agente de usuario. Headers String
```

```
Agente de usuario desde
donde se origina la
petición.
content-Type
Tipo de Contenido Headers String
application/JSON
```

```
ambiente Código de ambiente. Body String
Ambiente: “00” Prueba;
“01” Producción.
idEnvio
Identificador de envío
de la transmisión.
Body Integer
Campo correlativo a
discreción.
```

```
version Versión del JSON. Body Integer
Versión del JSON de
Invalidación.
```

```
documento Evento. Body String
```

```
JSON Evento de
Invalidación firmado a
transmitir.
```

Respuesta:
Campo Descripción Tipo Dato
version Versión de Respuesta Integer
ambiente Ambiente de Ejecución String
versionApp Versión de aplicación Integer
selloRecibido Sello de Recepción del DTE String

```
fhProcesamiento
Fecha/Hora de procesamiento (dd/MM/yyyy
HH:mm:ss
String
codigoGeneracion Código de generación de DTE String
codigoMsg Código de Mensaje String
descripcionMsg Descripción del Mensaje String
```

Ejemplos respuesta

Éxito
Código: HTTP/1.1 200 OK

```
{
"version": 2,
"ambiente": "00",
"versionApp": 1,
"estado": “PROCESADO”,
"codigoGeneracion": " CF89B21E-4268-4711-832D-8A54866B1763",
"selloRecibido": "20206DFFF66F78D247F7A66D155E68FC7318UADD",
"fhProcesamiento": "11/08/2020 09:50.52",
"codigoMsg": "001",
"descripcionMsg": "Invalidación Recibida y Procesada",
"observaciones": null
]
}
```

Error

{
"version": 2,
"ambiente": "00",
"versionApp": 1,
"estado": "RECHAZADO",
"codigoGeneracion": "CF89B21E-4268-4711-832D-8A54866B1763",
"selloRecibido": null,
"fhProcesamiento": null,
"codigoMsg": "ERROR_CODIGO",
"descripcionMsg": "ERROR_DESCRIPCION",
"observaciones": [
"Observación 1",
"Observación N"
]
}

## 5. Código QR

En las versiones electrónicas interpretadas y legibles del DTE, se requiere que se integre un
parámetro de consulta dentro de un Código QR. Los parámetros para cada ambiente son los
siguientes:

URL
https://admin.factura.gob.sv/consultaPublica?ambiente={ambiente}&codGen={cod_generacion}
&fechaEmi={fechaEmi}

```
Parámetro Descripción Comentario
ambiente Código de ambiente Ambiente: “00” Prueba; “01” Producción.
codGen Código de Generación Código de generación del DTE a consultar
fechaEmi Fecha de Generación Fecha de generación del DTE
```

Ejemplo:

https://admin.factura.gob.sv/consultaPublica?ambiente= 00 &codGen=00000000-0000-0000-
0000-000000000000&fechaEmi=2022-05-01

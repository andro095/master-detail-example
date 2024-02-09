# Requisitos

- Servidor MySql
- Java 21
- Node 20
- Yarn o npm

# Instrucciones

Para correr el proyecto luego de clonar el repositorio seguir los siguientes pasos.

## Creación de la base de datos

1. Cargar el script DatabaseInit.sql en su base de datos mysql.
2. Correr el script para crear la base de datos, tablas y usuario con el que se conectará

## Configuracion del backend

3. Cargar el proyecto backend en su editor de preferencia.
4. En application.properties:
   1. Configurar el puerto donde desea correr el backend en server.port o dejar el que esta por defecto
   2. Si tiene corriendo su servidor mysql en otro puerto en la property spring.datasource.url cambiar el puerto al lado del localhost.
   3. Guardar los cambios.
5. Instalar dependencias y compilar con ayuda del editor o con el siguiente commando:

```bash
mvn compile
```

6. Correr el proyecto con ayuda de su editor o con el siguiente comando:

```bash
mvn exec:java -Dexec.mainClass=com.example.facturacion
```

## Configuracion del frontend

7. Cargar el proyecto frontend en su editor de preferencia.
8. Instalar dependencias con:

```bash
yarn
```

o

```bash
npm install
```

9. Si cambio el puerto del servidor de backend en el archivo .env cambiar el puerto apuntando al puerto donde se corre el backend.

10. Correr el frontend con:

```bash
yarn dev
```

o

```bash
npm run dev
```

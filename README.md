# Animals

Una aplicación para conocer animales.

## Descripción

Este proyecto es una aplicación web que permite a los usuarios autenticarse y realizar operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre una lista de animales. Cada animal tiene un nombre, una especie y una foto asociada.

## Funcionalidades

- **Autenticación de Usuario:** Los usuarios pueden registrarse e iniciar sesión en la aplicación.
- **Operaciones CRUD de Animales:** Los usuarios pueden crear, leer, actualizar y eliminar animales de la base de datos.
- **Gestión de Especies:** Cada animal está asociado a una especie, y los usuarios pueden gestionar la lista de especies disponibles.

## Librerías Utilizadas

- **@clerk/nextjs:** Para la autenticación de usuarios.
- **@shadcn** Componentes de interfaz de usuario.
- **@uploadthing/react, uploadthing:** Para la gestión de cargas de archivos.
- **mongodb, mongoose:** Para interactuar con la base de datos MongoDB.
- **next, react, react-dom:** Para la construcción de la interfaz de usuario.
- **tailwind-merge, tailwindcss-animate:** Utilidades para estilos con Tailwind CSS.

## Requisitos de Instalación

Asegúrate de tener Node.js y npm instalados en tu máquina.

```bash
# Clona el repositorio
git clone https://github.com/josecentenodev/animals.git

# Entra al directorio del proyecto
cd tu-proyecto

# Instala las dependencias
npm install

```

## Configuración

Antes de ejecutar la aplicación, necesitarás configurar algunas variables de entorno. Crea un archivo .env en la raíz del proyecto y completa las siguientes variables:

```bash

# Variables de entorno

CLERK_SECRET_KEY=your-clerk-secret-key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
MONGODB_URI=your-mongodb-uri
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
WEBHOOK_SECRET=your-clerk-webhook-secret
UPLOADTHING_SECRET=your-uploadthing-secret
UPLOADTHING_APP_ID=your-uploadthing-app-id
```

## Clerk

Habilitar webhooks y deployar la app, luego configurar correctamente en clerk la url de deploy

## Uploadthing

Crear aplicacion y obtener las credenciales, tambien seguir la documentacion para el middleware.

## Uso

```bash 
# Inicia la aplicación en modo desarrollo
npm run dev

```

Abre http://localhost:3000 en tu navegador para ver la aplicación.

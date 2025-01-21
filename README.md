# Hotel Miranda Dashboard (Migración a Next.js)

## Descripción

Este proyecto es una versión mejorada y migrada del dashboard original, desarrollado previamente con React y MongoDB. La nueva implementación utiliza **Next.js**, **React**, **TypeScript**, **Sass**, **PostgreSQL** y **Docker**, aprovechando las características más avanzadas para una aplicación más robusta, eficiente y moderna.

![Vista del Dashboard](./public/images/login.webp)
![Vista del Dashboard](./public/images/dashboard.webp)

## Tecnologías Utilizadas

- **Next.js**: Framework de React para aplicaciones web con renderizado híbrido (SSR y SSG).
- **React**: Biblioteca para construir interfaces de usuario.
- **TypeScript**: Superconjunto tipado de JavaScript para mayor seguridad y mantenibilidad.
- **Sass**: Preprocesador CSS para estilos más flexibles y mantenibles.
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
- **Docker**: Para tener almacenado la base de datos en local.

## Mejoras y Ventajas de la Migración a Next.js

### 1. **Server Actions**

Utilizamos las Server Actions de Next.js para manejar lógica del lado del servidor de manera eficiente, lo que reduce la necesidad de manejar peticiones REST o GraphQL para algunas operaciones comunes. Esto mejora el rendimiento y simplifica el código.

### 2. **Server Components**

Con los Server Components de Next.js, pudimos dividir la aplicación en componentes que se renderizan del lado del servidor, lo que permite:

- Reducción del tamaño del bundle de JavaScript enviado al cliente.

- Mejor tiempo de carga inicial.
- Mejor experiencia del usuario al optimizar la entrega de contenido.

### 3. **Rendimiento y SEO Mejorado**

Gracias al renderizado del lado del servidor (SSR) y la generación estática (SSG), la aplicación es más rápida y amigable para motores de búsqueda.

### 4. **Full Responsive con Diseño Neobrutalista**

El dashboard cuenta con un diseño neobrutalista, ofreciendo:

- Una experiencia visual única con énfasis en formas simples y colores llamativos.

- Adaptabilidad total para dispositivos móviles, tablets y escritorios.

<!-- ## Despliegue

- Versión actual migrada: [Enlace al despliegue actual](https://deploy-actual.example.com)
- Versión anterior: [Enlace al proyecto original](https://deploy-anterior.example.com) -->

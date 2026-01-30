# 🔗 Shortlink Monorepo

Monorepo completo para la aplicación Shortlink - un acortador de URLs moderno y escalable construido con tecnologías serverless en AWS.

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/badge/pnpm-workspace-orange)](https://pnpm.io/)

## 📋 Tabla de Contenidos

- [Descripción](#-descripción)
- [Estructura del Monorepo](#-estructura-del-monorepo)
- [Tecnologías](#-tecnologías)
- [Prerequisitos](#-prerequisitos)
- [Instalación](#-instalación)
- [Desarrollo](#-desarrollo)
- [Deployment](#-deployment)
- [Scripts Disponibles](#-scripts-disponibles)
- [Paquetes](#-paquetes)

## 📖 Descripción

Shortlink es una aplicación completa de acortamiento de URLs que consta de:

- **API Serverless**: Backend construido con AWS Lambda, API Gateway y DynamoDB
- **Dashboard Web**: Interfaz administrativa construida con React, Vite y TailwindCSS
- **Core Package**: Paquete compartido con tipos, utilidades y lógica común

El proyecto está organizado como un **monorepo** usando **pnpm workspaces**, permitiendo compartir código y dependencias de manera eficiente entre los diferentes paquetes.

## 📁 Estructura del Monorepo

```
shortlink-monorepo/
├── apps/
│   ├── api/              # API Serverless (AWS Lambda + DynamoDB)
│   │   ├── src/
│   │   │   ├── controllers/    # Controladores de la API
│   │   │   ├── domains/        # Entidades de dominio
│   │   │   ├── services/       # Lógica de negocio
│   │   │   ├── repositories/   # Acceso a datos
│   │   │   ├── middlewares/    # Middlewares HTTP
│   │   │   ├── handler/        # Lambda handlers
│   │   │   └── lib/            # Utilidades
│   │   ├── tests/              # Tests unitarios
│   │   └── serverless.yml      # Configuración Serverless Framework
│   │
│   └── web/              # Dashboard Web (React + Vite)
│       ├── src/
│       │   ├── components/     # Componentes React
│       │   ├── hooks/          # Custom hooks
│       │   ├── lib/            # Configuración y utilidades
│       │   └── utils/          # Funciones auxiliares
│       └── vite.config.ts      # Configuración Vite
│
├── packages/
│   └── core/             # Paquete compartido
│       └── src/
│           ├── types/          # Tipos TypeScript compartidos
│           └── Result.ts       # Result Pattern implementation
│
└── .github/
    └── workflows/        # GitHub Actions para CI/CD
```

## 🛠️ Tecnologías

### API (Backend)
- **Runtime**: Node.js 20.x
- **Framework**: Serverless Framework
- **Cloud**: AWS Lambda, DynamoDB, API Gateway
- **Lenguaje**: TypeScript 5.x
- **Validación**: Zod
- **Testing**: Jest
- **Middlewares**: Middy

### Web (Frontend)
- **Framework**: React 19
- **Build Tool**: Vite 7
- **Styling**: TailwindCSS 4
- **State Management**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Routing**: React Router DOM 7

### Core (Compartido)
- **TypeScript**: Tipos compartidos y Result Pattern
- **Pattern**: Result Pattern para manejo de errores funcional

### DevOps
- **Package Manager**: pnpm (workspaces)
- **CI/CD**: GitHub Actions
- **Deployment**: Serverless Framework para API

## ✅ Prerequisitos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) >= 20.x
- [pnpm](https://pnpm.io/) >= 8.x
- [AWS CLI](https://aws.amazon.com/cli/) (para deployment de API)
- Cuenta de AWS con credenciales configuradas

## 📦 Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/fmarinoa/shortlink-monorepo.git
cd shortlink-monorepo
```

2. **Instalar dependencias**

```bash
pnpm install
```

Esto instalará todas las dependencias de todos los paquetes del monorepo.

3. **Configurar variables de entorno**

Para el dashboard web, crea un archivo `.env` en `apps/web/`:

```bash
cd apps/web
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones.

## 🚀 Desarrollo

### Desarrollar el Dashboard Web

```bash
# Desde la raíz del proyecto
pnpm dev:web
```

Esto iniciará el servidor de desarrollo de Vite. La aplicación estará disponible en `http://localhost:5173`.

### Desarrollar la API

```bash
cd apps/api

# Ejecutar tests en modo watch
pnpm test:watch

# Ejecutar tests con cobertura
pnpm test:coverage
```

### Desarrollar en múltiples paquetes

Puedes trabajar en varios paquetes simultáneamente. Cada paquete tiene sus propios scripts de desarrollo.

## 📤 Deployment

### API (Serverless)

**Deployment a Development:**

```bash
pnpm deploy:api:dev
```

**Deployment a Production:**

```bash
pnpm deploy:api:prod
```

La API se desplegará en AWS Lambda con los siguientes recursos:
- Lambda Functions
- API Gateway
- DynamoDB Tables
- Custom Domain (solo en producción)

### Web Dashboard

**Build para producción:**

```bash
pnpm build:web
```

Los archivos generados estarán en `apps/web/dist/` listos para ser desplegados en cualquier servidor estático o CDN.

## 📜 Scripts Disponibles

Desde la raíz del proyecto:

| Script | Descripción |
|--------|-------------|
| `pnpm dev:web` | Inicia el servidor de desarrollo del dashboard web |
| `pnpm build:web` | Construye el dashboard web para producción |
| `pnpm build:core` | Compila el paquete core |
| `pnpm deploy:api:dev` | Despliega la API en el entorno de desarrollo |
| `pnpm deploy:api:prod` | Despliega la API en el entorno de producción |
| `pnpm lint` | Ejecuta el linter en todos los paquetes |
| `pnpm prettier` | Formatea el código en todos los paquetes |

## 📦 Paquetes

### 🔌 [@shortlink/core](./packages/core)

Paquete compartido que contiene:
- **Types**: Tipos TypeScript compartidos entre API y Web
- **Result Pattern**: Implementación del patrón Result para manejo de errores funcional
- **Link Domain**: Definición de la entidad Link

### 🚀 [API](./apps/api)

API serverless con arquitectura limpia que incluye:
- ⚡ AWS Lambda functions
- 📊 DynamoDB para persistencia
- 🔐 API Keys para autenticación
- ✅ Validación con Zod
- 🎯 Result Pattern
- 🏗️ Clean Architecture
- 🧪 Tests unitarios con Jest

**Endpoints principales:**
- `POST /links` - Crear nuevo link (requiere API Key)
- `GET /{slug}` - Redirigir a URL original
- `GET /links` - Obtener todos los links (requiere API Key)
- `PUT /links/{slug}` - Actualizar link (requiere API Key)
- `DELETE /links/{slug}` - Eliminar link (requiere API Key)

Ver el [README de la API](./apps/api/README.md) para más detalles.

### 🖥️ [Web Dashboard](./apps/web)

Dashboard administrativo construido con React que permite:
- 📝 Crear y editar enlaces cortos
- 🗑️ Eliminar enlaces
- 🔍 Buscar y filtrar enlaces
- 📊 Visualizar estadísticas de enlaces
- 🔐 Autenticación con API Key
- 🎨 Interfaz moderna con TailwindCSS

## 🏗️ Arquitectura

### Clean Architecture (API)

La API sigue los principios de Clean Architecture:

```
┌─────────────────────────────────────────┐
│         Presentation Layer              │
│  (API Gateway + Lambda Handlers)        │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│         Application Layer               │
│            (Controllers)                │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│          Domain Layer                   │
│    (Entities + Business Rules)          │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│       Infrastructure Layer              │
│  (Repositories + External Services)     │
└─────────────────────────────────────────┘
```

### Monorepo Workspaces

Usando pnpm workspaces para:
- ✅ Compartir dependencias entre paquetes
- ✅ Versionado unificado
- ✅ Builds incrementales
- ✅ Reutilización de código con `@shortlink/core`

## 🧪 Testing

```bash
# Ejecutar todos los tests de la API
cd apps/api
pnpm test

# Tests con cobertura
pnpm test:coverage

# Tests en modo watch
pnpm test:watch
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 👨‍💻 Autor

**Franco Mariño**
- Portfolio: [portfolio.francomarino.dev](https://portfolio.francomarino.dev)
- GitHub: [@fmarinoa](https://github.com/fmarinoa)

## 📄 Licencia

Este proyecto está bajo la Licencia ISC. Ver el archivo [LICENSE](./LICENSE) para más detalles.

## 🔗 Enlaces

- [Repositorio GitHub](https://github.com/fmarinoa/shortlink-monorepo)
- [Issues](https://github.com/fmarinoa/shortlink-monorepo/issues)
- [Documentación API](./apps/api/README.md)

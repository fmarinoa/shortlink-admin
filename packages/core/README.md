# @shortlink/core

Paquete compartido del monorepo Shortlink que proporciona tipos TypeScript comunes y utilidades para el manejo de errores mediante el Result Pattern.

## 📦 Contenido

Este paquete exporta:

- **Result Pattern**: Clase para manejo de errores funcional
- **Types**: Interfaces TypeScript compartidas entre frontend y backend

## 🎯 Result Pattern

### ¿Qué es?

El Result Pattern es una alternativa funcional al manejo de errores con try/catch. Hace que los errores sean explícitos y obligatorios de manejar.

### Uso básico

```typescript
import { Result } from '@shortlink/core';

// Función que retorna Result
function dividir(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return Result.fail('División por cero');
  }
  return Result.ok(a / b);
}

// Uso
const resultado = dividir(10, 2);

if (resultado.isSuccess) {
  console.log(resultado.getValue()); // 5
} else {
  console.log(resultado.getErrorValue()); // Error
}
```

### API

#### `Result.ok<T, E>(value?: T): Result<T, E>`

Crea un resultado exitoso.

```typescript
const success = Result.ok(42);
const voidSuccess = Result.ok(); // Para void results
```

#### `Result.fail<T, E>(error: E): Result<T, E>`

Crea un resultado fallido.

```typescript
const failure = Result.fail(new Error('Algo salió mal'));
const customError = Result.fail({ code: 404, message: 'Not found' });
```

#### `result.isSuccess: boolean`

Indica si el resultado fue exitoso.

```typescript
if (result.isSuccess) {
  // Manejar éxito
} else {
  // Manejar error
}
```

#### `result.getValue(): T`

Obtiene el valor del resultado exitoso. **Lanza error si el resultado falló**.

```typescript
const value = result.getValue(); // Lanza si isSuccess === false
```

#### `result.getErrorValue(): E`

Obtiene el error del resultado fallido. **Lanza error si el resultado fue exitoso**.

```typescript
const error = result.getErrorValue(); // Lanza si isSuccess === true
```

### Ejemplos avanzados

#### En repositorios

```typescript
async getBySlug(slug: string): Promise<Result<Link, Error>> {
  try {
    const item = await db.get(slug);
    if (!item) {
      return Result.fail(new LinkNotFoundError(slug));
    }
    return Result.ok(new Link(item));
  } catch (error) {
    return Result.fail(new Error('Database error'));
  }
}
```

#### En servicios

```typescript
async createLink(link: Link): Promise<Result<{ shortUrl: string }, Error>> {
  const result = await this.repository.create(link);
  
  if (!result.isSuccess) {
    return Result.fail(result.getErrorValue());
  }
  
  return Result.ok({
    shortUrl: `${this.apiUrl}/${result.getValue().slug}`
  });
}
```

#### Encadenamiento

```typescript
async updateLink(slug: string, newUrl: string): Promise<Result<Link, Error>> {
  // Obtener link
  const getResult = await this.repository.getBySlug(slug);
  if (!getResult.isSuccess) {
    return Result.fail(getResult.getErrorValue());
  }
  
  // Actualizar
  const link = getResult.getValue();
  const updateResult = link.updateUrl(newUrl);
  if (!updateResult.isSuccess) {
    return Result.fail(updateResult.getErrorValue());
  }
  
  // Guardar
  return await this.repository.save(updateResult.getValue().link);
}
```

## 📋 Types

### LinkType

Interfaz que representa un enlace corto.

```typescript
interface LinkType {
  slug: string;            // ID único del enlace
  url: string;             // URL de destino
  creationDate: number;    // Timestamp de creación
  lastUpdateDate: number;  // Timestamp de última modificación
  lastVisitDate: number;   // Timestamp de última visita
  visitCount: number;      // Contador de visitas
}
```

### LinksResponse

Respuesta de la API para listado de enlaces.

```typescript
interface LinksResponse {
  total: number;        // Total de enlaces
  data: LinkType[];     // Array de enlaces
}
```

## 📦 Instalación

Este paquete se usa internamente en el monorepo mediante workspace protocol:

```json
{
  "dependencies": {
    "@shortlink/core": "workspace:*"
  }
}
```

## 🔧 Importación

```typescript
// Importar todo
import { Result, LinkType, LinksResponse } from '@shortlink/core';

// Importar selectivo
import { Result } from '@shortlink/core';
import type { LinkType } from '@shortlink/core';
```

## 🎯 Ventajas del Result Pattern

✅ **Errores explícitos**: Los tipos obligan a manejar errores  
✅ **Sin excepciones**: Flujo de control predecible  
✅ **Type-safe**: TypeScript infiere tipos correctamente  
✅ **Testeable**: Fácil de mockear y probar  
✅ **Railway-oriented programming**: Composición funcional  

## 🚀 Build

```bash
# Compilar el paquete
pnpm build
```

Genera los archivos JavaScript en el directorio configurado.

## 📝 Configuración

El paquete utiliza la configuración base de TypeScript del monorepo:

```json
{
  "extends": "@tsconfig/node22",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

## 🤝 Uso en el monorepo

### En la API

```typescript
import { Result } from '@shortlink/core';

export class LinksService {
  async createLink(link: Link): Promise<Result<Link, Error>> {
    // Implementación
  }
}
```

### En el Web

```typescript
import type { LinkType, LinksResponse } from '@shortlink/core';

interface ApiResponse {
  data: LinksResponse;
}
```

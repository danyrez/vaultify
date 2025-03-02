# GESTOR DE INVENTARIO

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)

Este proyecto es un sistema de gestión de inventarios que permite a los usuarios gestionar productos, categorías, proveedores, clientes, compras y ventas. El backend está construido con Node.js, Express y Prisma ORM para interactuar con la base de datos.

## Tabla de Contenidos

- [Instalacion](#Instalacion)
- [Dependencias](#Dependencias)
- [Estructura del Proyecto](#Estructura-del-Proyecto)
- [Endpoints](#Endpoints)

# Instalacion

1. Clona el repositorio:

```shell
git clone https://github.com/danyrez/vaultify.git
```

2. Navega al directorio del proyecto:

```shell
cd gestor-inventario
```

3. Instala las dependencias:

```shell
pnpm install
```

- Adicionalmente tambien usa el comando

```shell
npx prisma generate
```

4. Configura las variables de entorno: Crea un archivo .env en la raíz del proyecto y añade las siguientes variables:

```shell
DATABASE_URL="file:./dev.db"
PORT=3000
TOKEN_SECRET="supersecret@jwt-secret"
FRONTEND_URL="http://localhost:5173"
```

5. Ejecuta el comando de Prisma:

```shell
npx prisma generate
```

6. Inicia el servidor:

```shell
pnpm run dev
```

# Dependencias

- express: Framework web para Node.js que facilita la creación de aplicaciones web y APIs.
- prisma: ORM (Object-Relational Mapping) para Node.js y TypeScript que facilita la interacción con la base de datos.
- jsonwebtoken: Biblioteca para generar y verificar JSON Web Tokens (JWT) para autenticación.
- bcryptjs: Biblioteca para encriptar y comparar contraseñas de manera segura.
- cors: Middleware para habilitar CORS (Cross-Origin Resource Sharing) en aplicaciones Express.
- morgan: Middleware de registro de solicitudes HTTP para Node.js.
- zod: Biblioteca de validación y análisis de esquemas para TypeScript y JavaScript.

## Dependencias de Desarrollo

- nodemon: Herramienta que reinicia automáticamente la aplicación Node.js cuando se detectan cambios en el código fuente (usada en desarrollo).
- @prisma/client: Cliente de Prisma para interactuar con la base de datos.
- standart: Usada como linter de código.

# Estructura del Proyecto

```
src/
├── app.js
├── config/
│   ├── db.js
│   └── variables.js
├── controllers/
│   ├── auth.controller.js
│   ├── category.controller.js
│   ├── customer.controller.js
│   ├── product.controller.js
│   ├── purchase.controller.js
│   ├── purchaseDetail.controller.js
│   ├── sale.controller.js
│   ├── saleDetail.controller.js
│   └── supplier.controller.js
├── index.js
├── libs/
│   └── jwt.js
├── middlewares/
│   ├── validateToken.js
│   └── validator.middleware.js
├── routes/
│   ├── auth.routes.js
│   ├── category.routes.js
│   ├── customer.routes.js
│   ├── index.js
│   ├── product.routes.js
│   ├── purchase.routes.js
│   ├── purchaseDetail.routes.js
│   ├── sale.routes.js
│   ├── saleDetail.routes.js
│   ├── stats.routes.js
│   └── supplier.routes.js
└── schemas/
    ├── auth.schema.js
    ├── category.schema.js
    ├── product.schema.js
    └── purchase.schema.js
```

# Endpoints

## Autenticación

### Registro

- POST /api/auth/register
- Body:

```shell
{
  "name": "user1",
  "email": "user1@gmail.com",
  "password": "user123"
}
```

### Login

- POST /api/auth/login
- Body:¨

```shell
{
  "email": "user1@gmail.com",
  "password": "user123"
}
```

### Perfil

- GET /api/auth/profile
- Headers: Authorization: Bearer <token>

### Logout

- POST /api/auth/logout

### Categorías

Obtener todas las categorías

- GET /api/categories

### Crear una categoría

- POST /api/categories
- Body:

```shell
{
  "name": "category1"
}
```

### Actualizar una categoría

- PUT /api/categories/:id
- Body:

```shell
{
  "name": "Componentes"
}
```

### Eliminar una categoría

- DELETE /api/categories/:id

### Productos

Obtener todos los productos

- GET /api/products

### Crear un producto

- POST /api/products
- Body:

```shell
{
  "name": "Iphone 16",
  "description": "Descripción del Iphone 16",
  "price": 100,
  "stock": 50,
  "categoryId": 1
}
```

### Actualizar un producto

- PUT /api/products/:id
- Body:

```shell
{
  "name": "Laptop",
  "description": "Laptop lenovo",
  "price": 100,
  "stock": 30,
  "categoryId": 1
}
```

### Eliminar un producto

DELETE /api/products/:id

### Clientes

Obtener todos los clientes

- GET /api/customers

### Crear un cliente

- POST /api/customers
- Body:

```shell
{
  "firstName": "customer1",
  "lastName": "LastName1",
  "email": "custormer1@gmail.com",
  "phone": "123456789"
}
```

### Actualizar un cliente

- PUT /api/customers/:id
- Body:

```shell
{
  "firstName": "customer1",
  "lastName": "LastName1",
  "email": "custormer1@gmail.com",
  "phone": "123456789"
}
```

### Eliminar un cliente

- DELETE /api/customers/:id

### Proveedores

Obtener todos los proveedores

- GET /api/suppliers

### Crear un proveedor

- POST /api/suppliers
- Body:

```shell
{
  "name": "supplier1",
  "email": "supplier1@gmail.com",
  "phone": "123456789",
  "address": "Dirección del proveedor"
}
```

### Actualizar un proveedor

- PUT /api/suppliers/:id
- Body:

```shell
{
  "name": "supplier1",
  "email": "supplier1@gmail.com",
  "phone": "123456789",
  "address": "Dirección del proveedor"
}
```

### Eliminar un proveedor

- DELETE /api/suppliers/:id

### Compras

Obtener todas las compras

- GET /api/purchases

### Crear una compra

- POST /api/purchases
- Body:

```shell
{
  "supplierId": 1,
  "purchaseDate": "2024-10-25T00:00:00Z",
  "purchaseDetails": [
    {
      "productId": 1,
      "quantity": 3,
      "price": 100
    }
  ]
}
```

### Actualizar una compra

- PUT /api/purchases/:id
- Body:

```shell
{
  "supplierId": 1,
  "purchaseDate": "2024-10-25T00:00:00Z",
  "purchaseDetails": [
    {
      "productId": 1,
      "quantity": 3,
      "price": 100
    }
  ]
}
```

### Eliminar una compra

- DELETE /api/purchases/:id

### Ventas

Obtener todas las ventas

- GET /api/sales

### Crear una venta

- POST /api/sales
- Body:

```shell
{
  "customerId": 1,
  "saleDate": "2024-10-25T00:00:00Z",
  "saleDetails": [
    {
      "productId": 1,
      "quantity": 3,
      "price": 100
    }
  ]
}
```

### Actualizar una venta

- PUT /api/sales/:id
- Body:

```shell
{
  "customerId": 1,
  "saleDate": "2024-10-25T00:00:00Z",
  "saleDetails": [
    {
      "productId": 1,
      "quantity": 3,
      "price": 100
    }
  ]
}
```

### Eliminar una venta

- DELETE /api/sales/:id

### Obtener conteos de entidades

- GET /api/stats
- Response:

```shell
{
  "categoriesCount": 10,
  "productsCount": 50,
  "suppliersCount": 5,
  "customersCount": 20,
  "purchasesCount": 15,
  "salesCount": 25
}
```

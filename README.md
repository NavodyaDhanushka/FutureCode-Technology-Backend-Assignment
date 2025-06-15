
# FutureCode-Technology-Backend-Assignment

This is a REST API built with Node.js, Express, and MySQL. It supports user registration and login (no authentication) and provides CRUD operations for products with name, price, and quantity. The project uses a simple MVC structure with separate models, routes, and controllers.


## API Reference

#### User Registration

```http
  POST /api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. Unique username. |
| `email` | `string` | **Required**. User’s email address. |
| `password` | `string` | **Required**.  User’s password. |

#### User Login

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `username`      | `string` | **Required**. Username to login. |
| `password`      | `string` | **Required**. Password |


#### Get All Products

```http
  GET /api/products
```
Parameters: None

#### Get Product by ID
```http
  GET /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.  Product ID to fetch. |

#### Create Product
```http
  POST /api/products/create
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**.  Product name. |
| `price`      | `string` | **Required**. Product price. |
| `quantity`      | `string` | **Required**.  Product quantity. |

#### Update Product by ID

```http
  PUT /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.  Product ID to update. |
| `name`      | `string` | **Optional**.  New product name. |
| `price`      | `string` | **Optional**. New product price. |
| `quantity`      | `string` | **Optional**.   New product quantity. |

#### Delete Product by ID

```http
  DELETE /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**.  Product ID to delete. |

## Installation

Install my-project with npm

```bash
git clone <your-repo-url>
cd <your-project-folder>
npm install
```
Start the server:
 ```bash
npm start

```
The API will run on http://localhost:5000 by default.

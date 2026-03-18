# 🎮 Eagle Gaming System

> Sistema web de gestión de inventario para Eagle Gaming — hardware y periféricos gaming en Perú.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=flat-square&logo=mysql)
![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens)
![Chart.js](https://img.shields.io/badge/Charts-Chart.js-FF6384?style=flat-square&logo=chartdotjs)

---

## 📋 Descripción

Eagle Gaming System es un dashboard completo para gestionar el inventario de una tienda de hardware gaming. Permite importar productos desde Excel, visualizar datos con gráficos interactivos, registrar entradas/salidas de stock y administrar proveedores.

---

## 🚀 Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Base de datos | MySQL 8.0 |
| Autenticación | JWT + bcryptjs |
| Gráficos | Chart.js (16 gráficos) |
| Excel | multer + xlsx |
| Control de versiones | Git + GitHub |

---

## 📁 Estructura del Proyecto

```
eagle-gaming-system/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── excelController.js
│   │   │   ├── movimientosController.js
│   │   │   └── proveedoresController.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── excel.js
│   │   │   ├── movimientos.js
│   │   │   └── proveedores.js
│   │   ├── db.js
│   │   └── server.js
│   ├── schema.sql
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   └── login.jsx
    │   ├── components/
    │   │   └── PrivateRoute.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    └── package.json
```

---

## ⚙️ Instalación

### Requisitos
- Node.js v18+
- MySQL 8.0+
- Git

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/EliasG0nzales/eagle-gaming-system.git
cd eagle-gaming-system

# 2. Instalar dependencias del backend
cd backend
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de MySQL

# 4. Crear la base de datos
# Abrir MySQL Workbench y ejecutar schema.sql

# 5. Instalar dependencias del frontend
cd ../frontend
npm install

# 6. Iniciar el backend (Terminal 1)
cd ../backend
node src/server.js

# 7. Iniciar el frontend (Terminal 2)
cd ../frontend
npm run dev
```

### Variables de entorno (backend/.env)

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=dashboard_db
JWT_SECRET=eagle_gaming_secret_2024
JWT_EXPIRES=8h
PORT=4000
FRONTEND_URL=http://localhost:5173
```

---

## 🔑 Credenciales por defecto

```
Email:    admin@empresa.com
Password: password
```

---

## 🗄️ Base de Datos

| Tabla | Descripción |
|-------|-------------|
| `users` | Usuarios del sistema con roles |
| `excel_records` | Productos del inventario (125 productos) |
| `movimientos` | Historial de entradas y salidas |
| `proveedores` | Directorio de proveedores |

---

## 📡 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Login y generación de JWT |
| GET | `/api/auth/me` | Perfil del usuario |
| GET | `/api/excel/productos` | Listar productos |
| POST | `/api/excel/importar` | Importar Excel |
| POST | `/api/excel/agregar` | Agregar producto |
| DELETE | `/api/excel/eliminar/:id` | Eliminar producto |
| GET | `/api/movimientos` | Listar movimientos |
| POST | `/api/movimientos/agregar` | Registrar movimiento |
| DELETE | `/api/movimientos/:id` | Eliminar movimiento |
| GET | `/api/proveedores` | Listar proveedores |
| POST | `/api/proveedores/agregar` | Agregar proveedor |
| DELETE | `/api/proveedores/:id` | Eliminar proveedor |

---

## 🗺️ Fases de Desarrollo

### ✅ Fase 1 — Base del sistema `COMPLETADO`
- Login con autenticación JWT y roles (admin/user)
- Base de datos MySQL con 4 tablas
- Dashboard con sidebar y tarjetas de estadísticas
- Chatbot básico integrado

### ✅ Fase 2 — Inventario completo `COMPLETADO`
- Importación masiva desde Excel (125 productos, 11 hojas)
- Tabla editable con buscador en tiempo real y filtro por categoría
- Modal agregar producto con guardado en MySQL
- Botón eliminar con sincronización en base de datos

### ✅ Fase 3 — Gráficos y reportes `COMPLETADO`
- 16 gráficos interactivos con Chart.js
- Barras, doughnut, pie, línea, radar, polar area, bubble
- Top 5 productos más valiosos, análisis de precios
- Botón imprimir con vista limpia en blanco y negro

### ✅ Fase 4 — Entradas/Salidas y Proveedores `COMPLETADO`
- Registro de entradas y salidas con guardado en MySQL
- Historial de movimientos con filtro por rango de fechas
- Alertas automáticas de stock mínimo (≤5 unidades)
- CRUD completo de proveedores

### 🔲 Fase 5 — Chatbot con IA real `PENDIENTE`
- Integración con Claude API o OpenAI
- Respuestas inteligentes sobre el inventario en tiempo real
- Análisis contextual de datos del negocio

### 🔲 Fase 6 — Bot de WhatsApp `PENDIENTE`
- Integración con Twilio o Baileys
- Consultas de stock e inventario por WhatsApp
- Alertas automáticas de stock bajo

---

## 👥 Equipo

| Integrante | Rol |
|-----------|-----|
| Gonzales | Arquitectura, Backend, Frontend |
| Renzo | Frontend, Testing |
| Rodrigo | Backend, Base de datos |

---

## 📄 Licencia

Proyecto académico — Eagle Gaming 2026

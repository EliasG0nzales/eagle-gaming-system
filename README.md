<div align="center">

# 🎮 EAGLE GAMING SYSTEM

<img src="https://media.giphy.com/media/3oKIPEqDGUULpEU0aQ/giphy.gif" width="100%" />

### Sistema Web de Gestión de Inventario — Hardware & Periféricos Gaming 🖥️

[![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![Chart.js](https://img.shields.io/badge/Charts-Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)](https://chartjs.org/)
[![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

[![GitHub stars](https://img.shields.io/github/stars/EliasG0nzales/eagle-gaming-system?style=social)](https://github.com/EliasG0nzales/eagle-gaming-system)
[![GitHub forks](https://img.shields.io/github/forks/EliasG0nzales/eagle-gaming-system?style=social)](https://github.com/EliasG0nzales/eagle-gaming-system)

</div>

---

## 📌 Tabla de Contenidos

- [Descripción](#-descripción)
- [Demo Visual](#-demo-visual)
- [Características](#-características)
- [Stack Tecnológico](#-stack-tecnológico)
- [Arquitectura](#-arquitectura)
- [Fases de Desarrollo](#-fases-de-desarrollo)
- [Base de Datos](#-base-de-datos)
- [API Endpoints](#-api-endpoints)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Equipo](#-equipo)

---

## 📖 Descripción

**Eagle Gaming System** es un sistema web completo de gestión de inventario desarrollado para la tienda **Eagle Gaming**, especializada en la venta de hardware y periféricos gaming en Perú. Permite administrar más de **125 productos** en **11 categorías** con funcionalidades avanzadas de análisis y reportes.

> 💡 El sistema está diseñado para ser usado por múltiples usuarios con roles diferenciados (admin/user), con sincronización en tiempo real a través de MySQL.

---

## 🎬 Demo Visual

<div align="center">

### 📊 Dashboard con Gráficos Interactivos
<img src="https://media.giphy.com/media/xT9IgzoKnwFNmISR8I/giphy.gif" width="80%" alt="Dashboard con gráficos interactivos"/>

> *Dashboard principal con 16 gráficos en tiempo real, tarjetas de estadísticas y tema dark profesional*

---

### 📦 Gestión de Inventario en Tiempo Real
<img src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" width="80%" alt="Gestión de inventario"/>

> *Tabla editable con 125 productos, buscador instantáneo, filtros por categoría y CRUD completo*

---

### 📈 Análisis de Datos y Reportes
<img src="https://media.giphy.com/media/3o7btNa0RUYa5E7iiQ/giphy.gif" width="80%" alt="Análisis y reportes"/>

> *16 visualizaciones incluyendo barras, doughnut, radar, bubble chart y análisis de stock*

</div>

---

## ✨ Características

<table>
<tr>
<td width="50%">

### 🔐 Autenticación & Seguridad
- ✅ Login con JWT (JSON Web Tokens)
- ✅ Roles diferenciados: admin / user
- ✅ Sesión persistente en localStorage
- ✅ Rutas protegidas con PrivateRoute
- ✅ Middleware de verificación en backend

### 📦 Gestión de Inventario
- ✅ 125 productos importados desde Excel
- ✅ 11 categorías de hardware gaming
- ✅ Buscador en tiempo real
- ✅ Filtro por categoría
- ✅ Agregar / Editar / Eliminar productos
- ✅ Guardado persistente en MySQL

</td>
<td width="50%">

### 📊 Gráficos y Visualizaciones
- ✅ 16 gráficos interactivos con Chart.js
- ✅ Barras, Doughnut, Pie, Línea, Radar
- ✅ Polar Area, Bubble, Acumulado
- ✅ Top 5 productos más valiosos
- ✅ Análisis precio min/max por categoría
- ✅ Vista de impresión limpia (blanco/negro)

### 📥 Operaciones & Proveedores
- ✅ Registro de entradas y salidas
- ✅ Historial con filtro por fechas
- ✅ Alertas de stock mínimo (≤5 unidades)
- ✅ CRUD completo de proveedores
- ✅ Chatbot integrado en el dashboard

</td>
</tr>
</table>

---

## 🛠️ Stack Tecnológico

```
┌─────────────────────────────────────────────────────────┐
│                    EAGLE GAMING SYSTEM                    │
├─────────────────┬───────────────────────────────────────┤
│   FRONTEND      │   React 18 + Vite + Chart.js           │
│   BACKEND       │   Node.js + Express (MVC)              │
│   BASE DE DATOS │   MySQL 8.0 + mysql2 (pool)            │
│   AUTH          │   JWT + bcryptjs (roles)               │
│   EXCEL         │   multer (upload) + xlsx (parse)       │
│   ESTILOS       │   CSS Variables + Dark Theme           │
│   VERSIONES     │   Git + GitHub (colaborativo)          │
└─────────────────┴───────────────────────────────────────┘
```

---

## 🏗️ Arquitectura

```
eagle-gaming-system/
├── 📁 backend/
│   ├── 📁 src/
│   │   ├── 📁 controllers/
│   │   │   ├── 🟨 authController.js        # Login + JWT
│   │   │   ├── 🟨 excelController.js       # CRUD Inventario
│   │   │   ├── 🟨 movimientosController.js # Entradas/Salidas
│   │   │   └── 🟨 proveedoresController.js # CRUD Proveedores
│   │   ├── 📁 middleware/
│   │   │   └── 🟨 auth.js                  # verifyToken + requireAdmin
│   │   ├── 📁 routes/
│   │   │   ├── 🟨 auth.js
│   │   │   ├── 🟨 excel.js
│   │   │   ├── 🟨 movimientos.js
│   │   │   └── 🟨 proveedores.js
│   │   ├── 🟨 db.js                        # Pool de conexiones MySQL
│   │   └── 🟨 server.js                    # Entry point Express
│   ├── 📄 schema.sql                       # Estructura de la BD
│   └── 📄 package.json
│
└── 📁 frontend/
    ├── 📁 src/
    │   ├── 📁 pages/
    │   │   ├── 🟦 Dashboard.jsx            # Vista principal (1500+ líneas)
    │   │   └── 🟦 login.jsx                # Autenticación
    │   ├── 📁 context/
    │   │   └── 🟦 AuthContext.jsx          # Estado global de auth
    │   ├── 📁 components/
    │   │   └── 🟦 PrivateRoute.jsx         # Protección de rutas
    │   ├── 🟦 App.jsx                      # Router principal
    │   └── 🟦 main.jsx                     # Entry point React
    └── 📄 package.json
```

---

## 🗺️ Fases de Desarrollo

### ✅ Fase 1 — Base del Sistema `COMPLETADO`

| Funcionalidad | Detalle | Estado |
|--------------|---------|--------|
| Login JWT | Autenticación con roles admin/user | ✅ |
| Base de datos | MySQL con 4 tablas relacionales | ✅ |
| Dashboard | Sidebar + tarjetas de estadísticas | ✅ |
| Chatbot básico | Respuestas sobre inventario y stock | ✅ |
| Rutas protegidas | AuthContext + PrivateRoute | ✅ |

---

### ✅ Fase 2 — Inventario Completo `COMPLETADO`

| Funcionalidad | Detalle | Estado |
|--------------|---------|--------|
| Importar Excel | 125 productos de 11 hojas a MySQL | ✅ |
| Tabla editable | Campos modificables directamente | ✅ |
| Buscador | Filtro por modelo, marca y categoría | ✅ |
| Modal agregar | Formulario completo con validación | ✅ |
| Eliminar producto | Con sincronización en MySQL | ✅ |
| Carga automática | Al iniciar sesión desde BD | ✅ |

---

### ✅ Fase 3 — Gráficos y Reportes `COMPLETADO`

| Gráfico | Tipo | Descripción |
|---------|------|-------------|
| Productos por categoría | Barras | Cantidad de SKUs por categoría |
| Stock por categoría | Doughnut | Proporción de unidades en stock |
| Distribución categorías | Pie | Vista circular de categorías |
| Valor total | Barras horizontal | Capital total por categoría en S/ |
| Precio máximo | Línea | Tendencia de precios altos |
| Precio promedio | Barras | Media de precios por categoría |
| Rango de precios | Línea doble | Precio mínimo vs máximo |
| Radar Stock vs Precio | Radar | Comparativa normalizada |
| Precios apilados | Barras apiladas | Base + diferencia de precio |
| Stock vs mínimo | Barras | Alerta visual de stock bajo |
| Polar Stock | Polar Area | Vista polar del stock |
| Doble eje | Línea doble eje | Stock izquierda · Valor derecha |
| Valor doughnut | Doughnut | Capital en stock por categoría |
| Valor acumulado | Línea | Crecimiento acumulado del valor |
| Burbuja | Bubble | Precio vs Stock (tamaño=valor) |
| Top 5 | Barras | Productos de mayor valor total |

---

### ✅ Fase 4 — Entradas/Salidas y Proveedores `COMPLETADO`

| Funcionalidad | Detalle | Estado |
|--------------|---------|--------|
| Registro movimientos | Entradas y salidas con MySQL | ✅ |
| Historial completo | Tabla con todos los movimientos | ✅ |
| Filtro por fechas | Rango desde/hasta con botón limpiar | ✅ |
| Alertas stock | Productos con ≤5 unidades | ✅ |
| CRUD Proveedores | Agregar y eliminar proveedores | ✅ |
| Persistencia | Carga automática desde MySQL | ✅ |

---

### 🔲 Fase 5 — Chatbot con IA Real `PENDIENTE`

```
[ ] Integración con Claude API (Anthropic) o OpenAI GPT
[ ] Consultas inteligentes sobre el inventario en tiempo real
[ ] Análisis contextual: "¿Qué producto tiene más valor en stock?"
[ ] Historial de conversación persistente
[ ] Respuestas sobre precios, stock, movimientos y tendencias
```

---

### 🔲 Fase 6 — Bot de WhatsApp `PENDIENTE`

```
[ ] Integración con Twilio API o Baileys (WhatsApp Web)
[ ] Consultas por WhatsApp: precio, stock, disponibilidad
[ ] Alertas automáticas de stock bajo por mensaje
[ ] Comandos: /inventario, /precio [producto], /stock [categoría]
[ ] Hosting en servidor para funcionamiento 24/7
```

---

## 🗄️ Base de Datos

```sql
USE dashboard_db;

-- Usuarios del sistema
CREATE TABLE users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(200) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('admin','user') DEFAULT 'user',
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Productos del inventario (125 productos del Excel)
CREATE TABLE excel_records (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  filename   VARCHAR(255),
  sheet_name VARCHAR(100),
  row_index  INT DEFAULT 0,
  data       JSON NOT NULL,
  uploaded_by INT UNSIGNED,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Historial de movimientos
CREATE TABLE movimientos (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  fecha       VARCHAR(20) NOT NULL,
  producto    VARCHAR(255) NOT NULL,
  tipo        ENUM('Entrada','Salida') DEFAULT 'Entrada',
  cantidad    INT UNSIGNED NOT NULL DEFAULT 0,
  costo       DECIMAL(10,2) NOT NULL DEFAULT 0,
  responsable VARCHAR(120),
  created_by  INT UNSIGNED,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

-- Directorio de proveedores
CREATE TABLE proveedores (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(200) NOT NULL,
  producto   VARCHAR(255),
  precio     VARCHAR(100),
  entrega    VARCHAR(100),
  contacto   VARCHAR(200),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📡 API Endpoints

```
🔐 AUTENTICACIÓN
POST   /api/auth/login           → { email, password } → { token, user }
GET    /api/auth/me              → Bearer token → { user }

📦 INVENTARIO
GET    /api/excel/productos      → Bearer token → { productos[] }
POST   /api/excel/importar       → multipart/form-data (excel) → { total }
POST   /api/excel/agregar        → { categoria, marca, modelo, precio, stock }
DELETE /api/excel/eliminar/:id   → Bearer token → { message }

📥 MOVIMIENTOS
GET    /api/movimientos          → Bearer token → { movimientos[] }
POST   /api/movimientos/agregar  → { fecha, producto, tipo, cantidad, costo }
DELETE /api/movimientos/:id      → Bearer token → { message }

🏢 PROVEEDORES
GET    /api/proveedores          → Bearer token → { proveedores[] }
POST   /api/proveedores/agregar  → { nombre, producto, precio, entrega, contacto }
DELETE /api/proveedores/:id      → Bearer token → { message }

💚 HEALTH CHECK
GET    /api/health               → { status: "ok", ts: "..." }
```

---

## ⚙️ Instalación

### Prerrequisitos

```bash
node --version   # v18.0 o superior requerido
mysql --version  # v8.0 o superior requerido
git --version    # cualquier versión
```

### Paso a paso

```bash
# 1️⃣ Clonar el repositorio
git clone https://github.com/EliasG0nzales/eagle-gaming-system.git
cd eagle-gaming-system

# 2️⃣ Instalar dependencias del backend
cd backend
npm install

# 3️⃣ Configurar variables de entorno
# Crear archivo backend/.env con:
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=dashboard_db
JWT_SECRET=eagle_gaming_secret_2024
JWT_EXPIRES=8h
PORT=4000
FRONTEND_URL=http://localhost:5173

# 4️⃣ Crear la base de datos
# Abrir MySQL Workbench → abrir schema.sql → ejecutar con Ctrl+Shift+Enter

# 5️⃣ Instalar dependencias del frontend
cd ../frontend
npm install

# 6️⃣ Iniciar servidores
# Terminal 1:
cd backend && node src/server.js

# Terminal 2:
cd frontend && npm run dev
```

---

## 🚀 Uso

Una vez instalado, abre el navegador en:

```
🌐 http://localhost:5173

📧 Email:    admin@empresa.com
🔑 Password: password
```

### Importar el inventario

1. Inicia sesión como administrador
2. Ve a la sección **📦 Inventario**
3. Haz clic en **⬆ Importar Excel**
4. Selecciona tu archivo `LIBRO DE INVENTARIO EAGLE GAMING.xlsx`
5. Los 125 productos se cargarán automáticamente

---

## 📊 Estadísticas del Proyecto

```
📦 Productos en BD:     125 productos
📂 Categorías:          11 categorías de hardware
📈 Gráficos:            16 visualizaciones interactivas
🔗 Endpoints API:       12 endpoints REST
🗄️ Tablas MySQL:        4 tablas relacionales
👥 Usuarios del sistema: Roles admin y user
🖥️ Tecnologías:         6 tecnologías principales
```

---

## 👥 Equipo de Desarrollo

<div align="center">

| 👤 Integrante | 🎯 Rol | 🛠️ Responsabilidades |
|:------------:|:------:|:-------------------:|
| **Gonzales** | Tech Lead | Arquitectura, Backend, Frontend, Base de datos |
| **Renzo** | Developer | Frontend, Testing, UI/UX |
| **Rodrigo** | Developer | Backend, Base de datos, Deployment |

</div>

---

## 🤝 Contribuir

```bash
# 1. Fork del repositorio en GitHub
# 2. Clonar tu fork
git clone https://github.com/TU_USUARIO/eagle-gaming-system.git

# 3. Crear rama para tu feature
git checkout -b feature/nueva-funcionalidad

# 4. Hacer cambios y commit
git add .
git commit -m "feat: descripción de tu cambio"

# 5. Push y Pull Request
git push origin feature/nueva-funcionalidad
```

---

## 📄 Licencia

```
MIT License

Eagle Gaming System — Proyecto Académico 2026
Desarrollado en Perú 🇵🇪

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software to use, copy, modify, and distribute freely.
```

---

<div align="center">

### ⭐ Si te gustó el proyecto, dale una estrella en GitHub ⭐

**Eagle Gaming System** — Desarrollado con ❤️ en Perú 🇵🇪

*React + Node.js + MySQL + Chart.js*

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=EliasG0nzales.eagle-gaming-system)

</div>
#   E a g l e _ G a m e r _ P E R U  
 
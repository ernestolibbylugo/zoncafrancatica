# ZoFranca CR — Plataforma de Gestión Inteligente de Zonas Francas

**ZoFranca CR** es una plataforma web modular diseñada para digitalizar y automatizar el ciclo integral de administración de empresas en el régimen de zonas francas de Costa Rica: recepción de solicitudes de admisión, evaluación asistida por Inteligencia Artificial, ratificación humana, control periódico de cumplimiento operacional y detección automatizada de alertas de incumplimiento.

---

## 👥 Equipo del Proyecto

- **Ernesto Libby Lugo:** Co-desarrollador (RF-01 a RF-05, módulo base de solicitudes, backend inicial `json-server`, IA base).
- **Ulysses Quirós V.:** Líder técnico / Desarrollador (RF-06 a RF-18, RNF-01 a RNF-09, matriz de trazabilidad, validación IA, diseño Stitch, módulos de cumplimiento, alertas, dashboard y manejo de asincronía).

---

## 🎯 Objetivos del Sistema

1. **Digitalización:** Sustituir el flujo manual basado en correos y hojas de cálculo por formularios web estandarizados.
2. **Evaluación asistida por IA (Human-in-the-Loop):** Preclasificar solicitudes (`Recomendada`, `Revisar`, `Rechazada`) mediante un motor de IA que calcula un puntaje de afinidad (0–100) y justificación técnica, manteniendo la decisión final bajo responsabilidad de un analista humano.
3. **Fiscalización de cumplimiento:** Comparar periódicamente empleos e inversión reportados contra los compromisos iniciales pactados.
4. **Alertas tempranas:** Emitir notificaciones automáticas ante desviaciones operativas o déficits en compromisos.
5. **Asincronía y Concurrencia:** Ejecutar operaciones de red, persistencia y evaluación por lotes sin bloquear la interfaz mediante `Promise.all` y `async/await`.

---

## 📁 Estructura del Proyecto

```text
zoncafrancatica/
├── index.html                      # Página de inicio y Dashboard ejecutivo
├── package.json                    # Configuración de dependencias y scripts
├── db.json                         # Base de datos simulada para json-server
├── README.md                       # Documentación principal del sistema
├── LICENSE                         # Licencia del proyecto
│
├── css/
│   └── styles.css                  # Sistema de diseño, estilos globales y responsividad
│
├── docs/
│   ├── requerimientos.md           # Documento formal de requerimientos (RF, RNF, CA, IA)
│   ├── hoja-de-ruta.md             # Plan de fases, responsabilidades y estado de avance
│   └── validacion-ia.md            # Registro histórico y protocolo de validaciones con IA
│
├── js/
│   ├── app.js                      # Controlador principal y métricas del Dashboard
│   ├── modules/
│   │   ├── solicitudes.js          # Lógica de registro, filtrado y detalle de solicitudes
│   │   ├── cumplimiento.js         # Lógica de compromisos, comparativos y consolidado PROCOMER
│   │   └── alertas.js              # Algoritmo de detección de incumplimientos y feed de alertas
│   ├── services/
│   │   ├── solicitudesService.js   # Comunicación API para solicitudes, empresas y zonas francas
│   │   ├── reportesService.js      # Comunicación API para reportes de cumplimiento
│   │   └── iaService.js            # Motor simulado de evaluación IA y concurrencia
│   └── utils/
│       ├── ui.js                   # Estados de carga (spinners), notificaciones toast y badges
│       └── validaciones.js         # Validaciones de formularios, tipos y reglas de negocio
│
├── mockups/
│   └── README.md                   # Especificación de pantallas y prompts para Google Stitch
│
├── pages/
│   ├── dashboard.html              # Panel de control ejecutivo y KPIs
│   ├── solicitudes.html            # Formulario de registro y listado de solicitudes
│   ├── detalle-solicitud.html      # Expediente, evaluación IA y resolución humana
│   ├── cumplimiento.html           # Reportes de desempeño y consolidado PROCOMER
│   └── alertas.html                # Panel de control y feed de alertas de incumplimiento
│
└── test/
    └── pruebas.js                  # Suite de pruebas automatizadas en Node.js
```

---

## 🚀 Instalación y Puesta en Marcha

### 1. Requisitos previos
- **Node.js** (versión 16 o superior).
- **Navegador web moderno** (Google Chrome, Microsoft Edge, Mozilla Firefox).

### 2. Instalación de dependencias
Clone el repositorio y en la raíz del proyecto ejecute:

```bash
npm install
```

### 3. Iniciar el servidor backend (`json-server`)
Ejecute el backend simulado configurado en el puerto `3001`:

```bash
npm run server
```

El servidor quedará disponible en:
- `http://localhost:3001/zonasFrancas`
- `http://localhost:3001/solicitudes`
- `http://localhost:3001/empresas`
- `http://localhost:3001/reportesCumplimiento`

### 4. Abrir la aplicación web
Abra el archivo `index.html` en su navegador preferido (mediante una extensión de servidor local como *Live Server* de VS Code, o abriendo directamente el archivo).

---

## 🧪 Ejecución de Pruebas Automatizadas

Para validar las reglas de negocio, lógica de cumplimiento, detección de alertas, asincronía concurrente (`Promise.all`) y validaciones de formularios:

```bash
npm test
```

---

## 💡 Flujo de Trabajo en Git

1. **Rama de trabajo actual:** `feature/requerimientos-ulises`
2. **Estrategia:** Commits modulares y Pull Request hacia `main` tras revisión cruzada.

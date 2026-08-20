# Especificación y Documentación de Mockups — ZoFranca CR

Esta guía contiene la especificación arquitectónica y los **prompts para Google Stitch** para el diseño de las 5 pantallas clave de la plataforma ZoFranca CR.

---

## 1. Sistema de diseño y lineamientos visuales

- **Paleta de colores:**
  - *Primario:* Azul institucional profundo (`#1e3a8a`, `hsl(222, 64%, 33%)`)
  - *Secundario / Acento:* Azul cian moderno (`#0284c7`, `hsl(199, 89%, 48%)`)
  - *Éxito / En regla:* Verde esmeralda (`#10b981`, `hsl(158, 64%, 40%)`)
  - *Advertencia / Revisar:* Ámbar (`#f59e0b`, `hsl(38, 92%, 50%)`)
  - *Peligro / Rechazada / Alerta:* Rojo coral (`#ef4444`, `hsl(0, 84%, 60%)`)
  - *Fondo:* Gris neutro suave (`#f8fafc`) con tarjetas blancas y bordes sutiles (`#e2e8f0`).
- **Tipografía:** *Inter*, *Outfit* o *Roboto* (sans-serif moderna, jerarquía clara: H1 28px, H2 22px, H3 18px, Body 14px/16px).
- **Componentes clave:** Tarjetas KPI (*Stat cards*), tablas de datos con badges de estado, formularios accesibles con validación inline, loaders asíncronos y alertas flotantes (*toasts*).

---

## 2. Pantalla 1: Formulario y Gestión de Solicitudes (`pages/solicitudes.html`)

### Objetivo
Permitir a las empresas registrar su solicitud de instalación y a los analistas listar y filtrar las solicitudes existentes.

### Requerimientos asociados
- **RF:** RF-02, RF-03, RF-15.
- **RNF:** RNF-01, RNF-04, RNF-07.

### Componentes visuales
1. Barra superior de navegación (Navbar con logo ZoFranca CR y enlaces a Dashboard, Solicitudes, Cumplimiento, Alertas).
2. Formulario de registro: nombre de empresa, cédula jurídica, selector de zona franca, selector de sector, inversión proyectada (USD), empleos proyectados, nombre y correo de contacto, referencia de documentos adjuntos, botón "Enviar Solicitud" con spinner de carga.
3. Barra de filtros de búsqueda: buscador por texto, filtro de estado (`Todos`, `Pendiente`, `Aprobada`, `Rechazada`) y filtro por sector.
4. Tabla de solicitudes con columnas: ID, Empresa, Sector, Inversión, Empleos, Estado, Puntaje IA, y Botón de acción ("Ver Detalle / Evaluar").

### Prompt para Stitch
```text
Design a modern and clean web application screen for 'ZoFranca CR - Solicitudes de Instalación'. Top navigation bar with deep navy blue background (#1e3a8a) and white clean links (Dashboard, Solicitudes, Cumplimiento, Alertas). Main content split into two sections: On top or left side, a clean card form titled 'Nueva Solicitud de Ingreso a Zona Franca' with fields for Company Name, Tax ID (Cédula Jurídica), Free Zone dropdown, Economic Sector dropdown, Projected Investment ($ USD), Projected Jobs, Contact Name, Email, and File attachment reference, with a primary blue submit button. Below or adjacent, a comprehensive data table card titled 'Listado de Solicitudes Registradas' featuring a search bar, status filter dropdowns, and responsive rows showing Company, Sector, Investment, Jobs, Status badge (Pendiente, Recomendada, Aprobada), AI Affinity Score, and an action button 'Ver Detalle'. Modern light gray background (#f8fafc), white cards with subtle shadows, and Inter typography.
```

---

## 3. Pantalla 2: Detalle y Evaluación Asistida por IA (`pages/detalle-solicitud.html`)

### Objetivo
Visualizar el expediente completo de una solicitud, invocar el análisis por Inteligencia Artificial y registrar el dictamen definitivo del analista humano.

### Requerimientos asociados
- **RF:** RF-04, RF-05, RF-12, RF-14.
- **RNF:** RNF-01, RNF-02, RNF-05, RNF-07.

### Componentes visuales
1. Cabecera con datos generales de la empresa y badge de estado actual.
2. Tarjeta comparativa de datos: inversión proyectada vs. mínima requerida por la zona franca, empleos proyectados vs. mínimo exigido.
3. Panel de Evaluación IA: botón "Ejecutar Análisis IA", medidor circular o barra de progreso con el Puntaje de Afinidad (0–100), badge de clasificación sugerida (`Recomendada`, `Revisar`, `Rechazada`) y tarjeta con la justificación técnica explicativa.
4. Panel de Resolución Humana (Analista): selector de decisión final (`Aprobada`, `Rechazada`, `En Revisión`), campo de texto para observaciones y justificación del analista, campo para nombre del analista y botón de confirmación formal "Registrar Decisión Final".

### Prompt para Stitch
```text
Design an enterprise web page for 'ZoFranca CR - Detalle y Evaluación de Solicitud'. Clean breadcrumb navigation. Top header displays Company Name, Tax ID, Free Zone name, and current status pill. A two-column dashboard layout: Left column contains 'Datos del Expediente' displaying structured details (Sector, Investment vs Required, Employment vs Minimum, Contact info, Attached documents list). Right column has two distinct cards: 1) 'Evaluación Inteligencia Artificial' with a prominent circular score gauge showing affinity score (e.g. 88/100), a suggested classification tag ('Recomendada' in green), and a highlighted AI justification text box. 2) 'Resolución del Analista (Decisión Humana)' with a radio button or dropdown selector for Final Decision (Aprobar, Rechazar, En Revisión), textarea for analyst remarks, analyst signature field, and a green 'Confirmar Decisión Formal' button. Polished, high-trust fintech aesthetic with soft shadows and crisp typography.
```

---

## 4. Pantalla 3: Formulario y Resumen de Cumplimiento (`pages/cumplimiento.html`)

### Objetivo
Permitir el registro de reportes periódicos de cumplimiento y desplegar el consolidado general de desempeño para auditoría de PROCOMER.

### Requerimientos asociados
- **RF:** RF-06, RF-07, RF-09.
- **RNF:** RNF-01, RNF-06, RNF-07, RNF-09.

### Componentes visuales
1. Formulario de registro de reporte: selector de empresa instalada (carga automáticamente compromisos pactados), selector de periodo (ej. 2026-T1, 2026-T2), campos numéricos para Empleos Reales, Inversión Ejecutada ($ USD) y Exportaciones ($ USD), campo de observaciones y botón "Registrar Reporte de Cumplimiento".
2. Tarjeta de previsualización comparativa: cálculo en tiempo real de % cumplimiento de inversión y % cumplimiento de empleo.
3. Tabla consolidada de fiscalización PROCOMER: lista de empresas con periodo, empleo comprometido vs real, inversión comprometida vs ejecutada, estado (`En regla`, `Con alertas`) y botón de historial.

### Prompt para Stitch
```text
Design a data-driven web interface for 'ZoFranca CR - Módulo de Cumplimiento Operacional'. Top section features a card form 'Nuevo Reporte Periódico de Cumplimiento' with inputs for Company selector (which reveals agreed commitments in a sub-box), Period dropdown (Q1, Q2, Annual), Actual Jobs, Executed Investment ($ USD), Total Export Amount ($ USD), and an action button 'Guardar y Evaluar Reporte'. Right side of form shows an instant comparison preview card with percentage progress bars for Employment fulfillment and Investment fulfillment. Bottom section displays an expansive data table 'Consolidado de Cumplimiento (Simulación PROCOMER)' listing companies, committed vs reported metrics, delta variances, compliance status badges (green 'En Regla', red 'Incumplimiento'), and export buttons. Professional UI with clear financial and regulatory styling.
```

---

## 5. Pantalla 4: Panel de Alertas de Incumplimiento (`pages/alertas.html`)

### Objetivo
Presentar de forma priorizada todas las anomalías y desviaciones detectadas en los compromisos de las empresas.

### Requerimientos asociados
- **RF:** RF-08, RF-11.
- **RNF:** RNF-01, RNF-05, RNF-07.

### Componentes visuales
1. Resumen de alertas: tarjetas resumen con contador de alertas críticas (rojo), alertas moderadas (ámbar) y total de empresas afectadas.
2. Filtros de alertas por tipo (Déficit de Empleo, Déficit de Inversión, Todas).
3. Lista de tarjetas de alerta interactivas: cada tarjeta muestra el nombre de la empresa, tipo de indicador afectado, meta pactada, valor reportado real, brecha cuantitativa (diferencia negativa resaltada), fecha del reporte y botón de acción ("Contactar Empresa" / "Ver Expediente").

### Prompt para Stitch
```text
Design a monitoring and alert dashboard screen for 'ZoFranca CR - Panel de Alertas de Incumplimiento'. Top banner has 3 quick-stat metric cards: 'Alertas Críticas de Empleo' (red accent), 'Alertas de Inversión' (amber accent), and 'Empresas Afectadas' (blue accent). Below, a clean filter toolbar with pills for 'Todas', 'Empleo', 'Inversión'. The main body consists of an alert feed with structured cards. Each alert card has a colored side border indicating severity, company name, specific breach description (e.g. 'Déficit de 15 empleos directos frente al compromiso de 50'), comparison breakdown (Compromiso: 50 | Reportado: 35 | Brecha: -15 / -30%), timestamp, and action buttons ('Ver Expediente', 'Registrar Seguimiento'). Highly legible, clean alerts without visual clutter.
```

---

## 6. Pantalla 5: Dashboard Ejecutivo y Métricas Consolidadas (`pages/dashboard.html` / `index.html`)

### Objetivo
Brindar una vista panorámica en tiempo real de la operación integral de las zonas francas, combinando solicitudes, evaluaciones IA, cumplimiento y alertas.

### Requerimientos asociados
- **RF:** RF-13, RF-18.
- **RNF:** RNF-01, RNF-02, RNF-03, RNF-07.

### Componentes visuales
1. Barra de control superior con botón de acción rápida "Evaluar Todas las Pendientes con IA (`Promise.all`)".
2. Cuadrícula de 6 tarjetas métricas KPI:
   - Total de Solicitudes Recibidas
   - Solicitudes Pendientes de Evaluación
   - Solicitudes Aprobadas
   - Empresas Activas en Regla
   - Empresas con Incumplimiento
   - Total Alertas Activas
3. Gráfico / Resumen visual de distribución de solicitudes por sector y estado.
4. Dos paneles inferiores:
   - Panel izquierdo: Solicitudes recientes con acceso directo a evaluación.
   - Panel derecho: Alertas recientes y resumen de cumplimiento.

### Prompt para Stitch
```text
Design an executive KPI dashboard for 'ZoFranca CR - Panel de Control Principal'. Top bar includes welcome header and an active primary button '⚡ Evaluar Pendientes con IA (Procesamiento Concurrente)'. Grid of 6 modern KPI metric cards with sleek icons and percentage trend indicators: 'Total Solicitudes', 'Pendientes de Revisión' (yellow badge), 'Solicitudes Aprobadas' (green badge), 'Empresas en Regla', 'Empresas con Incumplimiento' (red badge), and 'Alertas Activas'. Beneath the KPIs, a two-column layout: Left column showcases 'Solicitudes Recientes' with table view, AI score pills, and quick action links. Right column displays 'Últimas Alertas de Cumplimiento' with severity tags and investment/employment gap summaries. Clean, sophisticated enterprise SaaS aesthetic with navy blue, emerald green, and slate gray tones.
```

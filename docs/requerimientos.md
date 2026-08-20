# ZoFranca CR  
## Documento de requerimientos

**Plataforma de gestión de solicitudes y cumplimiento para zonas francas de Costa Rica**

**Asignatura:** Programación / Desarrollo Web  
**Integrantes:** Ernesto Libby Lugo y Ulises  
**Docente:** __________________________  
**Fecha:** __________________________  
**Versión:** 1.0  

---

## 1. Introducción y contexto

Actualmente, las solicitudes de instalación de empresas en zonas francas de Costa Rica se reciben y revisan mediante correos electrónicos, documentos adjuntos y hojas de cálculo. Los analistas deben leer los documentos, transcribir la información y comparar manualmente la inversión, los empleos y el sector de cada empresa con los criterios establecidos.

Este proceso puede ocasionar tiempos de respuesta prolongados, errores de transcripción, aplicación inconsistente de los criterios y falta de trazabilidad. El control posterior del cumplimiento también se realiza manualmente, lo que dificulta detectar oportunamente empresas que no estén alcanzando sus compromisos de inversión o empleo.

ZoFranca CR será una plataforma web que permitirá registrar solicitudes, almacenarlas en un backend simulado con `json-server` y procesarlas de manera asíncrona. El sistema utilizará un componente de inteligencia artificial simulada para calcular un puntaje y sugerir una clasificación, aunque la decisión definitiva permanecerá bajo responsabilidad de un analista humano.

La primera versión abarcará una zona franca, un flujo de solicitudes y un flujo de reportes de cumplimiento. Sin embargo, su arquitectura será diseñada para permitir futuras ampliaciones.

---

## 2. Objetivo general

Diseñar e implementar una plataforma web que automatice la recepción, evaluación preliminar y seguimiento de las solicitudes de instalación y los reportes de cumplimiento de empresas en una zona franca de Costa Rica, mediante JavaScript asíncrono, `json-server` y un componente de inteligencia artificial que apoye la toma de decisiones humanas.

---

## 3. Objetivos específicos

- Digitalizar el registro y envío de solicitudes de instalación.
- Guardar y consultar la información mediante un backend simulado con `json-server`.
- Evaluar las solicitudes de forma asíncrona sin bloquear la interfaz.
- Calcular un puntaje de afinidad utilizando los criterios de la zona franca.
- Clasificar preliminarmente las solicitudes como `Recomendada`, `Revisar` o `Rechazada`.
- Permitir que el analista confirme o modifique la clasificación sugerida.
- Registrar reportes periódicos de inversión, empleo y exportaciones.
- Detectar posibles incumplimientos y generar alertas.
- Mantener trazabilidad sobre solicitudes, reportes y decisiones.
- Manejar estados de carga y errores con mensajes comprensibles.
- Procesar varias solicitudes o reportes en paralelo mediante `Promise.all`.
- Diseñar una estructura que pueda ampliarse a múltiples zonas francas.

---

## 4. Análisis del enunciado

### 4.1 Actores identificados

| Actor | Responsabilidad |
|---|---|
| Empresa solicitante | Completar y enviar una solicitud de instalación. |
| Empresa instalada | Presentar reportes periódicos de cumplimiento. |
| Analista de solicitudes | Revisar la clasificación sugerida y tomar la decisión final. |
| Analista de cumplimiento | Revisar reportes y alertas de incumplimiento. |
| Administrador de la zona franca | Configurar los criterios de admisión y consultar métricas. |
| Gerente o auditor | Consultar la trazabilidad de las decisiones y los reportes consolidados. |
| Motor de IA | Calcular un puntaje y generar una recomendación con su justificación. |
| PROCOMER | Entidad relacionada con la supervisión del régimen de zonas francas. |

### 4.2 Funciones identificadas

- Registrar zonas francas y criterios de admisión.
- Recibir solicitudes de instalación.
- Guardar y consultar solicitudes.
- Evaluar sector, inversión y empleos proyectados.
- Calcular un puntaje de afinidad.
- Clasificar preliminarmente las solicitudes.
- Permitir la intervención de un analista humano.
- Registrar reportes de cumplimiento.
- Comparar resultados reales con los compromisos originales.
- Generar alertas de incumplimiento.
- Consultar historiales y reportes consolidados.
- Filtrar solicitudes por diferentes criterios.
- Procesar información de manera asíncrona.

### 4.3 Datos principales del sistema

| Entidad | Datos principales |
|---|---|
| Zona franca | Identificador, nombre, inversión mínima, empleos mínimos y sectores permitidos. |
| Solicitud | Empresa, sector, inversión proyectada, empleos proyectados, documentos, fecha y estado. |
| Evaluación | Puntaje, clasificación, justificación y fecha de evaluación. |
| Decisión humana | Decisión final, analista responsable, observaciones y fecha. |
| Empresa instalada | Identificador, solicitud aprobada y compromisos asumidos. |
| Reporte de cumplimiento | Empleos reales, inversión ejecutada, exportaciones y periodo reportado. |
| Alerta | Tipo de incumplimiento, descripción, nivel, estado y fecha. |
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
| Alerta | Tipo de incumplimiento, descripción, nivel, estado y fecha. |---

## 5. Entrevista simulada al cliente

Para comprender las necesidades de la administraciÃ³n de la zona franca, se realizÃ³ una entrevista simulada. Las respuestas representan supuestos razonables que deberÃ¡n confirmarse con un cliente real antes de implementar el sistema en producciÃ³n.

### 1. Â¿QuiÃ©nes utilizarÃ¡n la plataforma?

La utilizarÃ¡n empresas interesadas en instalarse, empresas ya instaladas, analistas de solicitudes, analistas de cumplimiento, administradores y personal encargado de auditorÃ­as.

### 2. Â¿QuÃ© informaciÃ³n debe presentar una empresa solicitante?

Debe indicar su nombre, identificaciÃ³n jurÃ­dica, sector, inversiÃ³n proyectada, cantidad de empleos proyectados, persona de contacto y documentos de respaldo legal y fiscal.

### 3. Â¿CuÃ¡les son los criterios iniciales de admisiÃ³n?

En esta primera versiÃ³n se evaluarÃ¡n el sector de actividad, la inversiÃ³n proyectada y la cantidad de empleos que la empresa promete generar.

### 4. Â¿Todas las zonas francas utilizan los mismos criterios?

No. Cada zona franca puede establecer valores mÃ­nimos y sectores permitidos diferentes. Aunque la primera versiÃ³n implemente una sola zona, los criterios deben almacenarse en el backend y no quedar escritos directamente en el cÃ³digo.

### 5. Â¿La inteligencia artificial puede aprobar o rechazar definitivamente una solicitud?

No. La IA solamente calcula un puntaje, produce una justificaciÃ³n y sugiere una clasificaciÃ³n. La decisiÃ³n definitiva debe tomarla un analista humano.

### 6. Â¿QuÃ© clasificaciones puede sugerir el sistema?

El sistema puede clasificar preliminarmente una solicitud como `Recomendada`, `Revisar` o `Rechazada`, segÃºn el puntaje obtenido.

### 7. Â¿QuÃ© sucede si una solicitud contiene informaciÃ³n incompleta?

El sistema debe impedir su envÃ­o cuando falten datos obligatorios y mostrar un mensaje que indique claramente cuÃ¡les campos deben corregirse.

### 8. Â¿QuÃ© debe ocurrir cuando falla el servidor o la evaluaciÃ³n?

El sistema debe informar el problema mediante un mensaje comprensible, registrar el error tÃ©cnico en la consola y permitir que el usuario vuelva a intentarlo sin perder innecesariamente los datos introducidos.

### 9. Â¿QuÃ© informaciÃ³n presentan las empresas instaladas?

Presentan reportes periÃ³dicos con los empleos reales, la inversiÃ³n ejecutada, las exportaciones y el periodo correspondiente.

### 10. Â¿CuÃ¡ndo se genera una alerta de incumplimiento?

Se genera cuando los empleos reales o la inversiÃ³n ejecutada se encuentran por debajo de los compromisos establecidos en la solicitud aprobada.

### 11. Â¿Debe conservarse un historial de las decisiones?

SÃ­. El sistema debe registrar la clasificaciÃ³n sugerida, la decisiÃ³n definitiva, la persona responsable, la fecha y las observaciones asociadas.

### 12. Â¿QuÃ© ampliaciones se esperan en el futuro?

Se espera incorporar varias zonas francas, autenticaciÃ³n y roles, integraciÃ³n con PROCOMER, notificaciones automÃ¡ticas y herramientas analÃ­ticas mÃ¡s avanzadas.

---

## 6. Reglas de negocio

Los valores utilizados en esta versiÃ³n son supuestos acadÃ©micos y no representan necesariamente los requisitos legales oficiales del rÃ©gimen de zonas francas de Costa Rica.

| ID | Regla |
|---|---|
| RN-01 | Cada solicitud debe estar relacionada con una zona franca registrada. |
| RN-02 | La empresa debe completar todos los datos obligatorios antes de enviar la solicitud. |
| RN-03 | La inversiÃ³n proyectada y los empleos proyectados deben ser valores numÃ©ricos mayores que cero. |
| RN-04 | La evaluaciÃ³n debe utilizar los criterios almacenados para la zona franca seleccionada. |
| RN-05 | Un sector permitido aporta 40 puntos al puntaje; un sector no permitido aporta 0 puntos. |
| RN-06 | El cumplimiento de la inversiÃ³n mÃ­nima aporta hasta 30 puntos, proporcionalmente al valor proyectado. |
| RN-07 | El cumplimiento de los empleos mÃ­nimos aporta hasta 30 puntos, proporcionalmente a la cantidad proyectada. |
| RN-08 | El puntaje total debe ser un nÃºmero entero entre 0 y 100. |
| RN-09 | Una solicitud con 75 puntos o mÃ¡s se clasifica como `Recomendada`. |
| RN-10 | Una solicitud entre 50 y 74 puntos se clasifica como `Revisar`. |
| RN-11 | Una solicitud con menos de 50 puntos se clasifica como `Rechazada`. |
| RN-12 | La clasificaciÃ³n generada por la IA es preliminar y no constituye una decisiÃ³n definitiva. |
| RN-13 | Solamente la decisiÃ³n registrada por el analista representa el resultado final de la revisiÃ³n. |
| RN-14 | La decisiÃ³n humana puede confirmar o modificar la clasificaciÃ³n sugerida, pero debe quedar registrada con fecha y responsable. |
| RN-15 | Solamente una solicitud aprobada puede utilizarse para registrar una empresa como instalada. |
| RN-16 | Cada reporte de cumplimiento debe asociarse con una empresa instalada y un periodo determinado. |
| RN-17 | Se genera una alerta cuando los empleos reales son inferiores a los empleos comprometidos. |
| RN-18 | Se genera una alerta cuando la inversiÃ³n ejecutada es inferior a la inversiÃ³n comprometida para el periodo evaluado. |
| RN-19 | Las solicitudes y reportes no deben depender exclusivamente de la memoria del navegador; deben almacenarse en `json-server`. |
| RN-20 | Los errores de comunicaciÃ³n no deben cambiar automÃ¡ticamente el estado de una solicitud ni eliminar informaciÃ³n existente. |

---

## 7. Proceso manual actual

El proceso que se desea mejorar funciona actualmente de la siguiente manera:

1. Una empresa interesada prepara su informaciÃ³n y los documentos de respaldo.
2. La empresa envÃ­a la solicitud por correo electrÃ³nico a la administraciÃ³n de la zona franca.
3. Un analista abre individualmente los documentos adjuntos.
4. El analista identifica los datos importantes de la empresa.
5. La informaciÃ³n se transcribe manualmente a una hoja de cÃ¡lculo.
6. El analista compara la inversiÃ³n, los empleos y el sector con los criterios correspondientes.
7. BasÃ¡ndose en su interpretaciÃ³n, decide si la solicitud debe avanzar, revisarse nuevamente o rechazarse.
8. La respuesta se redacta y se envÃ­a por correo electrÃ³nico.
9. DespuÃ©s de instalarse, la empresa presenta sus reportes periÃ³dicos tambiÃ©n mediante correo y archivos adjuntos.
10. El personal transcribe los datos de cumplimiento en otra hoja de cÃ¡lculo.
11. Los resultados se comparan manualmente con los compromisos originales.
12. Cuando se detecta un incumplimiento, el personal contacta a la empresa y registra el seguimiento utilizando medios separados.

### 7.1 Problemas identificados

- Tiempos de respuesta prolongados.
- Posibles errores al transcribir informaciÃ³n.
- Criterios aplicados de manera inconsistente.
- Documentos distribuidos entre correos y hojas de cÃ¡lculo.
- Dificultad para conocer el estado de cada solicitud.
- Incumplimientos que pueden detectarse tardÃ­amente.
- Falta de un historial centralizado.
- Dificultad para identificar quiÃ©n tomÃ³ una decisiÃ³n y cuÃ¡ndo.
- Mayor esfuerzo para preparar auditorÃ­as o reportes consolidados.

---

## 8. Requerimientos funcionales: gestión de solicitudes

| ID | Requerimiento funcional | Prioridad |
|---|---|---|
| RF-01 | El sistema debe permitir registrar y consultar una zona franca con su nombre, inversión mínima, empleos mínimos proyectados y sectores permitidos. | Alta |
| RF-02 | El sistema debe permitir a una empresa completar y enviar una solicitud con su nombre, identificación jurídica, sector, inversión proyectada, empleos proyectados, persona de contacto y referencia de los documentos de respaldo. | Alta |
| RF-03 | El sistema debe guardar y consultar cada solicitud de forma asíncrona mediante `json-server`, sin bloquear la interfaz y mostrando el estado de la operación. | Alta |
| RF-04 | El sistema debe evaluar el perfil de una solicitud mediante un motor de IA simulado que devuelva un puntaje entero entre 0 y 100 y una justificación basada en el sector, la inversión y los empleos proyectados. | Alta |
| RF-05 | El sistema debe asignar automáticamente la clasificación preliminar `Recomendada`, `Revisar` o `Rechazada`, según los umbrales establecidos en las reglas de negocio. | Alta |

---

## 9. Historias de usuario: gestión de solicitudes

### HU-01 — Configuración de criterios

**Como** administrador de la zona franca,  
**quiero** registrar los criterios mínimos de admisión,  
**para** que todas las solicitudes sean evaluadas utilizando las mismas reglas.

**Requerimientos relacionados:** RF-01.

### HU-02 — Envío de solicitud

**Como** representante de una empresa solicitante,  
**quiero** completar y enviar una solicitud desde la plataforma,  
**para** no depender del envío de correos y hojas de cálculo.

**Requerimientos relacionados:** RF-02 y RF-03.

### HU-03 — Evaluación preliminar

**Como** analista de solicitudes,  
**quiero** obtener un puntaje y una justificación para cada solicitud,  
**para** priorizar la revisión utilizando criterios consistentes.

**Requerimientos relacionados:** RF-04.

### HU-04 — Clasificación de solicitudes

**Como** analista de solicitudes,  
**quiero** visualizar una clasificación preliminar de cada solicitud,  
**para** identificar rápidamente cuáles parecen cumplir los criterios establecidos.

**Requerimientos relacionados:** RF-05.

---

## 10. Criterios de aceptación: gestión de solicitudes

### RF-01 — Registrar y consultar una zona franca

#### Escenario 1: registro correcto

**Dado** que el administrador introduce el nombre, la inversión mínima, los empleos mínimos y al menos un sector permitido,  
**cuando** registra la zona franca,  
**entonces** el sistema guarda los datos en `json-server` y muestra un mensaje de confirmación.

#### Escenario 2: datos inválidos

**Dado** que falta un dato obligatorio o un valor mínimo es igual o menor que cero,  
**cuando** el administrador intenta registrar la zona franca,  
**entonces** el sistema impide el envío y señala los campos que deben corregirse.

#### Escenario 3: consulta

**Dado** que existe una zona franca registrada,  
**cuando** el sistema consulta sus criterios,  
**entonces** muestra el nombre, la inversión mínima, los empleos mínimos y los sectores permitidos.

### RF-02 — Completar y enviar una solicitud

#### Escenario 1: solicitud válida

**Dado** que la empresa completó todos los datos obligatorios con valores válidos,  
**cuando** envía el formulario,  
**entonces** el sistema acepta la solicitud y comienza el proceso de almacenamiento.

#### Escenario 2: solicitud incompleta

**Dado** que falta un dato obligatorio,  
**cuando** la empresa intenta enviar el formulario,  
**entonces** el sistema impide el envío e identifica el campo incompleto.

#### Escenario 3: valores numéricos inválidos

**Dado** que la inversión o los empleos proyectados son iguales o menores que cero,  
**cuando** la empresa intenta enviar la solicitud,  
**entonces** el sistema rechaza los datos y muestra un mensaje de validación.

### RF-03 — Guardar y consultar solicitudes de manera asíncrona

#### Escenario 1: almacenamiento correcto

**Dado** que la solicitud contiene datos válidos y `json-server` está disponible,  
**cuando** el sistema realiza la petición de guardado,  
**entonces** almacena la solicitud, recibe su identificador y confirma la operación sin recargar la página.

#### Escenario 2: indicador de carga

**Dado** que hay una operación de almacenamiento o consulta en proceso,  
**cuando** el sistema espera la respuesta del backend,  
**entonces** muestra un indicador de carga y mantiene la interfaz disponible.

#### Escenario 3: error del backend

**Dado** que `json-server` no está disponible,  
**cuando** el sistema intenta guardar o consultar una solicitud,  
**entonces** captura el error, lo registra en la consola y muestra un mensaje comprensible sin cerrar la aplicación.

### RF-04 — Evaluar una solicitud mediante IA simulada

#### Escenario 1: evaluación correcta

**Dado** que existe una solicitud completa y una zona franca con criterios registrados,  
**cuando** se solicita la evaluación,  
**entonces** el motor devuelve un puntaje entero entre 0 y 100 y una justificación relacionada con el sector, la inversión y los empleos.

#### Escenario 2: datos incompletos

**Dado** que la solicitud no contiene los datos necesarios para calcular el puntaje,  
**cuando** se intenta realizar la evaluación,  
**entonces** la Promesa es rechazada y el sistema muestra un mensaje de error claro.

#### Escenario 3: evaluación paralela

**Dado** que existen varias solicitudes pendientes,  
**cuando** el analista solicita procesarlas,  
**entonces** el sistema las evalúa en paralelo mediante `Promise.all` sin bloquear la interfaz.

### RF-05 — Clasificar automáticamente una solicitud

#### Escenario 1: solicitud recomendada

**Dado** que una solicitud obtiene un puntaje entre 75 y 100,  
**cuando** finaliza la evaluación,  
**entonces** el sistema la clasifica preliminarmente como `Recomendada`.

#### Escenario 2: solicitud que requiere revisión

**Dado** que una solicitud obtiene un puntaje entre 50 y 74,  
**cuando** finaliza la evaluación,  
**entonces** el sistema la clasifica preliminarmente como `Revisar`.

#### Escenario 3: solicitud rechazada preliminarmente

**Dado** que una solicitud obtiene un puntaje inferior a 50,  
**cuando** finaliza la evaluación,  
**entonces** el sistema la clasifica preliminarmente como `Rechazada`.

#### Escenario 4: persistencia del resultado

**Dado** que una solicitud fue evaluada y clasificada,  
**cuando** termina el procesamiento,  
**entonces** el sistema guarda en `json-server` el puntaje, la justificación, la clasificación preliminar y la fecha de evaluación.
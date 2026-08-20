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
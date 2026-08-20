ZoFranca CR — Documento de Requerimientos

Plataforma de gestión de solicitudes y cumplimiento para zonas francas de Costa Rica

Proyecto: ZoFranca CR

Laboratorio: #3 — Extendido

Asignatura: Programación / Desarrollo Web

Integrantes: Ernesto Libby Lugo y Ulysses Quirós V.

Fecha: 20 de agosto de 2026

Versión: 2.0 (Consolidada y ampliada)

1. Introducción y contexto

Actualmente, las solicitudes de instalación de empresas en zonas francas de Costa Rica se reciben y revisan mediante correos electrónicos, documentos adjuntos y hojas de cálculo. Los analistas deben leer los documentos, transcribir la información y comparar manualmente la inversión, los empleos y el sector de cada empresa con los criterios establecidos para el régimen.

Este proceso manual ocasiona tiempos de respuesta prolongados, riesgos de errores de transcripción, aplicación inconsistente de criterios y una sensible falta de trazabilidad. De igual manera, el control posterior del cumplimiento operativo (inversión ejecutada, empleos directos generados y exportaciones) se realiza de forma fragmentada, lo que dificulta detectar oportunamente a empresas que no estén alcanzando sus compromisos obligatorios.

ZoFranca CR es una plataforma web modular diseñada para digitalizar y automatizar el ciclo completo: desde la recepción de solicitudes, su evaluación asistida por Inteligencia Artificial y la validación por analistas humanos, hasta el seguimiento periódico del cumplimiento y la generación automatizada de alertas de incumplimiento. La plataforma interactúa de manera asíncrona con un backend simulado mediante json-server (http://localhost:3001), garantizando una interfaz reactiva, no bloqueante y orientada a la auditoría continua para entidades supervisoras como PROCOMER.

2. Objetivo general

Diseñar e implementar una plataforma web modular y asíncrona que automatice la recepción, evaluación preliminar asistida por IA y seguimiento del cumplimiento de solicitudes y empresas en zonas francas de Costa Rica, garantizando la supervisión humana final, la persistencia de datos mediante json-server y la generación oportuna de alertas de incumplimiento.

3. Objetivos específicos

Digitalizar el registro y recepción en línea de solicitudes de instalación empresarial.

Persistir y consultar la información de manera asíncrona mediante un backend simulado en json-server sobre el puerto 3001.

Evaluar el perfil de las solicitudes mediante un motor de Inteligencia Artificial simulado que genere un puntaje de afinidad (0–100) y justificación técnica.

Clasificar automáticamente las solicitudes en Recomendada, Revisar o Rechazada según umbrales predefinidos.

Garantizar la intervención y decisión final obligatoria de un analista humano sobre las recomendaciones de la IA.

Procesar múltiples solicitudes y reportes de forma concurrente y no bloqueante utilizando Promise.all.

Registrar periódicamente reportes de cumplimiento (empleos reales, inversión ejecutada, exportaciones) para empresas instaladas.

Comparar automáticamente los compromisos contra los resultados reales y generar alertas visibles ante incumplimientos.

Proporcionar un panel de control (Dashboard) con métricas consolidadas del estado de solicitudes, cumplimiento y alertas.

Implementar un manejo robusto de errores de red, fallos de backend y validaciones de datos con retroalimentación clara y no técnica al usuario.

4. Análisis del sistema

4.1 Actores identificados

Actor

Descripción y responsabilidades

Empresa solicitante

Completa y envía digitalmente el formulario de solicitud de instalación adjuntando compromisos y referencias documentales.

Empresa instalada

Envía periódicamente sus reportes de cumplimiento operacional (empleo real, inversión ejecutada, exportaciones).

Analista de solicitudes

Revisa la evaluación generada por la IA, analiza la justificación y toma la decisión definitiva (aprobar, revisar o rechazar).

Analista de cumplimiento

Supervisa los reportes periódicos, revisa el comparativo contra compromisos y gestiona las alertas de incumplimiento.

Administrador de la zona franca

Consulta métricas globales en el dashboard y administra los parámetros de admisión de las zonas francas.

Gerente / Auditor

Consulta la trazabilidad histórica de decisiones, expedientes de empresas y consolidados para efectos de auditoría.

Motor de IA (Simulado)

Analiza asíncronamente los datos de solicitud frente a criterios de admisión, calcula puntaje de afinidad y sugiere clasificación.

PROCOMER

Ente supervisor externo a quien se reportan los resúmenes consolidados de inversión y generación de empleo del régimen.

4.2 Funciones principales

Gestión y parametrización de zonas francas y criterios de admisión.

Registro y consulta asíncrona de solicitudes de instalación.

Preclasificación y evaluación algorítmica/IA con puntaje 0–100 y justificación.

Flujo de decisión y confirmación humana de solicitudes.

Registro periódico de reportes de cumplimiento de empresas instaladas.

Cálculo automático de variaciones y porcentajes de cumplimiento (empleo e inversión).

Detección y emisión de alertas de incumplimiento operacionales.

Panel de métricas y consolidado de operaciones (Dashboard).

Búsqueda, ordenamiento y filtrado multicriterio de solicitudes y reportes.

Manejo de estados asíncronos (cargando, éxito, error amigable).

4.3 Estructura de datos principal

Entidad

Campos y estructura

zonasFrancas

id, nombre, inversionMinima, empleosMinimos, sectoresPermitidos

solicitudes

id, empresa, identificacion, sector, inversionProyectada, empleosProyectados, contacto, documentos, zonaFrancaId, fechaSolicitud, estado, evaluacionIA (puntaje, justificacion, clasificacionSugerida, fechaEvaluacion), decisionFinal (decision, analista, observaciones, fechaDecision)

empresas

id, nombre, identificacion, sector, zonaFrancaId, solicitudId, inversionComprometida, empleosComprometidos, fechaInstalacion, estado (activo, en_observacion, incumplimiento)

reportesCumplimiento

id, empresaId, periodo, fechaReporte, empleosReales, inversionEjecutada, exportaciones, observaciones, resultadoComparativo (cumpleEmpleo, cumpleInversion, porcentajeEmpleo, porcentajeInversion, estadoCumplimiento)

5. Entrevista simulada al cliente

Para comprender a fondo las necesidades de la administración de zonas francas, se realizó una entrevista estructurada:

1. ¿Quiénes utilizarán la plataforma ZoFranca CR?

La plataforma será utilizada por empresas interesadas en ingresar al régimen, empresas ya operativas para reportar cumplimiento, analistas de admisiones, analistas de fiscalización, administradores y auditores.

2. ¿Qué información obligatoria debe presentar una empresa solicitante?

Debe suministrar: nombre comercial, cédula jurídica, sector productivo, inversión proyectada (en USD), empleos directos proyectados, nombre y correo del contacto responsable, y mención de documentos legales y fiscales de respaldo.

3. ¿Cuáles son los criterios iniciales de admisión?

Se evalúa que el sector pertenezca a los autorizados en la zona franca, y que la inversión proyectada y los empleos proyectados alcancen o superen los umbrales mínimos definidos por la zona franca elegida.

4. ¿Todas las zonas francas manejan los mismos criterios?

No. Cada zona franca posee umbrales de inversión y sectores autorizados distintos. Por ello, los criterios deben obtenerse asíncronamente del backend (json-server) y no estar fijos (hardcoded) en el código.

5. ¿La Inteligencia Artificial puede tomar la decisión final de admisión?

No. La IA proporciona un puntaje de afinidad (0–100), una justificación técnica y una recomendación preliminar. La decisión final, con firma y observaciones, recae estrictamente en un analista humano.

6. ¿Qué clasificaciones preliminares sugiere el sistema?

Se definen tres categorías:

Recomendada: Cumple con holgura o supera ampliamente los criterios (puntaje 75–100).

Revisar: Cumple parcialmente o está cerca de los umbrales mínimos, requiriendo análisis adicional (puntaje 50–74).

Rechazada: No cumple los criterios mínimos indispensables o pertenece a un sector no admitido (puntaje 0–49).

7. ¿Cómo se supervisa a una empresa luego de ser aprobada?

Una vez aprobada, la empresa queda registrada con sus compromisos formales. Periódicamente (trimestral/anual), remite sus reportes de inversión ejecutada, personal contratado y exportaciones. El sistema compara automáticamente estos datos contra lo comprometido y alerta ante cualquier desviación negativa.

8. ¿Qué debe suceder cuando el backend no esté disponible?

El sistema debe conservar la interfaz operativa, registrar el detalle técnico en la consola y mostrar al usuario un mensaje claro que le permita volver a intentar la operación sin perder innecesariamente los datos ingresados.

9. ¿Puede registrarse una solicitud que no alcance los criterios mínimos?

Sí. La plataforma debe aceptar solicitudes con datos válidos aunque no alcancen los umbrales. El incumplimiento de los criterios afecta el puntaje y la clasificación preliminar, pero no impide registrar la solicitud.

10. ¿Qué trazabilidad debe conservar el sistema?

Debe registrar la solicitud original, la evaluación de IA, la clasificación sugerida, la decisión humana, el responsable, la fecha, las observaciones y los reportes posteriores de cumplimiento.

6. Reglas de negocio

RN-01 (Sector permitido): Una solicitud cuyo sector de actividad no figure en la lista de sectores permitidos de la zona franca recibe una penalización crítica en la evaluación de afinidad.

RN-02 (Validación de inversión y empleo): La inversión y los empleos proyectados deben ser valores numéricos estrictamente mayores que cero. Una solicitud que no alcance los mínimos puede registrarse, pero obtiene un puntaje proporcionalmente menor y puede clasificarse como Revisar o Rechazada.

RN-03 (Escala de evaluación IA): El puntaje de afinidad es un valor entero comprendido entre 0 y 100 puntos.

RN-04 (Umbrales de clasificación preliminar):

Puntaje $\ge 75$: Clasificación sugerida Recomendada.

Puntaje entre $50$ y $74$: Clasificación sugerida Revisar.

Puntaje $< 50$: Clasificación sugerida Rechazada.

RN-05 (Prevalencia de decisión humana): Toda solicitud debe ser dictaminada por un analista humano (Aprobada, Rechazada o En revisión), pudiendo ratificar o revertir la sugerencia de la IA con la debida justificación.

RN-06 (Detección de incumplimiento de empleo): Si los empleos reales reportados son inferiores al compromiso original ($\text{empleosReales} < \text{empleosComprometidos}$), se emite automáticamente una alerta de incumplimiento de empleo.

RN-07 (Detección de incumplimiento de inversión): Si la inversión ejecutada acumulada reportada es inferior a la inversión comprometida ($\text{inversionEjecutada} < \text{inversionComprometida}$), se emite automáticamente una alerta de incumplimiento de inversión.

RN-08 (Condición de empresa en regla): Una empresa se considera En regla si cumple simultáneamente con el 100% o más de sus compromisos de inversión y empleo en el periodo evaluado.

7. Proceso manual actual vs. Proceso automatizado propuesto

7.1 Proceso manual actual

La empresa interesada envía formularios y adjuntos mediante correo electrónico.

El analista descarga y abre manualmente múltiples archivos PDF/Word.

Se transcriben datos clave a una hoja de cálculo en Excel.

El analista calcula manualmente si cumple inversión y empleo.

Se redacta un dictamen y se envía respuesta vía correo sin bitácora centralizada.

Tras la instalación, los reportes periódicos se reciben en correos dispersos.

La verificación de compromisos se realiza manual y esporádicamente, provocando detección tardía de incumplimientos y auditorías complejas.

Problemas identificados: Lentitud (días por trámite), errores de transcripción humana, criterios de evaluación heterogéneos, riesgo de extravío de información y nula trazabilidad histórica.

7.2 Proceso automatizado propuesto

Recepción digital: La empresa registra su solicitud en el portal web de ZoFranca CR.

Persistencia asíncrona: La solicitud se valida en cliente y se almacena en json-server de inmediato.

Preclasificación IA: El motor de IA evalúa cada solicitud y genera un puntaje con su justificación. Cuando existen varias solicitudes pendientes e independientes, el sistema las procesa concurrentemente mediante Promise.all.

Dictamen humano: El analista visualiza el expediente, analiza la recomendación de la IA y registra la decisión final con observaciones.

Control de cumplimiento: Las empresas instaladas ingresan sus reportes periódicos en el módulo de cumplimiento.

Comparación y alertas automáticas: El sistema evalúa en tiempo real los valores reales contra los compromisos y genera alertas si existen brechas.

Dashboard y métricas: El equipo directivo visualiza indicadores en tiempo real y exporta reportes consolidados para PROCOMER.

8. Glosario de términos

Zona Franca: Área geográfica delimitada sujeta a un régimen especial de incentivos fiscales y aduaneros en Costa Rica.

Régimen de Zona Franca: Conjunto de disposiciones legales y beneficios otorgados por el Estado costarricense para incentivar la inversión extranjera directa y el empleo.

PROCOMER: Promotora del Comercio Exterior de Costa Rica, entidad encargada de supervisar el régimen y auditar el cumplimiento de compromisos.

Empresa Solicitante: Persona jurídica que formaliza una solicitud digital de ingreso e instalación en una zona franca.

Compromiso de Inversión: Monto formal en dólares estadounidenses que la empresa se compromete contractualmente a ejecutar.

Compromiso de Empleo: Cantidad mínima de plazas de trabajo directas que la empresa se compromete a crear y mantener.

Reporte de Cumplimiento: Declaración periódica de variables operativas reales (inversión ejecutada, personal activo y exportaciones realizadas).

Puntaje de Afinidad: Calificación cuantitativa normalizada de 0 a 100 calculada por el motor de IA para evaluar la viabilidad de la solicitud.

Clasificación Preliminar: Dictamen algorítmico sugerido (Recomendada, Revisar, Rechazada) previo a la resolución del analista.

Alerta de Incumplimiento: Notificación visual y operativa emitida cuando una variable real queda por debajo del compromiso pactado.

Asincronía (Non-blocking I/O): Modelo de ejecución JavaScript que permite realizar peticiones de red y cómputo sin congelar la interfaz de usuario.

Matriz de Trazabilidad: Estructura documental que vincula cada historia de usuario con requerimientos funcionales, criterios de prueba y requerimientos no funcionales.

9. Requerimientos funcionales

9.1 Gestión de solicitudes de instalación (Colaboración: Ernesto)

RF-01 — Registrar y consultar zonas francas

Prioridad: Alta

Actor: Administrador / Sistema

Descripción: El sistema debe permitir registrar y consultar la configuración de zonas francas con sus parámetros: nombre, inversión mínima, empleos mínimos y sectores permitidos.

RF-02 — Registrar y enviar solicitud de instalación

Prioridad: Alta

Actor: Empresa solicitante

Descripción: El sistema debe permitir a una empresa completar y enviar digitalmente una solicitud con nombre, cédula jurídica, sector, inversión proyectada, empleos proyectados, contacto y referencias documentales.

RF-03 — Guardar y consultar solicitudes de forma asíncrona

Prioridad: Alta

Actor: Sistema / Analista

Descripción: El sistema debe almacenar y recuperar cada solicitud en json-server (/solicitudes) de manera asíncrona mediante fetch y async/await, sin recargar ni bloquear la interfaz de usuario.

RF-04 — Evaluar solicitud mediante IA simulada

Prioridad: Alta

Actor: Sistema / Motor de IA

Descripción: El sistema debe enviar asíncronamente el perfil de la solicitud al motor de IA para obtener un puntaje de afinidad entero (0–100) y una justificación técnica basada en inversión, empleos y sector.

RF-05 — Clasificar automáticamente la solicitud

Prioridad: Alta

Actor: Sistema / Motor de IA

Descripción: El sistema debe asignar una clasificación preliminar (Recomendada, Revisar, Rechazada) en función del puntaje de afinidad y persistir la evaluación en el backend.

9.2 Cumplimiento, reportería y alertas (Responsabilidad: Ulysses)

RF-06 — Registrar reporte periódico de cumplimiento

Prioridad: Alta

Actor: Empresa instalada / Analista de cumplimiento

Descripción: El sistema debe permitir registrar reportes periódicos de cumplimiento conteniendo empleos reales, inversión ejecutada acumulada, monto exportado y periodo correspondiente, validando tipos de datos y persistiendo en json-server (/reportesCumplimiento).

RF-07 — Comparar cumplimiento contra compromisos originales

Prioridad: Alta

Actor: Sistema / Analista de cumplimiento

Descripción: El sistema debe obtener asíncronamente los compromisos pactados de la empresa y compararlos automáticamente con los datos del reporte, calculando porcentajes de cumplimiento ($% \text{ Empleo}$, $% \text{ Inversión}$) y brechas absolutas.

RF-08 — Generar y visualizar alertas de incumplimiento

Prioridad: Alta

Actor: Sistema / Analista de cumplimiento

Descripción: El sistema debe identificar automáticamente si los empleos reales o la inversión ejecutada están por debajo de los compromisos ($< 100%$) y generar alertas visuales detalladas indicando empresa, indicador afectado, valor comprometido, valor reportado, diferencia y severidad.

RF-09 — Visualizar resumen consolidado de cumplimiento (PROCOMER)

Prioridad: Media

Actor: Analista de cumplimiento / Auditor

Descripción: El sistema debe presentar un consolidado general que agrupe las empresas por estado (En regla, En observación, Incumplimiento), totalizando empleos generados e inversión ejecutada para simular el informe de fiscalización para PROCOMER.

9.3 Experiencia de usuario, asincronía y resiliencia (Responsabilidad: Ulysses / Colaborativo)

RF-10 — Mostrar indicadores visuales de carga (Loading states)

Prioridad: Alta

Actor: Usuario general

Descripción: El sistema debe mostrar un indicador visual explícito ("Cargando...", spinners o barras de progreso) durante la ejecución de operaciones asíncronas de red o evaluación, ocultándolo automáticamente al finalizar exitosamente o al ocurrir un error.

RF-11 — Manejo amigable y robusto de errores

Prioridad: Alta

Actor: Usuario general / Sistema

Descripción: El sistema debe capturar mediante try/catch fallos de red, indisponibilidad del servidor (json-server apagado) o datos inválidos, mostrando notificaciones comprensibles y no técnicas al usuario sin interrumpir la ejecución de la aplicación.

RF-12 — Confirmar o modificar decisión de IA por analista humano

Prioridad: Alta

Actor: Analista de solicitudes

Descripción: La plataforma debe requerir que un analista humano revise la clasificación sugerida por la IA y confirme, rechace o modifique la decisión final, registrando su nombre, fecha y observaciones justificativas.

RF-13 — Procesamiento y evaluación paralela con Promise.all

Prioridad: Alta

Actor: Sistema / Analista

Descripción: El sistema debe procesar solicitudes o reportes múltiples e independientes de forma concurrente utilizando Promise.all, optimizando el tiempo global de respuesta sin bloqueos secuenciales.

9.4 Auditoría, administración y extensiones (Responsabilidad: Ulysses)

RF-14 — Consultar historial y trazabilidad por empresa

Prioridad: Media

Actor: Auditor / Gerente

Descripción: El sistema debe permitir consultar el historial cronológico completo de una empresa: solicitud original, fecha de aprobación, analista responsable y evolución de reportes periódicos de cumplimiento.

RF-15 — Listar y filtrar solicitudes multicriterio

Prioridad: Media

Actor: Analista / Administrador

Descripción: El sistema debe permitir consultar el listado completo de solicitudes aplicando filtros dinámicos por estado (Pendiente, Aprobada, Rechazada), sector económico, zona franca y búsqueda textual por nombre de empresa.

RF-16 — Persistir estado integral en json-server (db.json)

Prioridad: Alta

Actor: Sistema

Descripción: Todas las entidades (zonas francas, solicitudes, empresas, reportes) deben persistir en db.json para permitir que el estado de la aplicación se conserve ante recargas de página o reinicios del backend.

RF-17 — Administrar múltiples zonas francas (Escalabilidad)

Prioridad: Baja (Diseño arquitectónico)

Actor: Administrador

Descripción: La arquitectura de datos y servicios debe soportar la incorporación de múltiples zonas francas con parámetros y umbrales diferenciados sin requerir cambios estructurales en el código fuente.

RF-18 — Panel de métricas globales (Dashboard)

Prioridad: Media

Actor: Administrador / Gerente

Descripción: El sistema debe calcular y mostrar en un panel interactivo métricas clave en tiempo real: total de solicitudes recibidas, solicitudes pendientes, solicitudes aprobadas, empresas en cumplimiento, empresas con alertas activas y montos acumulados.

10. Requerimientos no funcionales (RNF)

ID

Nombre

Especificación técnica verificable

RNF-01

Interfaz no bloqueante

Todas las peticiones HTTP y cálculos de evaluación deben ejecutarse en segundo plano mediante async/await y Promesas, sin congelar el hilo principal de renderizado del navegador.

RNF-02

Tiempo de respuesta percibido

Las operaciones asíncronas individuales deben ofrecer retroalimentación visual inmediata ($\le 200 \text{ ms}$) y completar el procesamiento en un tiempo percibido inferior a 3.0 segundos en condiciones normales de red local.

RNF-03

Procesamiento paralelo

El procesamiento en lote de solicitudes o reportes independientes debe emplear Promise.all para ejecutar las peticiones de forma concurrente, logrando un tiempo total menor a la suma lineal de las llamadas.

RNF-04

Compatibilidad y portabilidad

La aplicación debe ejecutarse directamente en navegadores web modernos estándares (Google Chrome $\ge 110$, Mozilla Firefox $\ge 110$, Microsoft Edge $\ge 110$) utilizando HTML5, CSS3 y JavaScript ES6+ modular sin necesidad de compiladores externos.

RNF-05

Gestión y comunicación de errores

Todos los errores de red, backend o datos deben ser interceptados mediante bloques try/catch, registrando el detalle técnico en la consola de depuración y presentando al usuario mensajes en lenguaje natural claros y orientados a la solución.

RNF-06

Persistencia y consistencia

El backend simulado con json-server debe mantener la integridad estructural del esquema de datos definido en db.json ante reinicios del servicio.

RNF-07

Fidelidad al diseño de interfaz

La interfaz de usuario debe implementar fielmente las vistas y componentes especificados en los mockups aprobados para Stitch (Formulario de Solicitud, Dashboard, Detalle de Solicitud, Formulario de Cumplimiento y Panel de Alertas).

RNF-08

Control de versiones y autoría

El proyecto debe mantener un historial de Git limpio y trazable mediante ramas funcionales (feature/*), Pull Requests documentados y contribuciones diferenciadas entre los integrantes del equipo.

RNF-09

Modularidad y mantenibilidad

El código JavaScript debe estructurarse siguiendo el patrón de módulos ES6 separados por responsabilidad: servicios (services/), módulos de negocio (modules/) y utilidades (utils/).

11. Historias de usuario

11.1 Empresa solicitante e instalada

HU-01 — Registro digital de solicitud

Como: Representante de una empresa interesada,

Quiero: Completar y enviar digitalmente mi solicitud de instalación con datos de inversión y empleo,

Para: Formalizar el trámite de ingreso sin depender de correos manuales ni transcripciones.

RF Asociados: RF-02, RF-03.

RNF Asociados: RNF-01, RNF-05, RNF-06.

HU-02 — Envío de reporte de cumplimiento

Como: Encargado de operaciones de una empresa instalada,

Quiero: Enviar periódicamente mis reportes de inversión ejecutada, empleo real y exportaciones en línea,

Para: Demostrar el cumplimiento de los compromisos adquiridos ante la zona franca y PROCOMER.

RF Asociados: RF-06.

RNF Asociados: RNF-01, RNF-05, RNF-06.

11.2 Analista de admisiones y cumplimiento

HU-03 — Preclasificación y puntaje asistido por IA

Como: Analista de admisiones,

Quiero: Obtener una evaluación automática de afinidad con puntaje (0–100) y justificación técnica para cada solicitud,

Para: Priorizar y agilizar el análisis técnico de las propuestas recibidas.

RF Asociados: RF-04, RF-05.

RNF Asociados: RNF-01, RNF-02.

HU-04 — Supervisión y decisión final humana

Como: Analista de admisiones,

Quiero: Revisar los detalles de la solicitud y confirmar, modificar o rechazar la recomendación de la IA con mis observaciones,

Para: Garantizar que la decisión legal y formal sea tomada bajo criterio y responsabilidad humana.

RF Asociados: RF-12.

RNF Asociados: RNF-05, RNF-06.

HU-05 — Detección y gestión de alertas de incumplimiento

Como: Analista de cumplimiento,

Quiero: Visualizar alertas automáticas cuando una empresa no alcance sus compromisos de inversión o empleo,

Para: Identificar brechas oportunamente y tomar acciones correctivas inmediatas.

RF Asociados: RF-07, RF-08.

RNF Asociados: RNF-01, RNF-05.

HU-06 — Evaluación en lote de solicitudes

Como: Analista de admisiones,

Quiero: Procesar la evaluación de múltiples solicitudes pendientes de manera concurrente con un solo clic,

Para: Ahorrar tiempo en jornadas con alto volumen de expedientes.

RF Asociados: RF-13.

RNF Asociados: RNF-01, RNF-03.

11.3 Administrador y Auditor

HU-07 — Panel de control y métricas consolidadas (Dashboard)

Como: Administrador de la zona franca,

Quiero: Visualizar un dashboard con métricas agregadas de solicitudes, cumplimiento y alertas en tiempo real,

Para: Tomar decisiones estratégicas y monitorear el desempeño global del régimen.

RF Asociados: RF-18.

RNF Asociados: RNF-01, RNF-02.

HU-08 — Búsqueda y filtrado multicriterio

Como: Analista o administrador,

Quiero: Filtrar las solicitudes por estado, sector, zona franca o texto libre,

Para: Localizar rápidamente expedientes específicos sin navegar manualmente toda la lista.

RF Asociados: RF-15.

RNF Asociados: RNF-01, RNF-04.

HU-09 — Trazabilidad y expediente histórico

Como: Auditor o gerente,

Quiero: Consultar la bitácora completa de una empresa (solicitud original, evaluación IA, dictamen del analista y reportes históricos),

Para: Sustentar auditorías formales y verificar la debida diligencia del proceso.

RF Asociados: RF-14, RF-16.

RNF Asociados: RNF-06, RNF-08.

HU-10 — Resumen de cumplimiento para fiscalización

Como: Analista de cumplimiento,

Quiero: Generar una vista consolidada de cumplimiento de todas las empresas instaladas,

Para: Facilitar la entrega periódica de información a los inspectores de PROCOMER.

RF Asociados: RF-09.

RNF Asociados: RNF-01, RNF-09.

11.4 Equipo de desarrollo y aseguramiento de calidad

HU-11 — Validación visual previa con Mockups

Como: Desarrollador del equipo,

Quiero: Disponer de especificaciones detalladas y mockups validados en Stitch para cada pantalla,

Para: Construir la interfaz de usuario con precisión de componentes y sin retrabajo.

RF Asociados: RNF-07.

RNF Asociados: RNF-07, RNF-09.

HU-12 — Validación estricta de requerimientos con IA

Como: Líder técnico del proyecto,

Quiero: Someter el documento de requerimientos a una validación exhaustiva con IA revisora,

Para: Garantizar completitud, verificabilidad, consistencia y trazabilidad antes de la fase de integración.

RF Asociados: RNF-08.

RNF Asociados: RNF-08, RNF-09.

12. Criterios de aceptación detallados (Dado / Cuando / Entonces)

CA-RF-01: Registrar y consultar zonas francas (RF-01)

Escenario 1 (Registro exitoso):

Dado que el administrador ingresa nombre, inversión mínima (> 0), empleos mínimos (> 0) y sectores válidos,

Cuando presiona guardar configuración de zona franca,

Entonces el sistema persiste los datos en json-server (/zonasFrancas) y muestra un mensaje de confirmación.

Escenario 2 (Datos inválidos):

Dado que se omiten campos obligatorios o se ingresan valores negativos o iguales a cero,

Cuando se intenta enviar el formulario,

Entonces el sistema bloquea el envío, resalta los campos incorrectos y no realiza peticiones al servidor.

CA-RF-02: Registrar y enviar solicitud de instalación (RF-02)

Escenario 1 (Envío conforme):

Dado que la empresa solicitante completa todos los campos obligatorios con valores positivos y selecciona un sector válido, independientemente de que esté permitido por la zona franca,

Cuando envía el formulario de solicitud,

Entonces el sistema registra la solicitud con estado Pendiente y muestra el identificador asignado.

Escenario 2 (Campos incompletos o vacíos):

Dado que falta el nombre de contacto o la identificación jurídica,

Cuando se intenta enviar la solicitud,

Entonces el sistema muestra alertas de validación en los campos requeridos y cancela la petición.

CA-RF-03: Guardar y consultar solicitudes de forma asíncrona (RF-03)

Escenario 1 (Persistencia asíncrona reactiva):

Dado que el backend json-server está activo en el puerto 3001,

Cuando se solicita guardar o consultar una solicitud,

Entonces el sistema resuelve la Promesa de red sin recargar la página web y actualiza el DOM de forma dinámica.

Escenario 2 (Caída de backend):

Dado que json-server está apagado o inaccesible,

Cuando se realiza una petición de guardado o consulta,

Entonces el sistema captura la excepción en un bloque try/catch y muestra una notificación amigable de error al usuario.

CA-RF-04: Evaluar solicitud mediante IA simulada (RF-04)

Escenario 1 (Cálculo de afinidad completo):

Dado que existe una solicitud válida y los criterios de la zona franca están cargados,

Cuando se ejecuta la evaluación por IA,

Entonces el servicio retorna una Promesa resuelta con un puntaje entero entre 0 y 100 y una justificación textual explicativa.

Escenario 2 (Datos insuficientes para evaluación):

Dado que la solicitud carece de montos de inversión o empleo,

Cuando se invoca el evaluador de IA,

Entonces la Promesa se rechaza con un mensaje de error descriptivo capturado por el módulo llamador.

CA-RF-05: Clasificar automáticamente la solicitud (RF-05)

Escenario 1 (Clasificación Recomendada):

Dado que el motor de IA calcula un puntaje de afinidad $\ge 75$,

Cuando concluye la evaluación,

Entonces asigna la clasificación preliminar Recomendada.

Escenario 2 (Clasificación Revisar):

Dado que el motor de IA calcula un puntaje entre 50 y 74,

Cuando concluye la evaluación,

Entonces asigna la clasificación preliminar Revisar.

Escenario 3 (Clasificación Rechazada):

Dado que el motor de IA calcula un puntaje $< 50$,

Cuando concluye la evaluación,

Entonces asigna la clasificación preliminar Rechazada.

CA-RF-06: Registrar reporte periódico de cumplimiento (RF-06)

Escenario 1 (Registro de reporte válido):

Dado que una empresa instalada selecciona su identificador e ingresa empleos reales ($\ge 0$), inversión ejecutada ($\ge 0$) y exportaciones ($\ge 0$) para un periodo determinado,

Cuando envía el formulario de cumplimiento,

Entonces el sistema guarda el reporte en json-server (/reportesCumplimiento) y muestra confirmación de registro exitoso.

Escenario 2 (Valores negativos o datos no numéricos):

Dado que el usuario ingresa valores negativos en empleo o inversión,

Cuando intenta guardar el reporte,

Entonces el formulario intercepta el error, muestra un mensaje de validación y previene el envío.

CA-RF-07: Comparar cumplimiento contra compromisos originales (RF-07)

Escenario 1 (Cálculo automático de porcentajes):

Dado un compromiso de 50 empleos y $100,000 de inversión, y un reporte de 40 empleos y $120,000 de inversión,

Cuando se procesa el reporte de cumplimiento,

Entonces el sistema calcula $80%$ de cumplimiento en empleo y $120%$ en inversión, identificando la brecha de $-10$ empleos.

CA-RF-08: Generar y visualizar alertas de incumplimiento (RF-08)

Escenario 1 (Emisión de alerta por déficit):

Dado que una empresa reporta un valor de empleo o inversión inferior al $100%$ del compromiso,

Cuando el sistema procesa el reporte o se consulta el módulo de alertas,

Entonces se genera y lista una alerta roja/ámbar detallando: nombre de empresa, indicador incumplido, meta comprometida, valor alcanzado y brecha.

Escenario 2 (Empresa en regla sin alertas):

Dado que una empresa alcanza o supera el $100%$ en todos sus compromisos,

Cuando se evalúa el reporte,

Entonces el estado asignado es En regla y no se emiten alertas de incumplimiento.

CA-RF-09: Visualizar resumen consolidado de cumplimiento (RF-09)

Escenario 1 (Generación de consolidado):

Dado que existen reportes registrados de diversas empresas,

Cuando el analista ingresa a la vista de cumplimiento,

Entonces el sistema muestra la tabla consolidada con totales de inversión ejecutada, empleo global y categorización de empresas (En regla, Con alertas).

CA-RF-10: Mostrar indicadores visuales de carga (RF-10)

Escenario 1 (Activación y desactivación del indicador):

Dado que se inicia una petición asíncrona de consulta o guardado,

Cuando la Promesa se encuentra en estado pending,

Entonces la UI muestra un indicador "Cargando datos...", y al cambiar la Promesa a fulfilled o rejected, el indicador se oculta inmediatamente.

CA-RF-11: Manejo amigable y robusto de errores (RF-11)

Escenario 1 (Captura de error de red sin bloqueo):

Dado un fallo en la conexión con la API REST,

Cuando se ejecuta una acción del usuario,

Entonces la aplicación muestra un mensaje amigable ("No se pudo conectar con el servidor. Verifique que json-server esté corriendo"), manteniendo la interfaz activa y funcional.

CA-RF-12: Confirmar o modificar decisión de IA por analista humano (RF-12)

Escenario 1 (Confirmación de decisión):

Dado que una solicitud posee una clasificación sugerida por la IA,

Cuando el analista revisa el detalle, selecciona la decisión definitiva (Aprobada, Rechazada, En revisión), ingresa su nombre y observaciones, y presiona "Confirmar decisión",

Entonces el sistema actualiza el registro en json-server con los datos del dictamen humano y actualiza el estado general.

CA-RF-13: Procesamiento y evaluación paralela con Promise.all (RF-13)

Escenario 1 (Evaluación concurrente por lotes):

Dado un conjunto de $N$ solicitudes pendientes,

Cuando el usuario pulsa "Evaluar todas con IA",

Entonces el sistema dispara las $N$ promesas concurrentemente mediante Promise.all, actualizando todos los registros en un tiempo total inferior a la suma de procesarlos secuencialmente y manteniendo la interfaz disponible.

CA-RF-14: Consultar historial y trazabilidad por empresa (RF-14)

Escenario 1 (Consulta de expediente):

Dado un identificador de empresa seleccionada,

Cuando se abre su vista detallada,

Entonces se despliega la cronología: fecha de ingreso, evaluación IA, analista que aprobó y lista histórica de reportes periódicos.

CA-RF-15: Listar y filtrar solicitudes multicriterio (RF-15)

Escenario 1 (Filtrado dinámico en tiempo real):

Dado un listado de solicitudes cargadas,

Cuando el usuario escribe en la barra de búsqueda o cambia el filtro de estado/sector,

Entonces la tabla se actualiza instantáneamente mostrando únicamente las solicitudes que coinciden con los criterios.

CA-RF-16: Persistir estado integral en json-server (RF-16)

Escenario 1 (Verificación de persistencia):

Dado que se crea o modifica una solicitud o reporte,

Cuando se recarga la página del navegador (F5),

Entonces el sistema consulta a json-server y recupera exactamente la información modificada.

CA-RF-17: Administrar múltiples zonas francas (RF-17)

Escenario 1 (Soporte multi-entidad):

Dado que en db.json existen dos o más zonas francas registradas,

Cuando el usuario interactúa con los selectores de la aplicación,

Entonces el sistema permite asociar solicitudes y criterios a la zona franca correspondiente sin conflictos.

CA-RF-18: Panel de métricas globales (RF-18)

Escenario 1 (Cálculo de métricas en dashboard):

Dado que el sistema carga las colecciones de solicitudes, empresas y reportes,

Cuando se renderiza la página del Dashboard,

Entonces se muestran tarjetas con: total de solicitudes, solicitudes pendientes, solicitudes aprobadas, empresas en regla, empresas con incumplimiento y total de alertas activas.

13. Matriz de trazabilidad exhaustiva

Historia de Usuario

Requisito relacionado (RF/RNF)

Criterio de Aceptación (CA)

Requerimiento No Funcional (RNF)

Módulo / Servicio Responsable

HU-01

RF-01, RF-02, RF-03

CA-RF-01, CA-RF-02, CA-RF-03

RNF-01, RNF-05, RNF-06

solicitudesService.js, solicitudes.js

HU-02

RF-06

CA-RF-06

RNF-01, RNF-05, RNF-06

reportesService.js, cumplimiento.js

HU-03

RF-04, RF-05

CA-RF-04, CA-RF-05

RNF-01, RNF-02, RNF-09

iaService.js, solicitudes.js

HU-04

RF-12

CA-RF-12

RNF-05, RNF-06

solicitudes.js, detalle-solicitud.html

HU-05

RF-07, RF-08

CA-RF-07, CA-RF-08

RNF-01, RNF-05, RNF-09

cumplimiento.js, alertas.js

HU-06

RF-13

CA-RF-13

RNF-01, RNF-03

app.js, iaService.js

HU-07

RF-18

CA-RF-18

RNF-01, RNF-02

app.js, dashboard.html

HU-08

RF-15

CA-RF-15

RNF-01, RNF-04

solicitudes.js, solicitudes.html

HU-09

RF-14, RF-16

CA-RF-14, CA-RF-16

RNF-06, RNF-08

solicitudesService.js, reportesService.js

HU-10

RF-09

CA-RF-09

RNF-01, RNF-09

cumplimiento.js, cumplimiento.html

HU-11

RNF-07

RNF-07

RNF-07, RNF-09

mockups/README.md, css/styles.css

HU-12

RNF-08

RNF-08

RNF-08, RNF-09

docs/validacion-ia.md, Git

14. Rol y diseño de la asincronía en JavaScript

La plataforma ZoFranca CR implementa un modelo de programación asíncrona estricto para garantizar que la interfaz de usuario se mantenga siempre reactiva y fluida:

Patrón / Mecanismo

Justificación e Implementación en el Proyecto

Promise

Encapsula todas las operaciones de entrada/salida diferidas: llamadas HTTP mediante fetch(), retardos controlados de simulación de IA y lectura de almacenamiento.

async / await

Proporciona una sintaxis secuencial y legible para orquestar flujos asíncronos complejos (p. ej. validar datos $\to$ consultar zona franca $\to$ enviar a IA $\to$ guardar en backend).

Promise.all

Se utiliza para ejecutar operaciones independientes en paralelo: carga simultánea de solicitudes, empresas y reportes para el dashboard; y evaluación masiva en lote de múltiples solicitudes mediante IA.

try / catch / finally

Asegura el control total sobre excepciones de red, caídas de servidor o errores de parseo JSON, garantizando que el usuario reciba retroalimentación comprensible y que los indicadores de carga se apaguen siempre en el bloque finally.

Estados de UI

Manejo explícito de los tres estados del ciclo de vida asíncrono: Cargando (deshabilita botones y muestra spinner), Éxito (renderiza datos y confirma) y Error (alerta visual amigable).

15. Rol y funcionamiento de la Inteligencia Artificial

15.1 Propósito y alcance

El módulo de Inteligencia Artificial opera como un asistente de soporte a la decisión (Human-in-the-Loop). En ningún caso la IA tiene la potestad de emitir una aprobación o rechazo con efecto legal; su función es estandarizar la evaluación inicial, filtrar casos no viables y priorizar la bandeja de trabajo de los analistas humanos.

15.2 Algoritmo de afinidad (Simulación académica)

El motor de IA implementado en iaService.js evalúa tres dimensiones cuantitativas:

Validación de sector ($30%$ del peso): Verifica si el sector económico de la empresa pertenece a la lista de sectores autorizados de la zona franca. Si no pertenece, el puntaje base sufre una penalización sustancial.

Inversión proyectada ($40%$ del peso): Compara el monto de inversión frente a la inversión mínima requerida. Si la inversión es igual o superior al doble del mínimo, obtiene el puntaje máximo en este rubro.

Generación de empleo ($30%$ del peso): Evalúa la cantidad de plazas laborales proyectadas frente al umbral de la zona franca.

$$\text{Puntaje Total} = \text{Puntaje}{\text{Sector}} + \text{Puntaje}{\text{Inversión}} + \text{Puntaje}_{\text{Empleo}} \quad (0 \le \text{Puntaje} \le 100)$$

15.3 Salida generada por la IA

puntaje: Número entero entre 0 y 100.

clasificacionSugerida: Recomendada ($\ge 75$), Revisar ($50-74$) o Rechazada ($< 50$).

justificacion: Texto descriptivo en lenguaje natural explicando los motivos del puntaje (ej. "Supera ampliamente la inversión mínima en tecnología pero su proyección de empleo es ajustada").

fechaEvaluacion: Marca de tiempo ISO del momento del análisis.

16. Evidencia y protocolo de validación de requerimientos con IA

Para garantizar el cumplimiento de los más altos estándares de calidad de software, este documento se somete a validación mediante el Prompt Oficial de Evaluación.

16.1 Criterios de evaluación (100 puntos totales)

Completitud (20 pts): Cobertura exhaustiva de solicitudes, cumplimiento, alertas, dashboard, asincronía e IA.

Verificabilidad (20 pts): Criterios de aceptación formales (Dado/Cuando/Entonces) y métricas cuantitativas sin ambigüedad.

Consistencia (20 pts): Coherencia lógica total entre RF, RNF, historias de usuario y matriz de trazabilidad.

Trazabilidad (20 pts): Mapeo bidireccional completo entre HU $\to$ RF $\to$ CA $\to$ RNF.

Redacción profesional (20 pts): Ortografía, formato markdown impecable, codificación UTF-8 pura y lenguaje técnico riguroso.

16.2 Condición de aprobación

$$\text{Puntaje Total} \ge 80/100 \quad \land \quad \forall \text{ Categoría } \ge 12/20$$

El historial de intentos, puntajes reales y mejoras implementadas se documentan en docs/validacion-ia.md.

16.3 Resultado de la validación final

La segunda evaluación formal del documento produjo los siguientes resultados:

Categoría

Puntaje

Completitud

18/20

Verificabilidad

18/20

Consistencia

16/20

Trazabilidad

18/20

Redacción profesional

19/20

Total

89/100

RESULTADO: APROBADO. El documento supera el mínimo de 80/100 y ninguna categoría se encuentra por debajo de 12/20. Las observaciones de consistencia y verificabilidad identificadas durante la evaluación fueron corregidas en esta versión final.

17. Alcance, supuestos y extensiones futuras

17.1 Alcance de la versión actual (Laboratorio #3)

Implementación de una zona franca activa ("Zona Franca Tica") con posibilidad de agregar más en db.json.

Módulo completo de recepción, evaluación IA y resolución humana de solicitudes.

Módulo completo de registro periódico de cumplimiento, comparación contra metas y cálculo de porcentajes.

Generación y visualización interactiva de alertas de incumplimiento.

Dashboard de métricas consolidadas en tiempo real.

Persistencia integral en json-server (http://localhost:3001).

17.2 Extensiones futuras planificadas

Fase futura 2 — Seguridad, usuarios e integraciones oficiales. Esta fase incorporará autenticación y roles diferenciados para empresas, analistas, administradores y auditores; además, permitirá enviar notificaciones automáticas e integrar reportes con los sistemas oficiales de PROCOMER. Implicaría nuevos requerimientos funcionales para inicio de sesión, autorización por rol, notificaciones y transmisión de reportes, junto con requerimientos no funcionales de seguridad, privacidad y disponibilidad. No se implementó en esta primera versión porque el laboratorio utiliza un backend académico con json-server, sin infraestructura de identidad ni acceso a servicios oficiales.

Fase futura 3 — IA documental y analítica avanzada. Esta fase permitirá analizar documentos PDF mediante un modelo de lenguaje real, redactar respuestas formales sujetas a revisión humana y generar paneles históricos con tendencias de inversión, empleo y exportaciones. Requerirá nuevos RF para carga y análisis documental, aprobación humana del texto generado, exportación a PDF/Excel y visualizaciones temporales; también exigirá RNF relacionados con costos, protección de documentos, explicabilidad y precisión del modelo. Se dejó fuera del alcance inicial para concentrar el MVP en la evaluación estructurada, la asincronía y el seguimiento básico de cumplimiento.
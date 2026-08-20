# Validación IA — ZoFranca CR

Documento de registro y trazabilidad de las evaluaciones de calidad aplicadas al documento de requerimientos mediante inteligencia artificial.

---

## Intento 1

* **Fecha:** 20 de agosto de 2026
* **Evaluador:** Modelo de IA en rol de analista de negocio sénior
* **Documento evaluado:** Primera versión consolidada de los requerimientos de ZoFranca CR

### Criterios de evaluación

| Categoría                |    Puntaje |
| ------------------------ | ---------: |
| 1. Completitud           |      18/20 |
| 2. Verificabilidad       |      16/20 |
| 3. Consistencia          |      15/20 |
| 4. Trazabilidad          |      14/20 |
| 5. Redacción profesional |      14/20 |
| **PUNTAJE TOTAL**        | **77/100** |

**RESULTADO:** `RECHAZADO`

Criterio de aprobación: total igual o superior a 80/100 y ninguna categoría individual por debajo de 12/20.

---

### Justificación detallada del Intento 1

#### 1. Completitud — 18/20

El documento cubría los principales componentes solicitados: contexto y objetivos, actores, funciones y datos, reglas de negocio, proceso manual, RF-01 a RF-18, RNF-01 a RNF-09, historias de usuario, criterios de aceptación, proceso automatizado, asincronía, IA y matriz de trazabilidad.

Se descontaron puntos porque algunas relaciones entre historias, criterios y requerimientos no estaban completamente desarrolladas.

#### 2. Verificabilidad — 16/20

Los RF de prioridad alta contaban con criterios en formato Dado/Cuando/Entonces. Sin embargo, RF-06 requería mayor precisión en sus validaciones.

RF-07, RF-09, RF-10, RF-14, RF-15, RF-17 y RF-18 no tenían criterios de aceptación formales equivalentes. Algunos RNF utilizaban expresiones ambiguas como “pocos segundos” o “navegador web moderno”.

#### 3. Consistencia — 15/20

La visión general era consistente: la IA propone una clasificación preliminar y el analista humano toma la decisión definitiva.

No obstante, la matriz de trazabilidad hacía referencia a identificadores de criterios que todavía no estaban definidos explícitamente en el cuerpo del documento.

#### 4. Trazabilidad — 14/20

La matriz no cubría completamente todos los RF ni todos los identificadores de criterios citados. Esto impedía seguir algunas relaciones desde la historia de usuario hasta el requisito y su correspondiente criterio de aceptación.

#### 5. Redacción profesional — 14/20

Se encontraron caracteres dañados por problemas de codificación, entre ellos `Ã`, `Â` y `â`. Algunas palabras afectadas eran `administración`, `auditoría` e `inversión`.

---

### Resultado oficial del Intento 1

```text
PUNTAJE TOTAL: 77/100
RESULTADO: RECHAZADO
```

```text
TOP 3 CORRECCIONES OBLIGATORIAS ANTES DE REINTENTAR:

1. Corregir completamente la codificación UTF-8 y eliminar caracteres dañados como Ã, Â y â.
2. Completar la matriz de trazabilidad, asegurando que cada criterio citado exista y corresponda con el RF indicado.
3. Agregar criterios de aceptación claros y métricas cuantitativas verificables.
```

---

## Correcciones implementadas después del Intento 1

### 1. Corrección de codificación

Se reescribió `docs/requerimientos.md` utilizando UTF-8 y se eliminaron caracteres dañados, cabeceras residuales y fragmentos ajenos al documento.

### 2. Matriz de trazabilidad integral

Se elaboró una tabla que relaciona las historias HU-01 a HU-12 con los requerimientos RF-01 a RF-18, sus criterios CA-RF-01 a CA-RF-18, los RNF-01 a RNF-09 y los módulos responsables.

### 3. Criterios de aceptación completos

Se definieron criterios formales para todos los requerimientos funcionales, incluyendo RF-06 a RF-18, mediante escenarios en formato Dado/Cuando/Entonces.

### 4. Requerimientos no funcionales verificables

Se incorporaron condiciones cuantitativas como:

* Retroalimentación visual en 200 ms o menos.
* Tiempo percibido inferior a 3 segundos en red local.
* Compatibilidad con versiones específicas de Chrome, Firefox y Edge.
* Procesamiento paralelo mediante `Promise.all`.
* Persistencia verificable en `db.json`.

### 5. Ampliación del documento

Se incorporaron:

* Glosario de 12 términos.
* Proceso automatizado.
* Descripción de la asincronía.
* Funcionamiento de la IA.
* Matriz de trazabilidad.
* Alcance y futuras ampliaciones.

---

## Intento 2 — Validación oficial

* **Fecha:** 20 de agosto de 2026
* **Evaluador:** ChatGPT, actuando como analista de negocio sénior
* **Documento evaluado:** ZoFranca CR — Documento de Requerimientos, versión consolidada 2.0

### Prompt oficial utilizado

```text
Actuá como un/a profesional senior en levantamiento y revisión de requerimientos de software, con más de 10 años de experiencia como analista de negocio (Business Analyst) en proyectos web.

Te voy a pegar un documento de requerimientos de un proyecto académico llamado "ZoFranca CR". Tu trabajo es EVALUARLO de forma estricta, como si fuera un examen que el documento debe aprobar antes de que el equipo empiece a programar. No corrijas el documento por mí: señalá los problemas para que el equipo los corrija.

Evaluá el documento en estas 5 categorías, cada una sobre 20 puntos:

1. Completitud (¿cubre solicitudes, cumplimiento, IA y colaboración?)
2. Verificabilidad (¿cada RF se puede probar con un criterio de aceptación claro, sin ambigüedad?)
3. Consistencia (¿los RF, RNF e historias de usuario no se contradicen entre sí?)
4. Trazabilidad (¿se puede seguir la relación entre historia de usuario -> RF -> criterio de aceptación?)
5. Redacción profesional (¿lenguaje claro, sin jerga innecesaria, sin errores evidentes?)

Para cada categoría dame:
- puntaje de 0 a 20
- problemas encontrados
- sección o RF exacto afectado

Al final utiliza exactamente:

PUNTAJE TOTAL: X/100
RESULTADO: APROBADO o RECHAZADO
(APROBADO solo si el total es >= 80 Y ninguna categoría individual está por debajo de 12/20)

TOP 3 CORRECCIONES OBLIGATORIAS ANTES DE REINTENTAR:
1.
2.
3.

Sé exigente: preferí rechazar un documento ambiguo a aprobarlo por cortesía.

Este es el documento de requerimientos a evaluar:

[Se adjuntó el contenido completo de docs/requerimientos.md]
```

---

## Registro de resultados del Intento 2

| Categoría                |    Puntaje |
| ------------------------ | ---------: |
| 1. Completitud           |      18/20 |
| 2. Verificabilidad       |      18/20 |
| 3. Consistencia          |      16/20 |
| 4. Trazabilidad          |      18/20 |
| 5. Redacción profesional |      19/20 |
| **PUNTAJE TOTAL**        | **89/100** |

**RESULTADO:** `APROBADO`

El documento supera el mínimo de 80/100 y ninguna categoría individual está por debajo de 12/20.

---

### Justificación detallada del Intento 2

#### 1. Completitud — 18/20

El documento cubre solicitudes, cumplimiento, IA, asincronía, colaboración, trazabilidad, reglas de negocio, RF-01 a RF-18, RNF-01 a RNF-09, historias y criterios de aceptación.

Durante la evaluación se observó que la entrevista contenía 7 preguntas en lugar de las 10–12 solicitadas. Esta observación fue corregida posteriormente en la versión final.

#### 2. Verificabilidad — 18/20

Todos los RF poseen criterios en formato Dado/Cuando/Entonces y los RNF incorporan métricas comprobables.

Se recomendó reemplazar la expresión “tiempo global óptimo” de CA-RF-13 por una condición medible que permitiera comparar el procesamiento concurrente con el procesamiento secuencial.

#### 3. Consistencia — 16/20

La estructura general es coherente y mantiene la decisión definitiva bajo responsabilidad humana.

Se detectó una contradicción entre RN-02, RF-02 y CA-RF-02. Exigir que una solicitud alcanzara los mínimos habría impedido registrar solicitudes destinadas a clasificarse posteriormente como `Revisar` o `Rechazada`.

También se observó que el proceso automatizado atribuía `Promise.all` a la evaluación de una solicitud individual, aunque su uso corresponde al procesamiento concurrente de varias operaciones independientes.

#### 4. Trazabilidad — 18/20

La matriz vincula historias de usuario, RF, CA, RNF y módulos responsables.

Se recomendó cambiar el encabezado “Requerimiento Funcional” por “Requisito relacionado (RF/RNF)” para representar correctamente las relaciones de HU-11 y HU-12 con requerimientos no funcionales.

#### 5. Redacción profesional — 19/20

El documento presenta lenguaje claro, estructura profesional, identificadores consistentes y codificación UTF-8 correcta.

Como observación menor, se recomendó sustituir algunas expresiones valorativas por formulaciones más objetivas y verificables.

---

### Resultado oficial del Intento 2

```text
PUNTAJE TOTAL: 89/100
RESULTADO: APROBADO
```

```text
TOP 3 CORRECCIONES OBLIGATORIAS ANTES DE REINTENTAR:

No se requiere un nuevo intento porque el documento fue APROBADO.

MEJORAS RECOMENDADAS:

1. Ampliar la entrevista simulada de 7 a 10–12 preguntas.
2. Corregir RN-02 y CA-RF-02 para permitir registrar solicitudes que no alcancen los mínimos.
3. Ajustar la matriz de HU-11 y HU-12 y precisar CA-RF-13.
```

---

## Mejoras incorporadas después de la aprobación

Aunque el documento obtuvo el resultado `APROBADO`, el equipo incorporó las recomendaciones para fortalecer su versión final.

### 1. Entrevista simulada

La entrevista se amplió de 7 a 10 preguntas, cumpliendo el rango solicitado por el laboratorio.

### 2. Regla RN-02

RN-02 fue modificada para establecer que la inversión y los empleos deben ser valores mayores que cero, pero no necesariamente alcanzar los mínimos para registrar una solicitud.

Las solicitudes que no alcancen los umbrales pueden guardarse y posteriormente clasificarse como `Revisar` o `Rechazada`.

### 3. Criterio CA-RF-02

El criterio fue corregido para permitir el registro de sectores no admitidos. La condición del sector será evaluada posteriormente por el motor de IA y no impedirá guardar la solicitud.

### 4. Procesamiento concurrente

CA-RF-13 ahora exige que el tiempo total sea inferior a la suma del procesamiento secuencial y que la interfaz permanezca disponible.

### 5. Matriz de trazabilidad

La columna `Requerimiento Funcional (RF)` fue reemplazada por `Requisito relacionado (RF/RNF)`.

### 6. Uso conceptual de Promise.all

El proceso automatizado fue corregido para indicar que `Promise.all` se utiliza al procesar varias solicitudes u operaciones independientes, no para una única evaluación.

### 7. Hoja de ruta futura

Las ampliaciones se organizaron en fases que explican:

* El problema que resolverá cada fase.
* Los nuevos RF y RNF necesarios.
* La razón por la cual no forman parte de la primera versión.

---

## Veredicto final

El documento de requerimientos de ZoFranca CR queda formalmente aprobado como base para la implementación y entrega académica.

| Resultado final                |        Valor |
| ------------------------------ | -----------: |
| Puntaje                        |   **89/100** |
| Estado                         | **APROBADO** |
| Categorías por debajo de 12/20 |  **Ninguna** |
| Reintento adicional requerido  |       **No** |

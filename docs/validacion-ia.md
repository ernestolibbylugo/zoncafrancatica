# Validación IA — ZoFranca CR

Documento de registro y trazabilidad de evaluaciones de calidad de requerimientos mediante Inteligencia Artificial.

---

## Intento 1

- **Fecha:** 20 de agosto de 2026
- **Evaluador:** Modelo de IA (Revisión de requerimientos / Rol Business Analyst)

### Criterios de evaluación

| Categoría | Puntaje |
|---|---|
| 1. Completitud | 18 / 20 |
| 2. Verificabilidad | 16 / 20 |
| 3. Consistencia | 15 / 20 |
| 4. Trazabilidad | 14 / 20 |
| 5. Redacción profesional | 14 / 20 |
| **PUNTAJE TOTAL** | **77 / 100** |

**RESULTADO:** `RECHAZADO`
*(Criterio de aprobación: Total $\ge 80/100$ y ninguna categoría individual $< 12/20$)*

---

### Justificación detallada (Intento 1)

1. **Completitud — 18/20:**
   El documento cubre los principales componentes solicitados: contexto y objetivos, actores, funciones y datos, reglas de negocio, proceso manual, RF-01 a RF-18, RNF-01 a RNF-09, historias de usuario, criterios de aceptación, proceso automatizado, asincronía, IA y matriz de trazabilidad. Se descuentan puntos porque algunas relaciones entre historias, criterios y requerimientos no estaban totalmente completas.

2. **Verificabilidad — 16/20:**
   Los RF de prioridad alta cuentan con criterios Dado/Cuando/Entonces. Sin embargo, RF-06 requiere mayor precisión en validaciones de datos; RF-07, RF-09, RF-10, RF-14, RF-15, RF-17 y RF-18 carecen de criterios de aceptación formales equivalentes, y algunos RNF usan expresiones ambiguas como "pocos segundos" o "navegador web moderno".

3. **Consistencia — 15/20:**
   La visión general es consistente: la IA propone y el analista humano decide. Sin embargo, en la matriz de trazabilidad se referenciaban identificadores de criterios que no estaban definidos explícitamente en el cuerpo del documento.

4. **Trazabilidad — 14/20:**
   La matriz no cubría de forma completa todos los RF ni todos los identificadores de criterios citados.

5. **Redacción profesional — 14/20:**
   Se detectaron caracteres dañados por codificación en varias secciones (`Ã`, `Â`, `â`), tales como `administraciÃ³n`, `auditorÃ­a`, `inversiÃ³n`.

---

### Top 3 correcciones obligatorias identificadas:
1. Corregir completamente la codificación UTF-8 y eliminar caracteres dañados como `Ã`, `Â`, `â`.
2. Completar y corregir la matriz de trazabilidad asegurando que cada criterio citado exista realmente y corresponda al RF indicado.
3. Mejorar la verificabilidad de los requerimientos agregando criterios de aceptación claros (Dado/Cuando/Entonces) y precisando métricas cuantitativas en los RNF.

---

## Correcciones implementadas tras el Intento 1

1. **Corrección de codificación:** Se reescribió `docs/requerimientos.md` en UTF-8 puro, eliminando completamente caracteres espurios y cabeceras residuales de chat.
2. **Matriz de trazabilidad integral:** Se estructuró una tabla unificada que vincula exhaustivamente las historias HU-01 a HU-12 con los requerimientos RF-01 a RF-18, sus criterios de aceptación CA-RF-01 a CA-RF-18 y los RNF-01 a RNF-09, asignando además los módulos de código responsables.
3. **Verificabilidad y criterios Dado/Cuando/Entonces:** Se definieron criterios de aceptación formales para todos los requerimientos funcionales (incluyendo RF-06 a RF-18) con escenarios de éxito y casos de excepción/error, y se cuantificaron los RNF (ej. tiempo de respuesta $\le 3.0\text{ s}$, navegadores específicos, puertos de red).

---

## Intento 2 — Protocolo de validación oficial

### Prompt oficial de evaluación
```text
Actuá como un/a profesional senior en levantamiento y revisión de requerimientos de software, con más de 10 años de experiencia como analista de negocio (Business Analyst) en proyectos web.

Te voy a pegar un documento de requerimientos de un proyecto académico llamado ZoFranca CR. Tu trabajo es EVALUARLO de forma estricta, como si fuera un examen que el documento debe aprobar antes de que el equipo empiece a programar. No corrijas el documento por mí: señalá los problemas para que el equipo los corrija.

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

Sé exigente.
```

### Registro de resultados (Intento 2)
- **Fecha:** Pendiente de ejecución externa
- **Estado:** Documento preparado y corregido, listo para evaluación externa.
- **Resultado registrado:** *(Se registrará el resultado y desglose exacto obtenido al someter el documento al evaluador externo).*
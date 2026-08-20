/**
 * ZoFranca CR — Suite de Pruebas Automatizadas
 * Valida la lógica de negocio, cálculos de cumplimiento, generación de alertas,
 * validaciones y concurrencia con Promise.all.
 */

import assert from 'node:assert';
import { Validaciones } from '../js/utils/validaciones.js';
import { CumplimientoModule } from '../js/modules/cumplimiento.js';
import { AlertasModule } from '../js/modules/alertas.js';
import { IAService } from '../js/services/iaService.js';

console.log('====================================================');
console.log('🧪 Iniciando Suite de Pruebas — ZoFranca CR');
console.log('====================================================\n');

let totalTests = 0;
let testsPassed = 0;

function runTest(nombre, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${nombre}`);
    testsPassed++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${nombre}`);
    console.error(`     Error: ${err.message}\n`);
  }
}

async function runAsyncTest(nombre, fn) {
  totalTests++;
  try {
    await fn();
    console.log(`  ✅ [PASS] ${nombre}`);
    testsPassed++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${nombre}`);
    console.error(`     Error: ${err.message}\n`);
  }
}

// ----------------------------------------------------
// 1. Validaciones de Datos y Formularios
// ----------------------------------------------------
console.log('1. Validaciones de Datos (validaciones.js)');

runTest('Debe rechazar solicitud con datos incompletos o negativos', () => {
  const invalida = {
    empresa: '',
    identificacion: '123',
    sector: '',
    inversionProyectada: -5000,
    empleosProyectados: 0,
    contacto: '',
    email: 'correo_invalido'
  };

  const resultado = Validaciones.validarSolicitud(invalida);
  assert.strictEqual(resultado.esValido, false);
  assert.ok(resultado.errores.length >= 5, 'Debe reportar múltiples errores de validación');
});

runTest('Debe aceptar solicitud con datos válidos', () => {
  const valida = {
    empresa: 'MedTech CR S.A.',
    identificacion: '3-101-998877',
    sector: 'tecnologia',
    inversionProyectada: 120000,
    empleosProyectados: 20,
    contacto: 'María Solano',
    email: 'msolano@medtech.cr'
  };

  const resultado = Validaciones.validarSolicitud(valida);
  assert.strictEqual(resultado.esValido, true);
  assert.strictEqual(resultado.errores.length, 0);
});

runTest('Debe validar reporte de cumplimiento rechazando valores negativos', () => {
  const reporteInvalido = {
    empresaId: 1,
    periodo: '2026-T1',
    empleosReales: -5,
    inversionEjecutada: 10000,
    exportaciones: -1000
  };

  const res = Validaciones.validarReporteCumplimiento(reporteInvalido);
  assert.strictEqual(res.esValido, false);
  assert.ok(res.errores.some(e => e.includes('empleos reales')));
  assert.ok(res.errores.some(e => e.includes('exportaciones')));
});

// ----------------------------------------------------
// 2. Módulo de Cumplimiento (cumplimiento.js)
// ----------------------------------------------------
console.log('\n2. Lógica de Cumplimiento y Comparativos (cumplimiento.js)');

runTest('Debe calcular cumplimiento "En regla" cuando se alcanzan o superan las metas', () => {
  const empresa = {
    id: 1,
    nombre: 'TechCorp Global S.A.',
    inversionComprometida: 100000,
    empleosComprometidos: 20
  };

  // Reporte con 25 empleos y $110,000 ejecutados
  const comp = CumplimientoModule.calcularComparativo(empresa, 25, 110000);

  assert.strictEqual(comp.cumpleEmpleo, true);
  assert.strictEqual(comp.cumpleInversion, true);
  assert.strictEqual(comp.porcentajeEmpleo, 125);
  assert.strictEqual(comp.porcentajeInversion, 110);
  assert.strictEqual(comp.diferenciaEmpleo, 5);
  assert.strictEqual(comp.diferenciaInversion, 10000);
  assert.strictEqual(comp.estadoCumplimiento, 'En regla');
});

runTest('Debe clasificar como "Incumplimiento" cuando los empleos están por debajo del compromiso', () => {
  const empresa = {
    id: 2,
    nombre: 'Logística CR',
    inversionComprometida: 200000,
    empleosComprometidos: 30
  };

  // Reporte con 20 empleos (déficit 10) e inversión completa $200,000
  const comp = CumplimientoModule.calcularComparativo(empresa, 20, 200000);

  assert.strictEqual(comp.cumpleEmpleo, false);
  assert.strictEqual(comp.cumpleInversion, true);
  assert.strictEqual(comp.diferenciaEmpleo, -10);
  assert.strictEqual(comp.porcentajeEmpleo, 66.67);
  assert.strictEqual(comp.estadoCumplimiento, 'Incumplimiento');
});

// ----------------------------------------------------
// 3. Módulo de Alertas (alertas.js)
// ----------------------------------------------------
console.log('\n3. Detección y Generación de Alertas (alertas.js)');

runTest('Debe generar alertas detalladas cuando existen brechas de empleo e inversión', () => {
  const empresas = [
    { id: 1, nombre: 'Empresa A', identificacion: '3-101-1', empleosComprometidos: 50, inversionComprometida: 100000 }
  ];

  const reportes = [
    {
      id: 101,
      empresaId: 1,
      periodo: '2026-T1',
      fechaReporte: '2026-04-15',
      empleosReales: 35, // Déficit de 15 empleos (70% -> severidad crítica < 75%)
      inversionEjecutada: 80000, // Déficit de $20,000 (80% -> severidad moderada)
      observaciones: 'Problemas de importación'
    }
  ];

  const alertas = AlertasModule.generarAlertasDesdeReportes(reportes, empresas);

  assert.strictEqual(alertas.length, 2, 'Debe generar exactamente 2 alertas (1 de empleo, 1 de inversión)');
  
  const alertaEmpleo = alertas.find(a => a.tipoIndicador === 'Empleo');
  assert.ok(alertaEmpleo, 'Debe existir alerta de empleo');
  assert.strictEqual(alertaEmpleo.severidad, 'Crítica');
  assert.strictEqual(alertaEmpleo.porcentaje, 70);

  const alertaInversion = alertas.find(a => a.tipoIndicador === 'Inversión');
  assert.ok(alertaInversion, 'Debe existir alerta de inversión');
  assert.strictEqual(alertaInversion.severidad, 'Moderada');
  assert.strictEqual(alertaInversion.porcentaje, 80);
});

runTest('No debe generar alertas cuando la empresa está en regla', () => {
  const empresas = [
    { id: 2, nombre: 'Empresa B', identificacion: '3-102-2', empleosComprometidos: 10, inversionComprometida: 50000 }
  ];

  const reportes = [
    {
      id: 102,
      empresaId: 2,
      periodo: '2026-T1',
      empleosReales: 15,
      inversionEjecutada: 60000
    }
  ];

  const alertas = AlertasModule.generarAlertasDesdeReportes(reportes, empresas);
  assert.strictEqual(alertas.length, 0, 'No debe generar alertas para empresas en regla');
});

// ----------------------------------------------------
// 4. Servicio de Inteligencia Artificial (iaService.js)
// ----------------------------------------------------
console.log('\n4. Servicio de IA y Procesamiento Concurrente (iaService.js)');

await runAsyncTest('Debe evaluar solicitud individual calculando puntaje y justificación', async () => {
  const zonaFranca = {
    id: 1,
    nombre: 'Zona Franca Tica',
    inversionMinima: 50000,
    empleosMinimos: 10,
    sectoresPermitidos: ['tecnologia', 'manufactura', 'bpo']
  };

  const solicitud = {
    empresa: 'Software Excellence S.A.',
    sector: 'tecnologia',
    inversionProyectada: 120000,
    empleosProyectados: 25
  };

  const evaluacion = await IAService.evaluarSolicitud(solicitud, zonaFranca);

  assert.ok(typeof evaluacion.puntaje === 'number');
  assert.ok(evaluacion.puntaje >= 75, 'Debe obtener puntaje alto por superar inversión y empleo');
  assert.strictEqual(evaluacion.clasificacionSugerida, 'Recomendada');
  assert.ok(evaluacion.justificacion.includes('tecnologia'));
});

await runAsyncTest('Debe procesar múltiples solicitudes concurrentemente mediante Promise.all (RF-13, RNF-03)', async () => {
  const zonaFranca = {
    id: 1,
    nombre: 'Zona Franca Tica',
    inversionMinima: 50000,
    empleosMinimos: 10,
    sectoresPermitidos: ['tecnologia', 'manufactura']
  };

  const listaSolicitudes = [
    { id: 1, empresa: 'Empresa A', sector: 'tecnologia', inversionProyectada: 100000, empleosProyectados: 20 },
    { id: 2, empresa: 'Empresa B', sector: 'manufactura', inversionProyectada: 50000, empleosProyectados: 10 },
    { id: 3, empresa: 'Empresa C', sector: 'comercio', inversionProyectada: 10000, empleosProyectados: 2 }
  ];

  const t0 = Date.now();
  const resultados = await IAService.evaluarLote(listaSolicitudes, zonaFranca);
  const duracionTotal = Date.now() - t0;

  assert.strictEqual(resultados.length, 3);
  assert.ok(resultados.every(r => r.evaluacion !== null), 'Todas las evaluaciones deben completarse');
  
  // El tiempo de 3 llamadas en paralelo debe ser del orden de 1 llamada (~350-650ms), no 3 llamadas secuenciales (>1200ms)
  assert.ok(duracionTotal < 1200, `Evaluación concurrente eficiente (duración: ${duracionTotal}ms)`);
});

// ----------------------------------------------------
// Resumen de Resultados
// ----------------------------------------------------
console.log('\n====================================================');
console.log(`📊 Resultado Final de Pruebas: ${testsPassed} / ${totalTests} APROBADAS`);
console.log('====================================================\n');

if (testsPassed === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}

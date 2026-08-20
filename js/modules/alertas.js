/**
 * ZoFranca CR — Módulo de Gestión de Alertas de Incumplimiento
 * Responsable: Ulysses Quirós V.
 * Funciones:
 * 1. Detectar automáticamente empresas con incumplimientos de inversión o empleo.
 * 2. Generar alertas con empresa, indicador afectado, valor comprometido, valor reportado, diferencia y severidad.
 * 3. Filtrar y presentar el panel de alertas de forma clara.
 * Requerimientos: RF-08, RF-11.
 */

import { ReportesService } from '../services/reportesService.js';
import { SolicitudesService } from '../services/solicitudesService.js';
import { UI } from '../utils/ui.js';

export const AlertasModule = {
  alertasCache: [],

  /**
   * Inicializa la vista de alertas (alertas.html)
   */
  async initPage() {
    const filterSelect = document.getElementById('filter-tipo-alerta');
    await this.cargarYGenerarAlertas();

    if (filterSelect) {
      filterSelect.addEventListener('change', () => this.filtrarAlertas());
    }
  },

  /**
   * Extrae y genera la lista de alertas activas a partir de reportes y compromisos
   */
  generarAlertasDesdeReportes(reportes, empresas) {
    const alertas = [];

    reportes.forEach(rep => {
      const empresa = empresas.find(e => e.id === rep.empresaId);
      if (!empresa) return;

      const comp = rep.resultadoComparativo;
      const empComprometidos = Number(empresa.empleosComprometidos) || 0;
      const invComprometida = Number(empresa.inversionComprometida) || 0;
      const empReales = Number(rep.empleosReales) || 0;
      const invEjecutada = Number(rep.inversionEjecutada) || 0;

      // 1. Alerta de Empleo
      if (empReales < empComprometidos) {
        const diffEmp = empReales - empComprometidos;
        const pctEmp = (empReales / empComprometidos) * 100;
        alertas.push({
          id: `ALT-EMP-${rep.id}`,
          reporteId: rep.id,
          empresaId: empresa.id,
          empresaNombre: empresa.nombre,
          identificacion: empresa.identificacion,
          periodo: rep.periodo,
          tipoIndicador: 'Empleo',
          valorComprometido: `${empComprometidos} plazas`,
          valorReportado: `${empReales} plazas`,
          diferencia: `${diffEmp} plazas (${pctEmp.toFixed(1)}%)`,
          porcentaje: pctEmp,
          severidad: pctEmp < 75 ? 'Crítica' : 'Moderada',
          fechaReporte: rep.fechaReporte,
          observaciones: rep.observaciones || 'No se alcanzaron las metas de contratación acordadas.'
        });
      }

      // 2. Alerta de Inversión
      if (invEjecutada < invComprometida) {
        const diffInv = invEjecutada - invComprometida;
        const pctInv = (invEjecutada / invComprometida) * 100;
        alertas.push({
          id: `ALT-INV-${rep.id}`,
          reporteId: rep.id,
          empresaId: empresa.id,
          empresaNombre: empresa.nombre,
          identificacion: empresa.identificacion,
          periodo: rep.periodo,
          tipoIndicador: 'Inversión',
          valorComprometido: UI.formatMoney(invComprometida),
          valorReportado: UI.formatMoney(invEjecutada),
          diferencia: `${UI.formatMoney(diffInv)} (${pctInv.toFixed(1)}%)`,
          porcentaje: pctInv,
          severidad: pctInv < 75 ? 'Crítica' : 'Moderada',
          fechaReporte: rep.fechaReporte,
          observaciones: rep.observaciones || 'La inversión ejecutada en el periodo es inferior a la cuota obligatoria.'
        });
      }
    });

    return alertas;
  },

  /**
   * Consulta datos asíncronamente y renderiza las alertas
   */
  async cargarYGenerarAlertas() {
    const container = document.getElementById('contenedor-alertas');
    if (!container) return;

    UI.showLoading(container, 'Detectando y procesando alertas de cumplimiento...');

    try {
      const [reportes, empresas] = await Promise.all([
        ReportesService.getReportes(),
        SolicitudesService.getEmpresas()
      ]);

      this.alertasCache = this.generarAlertasDesdeReportes(reportes, empresas);

      this.actualizarMetricasAlertas(this.alertasCache, empresas);
      this.renderAlertasFeed(this.alertasCache);
    } catch (err) {
      UI.showToast(err.message, 'error');
      container.innerHTML = `
        <div class="card p-4 text-center">
          <p class="text-danger">⚠️ Error al cargar alertas: ${err.message}</p>
          <button class="btn btn-secondary mt-2" onclick="location.reload()">Reintentar</button>
        </div>
      `;
    } finally {
      UI.hideLoading(container);
    }
  },

  /**
   * Actualiza las tarjetas resumen superiores
   */
  actualizarMetricasAlertas(alertas, empresas) {
    const elTotal = document.getElementById('metric-total-alertas');
    const elCriticas = document.getElementById('metric-alertas-criticas');
    const elEmpresas = document.getElementById('metric-empresas-afectadas');

    const criticas = alertas.filter(a => a.severidad === 'Crítica').length;
    const empresasUnicas = new Set(alertas.map(a => a.empresaId)).size;

    if (elTotal) elTotal.textContent = alertas.length;
    if (elCriticas) elCriticas.textContent = criticas;
    if (elEmpresas) elEmpresas.textContent = empresasUnicas;
  },

  /**
   * Filtra las alertas por tipo
   */
  filtrarAlertas() {
    const tipo = document.getElementById('filter-tipo-alerta')?.value || 'todos';

    let filtradas = this.alertasCache;
    if (tipo !== 'todos') {
      filtradas = this.alertasCache.filter(a => a.tipoIndicador.toLowerCase() === tipo.toLowerCase());
    }

    this.renderAlertasFeed(filtradas);
  },

  /**
   * Renderiza las tarjetas individuales de alerta en el DOM
   */
  renderAlertasFeed(alertas) {
    const container = document.getElementById('contenedor-alertas');
    if (!container) return;

    if (alertas.length === 0) {
      container.innerHTML = `
        <div class="empty-state card p-5 text-center">
          <h3>🎉 No hay alertas de incumplimiento activas</h3>
          <p class="text-muted">Todas las empresas instaladas se encuentran actualmente en regla con sus compromisos pactados.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = alertas.map(alt => {
      const claseBorde = alt.severidad === 'Crítica' ? 'border-danger' : 'border-warning';
      const badgeSeveridad = alt.severidad === 'Crítica' ? '<span class="badge badge-danger">Severidad Crítica</span>' : '<span class="badge badge-warning">Severidad Moderada</span>';

      return `
        <div class="card alert-card ${claseBorde} mb-3">
          <div class="card-header d-flex justify-between align-center">
            <div>
              <h3 class="mb-0">${alt.empresaNombre}</h3>
              <small class="text-muted">${alt.identificacion} • Periodo: ${alt.periodo}</small>
            </div>
            <div>
              ${badgeSeveridad}
              <span class="badge badge-info ml-1">${alt.tipoIndicador}</span>
            </div>
          </div>

          <div class="card-body">
            <div class="alert-details-grid">
              <div class="alert-stat">
                <span class="stat-label">Compromiso Original:</span>
                <strong class="stat-value">${alt.valorComprometido}</strong>
              </div>
              <div class="alert-stat">
                <span class="stat-label">Valor Reportado Real:</span>
                <strong class="stat-value text-danger">${alt.valorReportado}</strong>
              </div>
              <div class="alert-stat">
                <span class="stat-label">Déficit / Brecha:</span>
                <strong class="stat-value text-danger font-bold">${alt.diferencia}</strong>
              </div>
            </div>

            <div class="alert-notes mt-3">
              <p><strong>Nota del reporte:</strong> ${alt.observaciones}</p>
            </div>

            <div class="d-flex justify-between align-center mt-3 pt-2 border-top">
              <small class="text-muted">Reporte emitido el ${UI.formatDate(alt.fechaReporte)}</small>
              <button class="btn btn-sm btn-outline-danger" onclick="alert('Se ha registrado la notificación formal para el contacto de ${alt.empresaNombre}.')">
                📧 Enviar Notificación a Empresa
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
};

/**
 * ZoFranca CR — Controlador Principal y Dashboard Ejecutivo
 * Responsable: Integración de servicios, cálculo de métricas consolidadas y evaluación concurrente con Promise.all.
 * Requerimientos: RF-10, RF-11, RF-13, RF-18.
 */

import { SolicitudesService } from './services/solicitudesService.js';
import { ReportesService } from './services/reportesService.js';
import { IAService } from './services/iaService.js';
import { AlertasModule } from './modules/alertas.js';
import { UI } from './utils/ui.js';

export const App = {
  datos: {
    solicitudes: [],
    empresas: [],
    reportes: [],
    zonasFrancas: [],
    alertas: []
  },

  /**
   * Inicializa el dashboard principal (index.html / dashboard.html)
   */
  async initDashboard() {
    const container = document.getElementById('dashboard-content');
    UI.showLoading(container, 'Cargando métricas y datos del sistema...');

    try {
      // 1. Carga asíncrona concurrente con Promise.all (RNF-03)
      const [solicitudes, empresas, reportes, zonasFrancas] = await Promise.all([
        SolicitudesService.getSolicitudes(),
        SolicitudesService.getEmpresas(),
        ReportesService.getReportes(),
        SolicitudesService.getZonasFrancas()
      ]);

      this.datos.solicitudes = solicitudes;
      this.datos.empresas = empresas;
      this.datos.reportes = reportes;
      this.datos.zonasFrancas = zonasFrancas;

      // 2. Generar alertas
      this.datos.alertas = AlertasModule.generarAlertasDesdeReportes(reportes, empresas);

      // 3. Renderizar KPIs y widgets
      this.renderKPIs();
      this.renderTablasDashboard();
      this.setupDashboardEvents();
    } catch (err) {
      console.error('[App.initDashboard]', err);
      UI.showToast(err.message, 'error');
      if (container) {
        container.innerHTML = `
          <div class="card p-5 text-center">
            <h3 class="text-danger">⚠️ No se pudo conectar con el servidor</h3>
            <p class="text-muted mt-2">${err.message}</p>
            <div class="mt-4">
              <p>Asegúrese de que el backend esté ejecutándose con:</p>
              <code>npm run server</code>
              <br><br>
              <button class="btn btn-primary" onclick="location.reload()">Reintentar conexión</button>
            </div>
          </div>
        `;
      }
    } finally {
      UI.hideLoading(container);
    }
  },

  /**
   * Calcula y actualiza las tarjetas de indicadores KPI
   */
  renderKPIs() {
    const totalSolicitudes = this.datos.solicitudes.length;
    const solicitudesPendientes = this.datos.solicitudes.filter(s => s.estado.toLowerCase() === 'pendiente').length;
    const solicitudesAprobadas = this.datos.solicitudes.filter(s => s.estado.toLowerCase() === 'aprobada').length;

    // Calcular empresas en regla vs con alertas
    const empresasConAlertaIds = new Set(this.datos.alertas.map(a => a.empresaId));
    const empresasEnRegla = this.datos.empresas.filter(e => !empresasConAlertaIds.has(e.id)).length;
    const empresasIncumplimiento = empresasConAlertaIds.size;
    const totalAlertas = this.datos.alertas.length;

    // Set DOM elements
    const setElem = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    setElem('kpi-total-solicitudes', totalSolicitudes);
    setElem('kpi-solicitudes-pendientes', solicitudesPendientes);
    setElem('kpi-solicitudes-aprobadas', solicitudesAprobadas);
    setElem('kpi-empresas-en-regla', empresasEnRegla);
    setElem('kpi-empresas-incumplimiento', empresasIncumplimiento);
    setElem('kpi-total-alertas', totalAlertas);
  },

  /**
   * Renderiza las tablas resumen del dashboard
   */
  renderTablasDashboard() {
    // 1. Solicitudes recientes
    const tbodySol = document.getElementById('dashboard-solicitudes-body');
    if (tbodySol) {
      const recientes = [...this.datos.solicitudes].slice(-4).reverse();
      if (recientes.length === 0) {
        tbodySol.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No hay solicitudes registradas.</td></tr>';
      } else {
        tbodySol.innerHTML = recientes.map(sol => `
          <tr>
            <td><strong>${sol.empresa}</strong></td>
            <td><span class="badge badge-info">${sol.sector}</span></td>
            <td>${UI.formatMoney(sol.inversionProyectada)}</td>
            <td>${UI.badgeEstado(sol.estado)}</td>
            <td>
              <a href="pages/detalle-solicitud.html?id=${sol.id}" class="btn btn-sm btn-outline-primary">
                Expediente
              </a>
            </td>
          </tr>
        `).join('');
      }
    }

    // 2. Alertas recientes
    const tbodyAlt = document.getElementById('dashboard-alertas-body');
    if (tbodyAlt) {
      const ultimasAlertas = [...this.datos.alertas].slice(-4).reverse();
      if (ultimasAlertas.length === 0) {
        tbodyAlt.innerHTML = '<tr><td colspan="4" class="text-center text-success py-3">✅ No hay alertas de incumplimiento activas.</td></tr>';
      } else {
        tbodyAlt.innerHTML = ultimasAlertas.map(alt => `
          <tr>
            <td><strong>${alt.empresaNombre}</strong></td>
            <td><span class="badge badge-danger">${alt.tipoIndicador}</span></td>
            <td class="text-danger"><strong>${alt.diferencia}</strong></td>
            <td>
              <a href="pages/alertas.html" class="btn btn-sm btn-outline-danger">Ver</a>
            </td>
          </tr>
        `).join('');
      }
    }
  },

  /**
   * Configura eventos del dashboard (ej. evaluación masiva con Promise.all)
   */
  setupDashboardEvents() {
    const btnEvaluarLote = document.getElementById('btn-evaluar-lote-ia');
    if (!btnEvaluarLote) return;

    btnEvaluarLote.addEventListener('click', async () => {
      const pendientes = this.datos.solicitudes.filter(s => !s.evaluacionIA);

      if (pendientes.length === 0) {
        UI.showToast('No hay solicitudes pendientes de evaluación por IA.', 'info');
        return;
      }

      btnEvaluarLote.disabled = true;
      btnEvaluarLote.innerHTML = `⚡ Evaluando ${pendientes.length} solicitud(es) en paralelo...`;

      try {
        const zonaFranca = this.datos.zonasFrancas[0] || { inversionMinima: 50000, empleosMinimos: 10, sectoresPermitidos: ['tecnologia', 'manufactura', 'bpo'] };

        // Procesamiento en paralelo con Promise.all (RF-13, RNF-03)
        const resultados = await IAService.evaluarLote(pendientes, zonaFranca);

        // Guardar concurrentemente las evaluaciones en json-server
        const promesasGuardado = resultados.map(res => {
          if (res.evaluacion) {
            return SolicitudesService.updateSolicitud(res.id, {
              evaluacionIA: res.evaluacion,
              estado: res.evaluacion.clasificacionSugerida === 'Recomendada' ? 'En revisión' : res.evaluacion.clasificacionSugerida
            });
          }
          return Promise.resolve();
        });

        await Promise.all(promesasGuardado);

        UI.showToast(`Se evaluaron ${pendientes.length} solicitudes concurrentemente con éxito.`, 'success');
        await this.initDashboard();
      } catch (err) {
        UI.showToast(`Error durante la evaluación por lote: ${err.message}`, 'error');
      } finally {
        btnEvaluarLote.disabled = false;
        btnEvaluarLote.innerHTML = '⚡ Evaluar Pendientes con IA (Promise.all)';
      }
    });
  }
};

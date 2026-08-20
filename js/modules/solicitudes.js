/**
 * ZoFranca CR — Módulo de Gestión de Solicitudes
 * Responsable: Manejo de formularios de solicitud, filtros, detalle y decisión humana.
 * Requerimientos: RF-01, RF-02, RF-03, RF-04, RF-05, RF-12, RF-15.
 */

import { SolicitudesService } from '../services/solicitudesService.js';
import { IAService } from '../services/iaService.js';
import { Validaciones } from '../utils/validaciones.js';
import { UI } from '../utils/ui.js';

export const SolicitudesModule = {
  solicitudesCache: [],
  zonasFrancasCache: [],

  /**
   * Inicializa la página de listado y registro de solicitudes (solicitudes.html)
   */
  async initPage() {
    const form = document.getElementById('form-solicitud');
    const searchInput = document.getElementById('search-solicitudes');
    const filterEstado = document.getElementById('filter-estado');
    const filterSector = document.getElementById('filter-sector');

    // Cargar datos iniciales
    await this.cargarZonasFrancasEnSelect();
    await this.cargarYRenderizarSolicitudes();

    // Event listeners
    if (form) {
      form.addEventListener('submit', (e) => this.handleCrearSolicitud(e));
    }

    if (searchInput) {
      searchInput.addEventListener('input', () => this.aplicarFiltros());
    }

    if (filterEstado) {
      filterEstado.addEventListener('change', () => this.aplicarFiltros());
    }

    if (filterSector) {
      filterSector.addEventListener('change', () => this.aplicarFiltros());
    }
  },

  /**
   * Carga zonas francas en el selector del formulario
   */
  async cargarZonasFrancasEnSelect() {
    const select = document.getElementById('zonaFrancaId');
    if (!select) return;

    try {
      this.zonasFrancasCache = await SolicitudesService.getZonasFrancas();
      select.innerHTML = '<option value="">Seleccione una zona franca...</option>' +
        this.zonasFrancasCache.map(zf => `<option value="${zf.id}">${zf.nombre} (Mín: $${Number(zf.inversionMinima).toLocaleString()}, ${zf.empleosMinimos} empleos)</option>`).join('');
    } catch (err) {
      UI.showToast(err.message, 'error');
    }
  },

  /**
   * Consulta y renderiza las solicitudes en la tabla
   */
  async cargarYRenderizarSolicitudes() {
    const container = document.getElementById('tabla-solicitudes-container');
    if (!container) return;

    UI.showLoading(container, 'Cargando solicitudes...');
    try {
      this.solicitudesCache = await SolicitudesService.getSolicitudes();
      this.renderTablaSolicitudes(this.solicitudesCache);
    } catch (err) {
      UI.showToast(err.message, 'error');
      container.innerHTML = `
        <div class="empty-state">
          <p class="text-danger">⚠️ ${err.message}</p>
          <button class="btn btn-secondary" onclick="location.reload()">Reintentar</button>
        </div>
      `;
    } finally {
      UI.hideLoading(container);
    }
  },

  /**
   * Aplica filtros multicriterio en memoria (RF-15)
   */
  aplicarFiltros() {
    const busqueda = (document.getElementById('search-solicitudes')?.value || '').toLowerCase().trim();
    const estado = document.getElementById('filter-estado')?.value || 'todos';
    const sector = document.getElementById('filter-sector')?.value || 'todos';

    const filtradas = this.solicitudesCache.filter(sol => {
      const coincideTexto = sol.empresa.toLowerCase().includes(busqueda) ||
                            sol.identificacion.toLowerCase().includes(busqueda) ||
                            (sol.contacto && sol.contacto.toLowerCase().includes(busqueda));

      const coincideEstado = estado === 'todos' || sol.estado.toLowerCase() === estado.toLowerCase();
      const coincideSector = sector === 'todos' || sol.sector.toLowerCase() === sector.toLowerCase();

      return coincideTexto && coincideEstado && coincideSector;
    });

    this.renderTablaSolicitudes(filtradas);
  },

  /**
   * Renderiza el listado de solicitudes
   */
  renderTablaSolicitudes(lista) {
    const tbody = document.getElementById('tabla-solicitudes-body');
    const counter = document.getElementById('contador-solicitudes');
    if (!tbody) return;

    if (counter) counter.textContent = `Mostrando ${lista.length} solicitud(es)`;

    if (lista.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center py-4 text-muted">
            No se encontraron solicitudes que coincidan con los filtros.
          </td>
        </tr>
      `;
      return;
    }

    tbody.innerHTML = lista.map(sol => {
      const scoreIA = sol.evaluacionIA ? `${sol.evaluacionIA.puntaje}/100 (${sol.evaluacionIA.clasificacionSugerida})` : '<span class="text-muted">Pendiente IA</span>';

      return `
        <tr>
          <td><strong>#${sol.id}</strong></td>
          <td>
            <strong>${sol.empresa}</strong><br>
            <small class="text-muted">${sol.identificacion}</small>
          </td>
          <td><span class="badge badge-info">${sol.sector}</span></td>
          <td>${UI.formatMoney(sol.inversionProyectada)}</td>
          <td><strong>${sol.empleosProyectados}</strong> directos</td>
          <td>${UI.badgeEstado(sol.estado)}</td>
          <td>${scoreIA}</td>
          <td>
            <a href="detalle-solicitud.html?id=${sol.id}" class="btn btn-sm btn-outline-primary">
              Ver detalle
            </a>
          </td>
        </tr>
      `;
    }).join('');
  },

  /**
   * Procesa el envío del formulario de nueva solicitud
   */
  async handleCrearSolicitud(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');

    const zonaFrancaId = Number(form.zonaFrancaId.value);
    const zonaFranca = this.zonasFrancasCache.find(z => z.id === zonaFrancaId);

    const formData = {
      empresa: form.empresa.value.trim(),
      identificacion: form.identificacion.value.trim(),
      zonaFrancaId: zonaFrancaId || 1,
      sector: form.sector.value,
      inversionProyectada: Number(form.inversionProyectada.value),
      empleosProyectados: Number(form.empleosProyectados.value),
      contacto: form.contacto.value.trim(),
      email: form.email.value.trim(),
      documentos: form.documentos.value.trim() || 'Documentación legal y estados financieros adjuntos'
    };

    // Validaciones
    const validacion = Validaciones.validarSolicitud(formData, zonaFranca);
    if (!validacion.esValido) {
      UI.showToast(validacion.errores.join('<br>'), 'warning');
      return;
    }

    // Guardado Asíncrono
    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Enviando solicitud...';

      const nuevaSolicitud = await SolicitudesService.createSolicitud(formData);
      UI.showToast(`Solicitud #${nuevaSolicitud.id} para ${nuevaSolicitud.empresa} registrada con éxito.`, 'success');
      form.reset();
      await this.cargarYRenderizarSolicitudes();
    } catch (err) {
      UI.showToast(err.message, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Enviar Solicitud';
    }
  },

  /**
   * Inicializa la página de detalle y resolución humana (detalle-solicitud.html)
   */
  async initDetallePage() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
      UI.showToast('No se especificó un ID de solicitud.', 'error');
      setTimeout(() => window.location.href = 'solicitudes.html', 1500);
      return;
    }

    const container = document.getElementById('detalle-container');
    UI.showLoading(container, 'Cargando expediente de la solicitud...');

    try {
      const [solicitud, zonasFrancas] = await Promise.all([
        SolicitudesService.getSolicitudById(id),
        SolicitudesService.getZonasFrancas()
      ]);

      const zonaFranca = zonasFrancas.find(z => z.id === solicitud.zonaFrancaId) || zonasFrancas[0];
      this.renderDetalle(solicitud, zonaFranca);
      this.setupDetalleEvents(solicitud, zonaFranca);
    } catch (err) {
      UI.showToast(err.message, 'error');
      if (container) {
        container.innerHTML = `
          <div class="card p-4 text-center">
            <h3 class="text-danger">Error al cargar la solicitud</h3>
            <p>${err.message}</p>
            <a href="solicitudes.html" class="btn btn-secondary mt-3">Volver al listado</a>
          </div>
        `;
      }
    } finally {
      UI.hideLoading(container);
    }
  },

  /**
   * Renderiza el contenido del detalle y expediente
   */
  renderDetalle(solicitud, zonaFranca) {
    document.getElementById('detalle-empresa-nombre').textContent = solicitud.empresa;
    document.getElementById('detalle-id').textContent = `#${solicitud.id}`;
    document.getElementById('detalle-estado-badge').innerHTML = UI.badgeEstado(solicitud.estado);

    document.getElementById('exp-identificacion').textContent = solicitud.identificacion;
    document.getElementById('exp-sector').textContent = solicitud.sector;
    document.getElementById('exp-inversion').textContent = UI.formatMoney(solicitud.inversionProyectada);
    document.getElementById('exp-inversion-min').textContent = UI.formatMoney(zonaFranca.inversionMinima);
    document.getElementById('exp-empleos').textContent = `${solicitud.empleosProyectados} plazas`;
    document.getElementById('exp-empleos-min').textContent = `${zonaFranca.empleosMinimos} plazas`;
    document.getElementById('exp-contacto').textContent = `${solicitud.contacto} (${solicitud.email})`;
    document.getElementById('exp-zonafranca').textContent = zonaFranca.nombre;
    document.getElementById('exp-documentos').textContent = solicitud.documentos || 'No especificados';
    document.getElementById('exp-fecha').textContent = UI.formatDate(solicitud.fechaSolicitud);

    // Panel de IA
    const panelIA = document.getElementById('panel-ia-resultado');
    if (solicitud.evaluacionIA) {
      panelIA.innerHTML = `
        <div class="score-display">
          <div class="score-circle score-${solicitud.evaluacionIA.clasificacionSugerida.toLowerCase()}">
            <span class="score-number">${solicitud.evaluacionIA.puntaje}</span>
            <span class="score-max">/100</span>
          </div>
          <div class="score-meta">
            <h4>Clasificación Sugerida: ${UI.badgeEstado(solicitud.evaluacionIA.clasificacionSugerida)}</h4>
            <p class="text-muted">Evaluado el ${UI.formatDate(solicitud.evaluacionIA.fechaEvaluacion)}</p>
          </div>
        </div>
        <div class="ai-justification mt-3">
          <strong>Justificación técnica generada:</strong>
          <p>${solicitud.evaluacionIA.justificacion}</p>
        </div>
      `;
    } else {
      panelIA.innerHTML = `
        <div class="text-center py-4">
          <p class="text-muted">Esta solicitud aún no ha sido analizada por el motor de IA.</p>
          <button id="btn-evaluar-ia" class="btn btn-primary">
            ⚡ Ejecutar Evaluación Asistida por IA
          </button>
        </div>
      `;
    }

    // Panel de Decisión Humana
    const formDecision = document.getElementById('form-decision-humana');
    if (solicitud.decisionFinal) {
      formDecision.innerHTML = `
        <div class="alert alert-success">
          <h4>✅ Decisión Formal Registrada</h4>
          <p><strong>Resolución:</strong> ${UI.badgeEstado(solicitud.decisionFinal.decision)}</p>
          <p><strong>Analista responsable:</strong> ${solicitud.decisionFinal.analista}</p>
          <p><strong>Observaciones:</strong> ${solicitud.decisionFinal.observaciones || 'Sin observaciones adicionales'}</p>
          <p class="text-muted mb-0"><small>Fecha: ${UI.formatDate(solicitud.decisionFinal.fechaDecision)}</small></p>
        </div>
      `;
    }
  },

  /**
   * Configura eventos de interacción en detalle
   */
  setupDetalleEvents(solicitud, zonaFranca) {
    const btnEvaluar = document.getElementById('btn-evaluar-ia');
    if (btnEvaluar) {
      btnEvaluar.addEventListener('click', async () => {
        btnEvaluar.disabled = true;
        btnEvaluar.innerHTML = 'Analizando con IA...';
        try {
          const evaluacion = await IAService.evaluarSolicitud(solicitud, zonaFranca);
          await SolicitudesService.updateSolicitud(solicitud.id, {
            evaluacionIA: evaluacion,
            estado: evaluacion.clasificacionSugerida === 'Recomendada' ? 'En revisión' : evaluacion.clasificacionSugerida
          });
          UI.showToast('Evaluación de IA completada y registrada.', 'success');
          // Recargar vista
          this.initDetallePage();
        } catch (err) {
          UI.showToast(err.message, 'error');
          btnEvaluar.disabled = false;
          btnEvaluar.innerHTML = '⚡ Reintentar Evaluación';
        }
      });
    }

    const formDecision = document.getElementById('form-decision-humana');
    if (formDecision && !solicitud.decisionFinal) {
      formDecision.addEventListener('submit', async (e) => {
        e.preventDefault();
        const decision = formDecision.decision.value;
        const analista = formDecision.analista.value.trim();
        const observaciones = formDecision.observaciones.value.trim();

        if (!analista) {
          UI.showToast('Debe ingresar el nombre del analista responsable.', 'warning');
          return;
        }

        const submitBtn = formDecision.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Registrando resolución...';

        try {
          const payloadDecision = {
            decision,
            analista,
            observaciones,
            fechaDecision: new Date().toISOString()
          };

          await SolicitudesService.updateSolicitud(solicitud.id, {
            estado: decision,
            decisionFinal: payloadDecision
          });

          // Si fue aprobada, asegurar que exista la empresa instalada (RF-06/07)
          if (decision === 'Aprobada') {
            const empresas = await SolicitudesService.getEmpresas();
            const existe = empresas.find(emp => emp.identificacion === solicitud.identificacion);
            if (!existe) {
              await SolicitudesService.createEmpresa({
                nombre: solicitud.empresa,
                identificacion: solicitud.identificacion,
                sector: solicitud.sector,
                zonaFrancaId: solicitud.zonaFrancaId,
                solicitudId: solicitud.id,
                inversionComprometida: solicitud.inversionProyectada,
                empleosComprometidos: solicitud.empleosProyectados,
                fechaInstalacion: new Date().toISOString(),
                estado: 'activo'
              });
            }
          }

          UI.showToast('Decisión formal registrada correctamente.', 'success');
          this.initDetallePage();
        } catch (err) {
          UI.showToast(err.message, 'error');
          submitBtn.disabled = false;
          submitBtn.innerHTML = 'Confirmar Decisión Formal';
        }
      });
    }
  }
};

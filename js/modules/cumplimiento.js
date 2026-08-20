/**
 * ZoFranca CR — Módulo de Cumplimiento Operacional y Reportería
 * Responsable: Ulysses Quirós V.
 * Funciones:
 * 1. Obtener compromisos de una empresa instalada.
 * 2. Registrar reporte periódico de cumplimiento.
 * 3. Comparar compromisos vs. resultados reales (Empleos e Inversión).
 * 4. Determinar estado de cumplimiento ('En regla' vs 'Incumplimiento').
 * 5. Generar y mostrar consolidado de fiscalización para PROCOMER.
 * Requerimientos: RF-06, RF-07, RF-08, RF-09, RF-16.
 */

import { ReportesService } from '../services/reportesService.js';
import { SolicitudesService } from '../services/solicitudesService.js';
import { Validaciones } from '../utils/validaciones.js';
import { UI } from '../utils/ui.js';

export const CumplimientoModule = {
  empresasCache: [],
  reportesCache: [],

  /**
   * Inicializa la vista de cumplimiento (cumplimiento.html)
   */
  async initPage() {
    const form = document.getElementById('form-reporte-cumplimiento');
    const selectEmpresa = document.getElementById('empresaId');

    await this.cargarEmpresas();
    await this.cargarYRenderizarConsolidado();

    if (selectEmpresa) {
      selectEmpresa.addEventListener('change', () => this.handleSeleccionEmpresa());
    }

    if (form) {
      form.addEventListener('submit', (e) => this.handleGuardarReporte(e));
      // Listener para vista previa dinámica en tiempo real
      ['empleosReales', 'inversionEjecutada'].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.addEventListener('input', () => this.actualizarVistaPreviaComparativa());
      });
    }
  },

  /**
   * Carga la lista de empresas instaladas para el selector
   */
  async cargarEmpresas() {
    const select = document.getElementById('empresaId');
    if (!select) return;

    try {
      this.empresasCache = await SolicitudesService.getEmpresas();
      if (this.empresasCache.length === 0) {
        select.innerHTML = '<option value="">No hay empresas instaladas registradas</option>';
        return;
      }
      select.innerHTML = '<option value="">Seleccione una empresa...</option>' +
        this.empresasCache.map(emp => `<option value="${emp.id}">${emp.nombre} (${emp.identificacion})</option>`).join('');
    } catch (err) {
      UI.showToast(err.message, 'error');
    }
  },

  /**
   * Muestra la caja de compromisos cuando el usuario selecciona una empresa
   */
  handleSeleccionEmpresa() {
    const select = document.getElementById('empresaId');
    const empresaId = Number(select?.value);
    const box = document.getElementById('compromisos-box');
    const empresa = this.empresasCache.find(e => e.id === empresaId);

    if (!empresa || !box) {
      if (box) box.style.display = 'none';
      return;
    }

    box.style.display = 'block';
    document.getElementById('comp-inversion').textContent = UI.formatMoney(empresa.inversionComprometida);
    document.getElementById('comp-empleos').textContent = `${empresa.empleosComprometidos} plazas directas`;
    document.getElementById('comp-sector').textContent = empresa.sector;

    this.actualizarVistaPreviaComparativa();
  },

  /**
   * Compara los valores comprometidos con los valores reportados (RF-07)
   */
  calcularComparativo(empresa, empleosReales, inversionEjecutada) {
    const empComprometidos = Number(empresa.empleosComprometidos) || 1;
    const invComprometida = Number(empresa.inversionComprometida) || 1;
    const empReales = Number(empleosReales) || 0;
    const invEjecutada = Number(inversionEjecutada) || 0;

    const porcentajeEmpleo = (empReales / empComprometidos) * 100;
    const porcentajeInversion = (invEjecutada / invComprometida) * 100;

    const cumpleEmpleo = empReales >= empComprometidos;
    const cumpleInversion = invEjecutada >= invComprometida;

    const estadoCumplimiento = (cumpleEmpleo && cumpleInversion) ? 'En regla' : 'Incumplimiento';

    return {
      cumpleEmpleo,
      cumpleInversion,
      porcentajeEmpleo: Number(porcentajeEmpleo.toFixed(2)),
      porcentajeInversion: Number(porcentajeInversion.toFixed(2)),
      diferenciaEmpleo: empReales - empComprometidos,
      diferenciaInversion: invEjecutada - invComprometida,
      estadoCumplimiento
    };
  },

  /**
   * Actualiza el widget de vista previa antes de guardar
   */
  actualizarVistaPreviaComparativa() {
    const select = document.getElementById('empresaId');
    const previewContainer = document.getElementById('preview-comparativo');
    if (!previewContainer || !select) return;

    const empresaId = Number(select.value);
    const empresa = this.empresasCache.find(e => e.id === empresaId);

    if (!empresa) {
      previewContainer.innerHTML = '<p class="text-muted text-center py-3">Seleccione una empresa para ver el análisis de cumplimiento en tiempo real.</p>';
      return;
    }

    const empleosReales = Number(document.getElementById('empleosReales')?.value) || 0;
    const inversionEjecutada = Number(document.getElementById('inversionEjecutada')?.value) || 0;

    const comp = this.calcularComparativo(empresa, empleosReales, inversionEjecutada);

    previewContainer.innerHTML = `
      <div class="comparative-preview">
        <div class="comp-item">
          <div class="d-flex justify-between">
            <span>Cumplimiento Empleo:</span>
            <strong>${comp.porcentajeEmpleo}% (${comp.diferenciaEmpleo >= 0 ? '+' : ''}${comp.diferenciaEmpleo} plazas)</strong>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar ${comp.cumpleEmpleo ? 'bg-success' : 'bg-danger'}" style="width: ${Math.min(100, comp.porcentajeEmpleo)}%"></div>
          </div>
        </div>

        <div class="comp-item mt-2">
          <div class="d-flex justify-between">
            <span>Cumplimiento Inversión:</span>
            <strong>${comp.porcentajeInversion}% (${UI.formatMoney(comp.diferenciaInversion)})</strong>
          </div>
          <div class="progress-bar-container">
            <div class="progress-bar ${comp.cumpleInversion ? 'bg-success' : 'bg-danger'}" style="width: ${Math.min(100, comp.porcentajeInversion)}%"></div>
          </div>
        </div>

        <div class="mt-3 text-center">
          <span>Dictamen preliminar: ${UI.badgeEstado(comp.estadoCumplimiento)}</span>
        </div>
      </div>
    `;
  },

  /**
   * Guarda un nuevo reporte de cumplimiento en json-server (RF-06)
   */
  async handleGuardarReporte(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');

    const empresaId = Number(form.empresaId.value);
    const empresa = this.empresasCache.find(e => e.id === empresaId);

    if (!empresa) {
      UI.showToast('Debe seleccionar una empresa válida.', 'warning');
      return;
    }

    const formData = {
      empresaId,
      periodo: form.periodo.value.trim(),
      empleosReales: Number(form.empleosReales.value),
      inversionEjecutada: Number(form.inversionEjecutada.value),
      exportaciones: Number(form.exportaciones.value),
      observaciones: form.observaciones.value.trim()
    };

    const validacion = Validaciones.validarReporteCumplimiento(formData);
    if (!validacion.esValido) {
      UI.showToast(validacion.errores.join('<br>'), 'warning');
      return;
    }

    // Calcular resultado comparativo
    const resultadoComparativo = this.calcularComparativo(empresa, formData.empleosReales, formData.inversionEjecutada);

    try {
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Procesando reporte...';

      const payload = {
        ...formData,
        resultadoComparativo
      };

      const nuevoReporte = await ReportesService.createReporte(payload);
      UI.showToast(`Reporte #${nuevoReporte.id} (${formData.periodo}) registrado con estado: ${resultadoComparativo.estadoCumplimiento}.`, 'success');
      form.reset();
      document.getElementById('compromisos-box').style.display = 'none';
      this.actualizarVistaPreviaComparativa();
      await this.cargarYRenderizarConsolidado();
    } catch (err) {
      UI.showToast(err.message, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = 'Guardar y Evaluar Reporte';
    }
  },

  /**
   * Consulta reportes y empresas para renderizar el consolidado de PROCOMER (RF-09)
   */
  async cargarYRenderizarConsolidado() {
    const container = document.getElementById('tabla-consolidado-container');
    if (!container) return;

    UI.showLoading(container, 'Cargando consolidado de cumplimiento...');
    try {
      const [reportes, empresas] = await Promise.all([
        ReportesService.getReportes(),
        SolicitudesService.getEmpresas()
      ]);

      this.reportesCache = reportes;
      this.empresasCache = empresas;

      const tbody = document.getElementById('tabla-consolidado-body');
      if (!tbody) return;

      if (reportes.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="8" class="text-center py-4 text-muted">
              No hay reportes de cumplimiento registrados en el sistema.
            </td>
          </tr>
        `;
        return;
      }

      tbody.innerHTML = reportes.map(rep => {
        const empresa = empresas.find(e => e.id === rep.empresaId) || { nombre: `Empresa #${rep.empresaId}`, inversionComprometida: 0, empleosComprometidos: 0 };
        const comp = rep.resultadoComparativo || this.calcularComparativo(empresa, rep.empleosReales, rep.inversionEjecutada);

        return `
          <tr>
            <td><strong>#${rep.id}</strong></td>
            <td><strong>${empresa.nombre}</strong></td>
            <td><span class="badge badge-secondary">${rep.periodo}</span></td>
            <td>
              Reportado: <strong>${rep.empleosReales}</strong> / Meta: ${empresa.empleosComprometidos}<br>
              <small class="${comp.cumpleEmpleo ? 'text-success' : 'text-danger'}">
                (${comp.porcentajeEmpleo}%)
              </small>
            </td>
            <td>
              Reportado: <strong>${UI.formatMoney(rep.inversionEjecutada)}</strong><br>
              <small class="${comp.cumpleInversion ? 'text-success' : 'text-danger'}">
                (${comp.porcentajeInversion}%)
              </small>
            </td>
            <td>${UI.formatMoney(rep.exportaciones)}</td>
            <td>${UI.badgeEstado(comp.estadoCumplimiento)}</td>
            <td><small class="text-muted">${UI.formatDate(rep.fechaReporte)}</small></td>
          </tr>
        `;
      }).join('');
    } catch (err) {
      UI.showToast(err.message, 'error');
      container.innerHTML = `<p class="text-danger text-center p-3">Error al cargar consolidado: ${err.message}</p>`;
    } finally {
      UI.hideLoading(container);
    }
  }
};

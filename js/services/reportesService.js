/**
 * ZoFranca CR — Servicio de Reportes de Cumplimiento
 * Responsable: Ulysses Quirós V.
 * Funciones: Comunicación asíncrona con el backend (json-server) para reportes de cumplimiento.
 * Requerimientos: RF-06, RF-07, RF-09, RF-16.
 */

const API_BASE = 'http://localhost:3001';

export const ReportesService = {
  /**
   * Obtiene todos los reportes de cumplimiento registrados
   */
  async getReportes() {
    try {
      const resp = await fetch(`${API_BASE}/reportesCumplimiento`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status} al consultar reportes de cumplimiento`);
      return await resp.json();
    } catch (err) {
      console.error('[ReportesService.getReportes]', err);
      throw new Error('No se pudieron cargar los reportes de cumplimiento desde el servidor.');
    }
  },

  /**
   * Obtiene un reporte específico por su ID
   */
  async getReporteById(id) {
    try {
      const resp = await fetch(`${API_BASE}/reportesCumplimiento/${id}`);
      if (!resp.ok) throw new Error(`Reporte con ID ${id} no encontrado`);
      return await resp.json();
    } catch (err) {
      console.error('[ReportesService.getReporteById]', err);
      throw err;
    }
  },

  /**
   * Obtiene los reportes asociados a una empresa específica
   */
  async getReportesByEmpresa(empresaId) {
    try {
      const resp = await fetch(`${API_BASE}/reportesCumplimiento?empresaId=${empresaId}`);
      if (!resp.ok) throw new Error(`Error al consultar reportes para la empresa ${empresaId}`);
      return await resp.json();
    } catch (err) {
      console.error('[ReportesService.getReportesByEmpresa]', err);
      throw err;
    }
  },

  /**
   * Registra un nuevo reporte de cumplimiento en json-server
   */
  async createReporte(reporteData) {
    try {
      const payload = {
        ...reporteData,
        fechaReporte: reporteData.fechaReporte || new Date().toISOString()
      };

      const resp = await fetch(`${API_BASE}/reportesCumplimiento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) throw new Error(`Error ${resp.status} al registrar reporte de cumplimiento`);
      return await resp.json();
    } catch (err) {
      console.error('[ReportesService.createReporte]', err);
      throw new Error('No se pudo guardar el reporte de cumplimiento en el servidor.');
    }
  },

  /**
   * Actualiza los datos de un reporte existente
   */
  async updateReporte(id, datosParciales) {
    try {
      const resp = await fetch(`${API_BASE}/reportesCumplimiento/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosParciales)
      });

      if (!resp.ok) throw new Error(`Error ${resp.status} al actualizar reporte`);
      return await resp.json();
    } catch (err) {
      console.error('[ReportesService.updateReporte]', err);
      throw new Error('No se pudo actualizar el reporte de cumplimiento.');
    }
  }
};

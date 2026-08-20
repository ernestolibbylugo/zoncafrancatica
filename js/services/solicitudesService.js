/**
 * ZoFranca CR — Servicio de Solicitudes y Zonas Francas
 * Responsable: Comunicación asíncrona con la API REST (json-server en puerto 3001)
 * Requerimientos: RF-01, RF-02, RF-03, RF-16.
 */

const API_BASE = 'http://localhost:3001';

export const SolicitudesService = {
  /**
   * Obtiene la lista de todas las zonas francas registradas
   */
  async getZonasFrancas() {
    try {
      const resp = await fetch(`${API_BASE}/zonasFrancas`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status} al consultar zonas francas`);
      return await resp.json();
    } catch (err) {
      console.error('[SolicitudesService.getZonasFrancas]', err);
      throw new Error('No se pudo conectar con el servidor de datos (json-server). Verifique que esté activo en el puerto 3001.');
    }
  },

  /**
   * Obtiene una zona franca por su ID
   */
  async getZonaFrancaById(id) {
    try {
      const resp = await fetch(`${API_BASE}/zonasFrancas/${id}`);
      if (!resp.ok) throw new Error(`Zona franca con ID ${id} no encontrada`);
      return await resp.json();
    } catch (err) {
      console.error('[SolicitudesService.getZonaFrancaById]', err);
      throw err;
    }
  },

  /**
   * Obtiene la lista de todas las solicitudes de instalación
   */
  async getSolicitudes() {
    try {
      const resp = await fetch(`${API_BASE}/solicitudes`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status} al consultar solicitudes`);
      return await resp.json();
    } catch (err) {
      console.error('[SolicitudesService.getSolicitudes]', err);
      throw new Error('No se pudieron cargar las solicitudes desde el servidor.');
    }
  },

  /**
   * Obtiene una solicitud por su ID
   */
  async getSolicitudById(id) {
    try {
      const resp = await fetch(`${API_BASE}/solicitudes/${id}`);
      if (!resp.ok) throw new Error(`Solicitud con ID ${id} no encontrada`);
      return await resp.json();
    } catch (err) {
      console.error('[SolicitudesService.getSolicitudById]', err);
      throw err;
    }
  },

  /**
   * Registra una nueva solicitud de instalación en json-server
   */
  async createSolicitud(solicitudData) {
    try {
      const payload = {
        ...solicitudData,
        fechaSolicitud: new Date().toISOString(),
        estado: solicitudData.estado || 'Pendiente',
        evaluacionIA: solicitudData.evaluacionIA || null,
        decisionFinal: solicitudData.decisionFinal || null
      };

      const resp = await fetch(`${API_BASE}/solicitudes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!resp.ok) throw new Error(`Error ${resp.status} al guardar solicitud`);
      return await resp.json();
    } catch (err) {
      console.error('[SolicitudesService.createSolicitud]', err);
      throw new Error('Error al registrar la solicitud en el backend.');
    }
  },

  /**
   * Actualiza una solicitud existente (ej. agregar evaluación IA o decisión humana)
   */
  async updateSolicitud(id, datosParciales) {
    try {
      const resp = await fetch(`${API_BASE}/solicitudes/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosParciales)
      });

      if (!resp.ok) throw new Error(`Error ${resp.status} al actualizar solicitud`);
      return await resp.json();
    } catch (err) {
      console.error('[SolicitudesService.updateSolicitud]', err);
      throw new Error('No se pudo actualizar la solicitud en el backend.');
    }
  },

  /**
   * Obtiene la lista de empresas instaladas
   */
  async getEmpresas() {
    try {
      const resp = await fetch(`${API_BASE}/empresas`);
      if (!resp.ok) throw new Error(`HTTP ${resp.status} al consultar empresas`);
      return await resp.json();
    } catch (err) {
      console.error('[SolicitudesService.getEmpresas]', err);
      throw new Error('No se pudieron obtener las empresas instaladas.');
    }
  },

  /**
   * Obtiene una empresa por su ID
   */
  async getEmpresaById(id) {
    try {
      const resp = await fetch(`${API_BASE}/empresas/${id}`);
      if (!resp.ok) throw new Error(`Empresa con ID ${id} no encontrada`);
      return await resp.json();
    } catch (err) {
      console.error('[SolicitudesService.getEmpresaById]', err);
      throw err;
    }
  },

  /**
   * Registra una nueva empresa instalada tras aprobación
   */
  async createEmpresa(empresaData) {
    try {
      const resp = await fetch(`${API_BASE}/empresas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(empresaData)
      });

      if (!resp.ok) throw new Error(`Error ${resp.status} al crear registro de empresa`);
      return await resp.json();
    } catch (err) {
      console.error('[SolicitudesService.createEmpresa]', err);
      throw err;
    }
  }
};

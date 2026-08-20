/**
 * ZoFranca CR — Módulo de Validaciones
 * Responsable: Validaciones de formularios, datos y reglas de negocio.
 */

export const Validaciones = {
  /**
   * Valida si un texto no está vacío
   */
  esTextoValido(texto, longitudMinima = 2) {
    return typeof texto === 'string' && texto.trim().length >= longitudMinima;
  },

  /**
   * Valida formato de correo electrónico
   */
  esEmailValido(email) {
    if (!email || typeof email !== 'string') return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.trim());
  },

  /**
   * Valida que un número sea positivo estricto (> 0)
   */
  esNumeroPositivo(valor) {
    const num = Number(valor);
    return !isNaN(num) && num > 0;
  },

  /**
   * Valida que un número no sea negativo (>= 0)
   */
  esNumeroNoNegativo(valor) {
    const num = Number(valor);
    return !isNaN(num) && num >= 0;
  },

  /**
   * Valida si el sector está permitido en la zona franca
   */
  esSectorPermitido(sector, sectoresPermitidos = []) {
    if (!sector || !Array.isArray(sectoresPermitidos)) return false;
    return sectoresPermitidos.map(s => s.toLowerCase()).includes(sector.toLowerCase());
  },

  /**
   * Valida los datos completos de una solicitud de instalación (RF-02)
   */
  validarSolicitud(datos, zonaFranca = null) {
    const errores = [];

    if (!this.esTextoValido(datos.empresa, 3)) {
      errores.push('El nombre de la empresa debe tener al menos 3 caracteres.');
    }

    if (!this.esTextoValido(datos.identificacion, 5)) {
      errores.push('La cédula jurídica o identificación es obligatoria.');
    }

    if (!this.esTextoValido(datos.sector, 2)) {
      errores.push('Debe seleccionar un sector de actividad económica.');
    }

    if (!this.esNumeroPositivo(datos.inversionProyectada)) {
      errores.push('La inversión proyectada debe ser un valor numérico mayor a 0.');
    }

    if (!this.esNumeroPositivo(datos.empleosProyectados)) {
      errores.push('Los empleos proyectados deben ser un valor entero mayor a 0.');
    }

    if (!this.esTextoValido(datos.contacto, 3)) {
      errores.push('Debe indicar el nombre de la persona de contacto.');
    }

    if (!this.esEmailValido(datos.email)) {
      errores.push('El correo electrónico de contacto no tiene un formato válido.');
    }

    if (zonaFranca) {
      if (datos.inversionProyectada < zonaFranca.inversionMinima) {
        errores.push(`La inversión proyectada ($${Number(datos.inversionProyectada).toLocaleString()}) no alcanza el mínimo requerido por la zona franca ($${Number(zonaFranca.inversionMinima).toLocaleString()}).`);
      }
      if (datos.empleosProyectados < zonaFranca.empleosMinimos) {
        errores.push(`Los empleos proyectados (${datos.empleosProyectados}) no alcanzan el mínimo requerido (${zonaFranca.empleosMinimos}).`);
      }
      if (!this.esSectorPermitido(datos.sector, zonaFranca.sectoresPermitidos)) {
        errores.push(`El sector "${datos.sector}" no figura entre los permitidos para esta zona franca.`);
      }
    }

    return {
      esValido: errores.length === 0,
      errores
    };
  },

  /**
   * Valida los datos de un reporte periódico de cumplimiento (RF-06)
   */
  validarReporteCumplimiento(datos) {
    const errores = [];

    if (!datos.empresaId) {
      errores.push('Debe seleccionar una empresa instalada.');
    }

    if (!this.esTextoValido(datos.periodo, 3)) {
      errores.push('Debe indicar el periodo correspondiente (ej. 2026-T1).');
    }

    if (!this.esNumeroNoNegativo(datos.empleosReales)) {
      errores.push('La cantidad de empleos reales debe ser un valor igual o mayor a cero.');
    }

    if (!this.esNumeroNoNegativo(datos.inversionEjecutada)) {
      errores.push('La inversión ejecutada debe ser un valor en dólares igual o mayor a cero.');
    }

    if (!this.esNumeroNoNegativo(datos.exportaciones)) {
      errores.push('El monto de exportaciones debe ser un valor igual o mayor a cero.');
    }

    return {
      esValido: errores.length === 0,
      errores
    };
  }
};

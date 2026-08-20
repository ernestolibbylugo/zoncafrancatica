/**
 * ZoFranca CR — Servicio de Inteligencia Artificial (Simulado)
 * Propósito: Motor de evaluación y preclasificación de solicitudes (Soporte a la decisión humana).
 * Requerimientos: RF-04, RF-05, RF-12, RF-13.
 */

export const IAService = {
  /**
   * Evalúa de forma asíncrona una solicitud contra los criterios de la zona franca.
   * Retorna una Promesa con { puntaje, clasificacionSugerida, justificacion, fechaEvaluacion }.
   */
  async evaluarSolicitud(solicitud, zonaFranca) {
    return new Promise((resolve, reject) => {
      // Simulación de latencia de red e inferencia (350ms - 600ms)
      const delay = Math.floor(Math.random() * 250) + 350;

      setTimeout(() => {
        try {
          if (!solicitud || !zonaFranca) {
            return reject(new Error('Datos insuficientes para la evaluación de IA.'));
          }

          const inversionProyectada = Number(solicitud.inversionProyectada) || 0;
          const empleosProyectados = Number(solicitud.empleosProyectados) || 0;
          const inversionMinima = Number(zonaFranca.inversionMinima) || 50000;
          const empleosMinimos = Number(zonaFranca.empleosMinimos) || 10;
          const sectoresPermitidos = (zonaFranca.sectoresPermitidos || []).map(s => s.toLowerCase());
          const sectorSolicitud = (solicitud.sector || '').toLowerCase();

          // 1. Evaluación de Sector (Peso: 30 pts)
          const sectorValido = sectoresPermitidos.includes(sectorSolicitud);
          const ptsSector = sectorValido ? 30 : 0;

          // 2. Evaluación de Inversión (Peso: 40 pts)
          // Ratio: Si inversionProyectada >= inversionMinima * 2 => 40 pts, si == inversionMinima => 25 pts, etc.
          let ptsInversion = 0;
          if (inversionMinima > 0) {
            const ratioInv = inversionProyectada / inversionMinima;
            if (ratioInv >= 2.0) {
              ptsInversion = 40;
            } else if (ratioInv >= 1.0) {
              ptsInversion = Math.round(25 + (ratioInv - 1.0) * 15);
            } else {
              ptsInversion = Math.round(ratioInv * 20);
            }
          }

          // 3. Evaluación de Empleos (Peso: 30 pts)
          let ptsEmpleos = 0;
          if (empleosMinimos > 0) {
            const ratioEmp = empleosProyectados / empleosMinimos;
            if (ratioEmp >= 2.0) {
              ptsEmpleos = 30;
            } else if (ratioEmp >= 1.0) {
              ptsEmpleos = Math.round(20 + (ratioEmp - 1.0) * 10);
            } else {
              ptsEmpleos = Math.round(ratioEmp * 15);
            }
          }

          // Puntaje Total (0 a 100)
          let puntaje = Math.min(100, Math.max(0, ptsSector + ptsInversion + ptsEmpleos));

          // Clasificación sugerida
          let clasificacionSugerida = 'Rechazada';
          if (puntaje >= 75) {
            clasificacionSugerida = 'Recomendada';
          } else if (puntaje >= 50) {
            clasificacionSugerida = 'Revisar';
          } else {
            clasificacionSugerida = 'Rechazada';
          }

          // Construcción de justificación explicativa
          const justificaciones = [];
          if (sectorValido) {
            justificaciones.push(`Sector económico "${solicitud.sector}" prioritario y admitido (+${ptsSector} pts).`);
          } else {
            justificaciones.push(`Sector "${solicitud.sector}" no está dentro de los permitidos por la zona franca (0 pts).`);
          }

          if (inversionProyectada >= inversionMinima) {
            justificaciones.push(`Inversión proyectada ($${inversionProyectada.toLocaleString()}) supera el mínimo ($${inversionMinima.toLocaleString()}) (+${ptsInversion} pts).`);
          } else {
            justificaciones.push(`Inversión proyectada ($${inversionProyectada.toLocaleString()}) deficitaria frente al mínimo exigido ($${inversionMinima.toLocaleString()}) (+${ptsInversion} pts).`);
          }

          if (empleosProyectados >= empleosMinimos) {
            justificaciones.push(`Proyección de ${empleosProyectados} empleos directos supera la meta de ${empleosMinimos} (+${ptsEmpleos} pts).`);
          } else {
            justificaciones.push(`Proyección de empleos (${empleosProyectados}) por debajo de la cuota mínima (${empleosMinimos}) (+${ptsEmpleos} pts).`);
          }

          const resultado = {
            puntaje,
            clasificacionSugerida,
            justificacion: justificaciones.join(' '),
            fechaEvaluacion: new Date().toISOString()
          };

          resolve(resultado);
        } catch (err) {
          reject(err);
        }
      }, delay);
    });
  },

  /**
   * Evalúa múltiples solicitudes en paralelo utilizando Promise.all (RF-13, RNF-03)
   */
  async evaluarLote(solicitudes, zonaFranca) {
    if (!Array.isArray(solicitudes) || solicitudes.length === 0) {
      return [];
    }

    // Disparar concurrentemente todas las evaluaciones
    const promesas = solicitudes.map(sol =>
      this.evaluarSolicitud(sol, zonaFranca)
        .then(evaluacion => ({
          id: sol.id,
          solicitud: sol,
          evaluacion,
          error: null
        }))
        .catch(err => ({
          id: sol.id,
          solicitud: sol,
          evaluacion: null,
          error: err.message
        }))
    );

    return await Promise.all(promesas);
  }
};

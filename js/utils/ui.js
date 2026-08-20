/**
 * ZoFranca CR — Módulo de Utilidades de Interfaz de Usuario (UI)
 * Responsable: Estados de carga (RF-10), mensajes toast (RF-11), badges y formato.
 */

export const UI = {
  /**
   * Muestra un indicador visual de carga dentro de un contenedor
   */
  showLoading(container, mensaje = 'Cargando datos...') {
    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) return;

    // Verificar si ya tiene loader
    let loader = el.querySelector('.loading-overlay');
    if (!loader) {
      loader = document.createElement('div');
      loader.className = 'loading-overlay';
      loader.innerHTML = `
        <div class="spinner"></div>
        <p class="loading-text">${mensaje}</p>
      `;
      el.style.position = 'relative';
      el.appendChild(loader);
    }
  },

  /**
   * Oculta el indicador visual de carga
   */
  hideLoading(container) {
    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) return;
    const loader = el.querySelector('.loading-overlay');
    if (loader) {
      loader.remove();
    }
  },

  /**
   * Muestra una notificación emergente tipo toast
   */
  showToast(mensaje, tipo = 'info', duracionMs = 4500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${tipo}`;

    let icono = 'ℹ️';
    if (tipo === 'success') icono = '✅';
    if (tipo === 'error') icono = '❌';
    if (tipo === 'warning') icono = '⚠️';

    toast.innerHTML = `
      <span class="toast-icon">${icono}</span>
      <div class="toast-content">${mensaje}</div>
      <button class="toast-close" aria-label="Cerrar">&times;</button>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => toast.remove());

    container.appendChild(toast);

    setTimeout(() => {
      if (toast.parentElement) {
        toast.classList.add('toast-fadeout');
        setTimeout(() => toast.remove(), 300);
      }
    }, duracionMs);
  },

  /**
   * Formatea un número como moneda en dólares USD
   */
  formatMoney(monto) {
    const num = Number(monto);
    if (isNaN(num)) return '$0';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(num);
  },

  /**
   * Formatea un número como porcentaje
   */
  formatPercent(valor) {
    const num = Number(valor);
    if (isNaN(num)) return '0%';
    return `${num.toFixed(1)}%`;
  },

  /**
   * Formatea una fecha ISO a formato local legible
   */
  formatDate(fechaIso) {
    if (!fechaIso) return 'N/A';
    try {
      const fecha = new Date(fechaIso);
      return fecha.toLocaleDateString('es-CR', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return fechaIso;
    }
  },

  /**
   * Genera el HTML de un badge de estado
   */
  badgeEstado(estado) {
    const estadoLimpio = String(estado || 'Pendiente').toLowerCase();
    let clase = 'badge-secondary';

    if (estadoLimpio.includes('aprobada') || estadoLimpio.includes('recomendada') || estadoLimpio.includes('regla') || estadoLimpio === 'activo') {
      clase = 'badge-success';
    } else if (estadoLimpio.includes('revisar') || estadoLimpio.includes('pendiente') || estadoLimpio.includes('observacion')) {
      clase = 'badge-warning';
    } else if (estadoLimpio.includes('rechazada') || estadoLimpio.includes('incumplimiento') || estadoLimpio.includes('alerta')) {
      clase = 'badge-danger';
    }

    return `<span class="badge ${clase}">${estado}</span>`;
  }
};

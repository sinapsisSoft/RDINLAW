// Configuración principal
const App = {
  // Datos
  data: [],
  filteredData: [],

  // Estado de UI
  currentPage: 1,
  itemsPerPage: 10,
  globalSearchTerm: '',
  columnFilters: {},
  visibleColumns: ['#', 'Interno', 'Consecutivo', 'Demandante', 'Demandado', 'Estado', 'Origen', 'Edificio/Juzgado', 'Acciones'],
  sortConfig: { column: null, direction: 'asc' },

  // Timeout para filtros (debounce)
  filterTimeout: null,

  // Mapeo de columnas a campos de datos
  columnMapping: {
    '#': 'rowNumber',
    'Interno': 'Proc_internConsec',
    'Consecutivo': 'Proc_consecutive',
    'Demandante': 'Proc_plaintiff',
    'Demandado': 'Proc_defendant',
    'Estado': 'Proc_status',
    'Origen': 'Proc_origin',
    'Edificio/Juzgado': 'Proc_building',
    'Ciudad': 'Proc_city',
    'Despacho': 'Proc_office',
    'Radicado': 'Proc_filing',
    'Apoderado': 'Proc_attorney'
  },

  // Datos de ejemplo para actuaciones
  accionesData: {
    '2022-0052': [
      { fecha: '31/01/2022', tipo: 'Auto', descripcion: 'Al Despacho', usuario: 'SISTEMA', estado: 'Completado' },
      { fecha: '25/01/2022', tipo: 'Actuación', descripcion: 'Reparto', usuario: 'SECRETARIA', estado: 'Completado' }
    ],
    '2022-0066': [
      { fecha: '27/01/2022', tipo: 'Auto', descripcion: 'Al Despacho', usuario: 'SISTEMA', estado: 'Completado' },
      { fecha: '20/01/2022', tipo: 'Actuación', descripcion: 'Radicación', usuario: 'OFICINA', estado: 'Completado' }
    ],
    '2022-0011': [
      { fecha: '25/01/2022', tipo: 'Auto', descripcion: 'Auto Admite Demanda', usuario: 'JUEZ', estado: 'Activo' },
      { fecha: '15/01/2022', tipo: 'Actuación', descripcion: 'Reparto', usuario: 'SECRETARIA', estado: 'Completado' }
    ],
    '2022-0088': [
      { fecha: '15/02/2022', tipo: 'Auto', descripcion: 'En Trámite', usuario: 'SISTEMA', estado: 'Activo' },
      { fecha: '10/02/2022', tipo: 'Actuación', descripcion: 'Notificación', usuario: 'NOTIFICADOR', estado: 'Pendiente' }
    ],
    '2022-0033': [
      { fecha: '10/03/2022', tipo: 'Sentencia', descripcion: 'Fallo', usuario: 'JUEZ', estado: 'Completado' },
      { fecha: '05/03/2022', tipo: 'Actuación', descripcion: 'Alegatos', usuario: 'PARTES', estado: 'Completado' }
    ]
  },

  // Inicialización
  init: async function () {
    await this.fetchData();
    this.setupEventListeners();
    this.render();

    window.onclick = (event) => {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
      }
    };
  },

  // Obtener datos del API
  fetchData: async function () {
    try {
      this.data = this.generateMockData();
      this.filteredData = [...this.data];
    } catch (error) {
      console.error('Error:', error);
      alert('Error al cargar los datos');
    }
  },

  generateMockData: function () {
    let data = { "GET": "GET_PROCESS_USER", "User_id": document.getElementById('User_id').value };
    fetch(ajaxProcess, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        //console.log('Success:', data);
        this.data = data;
        this.filteredData = [...this.data];
        this.render();
      })
      .catch((error) => {
        console.error('Error:', error);
        this.showError('Error al cargar los datos');
      });

    return [];
  },

  // Configurar event listeners
  setupEventListeners: function () {
    document.getElementById('entriesPerPage').addEventListener('change', (e) => {
      this.itemsPerPage = parseInt(e.target.value);
      this.currentPage = 1;
      this.render();
    });

    document.getElementById('globalSearch').addEventListener('input', (e) => {
      clearTimeout(this.filterTimeout);
      this.filterTimeout = setTimeout(() => {
        this.globalSearchTerm = e.target.value.toLowerCase();
        this.currentPage = 1;
        this.applyFilters();
      }, 300);
    });

    document.querySelectorAll('.column-checkboxes input[type="checkbox"]').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const column = e.target.value;
        if (e.target.checked) {
          if (!this.visibleColumns.includes(column) && column !== '#') {
            this.visibleColumns.push(column);
          }
        } else {
          this.visibleColumns = this.visibleColumns.filter(c => c !== column);
        }
        this.render();
      });
    });

    document.getElementById('exportPdf').addEventListener('click', (e) => {
      e.preventDefault();
      this.exportToPDF();
    });

    document.getElementById('exportCsv').addEventListener('click', (e) => {
      e.preventDefault();
      this.exportToCSV();
    });

    document.getElementById('exportExcel').addEventListener('click', (e) => {
      e.preventDefault();
      this.exportToExcel();
    });
  },

  // Aplicar filtros
  applyFilters: function () {
    this.filteredData = this.data.filter(item => {
      if (this.globalSearchTerm) {
        const matchesGlobal = Object.values(item).some(value =>
          String(value).toLowerCase().includes(this.globalSearchTerm)
        );
        if (!matchesGlobal) return false;
      }

      for (const [column, filterValue] of Object.entries(this.columnFilters)) {
        if (filterValue) {
          const field = this.columnMapping[column];
          if (field && field !== 'rowNumber') {
            const itemValue = String(item[field] || '').toLowerCase();
            if (!itemValue.includes(filterValue.toLowerCase())) {
              return false;
            }
          }
        }
      }

      return true;
    });

    if (this.sortConfig.column) {
      this.sortData();
    }

    this.render();
  },

  // Manejar filtro de columna
  handleColumnFilter: function (column, value) {
    const input = document.querySelector(`.column-filter[data-column="${column}"]`);
    if (input) {
      input.value = value;
    }

    clearTimeout(this.filterTimeout);

    this.filterTimeout = setTimeout(() => {
      if (value) {
        this.columnFilters[column] = value;
      } else {
        delete this.columnFilters[column];
      }
      this.currentPage = 1;
      this.applyFilters();
    }, 300);
  },

  // Manejar ordenamiento
  handleSort: function (column) {

    if (column === 'Acciones') return;

    if (this.sortConfig.column === column) {
      this.sortConfig.direction = this.sortConfig.direction === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortConfig.column = column;
      this.sortConfig.direction = 'asc';
    }

    this.sortData();
    this.render();
  },

  // Ordenar datos
  sortData: function () {
    const { column, direction } = this.sortConfig;
    const field = this.columnMapping[column];

    if (!field || field === 'rowNumber') return;

    this.filteredData.sort((a, b) => {
      let valueA = String(a[field] || '').toLowerCase();
      let valueB = String(b[field] || '').toLowerCase();

      if (direction === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });
  },

  // Renderizar encabezados
  renderHeaders: function () {
    const thead = document.getElementById('tableHeaders');

    let titleRow = '<tr>';
    this.visibleColumns.forEach(column => {
      const isSortable = column !== 'Acciones' && column !== '#';
      const sortClass = this.sortConfig.column === column ? this.sortConfig.direction : '';

      titleRow += `
        <th class="${isSortable ? 'sortable ' + sortClass : ''}" 
        ${isSortable ? `onclick="App.handleSort('${column}')"` : ''}>
        ${column}
        ${isSortable ? '<i class="fas fa-sort"></i>' : ''}
        </th>
        `;
    });
    titleRow += '</tr>';

    let filterRow = '<tr class="filter-row">';
    this.visibleColumns.forEach(column => {
      if (column === 'Acciones' || column === '#') {
        filterRow += '<th></th>';
      } else {
        const filterValue = this.columnFilters[column] || '';
        filterRow += `
            <th>
            <input type="text" 
            class="column-filter ${filterValue ? 'active' : ''}"
            data-column="${column}"
            placeholder="Filtrar ${column}"
            value="${filterValue}"
            oninput="App.handleColumnFilter('${column}', this.value)">
            </th>
            `;
      }
    });
    filterRow += '</tr>';

    thead.innerHTML = titleRow + filterRow;
  },

  // Renderizar cuerpo
  renderBody: function () {
    const tbody = document.getElementById('tableBody');
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const pageData = this.filteredData.slice(start, end);

    if (pageData.length === 0) {
      tbody.innerHTML = `
      <tr>
      <td colspan="${this.visibleColumns.length}" class="no-data">
      <i class="fas fa-search"></i>
      <p>No se encontraron resultados</p>
      </td>
      </tr>
      `;
      return;
    }

    let html = '';
    pageData.forEach((item, index) => {
      const rowNumber = start + index + 1;
      html += '<tr>';

      this.visibleColumns.forEach(column => {
        if (column === '#') {
          html += `<td>${rowNumber}</td>`;
        } else if (column === 'Acciones') {
          html += this.renderActionsDropdown(item);
        } else {
          const field = this.columnMapping[column];
          html += `<td>${item[field] || '-'}</td>`;
        }
      });

      html += '</tr>';
    });

    tbody.innerHTML = html;
  },

  // Renderizar dropdown de acciones
  renderActionsDropdown: function (item) {
    const itemJson = JSON.stringify(item).replace(/'/g, "&apos;");

    return `
        <td>
        <div class="actions-dropdown">
        <button class="actions-btn">
        Acciones <i class="fas fa-chevron-down"></i>
        </button>
        <div class="actions-menu">
        <div class="action-menu-item detail" onclick='App.showDetail(${itemJson})'>
        <i class="fas fa-eye"></i>
        Ver detalle
        </div>
        <div class="action-menu-item history" onclick='App.showActions(${itemJson})'>
        <i class="fas fa-history"></i>
        Ver actuaciones
        </div>
        </div>
        </div>
        </td>
        `;
  },

  // Renderizar paginación
  renderPagination: function () {
    const container = document.getElementById('pagination');
    const infoContainer = document.getElementById('paginationInfo');
    const total = this.filteredData.length;
    const totalPages = Math.ceil(total / this.itemsPerPage);

    if (total === 0) {
      infoContainer.textContent = 'Mostrando 0 registros';
    } else {
      const start = (this.currentPage - 1) * this.itemsPerPage + 1;
      const end = Math.min(this.currentPage * this.itemsPerPage, total);
      infoContainer.textContent = `Mostrando ${start} a ${end} de ${total} registros`;
    }

    if (totalPages <= 1) {
      container.innerHTML = '';
      return;
    }

    let html = `
      <button class="page-btn" ${this.currentPage === 1 ? 'disabled' : ''} 
      onclick="App.changePage(${this.currentPage - 1})">
      <i class="fas fa-chevron-left"></i>
      </button>
      `;

    const maxVisible = 5;
    let startPage = Math.max(1, this.currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      html += `
      <button class="page-btn ${i === this.currentPage ? 'active' : ''}" 
      onclick="App.changePage(${i})">
      ${i}
      </button>
      `;
    }

    html += `
    <button class="page-btn" ${this.currentPage === totalPages ? 'disabled' : ''} 
    onclick="App.changePage(${this.currentPage + 1})">
    <i class="fas fa-chevron-right"></i>
    </button>
    `;

    container.innerHTML = html;
  },

  // Renderizar todo
  render: function () {
    this.renderHeaders();
    this.renderBody();
    this.renderPagination();
  },

  // Cambiar página
  changePage: function (page) {
    this.currentPage = page;
    this.render();
  },

  // Mostrar detalle
  showDetail: async function (item) {
    await showDetail(item.Proc_id);
   
    // const modal = document.getElementById('detailModal');
    // const content = document.getElementById('detailContent');

    // let html = '<table class="detail-table">';

    // const fields = [
    //   ['ID', item.Proc_id],
    //   ['Interno', item.Proc_internConsec],
    //   ['Consecutivo', item.Proc_consecutive],
    //   ['Demandante', item.Proc_plaintiff],
    //   ['Demandado', item.Proc_defendant],
    //   ['Estado', item.Proc_status],
    //   ['Origen', item.Proc_origin],
    //   ['Edificio/Juzgado', item.Proc_building],
    //   ['Ciudad', item.Proc_city],
    //   ['Despacho', item.Proc_office],
    //   ['Radicado', item.Proc_filing],
    //   ['Apoderado', item.Proc_attorney]
    // ];

    // fields.forEach(([label, value]) => {
    //   html += `
    //     <tr>
    //     <th>${label}</th>
    //     <td>${value || '-'}</td>
    //     </tr>
    //     `;
    // });

    // html += '</table>';
    // content.innerHTML = html;
    // modal.style.display = 'block';
  },

  // Mostrar acciones (actuaciones)
  showActions: async function (item) {

    
    await showPerformances(item.Proc_id);
    // const modal = document.getElementById('actionsModal');
    // const content = document.getElementById('actionsContent');
    // const consecutivo = item.Proc_consecutive;
    // const acciones = this.accionesData[consecutivo] || [];

    // let html = `
    //     <h3>Expediente: ${consecutivo}</h3>
    //     <p><strong>Demandante:</strong> ${item.Proc_plaintiff}</p>
    //     <p><strong>Estado actual:</strong> ${item.Proc_status}</p>

    //     <table class="actions-table">
    //     <thead>
    //     <tr>
    //     <th>Fecha</th>
    //     <th>Tipo</th>
    //     <th>Descripción</th>
    //     <th>Usuario</th>
    //     <th>Estado</th>
    //     </tr>
    //     </thead>
    //     <tbody>
    //     `;

    //         if (acciones.length === 0) {
    //           html += `
    //     <tr>
    //     <td colspan="5" class="no-data">
    //     <p>No hay actuaciones registradas</p>
    //     </td>
    //     </tr>
    //     `;
    // } else {
    //   acciones.forEach(accion => {
    //     const badgeClass = accion.estado === 'Completado' ? 'badge-success' : (accion.estado === 'Activo' ? 'badge-info' : 'badge-warning');

    //     html += `
    //           <tr>
    //           <td>${accion.fecha}</td>
    //           <td><strong>${accion.tipo}</strong></td>
    //           <td>${accion.descripcion}</td>
    //           <td>${accion.usuario}</td>
    //           <td><span class="badge ${badgeClass}">${accion.estado}</span></td>
    //           </tr>
    //           `;
    //                 });
    //               }

    //               html += `
    //           </tbody>
    //           </table>
    //           `;

    // content.innerHTML = html;
    // modal.style.display = 'block';
  },

  // Exportar a PDF
  exportToPDF: function () {
    if (this.filteredData.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    const printWindow = window.open('', '_blank');

    let html = `
      <html>
      <head>
      <title>Exportación de Expedientes</title>
      <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      h1 { color: #333; font-size: 18px; margin-bottom: 20px; }
      .info { color: #666; font-size: 12px; margin-bottom: 10px; }
      table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 12px; }
      th { background: #f8f9fa; font-weight: bold; padding: 8px; text-align: left; border: 1px solid #ddd; }
      td { padding: 6px; border: 1px solid #ddd; }
      .filters { background: #f8f9fa; padding: 10px; margin-bottom: 15px; font-size: 11px; }
      </style>
      </head>
      <body>
      <h1>Reporte de Expedientes</h1>
      <div class="info">
      Fecha: ${new Date().toLocaleDateString()}<br>
      Total registros: ${this.filteredData.length}
      </div>`;

    if (this.globalSearchTerm || Object.keys(this.columnFilters).length > 0) {
      html += '<div class="filters"><strong>Filtros aplicados:</strong><br>';
      if (this.globalSearchTerm) {
        html += `- Búsqueda global: "${this.globalSearchTerm}"<br>`;
      }
      for (const [col, val] of Object.entries(this.columnFilters)) {
        html += `- ${col}: "${val}"<br>`;
      }
      html += '</div>';
    }

    html += this.generateExportTable();
    html += '</body></html>';

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.print();
  },

  // Exportar a CSV
  exportToCSV: function () {
    if (this.filteredData.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    const exportColumns = this.visibleColumns.filter(col => col !== 'Acciones');
    const headers = exportColumns;

    const rows = this.filteredData.map((item, index) => {
      return exportColumns.map(column => {
        if (column === '#') return index + 1;
        const field = this.columnMapping[column];
        return item[field] || '';
      });
    });

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell =>
        `"${String(cell).replace(/"/g, '""')}"`
      ).join(','))
    ].join('\n');

    this.downloadFile(csvContent, 'expedientes.csv', 'text/csv');
  },

  // Exportar a Excel
  exportToExcel: function () {
    if (this.filteredData.length === 0) {
      alert('No hay datos para exportar');
      return;
    }

    const exportColumns = this.visibleColumns.filter(col => col !== 'Acciones');
    const headers = exportColumns;

    const rows = this.filteredData.map((item, index) => {
      return exportColumns.map(column => {
        if (column === '#') return index + 1;
        const field = this.columnMapping[column];
        return item[field] || '';
      });
    });

    const wsData = [headers, ...rows];
    const xml = this.generateExcelXML(wsData);
    this.downloadFile(xml, 'expedientes.xls', 'application/vnd.ms-excel');
  },

  // Generar tabla para exportación
  generateExportTable: function () {
    const exportColumns = this.visibleColumns.filter(col => col !== 'Acciones');
    let html = '<table><thead><tr>';
    exportColumns.forEach(col => html += `<th>${col}</th>`);
    html += '</tr></thead><tbody>';
    this.filteredData.forEach((item, index) => {
      html += '<tr>';
      exportColumns.forEach(column => {
        if (column === '#') {
          html += `<td>${index + 1}</td>`;
        } else {
          const field = this.columnMapping[column];
          html += `<td>${item[field] || '-'}</td>`;
        }
      });
      html += '</tr>';
    });
    html += '</tbody></table>';
    return html;
  },

  // Generar XML para Excel
  generateExcelXML: function (data) {
    let xml = '<?xml version="1.0"?><?mso-application progid="Excel.Sheet"?>';
    xml += '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" ';
    xml += 'xmlns:o="urn:schemas-microsoft-com:office:office" ';
    xml += 'xmlns:x="urn:schemas-microsoft-com:office:excel" ';
    xml += 'xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">';
    xml += '<Worksheet ss:Name="Expedientes">';
    xml += '<Table>';

    data.forEach(row => {
      xml += '<Row>';
      row.forEach(cell => {
        xml += `<Cell><Data ss:Type="String">${String(cell || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</Data></Cell>`;
      });
      xml += '</Row>';
    });

    xml += '</Table></Worksheet></Workbook>';
    return xml;
  },

  // Descargar archivo
  downloadFile: function (content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);
  }



};

// Inicializar
document.addEventListener('DOMContentLoaded', () => App.init());
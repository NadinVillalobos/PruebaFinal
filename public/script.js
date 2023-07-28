function filtrarDepartamentos() {
    const name = document.getElementById('name').value;
    const groupname = document.getElementById('groupname').value;
    const startdate = document.getElementById('startdate').value;
    const enddate = document.getElementById('enddate').value;
    
  
    const data = { name, groupname, startdate, enddate };
  
    fetch('/api/departments/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        const departamentosList = document.getElementById('departamentosList');
        departamentosList.innerHTML = '';
  
        const table = document.createElement('table');
        table.classList.add('table');
  
        const headerRow = table.insertRow();
        headerRow.innerHTML = `
          <th>Departamento ID</th>
          <th>Nombre</th>
          <th>Nombre del Grupo</th>
          <th>ID del Empleado</th>
          <th>Fecha de Inicio</th>
        `;
  
        data.forEach((departamento) => {
          const row = table.insertRow();
          row.innerHTML = `
            <td>${departamento.departmentid}</td>
            <td>${departamento.name}</td>
            <td>${departamento.groupname}</td>
            <td>${departamento.businessentityid}</td>
            <td>${departamento.startdate}</td>
          `;
        });
  
        departamentosList.appendChild(table);
      })
      .catch((error) => console.error('Error al obtener los departamentos:', error));
  }
  
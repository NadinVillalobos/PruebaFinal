const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'humanResources',
  password: 'moondog2023',
  port: 5432,
});

const getAllDepartments = (req, res) => {
  const query = 'SELECT * FROM public.department';

  pool.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los departamentos:', error);
      res.status(500).json({ error: 'Ocurrió un error al obtener los departamentos' });
    } else {
      res.json(results.rows);
    }
  });
};


const filterDepartments = (req, res) => {
    const { name, groupname, startdate, enddate } = req.body;
  
    let query = `
      SELECT
        public.department.departmentid,
        public.department.name,
        public.department.groupname,
        public.employeedepartmenthistory.businessentityid,
        TO_CHAR(public.employeedepartmenthistory.startdate, 'YYYY-MM-DD') AS startdate
      FROM
        public.department
        JOIN public.employeedepartmenthistory ON public.department.departmentid = public.employeedepartmenthistory.departmentid
      WHERE 1=1
    `;
    const values = [];
  
    if (name) {
      query += ' AND public.department.name ILIKE $1';
      values.push(`%${name}%`);
    } else if (groupname) {
      query += ' AND public.department.groupname ILIKE $1';
      values.push(`%${groupname}%`);
    }
  
    if (startdate && enddate) {
      query += ' AND public.employeedepartmenthistory.startdate >= $2 AND public.employeedepartmenthistory.startdate <= $3';
      values.push(startdate, enddate);
    }
    query += ' ORDER BY public.department.departmentid ASC';
  
    pool.query(query, values, (error, results) => {
      if (error) {
        console.error('Error al filtrar los departamentos:', error);
        res.status(500).json({ error: 'Ocurrió un error al filtrar los departamentos' });
      } else {
        res.json(results.rows);
      }
    });
};

module.exports = {
  getAllDepartments,
  filterDepartments,
};

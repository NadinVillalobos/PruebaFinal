SELECT
    e.businessentityid,
    e.nationalidnumber,
    edh.departmentid,
    d.name AS department_name,
    d.groupname,
    edh.startdate
FROM
    public.employee AS e
JOIN
    public.employeedepartmenthistory AS edh
    ON e.businessentityid = edh.businessentityid
JOIN
    public.department AS d
    ON edh.departmentid = d.departmentid
WHERE
    edh.startdate >= '2009-01-01'::date
    AND edh.startdate < '2010-01-01'::date;
SELECT
    businessentityid,
    persontype,
    namestyle,
    title,
    firstname,
	middlename,
    lastname,
    suffix
FROM
    public.person
WHERE
    middlename = 'NULL';
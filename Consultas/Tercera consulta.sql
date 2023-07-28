SELECT
    suffix,
    COUNT(*) AS count
FROM
    public.person
WHERE
    suffix <> 'NULL'
GROUP BY
    suffix;
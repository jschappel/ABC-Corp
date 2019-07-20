use abc;
SELECT m.model_name, e.serial_number FROM equipment e
JOIN model m ON e.fk_model_id = m.model_id
WHERE e.fk_employee_id = 1 AND e.active = 1
ORDER BY m.model_name ASC;

SELECT * FROM model;
SELECT * FROM equipment e JOIN model m ON e.fk_model_id = m.model_id WHERE e.fk_employee_id = 1 AND e.active = 1 ORDER BY m.model_name ASC;

SELECT *
FROM   information_schema.tables
WHERE  table_schema = 'abc';
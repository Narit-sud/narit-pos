/**
 * SQL queries for login route
 * @returns LoginInterface[]
 */
export const loginSql = `
	SELECT 
		id, password
	FROM
		"user" 
	WHERE
		username = $1`;

export const getAuthSql = `
	SELECT
		u.id AS "id",
		u.username AS "username",
		u.email AS "email",
		u.phone_number as "phoneNumber",
		u.name AS "name",
		u.surname as "surname",
		u.created_at AS "createdAt",
		u.updated_at AS "updatedAt"
	FROM
		"user" u
	WHERE
		u.id = $1
	`;

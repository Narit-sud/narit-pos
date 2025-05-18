/**
 * @description SQL queries for user list and store permission with in store
 */
export const getStorePermissionSql = `
	SELECT
		u.id AS "userId",
		u.name AS "name",
		u.surname AS "surname",
		u.username AS "username",
		u.email AS "email",
		sp.name AS "permission",
		su.updated_at AS "permissionSince",
		su.created_at AS "joinedAt"
	FROM
		store_user su
	JOIN "user" u ON
		su.user_id = u.id
	JOIN store_permission sp ON
		sp.id = su.permission_id
	WHERE
		su.store_id = $1
	ORDER BY
		"joinedAt" DESC
`;

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

/**
 * SQL queries for the store table by using userId
 * @returns StoreUserInterface[]
 */
export const getStoreDataSql = `
	SELECT
		s.id as "id",
		s.name as "name",
		sp.name as "permission",
		s.created_at as "createdAt",
		s.updated_at as "updatedAt",
		creator.username as "createdBy",
		updater.username as "updatedBy"
	FROM
		store s
	JOIN store_user su on
		s.id = su.store_id
	JOIN store_permission sp on
		su.permission_id = sp.id
	JOIN "user" creator on
		creator.id = s.created_by_user_id
	LEFT JOIN "user" updater on
		updater.id = s.updated_by_user_id
	WHERE
		su.user_id = $1`;

/**
 * * SQL queries for the store table by using userId and storeId to check if the user is authorized in that store
 * @returns userId, storeId, permissionId
 */
export const getStoreUserPermissionIdSql = `
	SELECT
		su.user_id AS "userId",
		su.store_id AS "storeId",
		sp.name AS "permission"
	FROM
		store_user su
	JOIN store_permission sp ON
		sp.id = su.permission_id
	WHERE
		su.user_id = $1
		AND su.store_id = $2
		AND su.permission_id != '2e8b1b2c-e9b7-4fbd-977a-17e7c4ca02f0'
		-- PERMISSION != "Pending"`;

/**
 *  SQL query for inserting a new store
 */
export const createNewStoreSql = `
	INSERT
		INTO store
		(id,
		"name",
		created_by_user_id,
		created_at,
		updated_at,
		updated_by_user_id)
	VALUES
		($1, -- storeId
		$2, -- storeName
		$3, -- userId
		now(),
		now(),
		$3); -- userId
`;

export const addOwnerPermissionSql = `
	INSERT
		INTO store_user
		(user_id, -- userId
		store_id, -- storeId
		created_at,
		updated_at,
		created_by, -- userId
		updated_by, -- userId
		permission_id)
	VALUES
		($1, 
		$2, 
		now(), 
		now(), 
		$1,
		$1,
		'19eb20ad-29aa-4834-b22c-eb365c57a3db'); -- owner permission id
`;

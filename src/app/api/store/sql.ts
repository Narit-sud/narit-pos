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
		creator.name as "createdBy",
		updater.name as "updatedBy"
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

/**
 * SQL query for inserting a new store permission
 * * $1 = store id
 * * $2 = user id
 */
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

/**
 * Sql query for inserting a default category
 * * $1 = category id
 * * $2 = user id
 * * $3 = store id
 */
export const createDefaultCategorySql = `
        INSERT
        INTO
        product_category(
            id,
            "name",
            detail,
            created_at,
            updated_at,
            created_by,
            updated_by,
            store_id)
        VALUES(
            $1, -- category id
            'Uncategorized', -- name
			'Default category', -- detail
            now(), -- created_at
            now(), -- updated_at
            $2, -- created_by
            $2, -- updated_by
            $3); -- store id
`;

/**
 * SQL query for inserting a default brand
 * * $1 = brand id
 * * $2 = category id
 * * $3 = store id
 * * $4 = user id
 */
export const createDefaultBrandSql = `
	INSERT
	INTO
	product_brand (
		id,
		"name",
		product_category_id,
		detail,
		created_at,
		updated_at,
		store_id,
		created_by,
		updated_by)
	VALUES (
		$1, -- id
		'Unbranded', -- name
		$2, -- category id
		'Default brand', -- detail
		now(), -- created_at
		now(), -- updated_at
		$3, -- store id
		$4, -- created_by
		$4); -- updated_by
		`;

/**
 * SQL query for inserting a default customer
 * * $1 = store id
 * * $2 = user id
 */
export const createDefaultCustomerSql = `
	INSERT
	INTO customer (
		id,
		"name",
		surname,
		email,
		phone_number,
		address,
		store_id,
		created_at,
		updated_at,
		updated_by_user_id,
		created_by_user_id
		)
	VALUES(
		gen_random_uuid(), -- id
		'Default Customer', -- name
		'', -- surname
		'', -- email
		'', -- phone_number
		'', -- address
		$1, -- store_id
		now(), -- created_at
		now(), -- updated_at
		$2, -- created_by_user_id
		$2); -- updated_by_user_id
`;

/**
 * SQL query for inserting a default supplier
 * * $1 = store id
 * * $2 = user id
 */
export const createDefaultSupplierSql = `
	INSERT
	INTO supplier (
		id,
		"name",
		surname,
		email,
		phone_number,
		address,
		store_id,
		created_at,
		updated_at,
		updated_by_user_id,
		created_by_user_id
		)
	VALUES(
		gen_random_uuid(), -- id
		'Default Supplier', -- name
		'', -- surname
		'', -- email
		'', -- phone_number
		'', -- address
		$1, -- store_id
		now(), -- created_at
		now(), -- updated_at
		$2, -- created_by_user_id
		$2); -- updated_by_user_id
`;

/**
 * SQL query for inserting a new store payment method
 * * $1 = store id
 */
export const addDefaultPaymentMethodSql = `
	INSERT
	INTO payment_method (
		id,
		"name",
		for_stock_in,
		for_stock_out,
		store_id)
	VALUES (
		gen_random_uuid(),
		'Cash',
		TRUE,
		TRUE,
		$1);
`;

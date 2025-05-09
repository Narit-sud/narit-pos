export const getCustomerSql = `
		SELECT
			c.id as "id",
			c.name as "name",
			c.surname as "surname",
			c.email as "email",
			c.phone_number AS "phoneNumber",
			c.address as "address",
			c.created_at as "createdAt",
			creator.username AS "createdBy",
			c.updated_at as "updatedAt",
			updator.username AS "updatedBy"
		FROM
			customer c
		JOIN "user" creator ON
			creator.id = created_by_user_id
		JOIN "user" updator ON
			updator.id = updated_by_user_id
		WHERE
			c.store_id = $1
		ORDER BY
			c.created_at;
`;
export const createCustomerSql = `
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
		$1, -- id
		$2, -- name
		$3, -- surname
		$4, -- email
		$5, -- phone_number
		$6, -- address
		$7, -- store_id
		now(), -- created_at
		now(), -- updated_at
		$8, -- created_by_user_id
		$8); -- updated_by_user_id
`;

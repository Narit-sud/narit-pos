export const getSupplierSql = `
		SELECT
			s.id as "id",
			s.name as "name",
			s.surname as "surname",
			s.email as "email",
			s.phone_number AS "phoneNumber",
			s.address as "address",
			s.created_at as "createdAt",
			creator.username AS "createdBy",
			s.updated_at as "updatedAt",
			updator.username AS "updatedBy"
		FROM
			supplier s
		JOIN "user" creator ON
			creator.id = created_by_user_id
		JOIN "user" updator ON
			updator.id = updated_by_user_id
		WHERE
			s.store_id = $1
		ORDER BY
			s.created_at;
`;

/**
 * * $1, -- id
 * * $2, -- name
 * * $3, -- surname
 * * $4, -- email
 * * $5, -- phone_number
 * * $6, -- address
 * * $7, -- store_id
 * * $8, -- created_by_user_id, updated_by_user_id
 */
export const createSupplierSql = `
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

export const updateSupplierSql = `
		UPDATE
			supplier
		SET
			"name" = $1,
			surname = $2,
			email = $3,
			address = $4,
			phone_number = $5,
			updated_by_user_id = $6,
			updated_at = now()
		WHERE
			id = $7
			AND store_id =$8;
`;

/**
 * * $1: id
 * * $2: name
 * * $3: detail
 * * $4: created_by, updated_by
 * * $5: store_id
 */
export const createCategorySql = `
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
            $1,
            $2,
            $3,
            now(),
            now(),
            $4,
            $4,
            $5);
`;

export const getCategorySql = `
		SELECT
			pc.id AS "id",
			pc.name AS "name",
			pc.detail AS "detail",
			pc.created_at AS "createdAt",
			pc.updated_at AS "updatedAt",
			creator.name AS "createdBy",
			updator.name AS "updatedBy"
		FROM
				product_category pc
		JOIN "user" creator ON
				creator.id = pc.created_by
		JOIN "user" updator ON
				updator.id = pc.updated_by
		WHERE
			pc.store_id = $1
		ORDER BY
			pc.created_at ASC;`;

export const updateCategorySql = `
        UPDATE
            product_category
        SET
            "name" = $1,
            detail = $2,
            updated_at = now(),
            updated_by = $3
        WHERE
            id = $4;`;

export const getBrandSql = `
	SELECT
		pb.id AS "id",
		pb.name AS "name",
		pc.name AS "category",
		pc.id as "categoryId",
		pb.detail AS "detail",
		pb.created_at AS "createdAt",
		pb.updated_at AS "updatedAt",
		creator.name AS "createdBy",
		updator.name AS "updatedBy"
	FROM
		product_brand pb
	JOIN product_category pc ON
		pb.product_category_id = pc.id
	JOIN "user" creator ON
		creator.id = pc.created_by
	JOIN "user" updator ON
		updator.id = pc.updated_by
	WHERE
		pc.store_id = $1
	ORDER BY
		pb.created_at;`;

/**
 * * $1 = brandId
 * * $2 = brandName
 * * $3 = categoryId
 * * $4 = brandDetail
 * * $5 = storeId
 * * $6 = userId
 */
export const createBrandSql = `
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
		$1,
		$2,
		$3,
		$4,
		now(),
		now(),
		$5,
		$6,
		$6);`;

export function createBrandSqlParams(
    brandId: string,
    brandName: string,
    categoryId: string,
    brandDetail: string,
    storeId: string,
    userId: string
): string {
    return `
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
			'${brandId}',
			'${brandName}',
			'${categoryId}',
			'${brandDetail}',
			now(),
			now(),
			'${storeId}',
			'${userId}',
			'${userId}');`;
}

export const updateBrandSql = `;
	UPDATE
		product_brand
	SET
		"name" = $1,
		product_category_id = $2,
		detail = $3,
		updated_at = now(),
		updated_by = $4
	WHERE
		id = $5;`;

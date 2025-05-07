export const testSql = `
SELECT
	pv.id,
	pv.name,
	pv.detail,
	pv.price,
	(
		COALESCE(
			procurement_stock,
			0
		) - COALESCE(
			sale_stock,
			0
		)
	) AS stock,
	pb.name AS brand,
	pv.created_at AS "createdAt",
	pv.updated_at AS "updatedAt",
	creator.username AS "createdBy",
	updater.username AS "updatedBy"
FROM
	product_variant pv
JOIN product_brand pb ON
	pv.product_brand_id = pb.id
JOIN store s ON
	pv.store_id = s.id
JOIN "user" creator ON
	creator.id = s.created_by_user_id
	-- Corrected column name
LEFT JOIN "user" updater ON
	updater.id = s.updated_by_user_id
LEFT JOIN (
		SELECT
			product_variant_id,
			SUM(qty) AS procurement_stock
		FROM
			procurement_product_variant
		GROUP BY
			product_variant_id
	) AS procurement_summary ON
	pv.id = procurement_summary.product_variant_id
LEFT JOIN (
		SELECT
			product_variant_id,
			SUM(qty) AS sale_stock
		FROM
			sale_product_variant
		GROUP BY
			product_variant_id
	) AS sale_summary ON
	pv.id = sale_summary.product_variant_id;`;

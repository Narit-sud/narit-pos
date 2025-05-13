/**
 * SQL to create product
 * * $1 = product id
 * * $2 = product name
 * * $3 = product brand id
 * * $4 = product price
 * * $5 = product cost
 * * $6 = product detail
 * * $7 = store id
 * * $8 = user id

 */
export const createProductSql = `
        INSERT
        INTO product_variant (
            id,
            "name",
            product_brand_id,
            price,
            "cost",
            detail,
            created_at,
            updated_at,
            store_id,
            status,
            created_by,
            updated_by
        )
        VALUES (
            $1, -- id
            $2, -- name
            $3, -- brandId
            $4, -- price
            $5, -- cost
            $6, --detail
            now(), -- createdAt
            now(), -- updatedAt
            $7, -- storeId
            1, -- status
            $8, -- createdBy
            $8 -- updatedBy
        );`;

/**
 * SQL Query to fetch ProductInterface[] with active status order by time of creation
 */
export const getProductSql = `
	SELECT
		pv.id as "id",
		pv.name as "name",
		pv.detail as "detail",
		pv.price as "price",
			(
			COALESCE(stock_in_summary.total_stock_in, 0) - 
			COALESCE(stock_out_summary.total_stock_out, 0)
			) AS "stock",
		pv.cost as "cost",
		pb.id as "brandId",
		pb.name AS "brand",
		pc.id as "categoryId",
		pc.name as "category",
		pv.created_at AS "createdAt",
		pv.updated_at AS "updatedAt",
		creator.username AS "createdBy",
		updater.username AS "updatedBy"
	FROM
		product_variant pv
	JOIN product_brand pb ON
		pv.product_brand_id = pb.id
	JOIN product_category pc ON
		pb.product_category_id = pc.id
	JOIN store s ON
		pv.store_id = s.id
	JOIN "user" creator ON
		creator.id = pv.created_by
	LEFT JOIN "user" updater ON
		updater.id = pv.updated_by
	LEFT JOIN (
		SELECT
			product_variant_id,
			SUM(qty) AS total_stock_in
		FROM
			stock_in_items
		GROUP BY
			product_variant_id
	) AS stock_in_summary ON
		pv.id = stock_in_summary.product_variant_id
	LEFT JOIN (
		SELECT
			product_variant_id,
			SUM(qty) AS total_stock_out
		FROM
			stock_out_items
		GROUP BY
			product_variant_id
	) AS stock_out_summary ON
		pv.id = stock_out_summary.product_variant_id
	WHERE
		pv.store_id = $1
		AND pv.status = 1
	ORDER BY
		pv.created_at;`;

/**
 * SQL Query to update product variant
 * * $1 = product name
 * * $2 = product brand id
 * * $3 = product price
 * * $4 = product cost
 * * $5 = product detail
 * * $6 = user id
 * * $7 = product id
 * * $8 = store id
 */
export const updateProductSql = `
UPDATE
	product_variant
SET
	name = $1,
	product_brand_id = $2,
	price = $3,
	"cost" = $4,
	detail = $5,
	updated_at = now(),
	updated_by = $6
WHERE
	id = $7
	AND store_id = $8;
`;

/**
 * SQL Query to increment stock of a product variant
 * * $1 = product variant id
 * * $2 = qty
 * * $3 = total
 * * $4 = store id
 */
export const incrementStockSql = `
	INSERT
	INTO public.stock_in_items (
		product_variant_id,
		qty,
		total,
		store_id)
	VALUES(
		$1, -- product variant id
		$2, -- qty
		$3, -- total
		$4 -- store id
		);`;

/**
 * SQL Query to decrement stock of a product variant
 * * $1 = product variant id
 * * $2 = qty
 * * $3 = total
 * * $4 = store id
 */
export const decrementStockSql = `
	INSERT
	INTO public.stock_out_items (
		product_variant_id,
		qty,
		total,
		store_id)
	VALUES(
		$1, -- product variant id
		$2, -- qty
		$3, -- total
		$4 -- store id
		);`;

/**
 * SQL Query to get current stock of a product variant
 * * * $1 = product variant id
 */
export const getCurrentStockSql = `
SELECT 
    (
        COALESCE(
            (SELECT SUM(qty) FROM stock_in_items WHERE product_variant_id = pv.id),
            0
        ) - 
        COALESCE(
            (SELECT SUM(qty) FROM stock_out_items WHERE product_variant_id = pv.id),
            0
        )
    ) AS "currentStock"
FROM 
    product_variant pv 
WHERE 
    pv.id = $1;`;

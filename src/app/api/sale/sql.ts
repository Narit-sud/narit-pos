export const getDefaultCustomer = `
	SELECT id FROM public.customer WHERE store_id = $1 ORDER BY created_at LIMIT 1`;

/**
 * $1: detail
 * $2: user_id
 * $3: customer_id
 * $4: store_id
 */
export const insertSaleHeader = `
    INSERT INTO public.stock_out (
        is_delivered,
        is_paid,
        stock_movement_type_id,
        payment_method_id,
        detail,
        updated_by_user_id,
        created_by_user_id,
        customer_id,
        store_id)
    VALUES(
        true, -- is_delivered
        true, -- is_paid
        'dd986a5b-6c70-47b5-a4b7-2a3b5d830f9c', -- stock_movement_type_id: 'Customer'
        '06b36e8d-11a9-4c5b-94b8-16d45048f4b9', -- payment_method_id: 'Cash'
        $1, -- detail
        $2, -- updated_by_user_id
        $2, -- created_by_user_id
        $3, -- customer_id
        $4 -- store_id
    )
    RETURNING id;
`;

/**
 * $1: product_variant_id
 * $2: stock_out_id
 * $3: qty
 * $4: total
 * $5: store_id
 */
export const insertSaleBody = `
	INSERT INTO public.stock_out_items (
		product_variant_id,
		stock_out_id,
		qty,
		total,
		store_id)
	VALUES(
		$1, -- product_variant_id
		$2, -- stock_out_id
		$3, -- qty
		$4, -- total
		$5 -- store_id
		);
`;

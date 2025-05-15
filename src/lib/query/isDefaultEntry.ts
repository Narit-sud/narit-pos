/**
 * Module containing functions to check if a brand or category is the default entry in their respective tables.
 *
 * @module isDefaultEntry
 *
 * @function isDefaultBrand
 * @param {string} storeId - The ID of the store to check
 * @param {string} brandId - The ID of the brand to check
 * @returns {Promise<boolean>} True if the brand is the default entry, false otherwise
 *
 * @function isDefaultCategory
 * @param {string} storeId - The ID of the store to check
 * @param {string} categoryId - The ID of the category to check
 * @returns {Promise<boolean>} True if the category is the default entry, false otherwise
 *
 * @description
 * Both functions query the database to find the earliest created record by created_at timestamp.
 * - isDefaultBrand checks the product_brand table
 * - isDefaultCategory checks the product_category table
 * The functions filter by store_id and order by creation date to determine if the given ID
 * corresponds to the default entry in their respective tables.
 */

import { db } from "@/lib/db";
/**
 * Checks if a brand ID is the default entry in the product_brand table.
 * @param {string} storeId - The ID of the store to check.
 * @param {string} brandId - The ID of the brand to check.
 * @returns {Promise<boolean>} - True if the brand is the default entry, false otherwise.
 */
export async function isDefaultBrand(
    storeId: string,
    brandId: string
): Promise<boolean> {
    const query = await db.query(
        `
		SELECT id,name
		FROM product_brand pb
		WHERE pb.store_id = $1
		ORDER BY created_at ASC
        LIMIT 1
		`,
        [storeId]
    );
    if (!query.rowCount) {
        return false;
    }
    if (query.rows[0].id !== brandId) {
        return false;
    }
    return true;
}

/**
 * Checks if a category ID is the default entry in the product_category table.
 * @param {string} storeId - The ID of the store to check.
 * @param {string} categoryId - The ID of the category to check.
 * @returns {Promise<boolean>} - True if the category is the default entry, false otherwise.
 */
export async function isDefaultCategory(
    storeId: string,
    categoryId: string
): Promise<boolean> {
    const query = await db.query(
        `
        SELECT id,name
        FROM product_category pc
        WHERE pc.store_id = $1
        ORDER BY created_at ASC
        LIMIT 1
        `,
        [storeId]
    );
    if (!query.rowCount) {
        return false;
    }
    if (query.rows[0].id !== categoryId) {
        return false;
    }
    return true;
}

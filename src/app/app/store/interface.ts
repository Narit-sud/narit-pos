export interface StoreInterface {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}
export interface StoreUserInterface {
    id: string;
    name: string;
    permission: string;
    createdAt: string;
    updatedAt: string;
    createdBy: string;
    updatedBy: string;
}

select
	s.id as "id",
	s.name as "name",
	sp.name as "permission",
	s.created_at as "createdAt",
	s.updated_at as "updatedAt",
	creator.username as "createdBy",
	-- Alias the first join as "creator"
	updater.username as "updatedBy"
	-- Alias the second join as "updater"
from
	store s
join store_user su on
	s.id = su.store_id
join store_permission sp on
	su.permission_id = sp.id
join "user" creator on
	-- Join for the creator's username
	creator.id = s.created_by_user_id
left join "user" updater on
	-- Join for the updater's username, use LEFT JOIN
	updater.id = s.updated_by_user_id
where
	su.user_id = 'e4f62a08-d9c9-4d2b-8f2e-6adfbd9b0b47'
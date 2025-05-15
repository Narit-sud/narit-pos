export const signupSql = `
	INSERT INTO 
        "user"
        (id, "name", surname, username, "password", email, phone_number)
    VALUES
        ($1, $2, $3, $4, $5, $6, $7);`;

import { sql } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';


// {
//     "name": "Jan Kowal"
// }
export const POST: RequestHandler = async ({ request }) => {
	// endpoint na dodawanie nowych użytkowników
	let body = await request.json();
	const res = await sql`
        INSERT INTO users (name) 
            VALUES (${body.name})
            RETURNING *;
    `;
	return json(res[0]);
};

import { sql } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	// endpoint na activities w zaleznosci od statusu
	let status = url.searchParams.get('status');
	const activities = await sql`SELECT a.id, a.name as activity_name, a.location
                                FROM activities a
                                WHERE a.status=${status}`;
	return json({ activities });
};

// {
//     "points": 10,
//     "activity_name": "Usuwanie graffiti",
//     "location": "(52.2297,21.0122)",
//     "creator_id": 1
// }
export const POST: RequestHandler = async ({ request }) => {
	// endpoint na dodawanie nowych aktywności
	let body = await request.json();
	const res = await sql`
        INSERT INTO activities (points, name, creator_id, status, location) 
            VALUES (${body.points}, ${body.activity_name}, ${body.creator_id}, 'CREATED', ${body.location})
            RETURNING *;
    `;
	return json(res[0]);
};

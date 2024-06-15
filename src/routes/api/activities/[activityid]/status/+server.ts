import { sql } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

// {
//     "status": "FINISHED",
// }
export const PUT: RequestHandler = async ({ request, params }) => {
	// endpoint na dodawanie nowych aktywności
	// (points, name, creator_id, status, location)
	let body = await request.json();
	const res = await sql`
        UPDATE activities 
            SET status = ${body.status}
            WHERE id = ${params.activityid!}
            RETURNING *;
    `;
	return json(res[0]);
};

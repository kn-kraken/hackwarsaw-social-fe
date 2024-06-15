import { sql } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
    // enpoint na aktywnosci stworzone przez uzytkownika
    let creator_id = url.searchParams.get('user_id')
    const activities = await sql`SELECT a.id, a.name as activity_name, a.status, a.performer_id
                                FROM activities a
                                        LEFT OUTER JOIN users u
                                                        ON u.id = a.performer_id
                                        WHERE a.creator_id=${creator_id}`;
	return json({activities});
};

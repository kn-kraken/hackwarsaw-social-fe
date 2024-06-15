import { sql } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
    // enpoint na szczegolowy opis aktywnosci
    let activity_id = url.searchParams.get('activity_id')
    const res = await sql`SELECT a.name as activity_name, a.status,
                                        a.points, a.location, uc.name as creator_name, up.name as performer_name
                                FROM activities a
                                        LEFT OUTER JOIN users uc
                                                        ON uc.id = a.performer_id
                                        LEFT OUTER JOIN users up
                                                        ON up.id = a.creator_id
                                        WHERE a.id=${activity_id}`;
	return json(res[0]);
};

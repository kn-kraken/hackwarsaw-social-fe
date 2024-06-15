import { sql } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
    // endpoint na activities w zaleznosci od statusu
    let status = url.searchParams.get('status')
    const activities = await sql`SELECT a.id, a.name as activity_name, a.location
                                FROM activities a
                                WHERE a.status=${status}`;
	return json({activities});
};

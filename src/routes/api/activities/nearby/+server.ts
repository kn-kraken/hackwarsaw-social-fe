import { sql } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
    // endpoint for nearby activites
    // TODO: pass actual location as an argument and filter accordingly
    const activities = await sql`SELECT a.id, a.name as activity_name, a.status, a.performer_id, a.location
                                FROM activities a`;
	return json({activities});
};

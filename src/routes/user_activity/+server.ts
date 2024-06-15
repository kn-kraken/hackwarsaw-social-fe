import { sql } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	// const [{ message }] = await sql`SELECT 'Hello world!' as message`;
    let user_name = url.searchParams.get('user')
    const activities = await sql`SELECT a.id, a.name as activity_name
                                FROM users u
                                        LEFT OUTER JOIN users_in_activities ua
                                                        ON u.id = ua.user_id
                                        LEFT OUTER JOIN activities a
                                                        ON a.id = ua.activity_id
                                        WHERE u.name=${user_name}`;
    // let activities = rows.map(({ activity_name }) => activity_name)
	return json({activities});
};

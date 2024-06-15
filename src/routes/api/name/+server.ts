import { sql } from '$lib/server/db';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	// const [{ message }] = await sql`SELECT 'Hello world!' as message`;
	const [{ name }] = await sql`SELECT name FROM USERS WHERE id = 1`;

	return json({ name });
};

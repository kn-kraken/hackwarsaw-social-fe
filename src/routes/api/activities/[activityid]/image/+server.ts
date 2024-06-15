import { sql } from '$lib/server/db';
import { type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	// endpoint na dodawanie nowych aktywności
	const res = await sql`
    SELECT creator_img FROM activities
    WHERE id = ${params.activityid!};
    `;

	const imageBuffer = res[0].creator_img;

	return new Response(imageBuffer, {
		status: 200,
		headers: {
			// 'Content-Type': 'image/png', // TODO: to consider, set MIME type here
			'Content-Disposition': `inline; filename="${params.activityid!}.png"`
		}
	});
};

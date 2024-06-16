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

// formData: {
//     'creator_img': {
//       'value': fs.createReadStream('leaf_notclicked.png'),
//       'options': {
//         'filename': 'leaf_notclicked.png',
//         'contentType': null
//       }
//     },
//     'points': '10',
//     'activity_name': 'Usuwanie graffiti',
//     'location': '(52.2297,21.0122)',
//     'creator_id': '1'
// }
export const POST: RequestHandler = async ({ request }) => {
	// endpoint na dodawanie nowych aktywności
	const formData = await request.formData();
	const points = formData.get('points')!.toString();
	const activity_name = formData.get('activity_name')!.toString();
	const description = formData.get('description')?.toString() ?? '';
	const creator_id = formData.get('creator_id')!.toString();
	const location = formData.get('location')!.toString();
	const imageFile = formData.get('creator_img');

	if (imageFile instanceof File) {
		const buffer = new Uint8Array(await imageFile.arrayBuffer());
		const res = await sql`
			INSERT INTO activities (points, name, description, creator_id, status, location, creator_img) 
				VALUES (${points}, ${activity_name}, ${description}, ${creator_id}, 'CREATED', ${location}, ${buffer})
				RETURNING id, points, name, description, status, location, creator_id, performer_id;
		`;
		return json(res[0]);
	}

	const res = await sql`
        INSERT INTO activities (points, name, creator_id, status, location) 
            VALUES (${points}, ${activity_name}, ${creator_id}, 'CREATED', ${location})
            RETURNING id, points, name, status, location, creator_id, performer_id;
    `;
	return json(res[0]);
};

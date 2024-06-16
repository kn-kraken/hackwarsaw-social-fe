import { writable } from 'svelte/store';

export const user = writable<{ name: string; id: number } | null>(null);

export type Activity = {
	id: string;
	activity_name: string;
	location: string;
};

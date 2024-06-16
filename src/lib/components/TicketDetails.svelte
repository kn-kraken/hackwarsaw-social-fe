<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import pin from '$lib/assets/pin.svg';
	import Status from '$lib/components/Status.svelte';
	import HistoryEntry from '$lib/components/HistoryEntry.svelte';
	import { onMount } from 'svelte';
	import { invalidate, type Activity } from '$lib';
	import { browser } from '$app/environment';

	export let id: string;

	export let description: string =
		'some extremely long ass description more text here bruh ehh even more pls';

	let activity: Promise<Activity> = new Promise(() => {});

	async function getActivity() {
		activity = fetch(`/api/activities/detail?activity_id=${id}`).then((res) => res.json());
	}

	onMount(getActivity);

	async function markAsCompleted() {
		let res = await fetch(`/api/activities/${id}/status`, {
			method: 'PUT',
			body: JSON.stringify({
				status: 'FINISHED'
			})
		});

		if (!res.ok) {
			return;
		}

		getActivity();
		invalidate.set({});
	}
</script>

<div class="h-full w-full p-4 gap-4 overflow-auto">
	{#await activity}
		<div class="h-full w-full flex flex-col items-center justify-center">Loading...</div>
	{:then activity}
		<Card class="w-full flex flex-col pb-3 max-h-none">
			<img src={`/api/activities/${id}/creatorimage`} alt="post" class="h-32 object-cover" />
			<div class="text-2xl font-semibold text-gray-700 px-3 py-1">
				{activity.activity_name}
			</div>
			<div class="text-md text-gray-600 overflow-hidden px-3 mb-4">
				{description}
			</div>
			<div class="grid grid-cols-[auto,1fr,auto] text-md px-3">
				<div class="place-self-center">$</div>
				<div class="">10</div>
				<div class="">Status</div>
				<img src={pin} alt="post" class="h-4 place-self-center" />
				<div>Warsaw</div>
				<Status status={activity.status} />
			</div>
			<hr class="m-3 border-gray-500" />
			<button class="bg-green-400 rounded-full mx-3 h-10 text-lg" on:click={markAsCompleted}>
				Completed
			</button>
		</Card>
	{/await}
</div>

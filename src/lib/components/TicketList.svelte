<script lang="ts">
	import type { Activity } from '$lib';
	import RequestCard from '$lib/components/RequestCard.svelte';
	import { onMount } from 'svelte';

	export let url: string;

	let activities: Promise<Activity[]> = new Promise(() => {});

	onMount(() => {
		activities = fetch(url)
			.then((res) => res.json())
			.then((data: { activities: Activity[] }) => data.activities);
	});
</script>

<div class="h-full w-full p-4 flex flex-col gap-4 overflow-auto min-h-0">
	{#await activities}
		<div class="h-full w-full flex flex-col items-center justify-center">Loading...</div>
	{:then activities}
		{#each activities as activity}
			<RequestCard
				title={activity.activity_name}
				description={activity.location}
				id={activity.id}
			/>
		{/each}
	{/await}
</div>

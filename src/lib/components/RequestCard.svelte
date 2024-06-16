<script lang="ts">
	import Card from './Card.svelte';
	import pin from '$lib/assets/pin.svg';
	import { pushState } from '$app/navigation';
	import { page } from '$app/stores';

	export let title: string;
	export let description: string;
	export let id: string;
</script>

<Card
	class="w-full min-h-36 flex group hover:bg-gray-100 cursor-pointer"
	on:click={() =>
		pushState('', {
			...$page.state,
			ticket: id
		})}
>
	<div class="flex flex-col grow p-3">
		<div class="text-xl font-semibold text-gray-700">
			{title}
		</div>
		<div class="relative grow text-sm text-gray-600 min-h-0 overflow-hidden mb-1">
			{description || 'no description'}
			<div
				class="absolute inset-0 bg-gradient-to-t group-hover:from-gray-100 from-white to-transparent to-40%"
			></div>
		</div>
		<div class="flex mt-auto items-center text-sm">
			<div>$ 10</div>
			<img src={pin} alt="post" class="h-4 ml-auto mr-0.5" />
			<div>Warsaw</div>
		</div>
	</div>
	<img src={`/api/activities/${id}/creatorimage`} alt="post" class="w-32 object-cover" />
</Card>

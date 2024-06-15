<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import pin from '$lib/assets/pin.svg';
	import img1 from '$lib/assets/img1.png';
	import Status from '$lib/components/Status.svelte';
	import HistoryEntry from '$lib/components/HistoryEntry.svelte';
	import Input from './Input.svelte';
	import TextArea from './TextArea.svelte';

	let title: string = 'Request 1';
	let description: string =
		'some extremely long ass description more text here bruh ehh even more pls';
	let image: string = img1;
</script>

<div class="h-full w-full p-4 gap-4 overflow-auto">
	<div class="mt-1.5 mb-0.5">Ticket title</div>
	<Input value="" />
	<div class="mt-1.5 mb-0.5">Description</div>
	<Input value="" />
	<div class="mt-1.5 mb-0.5">Description</div>
	<TextArea value="" />
	<!-- <Card class="w-full flex flex-col pb-3 max-h-none">
		<img src={image} alt="post" class="h-20 object-cover" />
		<div class="text-2xl font-semibold text-gray-700 px-3 py-1">
			{title}
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
			<Status status="cancelled" />
		</div>
		<hr class="m-3 border-gray-500" />
		<div class="px-3 text-lg">Ticket history</div>
	</Card> -->
</div>

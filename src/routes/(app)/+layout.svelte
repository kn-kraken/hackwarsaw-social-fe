<script lang="ts">
	import { page } from '$app/stores';
	import NewTicket from '$lib/components/NewTicket.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import TicketDetails from '$lib/components/TicketDetails.svelte';
	import type { TransitionConfig } from 'svelte/transition';

	$: details = $page.state.ticket;
	$: newTicket = $page.state.newTicket;

	function appear(node: HTMLElement): TransitionConfig {
		return {
			duration: 100,
			css: (t) => `opacity: ${t}; scale: ${0.85 + 0.15 * t}`
		};
	}
</script>

<div class="relative h-[100dvh] w-full flex flex-col overflow-auto">
	<div
		class="flex min-h-14 bg-green-400 w-full shadow-md z-10 items-center text-xl pl-4 text-gray-800"
	>
		Requests
	</div>
	<div class="relative w-full grow min-h-0 overflow-auto">
		<slot />
		{#if details}
			<div class="absolute inset-0 bg-white" transition:appear>
				<TicketDetails />
			</div>
		{/if}
		{#if newTicket}
			<div class="absolute inset-0 bg-white" transition:appear>
				<NewTicket />
			</div>
		{/if}
	</div>
	<Sidebar />
</div>

<style>
	:global(.leaflet-control-container) {
		display: none;
	}
</style>

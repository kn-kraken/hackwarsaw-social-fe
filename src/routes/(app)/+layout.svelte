<script lang="ts">
	import { page } from '$app/stores';
	import { user } from '$lib';
	import Login from '$lib/components/Login.svelte';
	import NewTicket from '$lib/components/NewTicket.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import TicketDetails from '$lib/components/TicketDetails.svelte';
	import View from '$lib/components/View.svelte';
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

<div class="relative h-[100dvh] w-full bg-gray-100">
	{#if $user}
		<slot />
		{#if details}
			<div class="absolute inset-0 bg-gray-100 z-10" transition:appear>
				<View back title="Ticket details">
					<TicketDetails id={details} />
				</View>
			</div>
		{/if}
		{#if newTicket}
			<div class="absolute inset-0 bg-gray-100 z-10" transition:appear>
				<View back title="New ticket">
					<NewTicket />
				</View>
			</div>
		{/if}
		<Sidebar />
	{:else}
		<View title="Login">
			<Login />
		</View>
	{/if}
</div>

<style>
	:global(.leaflet-control-container) {
		display: none;
	}
</style>

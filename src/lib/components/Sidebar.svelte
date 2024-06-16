<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import ranking from '$lib/assets/ranking.svg';
	import newspaper from '$lib/assets/newspaper.svg';
	import ticket from '$lib/assets/ticket.svg';
	import area from '$lib/assets/area.svg';
	import myTickets from '$lib/assets/my-tickets.svg';
	import add from '$lib/assets/add.svg';
	import menu from '$lib/assets/menu.svg';
	import { type TransitionConfig } from 'svelte/transition';
	import { page } from '$app/stores';
	import { pushState, replaceState } from '$app/navigation';

	let sidebarDim: HTMLDivElement;

	function fade(node: HTMLElement): TransitionConfig {
		return {
			duration: 100,
			css: (t) => `opacity: ${t * 0.4}`
		};
	}

	function slide(node: HTMLElement): TransitionConfig {
		return {
			duration: 100,
			css: (t) => `left: -${(1 - t) * 12}rem`
		};
	}

	$: sidebarOpen = $page.state.sidebarOpen;

	function hideSidebar() {
		history.back();
	}

	function toggleSidebar() {
		if (sidebarOpen) {
			history.back();
		} else {
			pushState('', { ...$page.state, sidebarOpen: true });
		}
	}

	function newTicket() {
		pushState('', { ...$page.state, newTicket: true });
	}
</script>

<svelte:window
	on:keydown={(e) => e.key === 'Escape' && hideSidebar()}
	on:click={(e) => e.target === sidebarDim && hideSidebar()}
/>

<div
	class="absolute bottom-6 left-1/2 z-20 shadow-xl flex rounded-full overflow-hidden -translate-x-1/2"
>
	<button class="h-12 w-12 p-3.5 bg-green-400" on:click={toggleSidebar}>
		<img src={menu} alt="menu" />
	</button>
	<div class="min-w-[1px]" />
	<button class="h-12 w-12 p-3.5 bg-green-400" on:click={newTicket}>
		<img src={add} alt="menu" />
	</button>
</div>
{#if sidebarOpen}
	<div
		class="dim absolute inset-0 bg-black z-20"
		role="region"
		bind:this={sidebarDim}
		transition:fade
	/>
	<div class="absolute top-0 w-64 text-lg h-full bg-white flex flex-col z-20" transition:slide>
		<div class="h-2 bg-green-500" />
		<MenuItem href="/ranking" icon={ticket}>All tickets</MenuItem>
		<MenuItem href="/my-tickets" icon={myTickets}>My tickets</MenuItem>
		<MenuItem href="/map" icon={area}>Nearby tickets</MenuItem>
		<!-- <MenuItem icon={newspaper}>Bulletin Board</MenuItem> -->
	</div>
{/if}

<style>
	.dim {
		opacity: 0.4;
	}
</style>

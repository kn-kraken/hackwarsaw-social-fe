<script lang="ts">
	import MenuItem from './MenuItem.svelte';
	import ranking from '$lib/assets/ranking.svg';
	import newspaper from '$lib/assets/newspaper.svg';
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

<button
	class="absolute bottom-4 left-4 h-12 w-12 bg-green-400 p-2 rounded-full z-20 shadow-lg"
	on:click={toggleSidebar}
>
	<img src={menu} alt="menu" />
</button>
<button
	class="absolute bottom-4 left-20 h-12 w-12 bg-green-400 p-2 rounded-full z-20 shadow-lg"
	on:click={newTicket}
>
	<img src={menu} alt="menu" />
</button>
{#if sidebarOpen}
	<div
		class="dim absolute inset-0 bg-black z-20"
		role="region"
		bind:this={sidebarDim}
		transition:fade
	/>
	<div class="absolute top-0 w-64 text-lg h-full bg-white flex flex-col z-20" transition:slide>
		<div class="h-2 bg-green-500" />
		<MenuItem href="/ranking" icon={ranking}>All tickets</MenuItem>
		<MenuItem href="/my-tickets" icon={ranking}>My tickets</MenuItem>
		<MenuItem href="/map" icon={ranking}>Nearby tickets</MenuItem>
		<!-- <MenuItem icon={newspaper}>Bulletin Board</MenuItem> -->
	</div>
{/if}

<style>
	.dim {
		opacity: 0.4;
	}
</style>

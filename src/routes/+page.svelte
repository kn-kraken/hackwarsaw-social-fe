<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let div: HTMLDivElement;

	onMount(async () => {
		if (browser) {
			const { map, tileLayer } = await import('leaflet');

			const m = map(div, {
				center: [51.505, -0.09],
				zoom: 3
			});

			m.addLayer(tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'));
		}
	});

	let sidebarOpen = true;
</script>

<div class="relative h-full w-full">
	<div class="h-full w-full" bind:this={div}></div>
	{#if sidebarOpen}
		<div class="absolute top-0 right-left w-64 h-full bg-white">
			<div class="flex flex-col h-full">
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	{/if}
</div>

<style>
	:global(.leaflet-control-container) {
		display: none;
	}
</style>

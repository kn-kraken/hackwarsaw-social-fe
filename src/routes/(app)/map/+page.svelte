<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let mapDiv: HTMLDivElement;

	onMount(async () => {
		if (browser) {
			const { map, tileLayer } = await import('leaflet');

			const m = map(mapDiv, {
				center: [51.505, -0.09],
				zoom: 3
			});

			m.addLayer(tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'));
		}
	});
</script>

<div class="h-full w-full overflow-hidden min-h-0" bind:this={mapDiv}></div>

<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import View from '$lib/components/View.svelte';

	import iconUrl from '$lib/assets/ticket.svg';
	import type { Activity } from '$lib';

	let mapDiv: HTMLDivElement;

	onMount(async () => {
		if (browser) {
			const { map, tileLayer, marker, Icon } = await import('leaflet');

			class I extends Icon {
				createIcon(oldIcon?: HTMLElement): HTMLElement {
					const div = document.createElement('div');
					const img = document.createElement('img');
					img.src = iconUrl;
					img.alt = 'icon';
					img.classList.add('w-full', 'h-full', 'rotate-45');
					div.appendChild(img);
					div.classList.add(
						'bg-green-400',
						'rounded-full',
						'absolute',
						'-left-4',
						'-top-4',
						'w-8',
						'h-8',
						'p-1'
					);
					return div;
				}

				createShadow(oldIcon?: HTMLElement): HTMLElement {
					return document.createElement('div');
				}
			}

			const m = map(mapDiv, {
				center: [52.229, 21.01],
				zoom: 13
			});

			m.addLayer(tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'));

			fetch('/api/activities/nearby')
				.then((res) => res.json())
				.then((data: { activities: Activity[] }) => {
					const { activities } = data;
					activities.map((activity) => {
						const { id, activity_name, location } = activity;
						const [lat, lng] = location.slice(1, -1).split(',');
						const mr = marker([parseFloat(lat), parseFloat(lng)], {
							icon: new I({
								iconUrl: iconUrl
							})
						});
						mr.bindPopup(`<b>${activity_name}</b><br>${id}`);
						mr.addTo(m);
					});
				});
		}
	});
</script>

<View title="Map">
	<div class="h-full w-full overflow-hidden min-h-0" bind:this={mapDiv}></div>
</View>

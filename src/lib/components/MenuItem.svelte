<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let className = '';
	export { className as class };

	export let nospacer = false;
	export let icon = '';
	export let href: string;
</script>

<div
	class="{className} h-10 flex justify-between items-center px-5 cursor-pointer"
	on:click={() => {
		if ($page.url.href !== href) {
			// history.back();
			goto(href);
		}
	}}
>
	<slot />
	{#if icon}
		<img src={icon} class="h-[1.5em]" alt="icon" />
	{/if}
</div>
<hr class="first:hidden last:hidden bg-gray-500 mx-3 {nospacer ? 'hidden' : ''}" />

<script lang="ts">
	export let title: string;
	export let back = false;
</script>

<div class="h-full w-full flex flex-col overflow-auto">
	<div
		class="flex min-h-14 bg-green-400 w-full shadow-md z-10 items-center text-xl pl-4 text-gray-800"
	>
		{#if back}
			<button class="w-6 h-6 mr-3" on:click={() => history.back()} />
		{/if}
		{title}
	</div>
	<div class="relative w-full grow min-h-0 overflow-auto">
		<slot />
	</div>
</div>

<style>
	button {
		background: url('$lib/assets/back.svg') no-repeat center;
		background-size: contain;
	}
</style>

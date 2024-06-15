<script lang="ts">
	let className: string = '';
	export { className as class };
</script>

<div on:click class="{className} rounded-md bg-white shadow-md overflow-hidden">
	<slot />
</div>

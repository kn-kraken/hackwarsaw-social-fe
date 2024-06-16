<script lang="ts">
	export let value: string;
	export let placeholder = '';
</script>

<input bind:value class="input-style" {placeholder} />

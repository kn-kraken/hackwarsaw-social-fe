<script lang="ts">
	export let value: string;
	export let placeholder = '';
</script>

<textarea bind:value class="h-36 input-style" {placeholder} />

<script lang="ts" context="module">
	export type Status = 'CREATED' | 'FINISHED';
</script>

<script lang="ts">
	export let status: Status;

	const statusNames: { [Key in Status]: string } = {
		CREATED: 'Open',
		FINISHED: 'Finished'
	};
</script>

<div>
	{statusNames[status]}
</div>

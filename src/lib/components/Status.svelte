<script lang="ts" context="module">
	export type Status = 'open' | 'pending' | 'done' | 'cancelled';
</script>

<script lang="ts">
	export let status: Status;

	const statusNames: { [Key in Status]: string } = {
		cancelled: 'Cancelled',
		done: 'Completed',
		open: 'Open',
		pending: 'In progress'
	};
</script>

<div>
	{statusNames[status]}
</div>

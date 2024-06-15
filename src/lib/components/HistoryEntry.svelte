<script lang="ts">
	import Status, { type Status as Statuses } from './Status.svelte';

	export let status: Statuses;
	export let time: Date;
	export let user: string;
</script>

<div class="px-3 flex">
	<div>
		<div>{user}</div>
		<div>{time.getDay()}</div>
	</div>
	<div>
		<Status {status} />
	</div>
</div>
<hr class="last:hidden mx-3 my-1" />

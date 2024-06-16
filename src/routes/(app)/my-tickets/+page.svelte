<script lang="ts">
	import { user } from '$lib';
	import TicketList from '$lib/components/TicketList.svelte';
	import View from '$lib/components/View.svelte';

	$: id = $user!.id;
</script>

<View title="My tickets">
	<TicketList url="/api/activities/me?user_id={id}" />
</View>

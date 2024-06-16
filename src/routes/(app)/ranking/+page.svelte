<script lang="ts">
	import TicketList from '$lib/components/TicketList.svelte';
	import View from '$lib/components/View.svelte';
</script>

<View title="Tickets">
	<TicketList url="/api/activities?status=CREATED" />
</View>

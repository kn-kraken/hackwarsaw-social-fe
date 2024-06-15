<script lang="ts">
	import img1 from '$lib/assets/img1.png';
	import RequestCard from '$lib/components/RequestCard.svelte';
</script>

<div class="h-full w-full p-4 flex flex-col gap-4 overflow-auto min-h-0">
	<RequestCard
		title="Request 1"
		description="Description 1 Description 1Description 1Description 1Description 1Description 1Description 1"
		image={img1}
	/>
	<RequestCard title="Request 1" description="Description 1" image={img1} />
	<RequestCard title="Request 1" description="Description 1" image={img1} />
	<RequestCard title="Request 1" description="Description 1" image={img1} />
	<RequestCard title="Request 1" description="Description 1" image={img1} />
	<RequestCard title="Request 1" description="Description 1" image={img1} />
	<RequestCard title="Request 1" description="Description 1" image={img1} />
</div>

<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import pin from '$lib/assets/pin.svg';
	import img1 from '$lib/assets/img1.png';
	import Status from '$lib/components/Status.svelte';
	import HistoryEntry from '$lib/components/HistoryEntry.svelte';
	import Input from './Input.svelte';
	import TextArea from './TextArea.svelte';
	import { user } from '$lib';

	let title: string = 'Request 1';
	let description: string =
		'some extremely long ass description more text here bruh ehh even more pls';

	let video: HTMLVideoElement;

	let canvas: HTMLCanvasElement;

	$: if (stage === 'video') {
		startVideo();
	}

	async function startVideo() {
		mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
		video.srcObject = mediaStream;

		video.oncanplay = () => {
			// video.play();
			video.play();

			// setInterval(() => {})
			// const ctx = canvas.getContext('2d')!;
			// ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			// stream.getTracks().forEach((track) => track.stop());
			// video.srcObject = null;
		};
	}

	let stage: 'add' | 'video' | 'image' = 'add';
	let mediaStream: MediaStream | null = null;

	async function submit() {
		canvas.toBlob(async (blob) => {
			if (!blob) return;

			const formData = new FormData();
			formData.append('creator_img', blob);
			formData.append('points', '10');
			formData.append('activity_name', title);
			formData.append('location', '(52.2297,21.0122)');
			formData.append('creator_id', $user!.id.toString());
			await fetch('/api/activities', {
				method: 'POST',
				body: formData
			});
		});
	}

	function takeSnapshot() {
		const ctx = canvas.getContext('2d')!;

		const min = Math.min(video.videoWidth, video.videoHeight);
		canvas.width = min;
		canvas.height = min;

		ctx.drawImage(
			video,
			Math.max(0, (video.videoWidth - video.videoHeight) / 2),
			Math.max(0, (video.videoHeight - video.videoWidth) / 2),
			min,
			min,
			0,
			0,
			min,
			min
		);

		video.srcObject = null;
		mediaStream!.getTracks().forEach((track) => track.stop());

		stage = 'image';
	}
</script>

<div class="w-full max-w-3xl mx-auto p-4 gap-4">
	<div class="mt-1.5 mb-0.5">Ticket title</div>
	<Input bind:value={title} placeholder="Title" />
	<div class="mt-1.5 mb-0.5">Description</div>
	<TextArea bind:value={description} placeholder="Explain the activity" />
	<div class="relative w-full overflow-hidden rounded-md border border-gray-400">
		<div
			class="flex aspect-square w-full items-center justify-center {stage !== 'add'
				? 'hidden'
				: ''}"
		>
			<button
				class="bg-green-400 text-white px-4 py-2 rounded-md"
				on:click={() => (stage = 'video')}
			>
				Add image
			</button>
		</div>
		<video
			class="w-full aspect-square object-cover active:opacity-45 {stage !== 'video'
				? 'hidden'
				: ''}"
			bind:this={video}
			on:mouseup={takeSnapshot}
		/>
		<canvas
			class="relative w-full aspect-square {stage !== 'image' ? 'hidden' : ''}"
			bind:this={canvas}
		>
		</canvas>
		<button
			class="absolute top-0 right-0 h-10 w-10 bg-black/40 rounded-full {stage !== 'image'
				? 'hidden'
				: ''}"
			on:click={() => (stage = 'add')}>X</button
		>
	</div>
	<button class="bg-green-400 text-white px-4 py-2 rounded-md" on:click={submit}>Submit</button>
	<!-- <Card class="w-full flex flex-col pb-3 max-h-none">
		<img src={image} alt="post" class="h-20 object-cover" />
		<div class="text-2xl font-semibold text-gray-700 px-3 py-1">
			{title}
		</div>
		<div class="text-md text-gray-600 overflow-hidden px-3 mb-4">
			{description}
		</div>
		<div class="grid grid-cols-[auto,1fr,auto] text-md px-3">
			<div class="place-self-center">$</div>
			<div class="">10</div>
			<div class="">Status</div>
			<img src={pin} alt="post" class="h-4 place-self-center" />
			<div>Warsaw</div>
			<Status status="cancelled" />
		</div>
		<hr class="m-3 border-gray-500" />
		<div class="px-3 text-lg">Ticket history</div>
	</Card> -->
</div>

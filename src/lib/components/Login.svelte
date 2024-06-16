<script lang="ts">
	import { user } from '$lib';
	import Input from './Input.svelte';

	async function handleSubmit(username: string) {
		username = username.trim();
		if (username.length < 3) {
			return;
		}

		let res = await fetch('/api/users', {
			method: 'POST',
			body: JSON.stringify({ name: username })
		});
		if (!res.ok) {
			return;
		}
		let { id, name } = await res.json();
		if (id == null || name == null) {
			return;
		}
		user.set({ id, name });
	}

	let username: string = '';
</script>

<div class="max-w-lg min-h-full mx-auto p-3 items-center flex">
	<div class="flex w-full gap-3" on:keydown={(e) => e.key === 'Enter' && handleSubmit(username)}>
		<Input bind:value={username} placeholder="Username" />
		<button
			class="bg-green-400 text-white px-4 py-2 rounded-md"
			on:pointerdown={() => handleSubmit(username)}
		>
			Go
		</button>
	</div>
</div>

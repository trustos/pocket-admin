<script lang="ts">
	import * as AlertDialog from '$lib/shadcn/components/ui/alert-dialog';
	import { Button } from '$lib/shadcn/components/ui/button';

	export let open = false;
	export let confirmAction = () => {};
</script>

<AlertDialog.Root {open}>
	<AlertDialog.Trigger />
	<AlertDialog.Content>
		<AlertDialog.Header>
			<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
			<AlertDialog.Description>
				You are about to delete the selected records.
			</AlertDialog.Description>
		</AlertDialog.Header>
		<AlertDialog.Footer>
			<AlertDialog.Cancel on:click={() => (open = false)}>Cancel</AlertDialog.Cancel>
			<Button variant="destructive" on:click={() => confirmAction()}>Confirm</Button>
		</AlertDialog.Footer>
	</AlertDialog.Content>
</AlertDialog.Root>

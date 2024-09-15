import Key from 'lucide-svelte/icons/key';
import Calendar from 'lucide-svelte/icons/calendar';
import Braces from 'lucide-svelte/icons/braces';
import Asterisk from 'lucide-svelte/icons/asterisk';
import Type from 'lucide-svelte/icons/type';
import PencilLine from 'lucide-svelte/icons/pencil-line';
import Image from 'lucide-svelte/icons/image';
import Hash from 'lucide-svelte/icons/hash';
import ToggleLeft from 'lucide-svelte/icons/toggle-left';
import Mail from 'lucide-svelte/icons/mail';
import Link from 'lucide-svelte/icons/link';
import List from 'lucide-svelte/icons/list';
import Share2 from 'lucide-svelte/icons/share-2';

export const fieldIcons = {
	any: Asterisk,
	id: Key,
	date: Calendar,
	json: Braces,
	text: Type,
	editor: PencilLine,
	file: Image,
	number: Hash,
	bool: ToggleLeft,
	email: Mail,
	url: Link,
	select: List,
	relation: Share2
};

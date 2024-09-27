import { base } from '$app/paths';
import type { RecordModel } from 'pocketbase';

export const removeTrailingSlash = (str: string) => str.replace(/\/$/, '');

export const comparePaths = (currentPagePath: string, hrefPath: string) => {
	const currentPath = removeTrailingSlash(currentPagePath);
	const href = !hrefPath.includes(base)
		? removeTrailingSlash(`${base}${hrefPath}`)
		: removeTrailingSlash(hrefPath);

	if (href == base) {
		return currentPath == base;
	} else {
		return currentPath.includes(href);
	}
};

export const capitalizeFirstLetter = (word: string) => {
	return word[0].toUpperCase() + word.slice(1);
};

export const utcDate = (date: Date) =>
	new Date(
		Date.UTC(
			date.getUTCFullYear(),
			date.getUTCMonth(),
			date.getUTCDate(),
			date.getUTCHours(),
			date.getUTCMinutes(),
			date.getUTCSeconds()
		)
	);

export const excludeRecordProperties = (
	obj: RecordModel,
	propsToExclude: (keyof RecordModel)[]
): RecordModel => {
	return Object.keys(obj).reduce((newObj, key) => {
		if (!propsToExclude.includes(key as keyof RecordModel)) {
			newObj[key as keyof RecordModel] = obj[key as keyof RecordModel];
		}
		return newObj;
	}, {} as RecordModel);
};

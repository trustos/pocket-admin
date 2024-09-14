import { base } from '$app/paths';

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

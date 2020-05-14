export const insertOrReplace = <T extends any>(array: T[], items: T | T[], comparison: string = 'id') => {
	const replace = (item: T) => {
		const index = array.findIndex((arrayItem) => arrayItem[comparison] === item[comparison]);
		if (index !== -1) return (array[index] = item);
		return array.push(item);
	};

	if (Array.isArray(items)) {
		for (let item of items) {
			replace(item);
		}
	} else {
		replace(items);
	}
};

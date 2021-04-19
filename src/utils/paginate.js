import Pages from 'lodash';

export const paginate = (items = [], pageNumber = 1, pageSize = 5) => {
	const startIndex = (pageNumber - 1) * pageSize;
	return Pages(items).slice(startIndex).take(pageSize).value();
};

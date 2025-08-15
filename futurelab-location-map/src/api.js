function findElementsByName(jsonData, searchName) {
	let results = [];
	for (const key in jsonData) {
		if (jsonData[key] && Array.isArray(jsonData[key].data)) {
			const matches = jsonData[key].data.filter(item => item.name.toLowerCase().indexOf(searchName.toLowerCase()) !== -1);
			results = results.concat(matches);
		}
	}
  	return results;
}

export async function fetchDataMap(args) {
	const { website } = args;
	const respose = await fetch(`https://loc.aphg.co.nz/wp-json/labtests/v1/collection-centres/?website=${website}`);
	const data = await respose.json();
	
	return data;
}

export async function findCollectionCentres(searchTerm) {
	const respose = await fetch(`https://loc.aphg.co.nz/wp-json/labtests/v1/collection-centres`);
	const data = await respose.json();
	return findElementsByName(data, searchTerm);
}

export function debounce(func, args, delay) {
	let timeout;
	return new Promise((resolve) => {
		if (timeout) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			resolve(func(args));
		}, delay);
	});
}
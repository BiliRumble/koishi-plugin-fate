import fs from 'fs';
import path from 'path';

export async function getFolderImg(folder: string) {
	let imgfilename = await readFilenames(folder);
	const filteredArr = imgfilename.filter((filename) => {
		return /\.(png|jpg|jpeg|ico|svg)$/i.test(filename);
	});
	return filteredArr;
}

export async function readFilenames(dirPath: string) {
	let filenames = [];
	const files = fs.readdirSync(dirPath);
	files.forEach((filename) => {
		const fullPath = path.join(dirPath, filename);
		if (fs.statSync(fullPath).isDirectory()) {
			filenames = filenames.concat(readFilenames(fullPath));
		} else {
			filenames.push(filename);
		}
	});
	return filenames;
}

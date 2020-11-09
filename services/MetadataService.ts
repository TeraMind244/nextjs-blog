import fs from "fs-extra";
import path from "path";
import { IMetadata, Metadata } from "../interfaces";
import { saveFile } from "../utils/FileHelper";

const metadataFilePath = path.join(process.cwd(), "data", "metadata", "metadata.json");

export const getMetadata = async (slug?: string): Promise<Metadata | IMetadata | undefined> => {
	const metadata = JSON.parse((await fs.readFile(metadataFilePath)).toString());

	return slug ? metadata[slug] : metadata;
};

export const addMetadata = async (slug: string, metadata: IMetadata): Promise<void> => {
	const allMetadata = (await getMetadata()) as Metadata;
	const newData = {
		...allMetadata,
		[slug]: metadata
	};
	await saveFile(metadataFilePath, JSON.stringify(newData, null, "\t"));
};

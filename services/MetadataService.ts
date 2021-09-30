import fs from "fs-extra";
import path from "path";
import { IMetadata, Metadata } from "../interfaces";
import { saveFile } from "../utils/FileHelper";

const metadataFilePath = path.join(process.cwd(), "data", "metadata", "metadata.json");

const getMetadatas = async (): Promise<Metadata> => {
	const metadata = JSON.parse((await fs.readFile(metadataFilePath)).toString());
	return metadata;
};

export const getMetadata = async (slug: string): Promise<IMetadata | undefined> => {
	const allMetadata = await getMetadatas();
	return allMetadata[slug];
};

export const addMetadata = async (slug: string, metadata: IMetadata): Promise<void> => {
	const allMetadata = await getMetadatas();
	const newData = {
		...allMetadata,
		[slug]: metadata
	};
	await saveFile(metadataFilePath, JSON.stringify(newData, null, "\t"));
};

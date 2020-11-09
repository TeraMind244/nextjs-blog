import fs from "fs-extra";
import path from "path";
import { IMetadata, Metadata } from "../interfaces";

const metadataFilePath = path.join(process.cwd(), "data", "metadata", "metadata.json");

export const getMetadata = async (slug?: string): Promise<Metadata | IMetadata | undefined> => {
	const metadata = JSON.parse((await fs.readFile(metadataFilePath)).toString());

	return slug ? metadata[slug] : metadata;
};

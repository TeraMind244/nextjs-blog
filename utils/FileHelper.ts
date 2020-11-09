import fs from "fs-extra";

export const saveFile = async (filePath: string, fileContent: string): Promise<void> => {
	await fs.writeFile(filePath, fileContent + "\n", { encoding: "utf-8" });
};

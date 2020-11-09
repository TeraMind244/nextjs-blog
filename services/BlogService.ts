import fs from "fs-extra";
import path from "path";
import slug from "slug";
import { AllPostIdParams, IMetadata, IPostData } from "../interfaces";
import { saveFile } from "../utils/FileHelper";
import { prependMetadata } from "../utils/MarkdownHelper";
import MarkdownParser from "../utils/MarkdownParser";
import { getMetadata } from "./MetadataService";

const postsDirectory = path.join(process.cwd(), "data", "posts");
const getSlug = (fileName: string): string => fileName.replace(/\.md$/, "");
const getFileName = (slug: string): string => `${slug}.md`;

export const saveBlog = async (title: string, markdown: string, date = Date.now()): Promise<void> => {
	const fileName = getFileName(slug(title));

	// TODO Save blog + save metadata
	await saveFile(path.join(postsDirectory, fileName), prependMetadata(title, date, markdown));
};

export const getSortedPostsData = async (): Promise<IPostData[]> => {
	const allPostsData = await getAllPostsData();

	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
};

const getAllPostsData = async (): Promise<IPostData[]> => {
	// Get file names under /posts
	const fileNames = await fs.readdir(postsDirectory);

	return await getAllPostsDataFromFileNames(fileNames);
};

const getAllPostsDataFromFileNames = async (fileNames: string[]): Promise<IPostData[]> => {
	const allPostsData: IPostData[] = [];
	for (const fileName of fileNames) {
		allPostsData.push(await getPostData(getSlug(fileName)));
	}
	return allPostsData;
}

export const getAllPostIds = async (): Promise<AllPostIdParams> => {
	const fileNames = await fs.readdir(postsDirectory);

	return fileNames.map(fileName => {
		return {
			params: {
				id: getSlug(fileName)
			}
		};
	});
};

export const getPostData = async (slug: string, detail = false): Promise<IPostData> => {
	const postContent = detail ? MarkdownParser.parse((await fs.readFile(path.join(postsDirectory, getFileName(slug)))).toString()) : "";
	const metadata = (await getMetadata(slug)) as IMetadata;

	// Combine the data with the id
	return {
		slug: slug,
		content: postContent,
		...metadata
	};
};

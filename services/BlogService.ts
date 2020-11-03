import fs from "fs";
import matter from "gray-matter";
import path from "path";
import remark from "remark";
import html from "remark-html";
import slug from "slug";
import { IPostData } from "../interfaces/Post";
import { slugifyDate } from "../utils/DateTimeHelper";
import { prependMetadata } from "../utils/MarkdownHelper";
import { saveFile } from "./FileService";

const postsDirectory = path.join(process.cwd(), "data", "posts");
const getFileName = (fileName: string) => fileName.replace(/\.md$/, "");

export const saveBlog = async (title: string, markdown: string): Promise<void> => {
	const fileName = `${slug(title)}.md`;

	const dateString = slugifyDate();
	await saveFile(path.join(postsDirectory, fileName), prependMetadata(title, dateString, markdown));
}

export const getSortedPostsData = () => {
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map(fileName => {
		// Remove ".md" from file name to get id
		const id = getFileName(fileName);

		return getPostData(id);
	});

	// Sort posts by date
	return allPostsData.sort((a: any, b: any) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
};

interface IAllPostIdParam {
	params: IPostData;
}
type AllPostIdParams = IAllPostIdParam[];

export const getAllPostIds = (): AllPostIdParams => {
	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map(fileName => {
		return {
			params: {
				id: getFileName(fileName)
			}
		};
	});
};

export const renderHtmlFromMarkdown = async (markdown: string): Promise<string> => {
	const processedContent = await remark().use(html).process(markdown);
	return processedContent.toString();
};

export const getAllMatterData = (id: string): matter.GrayMatterFile<string> => {
	// Read markdown file as string
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	// Use gray-matter to parse the post metadata section
	return matter(fileContents);
};

export const getPostData = (id: string): IPostData => {
	const matterResult = getAllMatterData(id);

	// Combine the data with the id
	return {
		id,
		...matterResult.data
	} as IPostData;
};

export const getDetailPostData = async (id: string): Promise<IPostData> => {
	// Read markdown file as string
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	// Use gray-matter to parse the post metadata section
	const matterResult = matter(fileContents);

	const contentHtml = await renderHtmlFromMarkdown(matterResult.content);

	// Combine the data with the id
	return {
		id,
		contentHtml,
		...matterResult.data
	} as IPostData;
};

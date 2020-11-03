import path from "path";
import slug from "slug";
import { slugifyDate } from "../utils/DateTimeHelper";
import { prependMetadata } from "../utils/MarkdownHelper";
import { saveFile } from "./FileService";

const postsDirectory = path.join(process.cwd(), "data", "posts");

export const saveBlog = async (title: string, markdown: string): Promise<void> => {
	const fileName = `${slug(title)}.md`;

	const dateString = slugifyDate();
	await saveFile(path.join(postsDirectory, fileName), prependMetadata(title, dateString, markdown));
}

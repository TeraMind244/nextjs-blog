import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

const getFileName = (fileName) => fileName.replace(/\.md$/, "");

export default function getSortedPostsData() {
	// Get file names under /posts
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		// Remove ".md" from file name to get id
		const id = getFileName(fileName);

		return getPostData(id);
	});

	// Sort posts by date
	return allPostsData.sort((a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	});
}

/**
 * Returns an array that looks like this:
 * ```
 * [
 *   {
 *     params: {
 *       id: 'ssg-ssr'
 *     }
 *   },
 *   {
 *     params: {
 *       id: 'pre-rendering'
 *     }
 *   }
 * ]
 * ```
 */
export function getAllPostIds() {
	const fileNames = fs.readdirSync(postsDirectory);

	return fileNames.map((fileName) => {
		return {
			params: {
				id: getFileName(fileName)
			}
		};
	});
}

export async function renderHtmlFromMarkdown(markdown) {
	const processedContent = await remark().use(html).process(markdown);
	return processedContent.toString();
}

export function getAllMatterData(id) {
	// Read markdown file as string
	const fullPath = path.join(postsDirectory, `${id}.md`);
	const fileContents = fs.readFileSync(fullPath, "utf8");

	// Use gray-matter to parse the post metadata section
	return matter(fileContents);
}

export function getPostData(id) {
	const matterResult = getAllMatterData(id);

	// Combine the data with the id
	return {
		id,
		...matterResult.data
	};
}

export async function getDetailPostData(id) {
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
	};
}

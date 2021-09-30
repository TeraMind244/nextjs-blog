
import axios from "axios";

export const createBlog = async (title: string, markdown: string) => {
	try {
		await axios.post("/api/posts", {
			title,
			content: markdown
		});
		window.location.href = "/";
	} catch (error) {
		console.error(error);
	}
}

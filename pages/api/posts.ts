import { NextApiRequest, NextApiResponse } from "next";
import { saveBlog } from "../../services/BlogService";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const posts = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ error: true, message: "Method not allow" });
	}
	const title = req.body.title;
	const markdown = req.body.content
	await saveBlog(title, markdown);
	return res.status(200).json({ error: false, message: "Save successfully!" });
};

export default posts;

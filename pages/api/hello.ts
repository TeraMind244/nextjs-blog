import { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const hello = (req: NextApiRequest, res: NextApiResponse) => {
	res.status(200).json({ text: "Hello" });
};

export default hello;

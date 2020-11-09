import { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import MarkdownWrapper from "../components/MarkdownWrapper";
import { Page } from "../constant";

const Create: NextPage = () => {
	return (
		<Layout page={Page.CREATE}>
			<Head>
				<title>{"Create new post"}</title>
			</Head>
			<MarkdownWrapper />
		</Layout>
	);
};

export default Create;

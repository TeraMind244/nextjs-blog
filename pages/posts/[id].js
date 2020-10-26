import Head from "next/head";
import Layout from "../../components/layout";
import Date from "../../components/date";
import { getAllPostIds, getDetailPostData } from "../../utils/postsUtils";
import utilStyles from "../../styles/utils.module.css";

export default function Post({ postData }) {
	return (
		<>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<Layout>
				<article>
					<h1 className={utilStyles.headingXl}>{postData.title}</h1>
					<Date dateString={postData.date} />
					<br />
					<div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
				</article>
			</Layout>
		</>
	);
}

export async function getStaticPaths() {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false
	};
}

export async function getStaticProps({ params }) {
	const postData = await getDetailPostData(params.id);
	return {
		props: {
			postData
		}
	};
}

import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Date from "../../components/Date";
import Layout from "../../components/Layout";
import { Page } from "../../constant";
import { IPostData } from "../../interfaces";
import { getAllPostIds, getPostData } from "../../services/BlogService";
import utilStyles from "../../styles/utils.module.css";

interface IProps {
	postData: IPostData;
}

const Post: NextPage<IProps> = ({ postData }) => {
	return (
		<>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<Layout page={Page.BLOG_DETAIL}>
				<article>
					<h1 className={utilStyles.headingXl}>{postData.title}</h1>
					<Date date={postData.date} />
					<br />
					<div dangerouslySetInnerHTML={{ __html: postData.content || "" }} />
				</article>
			</Layout>
		</>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = await getAllPostIds();
	return {
		paths,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
	const postData = await getPostData(params!.id as string, true);
	return {
		props: {
			postData
		}
	};
};

export default Post;

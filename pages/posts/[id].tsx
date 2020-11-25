import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Date from "../../components/Date";
import Layout from "../../components/Layout";
import { Page } from "../../constant";
import { IPostData, IPostId } from "../../interfaces";
import { getAllPostIds, getPostData } from "../../services/BlogService";
import utilStyles from "../../styles/utils.module.css";

interface IProps {
	postData: IPostData;
}

const Post: NextPage<IProps> = ({ postData }) => {
	if (!postData) {
		return <div>Oops - 404! Post not found!</div>;
	}
	return (
		<Layout page={Page.BLOG_DETAIL}>
			<Head>
				<title>{postData.title}</title>
			</Head>
			<article>
				<h1 className={utilStyles.headingXl}>{postData.title}</h1>
				<Date date={postData.date} />
				<br />
				<div dangerouslySetInnerHTML={{ __html: postData.content }} />
			</article>
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths<IPostId> = async () => {
	const paths = await getAllPostIds();
	return {
		paths,
		fallback: true
	};
};

export const getStaticProps: GetStaticProps<IProps, IPostId> = async ({ params }) => {
	const postData = await getPostData(params.id, true);
	return {
		props: {
			postData
		}
	};
};

export default Post;

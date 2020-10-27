import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Date from "../../components/Date";
import Layout from "../../components/Layout";
import { IPostData } from "../../interfaces/post-data";
import utilStyles from "../../styles/utils.module.css";
import { getAllPostIds, getDetailPostData } from "../../utils/postsUtils";

interface IProps {
	postData: IPostData;
}

const Post = ({ postData }: IProps) => {
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

export const getStaticPaths: GetStaticPaths = async () => {
	const paths = getAllPostIds();
	return {
		paths,
		fallback: false
	};
};

export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
	const postData = await getDetailPostData(params.id as string);
	return {
		props: {
			postData
		}
	};
};

export default Post;
